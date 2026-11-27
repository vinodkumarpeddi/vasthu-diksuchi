# వాస్తు దిక్సూచి – Vasthu Diksuchi

Telugu / English Vasthu app for Android (version 3):

- **Accurate compass (దిక్సూచి)** – uses the phone's fused rotation sensor, so the reading is correct whether the phone is flat, upright or tilted. Flat: it reads the direction of the top of the phone; upright: the direction the camera looks. Smooth needle, ±degree accuracy, a calibration indicator, a figure-8 calibration guide, and a warning when iron or electrical items disturb the reading.
- **Camera with compass** – live compass in the top-right corner. Every photo is stamped with the compass, the degrees, the direction, the label (main door, road, kitchen…) and date/time. Save to the gallery or share.
- **Best facing for the family** – enter the Kartha's name (Telugu or English). The app finds the first syllable → name rasi (or pick the birth rasi), then shows the best house facing as a chart. Enter the plot size to also get the aayam (Dhwaja, Simha…).
- **On-site house check** – road side(s) incl. corner plots, road slope, veedhi potu (road hitting the plot, tap on a picture), building/gate facing, main door (measured from inside OR from outside walking in), each room, and a few yes/no questions. Every direction can be measured with a photo.
- **Report** – verdict with score gauge, suitability for the Kartha, the best side to enter from outside, a direction map with the rooms placed in their zones, score by area, issues with fixes, and the photos. Save and share.
- **Telugu | English** switch at the top. Text cannot be selected or copied.

Works fully offline once installed.

## Get the APK (no coding needed, about 10 minutes, one time)

1. Create a free account at **github.com** (skip if you already have one).
2. Click **+ → New repository**. Name it `vasthu-diksuchi`, choose **Public**, and click **Create repository**.
3. On the new repository page click **uploading an existing file**.
4. Unzip `vasthu-diksuchi.zip` on your computer. Open the unzipped `vasthu-diksuchi` folder, select **everything inside it** (the folders `docs`, `android`, `.github` and the file `README.md`) and drag it onto the GitHub page. Click **Commit changes**.
   - On a Mac the `.github` folder is hidden. Press **Cmd + Shift + .** in Finder to show it before dragging.
   - If `.github` did not upload: in the repository click **Add file → Create new file**, type the name `.github/workflows/build-apk.yml`, paste the contents of that file from the zip, and click **Commit changes**.
5. Click the **Actions** tab. A run called **Build APK** starts by itself (if GitHub asks, click **I understand my workflows, go ahead and enable them**, then open **Build APK → Run workflow**). It takes about 5 minutes and turns green when done.
6. Open the repository's **Releases** (right side of the main page). Download **vasthu-diksuchi.apk** – do this on your Android phone, or send the file to your phone.
7. On the phone, open the downloaded file. If Android asks, allow **Install unknown apps** for Chrome / Files, then tap **Install**. If Play Protect warns about an unknown developer, tap **More details → Install anyway**.

Every time you change a file in the repository, GitHub builds a fresh APK and adds a new Release.

## Optional: use it as a web app too

In the repository: **Settings → Pages → Branch: main, folder: /docs → Save**. After a minute the app is live at `https://<your-username>.github.io/vasthu-diksuchi/`. Open that link in Chrome on any phone and choose **Add to Home screen / Install app**.

## Notes

- Hold the phone any way. If the badge at the top says Calibrate, tap it and move the phone in a figure-8. Keep away from iron gates, cars, grills and electrical boards.
- The app asks for Camera permission the first time you take a photo. On Android 9 and older it also asks for Storage when you save a photo.
- Phones without a compass sensor get a manual direction slider.
- The Vasthu guidance is a summary of traditional practice. Consult an experienced Vasthu expert before building or altering a house.
