#!/bin/bash

echo "🚀 Building Notes App APK..."

# Build the React app
echo "📦 Building React app..."
npm run build

# Sync with Capacitor
echo "🔄 Syncing with Android project..."
npx cap sync android

# Navigate to Android project
cd android

echo "📱 Building APK..."

# Build debug APK (faster, for testing)
./gradlew assembleDebug

# Build release APK (optimized, for production)
# ./gradlew assembleRelease

echo "✅ APK build complete!"
echo "📍 Debug APK location: android/app/build/outputs/apk/debug/app-debug.apk"
echo "📍 You can install this APK on any Android device"

# Copy APK to root directory for easy access
cp app/build/outputs/apk/debug/app-debug.apk ../notes-app.apk

echo "📍 APK copied to: notes-app.apk"