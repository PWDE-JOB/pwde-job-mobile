# PWD-E-JOB Mobile Application

A React Native mobile application designed to connect Persons with Disabilities (PWDs) with employment opportunities. The app features a Tinder-like job matching interface, comprehensive application tracking, and accessibility-first design.

## 📱 Features

- **Intuitive Job Matching**
  - Swipe-based interface for job applications
  - Smart job recommendations based on skills
  - Detailed job listings with salary and requirements

- **Application Management**
  - Track application status (Under Review, Accepted, Declined)
  - View application history with detailed job information
  - Real-time status updates

- **User Profile**
  - Customizable user profiles
  - PWD ID verification
  - Skills and experience management
  - Resume upload capability

- **Accessibility Features**
  - High contrast mode
  - Text size adjustments
  - Screen reader compatibility
  - Navigation assistance

- **Additional Features**
  - In-app messaging system
  - Push notifications
  - Dark mode support
  - Secure authentication

## 🛠 Technical Requirements

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Java Development Kit (JDK) 11
- Android Studio (for Android development)
- Android SDK
- USB debugging enabled on your Android device (for testing)

### Environment Setup

1. **Install Node.js and npm**
   ```bash
   # Check Node.js version
   node --version
   npm --version
   ```

2. **Install Expo CLI**
   ```bash
   npm install -g expo-cli
   ```

3. **Android Studio Setup**
   - Download and install Android Studio
   - Install Android SDK (minimum SDK 21)
   - Configure ANDROID_HOME environment variable
   - Add platform-tools to system PATH

## 📥 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Frontend-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_API_BASE_URL=your_api_url_here
   ```

## 🚀 Running the Application

### Development Mode

1. **Start the Expo development server**
   ```bash
   npx expo start -c
   ```

2. **Run on Android**
   ```bash
   npm run android
   ```

### Building for Production

1. **Generate Android Bundle**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
   The APK will be generated at `android/app/build/outputs/apk/release/app-release.apk`

## 📦 Dependencies

```json
{
  "@react-native-async-storage/async-storage": "2.1.2",
  "@react-native-community/slider": "^4.5.6",
  "@react-native-picker/picker": "2.11.0",
  "expo": "53.0.12",
  "expo-constants": "~17.1.6",
  "expo-image-picker": "~16.1.4",
  "expo-linking": "~7.1.5",
  "expo-router": "~5.1.0",
  "expo-status-bar": "~2.2.3",
  "react": "19.0.0",
  "react-native": "0.79.4",
  "react-native-gesture-handler": "~2.24.0",
  "react-native-reanimated": "~3.17.4",
  "react-native-safe-area-context": "5.4.0",
  "react-native-screens": "~4.11.1",
  "expo-document-picker": "~13.1.6"
}
```

## 📱 Android Configuration

The Android configuration is located in the `android/` directory:

- `android/app/build.gradle`: Application build settings
- `android/app/src/main/AndroidManifest.xml`: App permissions and configuration
- `android/gradle.properties`: Gradle settings
- `android/settings.gradle`: Project settings

### Key Android Files

1. **MainActivity.kt**
   - Main activity class
   - Handles deep linking
   - Manages splash screen

2. **MainApplication.kt**
   - Application class
   - Initializes React Native
   - Manages native modules

3. **build.gradle**
   - Dependencies
   - Build configurations
   - SDK versions

### Building for Android

1. **Debug Build**
   ```bash
   cd android
   ./gradlew assembleDebug
   ```

2. **Release Build**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

3. **Bundle for Play Store**
   ```bash
   cd android
   ./gradlew bundleRelease
   ```

## 🔐 Security

- Token-based authentication
- Secure storage using AsyncStorage
- API request authorization
- Input validation and sanitization

## 📁 Project Structure

```
Frontend-mobile/
├── android/               # Android native files
├── app/                   # Main application code
│   ├── (auth)/           # Authentication screens
│   ├── (tabs)/           # Main tab screens
│   └── _layout.jsx       # Root layout
├── assets/               # Images and assets
├── styles/               # Style files
└── package.json          # Project configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Mark Angelo Toelntino - Initial work
- Michael Ashley Ygana - API Integration

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by the need for accessible job platforms
- Built with React Native and Expo 