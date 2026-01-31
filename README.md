# Predicile Părintelui

> **Orthodox Christian Sermon Audio Streaming Application**
> Aplicație pentru streaming audio predici ortodoxe

[![Expo](https://img.shields.io/badge/Expo-~54.0-000020.svg?style=flat-square&logo=EXPO&labelColor=000&logoColor=FFF)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB.svg?style=flat-square&logo=react&labelColor=000&logoColor=61DAFB)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg?style=flat-square&logo=typescript&labelColor=000&logoColor=3178C6)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

## 📖 Description / Descriere

### English

**Predicile Părintelui** is a modern, cross-platform mobile and web application designed to bring Orthodox Christian sermons to believers worldwide. Built with React Native and Expo, the app provides a seamless audio streaming experience with offline support, notifications, and a beautiful interface inspired by Byzantine iconography.

The application features a sophisticated audio player with background playback, download capabilities for offline listening, and a carefully crafted design system that honors Orthodox tradition while embracing modern usability principles.

### Română

**Predicile Părintelui** este o aplicație modernă, cross-platform (mobil și web) concepută pentru a aduce predicile ortodoxe creștine credincioșilor din întreaga lume. Construită cu React Native și Expo, aplicația oferă o experiență fluidă de streaming audio cu suport offline, notificări și o interfață frumoasă inspirată de iconografia bizantină.

Aplicația dispune de un player audio sofisticat cu redare în fundal, capacități de descărcare pentru ascultare offline și un sistem de design creat cu grijă care onorează tradiția ortodoxă, îmbrățișând în același timp principiile moderne de utilizare.

---

## ✨ Features / Caracteristici

- **Audio Streaming** - Stream sermons directly from the cloud
- **Background Playback** - Continue listening while using other apps
- **Offline Support** - Download sermons for offline listening
- **Smart Notifications** - Get notified about new sermons
- **Beautiful UI** - Byzantine Modern design system with liturgical colors
- **Cross-Platform** - Works on iOS, Android, and Web (PWA)
- **Dark Mode** - Automatic dark mode support
- **Romanian First** - Built with Romanian as the primary language
- **Responsive Design** - Optimized for phones, tablets, and desktop

---

## 🛠 Tech Stack

### Core Framework
- **Expo SDK 54** - Universal React Native platform
- **React 19.1** - Latest React with concurrent features
- **React Native 0.81** - Native mobile development
- **TypeScript 5.9** - Type-safe development

### Navigation & Routing
- **Expo Router 6** - File-based routing with typed routes
- **React Navigation 7** - Navigation library

### Audio & Media
- **Expo AV** - Audio streaming and playback
- Background audio support for iOS and Android

### UI & Styling
- **NativeWind 4.2** - Tailwind CSS for React Native
- **Lucide React Native** - Modern icon library
- **Byzantine Modern Design System** - Custom design tokens

### Storage & Persistence
- **AsyncStorage** - Local data persistence
- Offline sermon downloads

### Notifications
- **Expo Notifications** - Push notifications support
- Local notifications for downloads and updates

### Development Tools
- **Expo Dev Client** - Custom development builds
- **TypeScript** - Full type safety
- **EAS Build** - Cloud build service
- **Metro Bundler** - Fast bundler for React Native

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Expo CLI** (installed automatically)
- **iOS Simulator** (macOS only) or **Android Studio** (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd predicile-parintelui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

### Running the App

#### Development Mode
```bash
npm start          # Start Expo dev server (choose platform from menu)
npm run dev        # Start with dev client
```

#### Platform Specific
```bash
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS simulator (macOS only)
npm run web        # Run in web browser
```

#### Type Checking
```bash
npm run type-check # Check TypeScript types
```

#### Building for Production
```bash
npm run build:android    # Build Android app (requires EAS)
npm run build:ios        # Build iOS app (requires EAS)
npm run build:web        # Build web version (static export)
npm run build:all        # Build for all platforms
```

#### Preview Builds
```bash
npm run preview:android  # Create Android preview build
npm run preview:ios      # Create iOS preview build
```

---

## 📁 Project Structure

```
predicile-parintelui/
├── app/                          # Application screens (Expo Router)
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── index.tsx            # Home/Sermons screen
│   │   ├── library.tsx          # Downloaded sermons
│   │   └── settings.tsx         # Settings screen
│   ├── _layout.tsx              # Root layout
│   └── +not-found.tsx           # 404 screen
│
├── assets/                       # Static assets
│   ├── images/                  # Icons, splash screens
│   │   ├── icon.png            # App icon (1024x1024)
│   │   ├── adaptive-icon.png   # Android adaptive icon
│   │   ├── splash-icon.png     # Splash screen
│   │   ├── favicon.png         # Web favicon
│   │   └── notification-icon.png # Notification icon
│   └── sounds/                  # Audio files
│       └── notification.wav    # Notification sound
│
├── components/                   # Reusable components
│   ├── AudioPlayer.tsx          # Main audio player component
│   ├── Themed.tsx               # Theme-aware components
│   └── useColorScheme.ts        # Color scheme hook
│
├── constants/                    # App constants
│   ├── Colors.ts                # Color definitions
│   └── Theme.ts                 # Byzantine Modern Design System
│
├── data/                         # Data files
│   └── sermons.json             # Sermon metadata
│
├── utils/                        # Utility functions
│   ├── storage.ts               # AsyncStorage helpers
│   ├── audio.ts                 # Audio utilities
│   └── notifications.ts         # Notification helpers
│
├── app.json                      # Expo configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js           # Tailwind/NativeWind config
├── babel.config.js              # Babel configuration
├── global.css                    # Global Tailwind styles
└── README.md                     # This file
```

---

## 🎨 Byzantine Modern Design System

The application uses a custom design system inspired by Byzantine iconography and Orthodox liturgical tradition. The design combines rich, sacred colors with modern UI/UX principles.

### Color Palette

- **Primary (Deep Burgundy)**: `#8B1E3F` - Headers, buttons, emphasis
- **Accent (Antique Gold)**: `#D4AF37` - Progress bars, icons, highlights
- **Background**: `#F0F4F8` - Clean, peaceful app background
- **Text (Dark Walnut)**: `#4B3621` - Readable, warm text color

### Typography

- **Headers**: Serif fonts (Georgia) for liturgical feel
- **Body Text**: Sans-serif fonts for modern readability
- **Scales**: Responsive text sizing from 12px to 32px

### Design Principles

1. **Reverence** - Design that honors the sacred content
2. **Clarity** - Clean, accessible, easy to navigate
3. **Beauty** - Aesthetically pleasing with liturgical colors
4. **Functionality** - Modern UX patterns for excellent usability

For complete design tokens and usage guidelines, see:
- `C:\Users\Light\OneDrive\01-Proiecte-Main\2026-01-31_SemonsApp\predicile-parintelui\constants\Theme.ts`

---

## 🌐 Progressive Web App (PWA)

The application is configured as a Progressive Web App for the web platform:

- **Installable** - Add to home screen on mobile devices
- **Offline Support** - Service worker for offline functionality
- **App-like Experience** - Standalone display mode
- **Optimized Performance** - Fast loading and smooth interactions

---

## 📱 Platform Support

| Platform | Status | Features |
|----------|--------|----------|
| iOS | ✅ Full Support | Background audio, notifications, offline |
| Android | ✅ Full Support | Background audio, notifications, offline |
| Web (PWA) | ✅ Full Support | Audio streaming, offline (PWA), responsive |
| Tablet (iOS/Android) | ✅ Optimized | Responsive layout for larger screens |

---

## 🔐 Permissions

### iOS
- **Background Audio** - Required for continuous playback
- No microphone or camera access required

### Android
- **Internet** - Required for streaming sermons
- **Wake Lock** - Keep screen on during playback
- **Vibrate** - Notification vibration
- **Boot Completed** - Restore download queue after restart

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Orthodox Christian Community** - For inspiring this project
- **Byzantine Iconographers** - For the beautiful visual tradition
- **Expo Team** - For the excellent development platform
- **React Native Community** - For the amazing ecosystem

---

## 📞 Support

For issues, questions, or suggestions:

- **GitHub Issues**: [Create an issue](https://github.com/your-repo/predicile-parintelui/issues)
- **Email**: support@predicileparintelui.app

---

## 🗺 Roadmap

- [ ] Multi-language support (English, Greek, Slavonic)
- [ ] Podcast RSS feed integration
- [ ] Playlist creation and management
- [ ] Social sharing features
- [ ] Sleep timer functionality
- [ ] Playback speed control
- [ ] Search and filtering improvements
- [ ] Cloud sync across devices
- [ ] Community features (comments, ratings)

---

**Made with ❤️ and ☦️ for the Orthodox Christian community**

*Să ne rugăm împreună - Let us pray together*
