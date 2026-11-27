package com.vasthu.diksuchi;

import android.Manifest;
import android.app.Activity;
import android.content.ContentValues;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.webkit.WebViewAssetLoader;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Locale;

public class MainActivity extends Activity implements SensorEventListener {
    private static final int REQ_CAMERA = 1, REQ_STORAGE = 2;
    private WebView web;
    private SensorManager sm;
    private Sensor rotSensor, magSensor;
    private final float[] rm = new float[9];
    private final float[] rv = new float[4];
    private int magAccuracy = -1;
    private float fieldUT = 0f;
    private boolean upright = false;
    private long lastPush = 0;
    private PermissionRequest pendingCam;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(0xFF9E0F1B);

        final WebViewAssetLoader loader = new WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();

        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setTextZoom(100);
        // no long-press text selection / copy menu
        web.setLongClickable(false);
        web.setOnLongClickListener(v -> true);
        web.setHapticFeedbackEnabled(false);

        web.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return loader.shouldInterceptRequest(request.getUrl());
            }
        });
        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                runOnUiThread(() -> {
                    if (checkSelfPermission(Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
                        request.grant(request.getResources());
                    } else {
                        pendingCam = request;
                        requestPermissions(new String[]{Manifest.permission.CAMERA}, REQ_CAMERA);
                    }
                });
            }
        });
        web.addJavascriptInterface(new Bridge(), "AndroidBridge");
        setContentView(web);
        web.loadUrl("https://appassets.androidplatform.net/assets/index.html");

        sm = (SensorManager) getSystemService(SENSOR_SERVICE);
        rotSensor = sm.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR);
        if (rotSensor == null) rotSensor = sm.getDefaultSensor(Sensor.TYPE_GEOMAGNETIC_ROTATION_VECTOR);
        magSensor = sm.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD);
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (rotSensor != null) sm.registerListener(this, rotSensor, SensorManager.SENSOR_DELAY_GAME);
        if (magSensor != null) sm.registerListener(this, magSensor, SensorManager.SENSOR_DELAY_UI);
    }

    @Override
    protected void onPause() {
        super.onPause();
        sm.unregisterListener(this);
    }

    @Override
    public void onSensorChanged(SensorEvent e) {
        int type = e.sensor.getType();
        if (type == Sensor.TYPE_MAGNETIC_FIELD) {
            float x = e.values[0], y = e.values[1], z = e.values[2];
            fieldUT = (float) Math.sqrt(x * x + y * y + z * z);
            return;
        }
        // fused, tilt-compensated orientation (accelerometer + gyroscope + magnetometer)
        System.arraycopy(e.values, 0, rv, 0, 4);
        SensorManager.getRotationMatrixFromVector(rm, rv);
        // rm maps device -> world (East, North, Up). Columns: device X, Y (top edge), Z (screen normal).
        float topUp = Math.abs(rm[7]);
        upright = upright ? topUp > 0.6f : topUp > 0.75f;
        float east, north;
        if (upright) { east = -rm[2]; north = -rm[5]; }   // back-camera axis
        else { east = rm[1]; north = rm[4]; }             // top edge of the phone
        double h = Math.toDegrees(Math.atan2(east, north));
        if (h < 0) h += 360;
        float accDeg = -1;
        if (e.values.length > 4 && e.values[4] >= 0) accDeg = (float) Math.toDegrees(e.values[4]);
        long now = System.currentTimeMillis();
        if (now - lastPush < 20) return;
        lastPush = now;
        String js = String.format(Locale.US, "window.__nh&&__nh(%.2f,%.1f,%d,%.1f,%.3f,%d)",
                h, accDeg, magAccuracy, fieldUT, topUp, upright ? 1 : 0);
        web.evaluateJavascript(js, null);
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        if (sensor.getType() == Sensor.TYPE_MAGNETIC_FIELD) magAccuracy = accuracy;
    }

    @Override
    public void onRequestPermissionsResult(int code, String[] perms, int[] res) {
        super.onRequestPermissionsResult(code, perms, res);
        if (code == REQ_CAMERA && pendingCam != null) {
            if (res.length > 0 && res[0] == PackageManager.PERMISSION_GRANTED) pendingCam.grant(pendingCam.getResources());
            else pendingCam.deny();
            pendingCam = null;
        }
    }

    @Override
    public void onBackPressed() {
        web.evaluateJavascript("(window.__back&&window.__back())?'1':'0'", v -> {
            if (v == null || !v.contains("1")) finish();
        });
    }

    private Uri saveJpeg(String dataUrl, String name) throws Exception {
        String b64 = dataUrl.substring(dataUrl.indexOf(',') + 1);
        byte[] bytes = Base64.decode(b64, Base64.DEFAULT);
        if (Build.VERSION.SDK_INT >= 29) {
            ContentValues cv = new ContentValues();
            cv.put(MediaStore.Images.Media.DISPLAY_NAME, name);
            cv.put(MediaStore.Images.Media.MIME_TYPE, "image/jpeg");
            cv.put(MediaStore.Images.Media.RELATIVE_PATH, Environment.DIRECTORY_PICTURES + "/VasthuDiksuchi");
            Uri uri = getContentResolver().insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, cv);
            if (uri == null) throw new Exception("insert failed");
            try (OutputStream os = getContentResolver().openOutputStream(uri)) { os.write(bytes); }
            return uri;
        } else {
            File dir = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), "VasthuDiksuchi");
            if (!dir.exists()) dir.mkdirs();
            File f = new File(dir, name);
            try (FileOutputStream os = new FileOutputStream(f)) { os.write(bytes); }
            ContentValues cv = new ContentValues();
            cv.put(MediaStore.Images.Media.DATA, f.getAbsolutePath());
            cv.put(MediaStore.Images.Media.MIME_TYPE, "image/jpeg");
            Uri uri = getContentResolver().insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, cv);
            return uri != null ? uri : Uri.fromFile(f);
        }
    }

    private boolean needStorage() {
        if (Build.VERSION.SDK_INT >= 29) return false;
        if (checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED) return false;
        runOnUiThread(() -> requestPermissions(new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, REQ_STORAGE));
        return true;
    }

    public class Bridge {
        @JavascriptInterface
        public void share(String text) {
            Intent i = new Intent(Intent.ACTION_SEND);
            i.setType("text/plain");
            i.putExtra(Intent.EXTRA_TEXT, text);
            runOnUiThread(() -> startActivity(Intent.createChooser(i, "Share")));
        }

        @JavascriptInterface
        public String saveImage(String dataUrl, String name) {
            if (needStorage()) return "Allow storage permission and tap Save again";
            try { saveJpeg(dataUrl, name); return "ok"; } catch (Exception ex) { return "Could not save: " + ex.getMessage(); }
        }

        @JavascriptInterface
        public void shareImage(String dataUrl, String text) {
            if (needStorage()) return;
            try {
                Uri uri = saveJpeg(dataUrl, "vasthu_" + System.currentTimeMillis() + ".jpg");
                Intent i = new Intent(Intent.ACTION_SEND);
                i.setType("image/jpeg");
                i.putExtra(Intent.EXTRA_STREAM, uri);
                i.putExtra(Intent.EXTRA_TEXT, text);
                i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                runOnUiThread(() -> startActivity(Intent.createChooser(i, "Share")));
            } catch (Exception ignored) { }
        }
    }
}
