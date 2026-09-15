# AI Smart Campus – Student Assistant (Native Android App)

This is the native Android version of **AI Smart Campus – Student Assistant**, built with **Kotlin** and **Jetpack Compose**.

## Architecture & Features
- **UI Framework:** Jetpack Compose with Material 3
- **Theme:** Academic Blue (`#2563EB`) on crisp light background (`#F8FAFC`)
- **Conversation:** ChatGPT-style chat interface with student messages on right, AI assistant messages on left
- **Quick Action Buttons:** 📅 Timetable, 📢 Notices, 📚 Library, 🏫 Facilities, 📝 Exams, 👨‍🏫 Faculty
- **Drawer Menu:** Full campus exploration (10 verified categories)
- **Local Engine:** Built-in `CampusQueryEngine.kt` for instant offline query resolution
- **Minimum SDK:** 24 (Android 7.0+)
- **Target SDK:** 34 (Android 14)

## How to Open & Run in Android Studio

1. **Open in Android Studio:**
   - In Android Studio, select **File > Open...** and select this `android` folder.
   - Wait for Gradle sync to complete.

2. **Run on Emulator or Physical Android Phone:**
   - Select your connected Android device or start an Android Virtual Device (AVD) emulator.
   - Click the green **Run (▶)** button or press `Shift + F10`.

3. **Generate Installable APK for Your Phone:**
   - In Android Studio, go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
   - When finished, click **locate** to find `app-debug.apk`.
   - Transfer `app-debug.apk` to your Android phone via WhatsApp, Google Drive, or USB cable.
   - Tap the APK on your phone to install and test!
