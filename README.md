# వాస్తు దిక్సూచి – Vasthu Diksuchi

Telugu / English Vasthu app for Android:

- **Compass (దిక్సూచి)** – live phone-sensor compass with the 8 directions in Telugu.
- **House check (ఇల్లు చెక్)** – on-site check of a house before renting or buying. Measure the main-door facing and the direction of each room, answer a few questions, and get a clear verdict: good / acceptable / not as per Vasthu, with the list of problems. Each house can be saved and shared.
- **Rooms (గదులు)** – where each room should be, with a small colour dial.
- **Directions (దిక్కులు)** – the 8 directions with deity, planet, element and tips.

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

- Hold the phone flat. If the compass jumps, move the phone in a figure-8 to calibrate, and keep away from iron, magnets and electrical appliances.
- Phones without a compass sensor get a manual direction slider.
- The Vasthu guidance is a summary of traditional practice. Consult an experienced Vasthu expert before building or altering a house.
