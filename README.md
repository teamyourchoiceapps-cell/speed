# YourSpeed

A clean, minimal GPS speed app for Android.

## Features
- 📍 Real-time GPS speed display
- 🔄 Speed in **km/h**, **mph**, or **knots**
- ⏱️ Configurable update interval (1s, 2s, 5s, 10s)
- 📢 Optional ads (off by default)
- ♥ Donate link to support the project

## Tech Stack
- [Expo](https://expo.dev) (React Native)
- `expo-location` for GPS
- `@react-native-async-storage/async-storage` for preferences

## Getting Started

```bash
npm install
npx expo start --android
```

## Donate
Once PayPal is set up, update the URL in `src/components/DonateButton.js`.

## Ads
Once AdMob is set up, integrate `react-native-google-mobile-ads` and replace the placeholder in `SpeedScreen.js`.
