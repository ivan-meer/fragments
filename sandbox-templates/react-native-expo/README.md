# 📱 React Native Expo Template for E2B

A comprehensive cross-platform mobile development template using React Native, Expo, and TypeScript. Perfect for rapid prototyping and full-featured mobile applications.

## 🚀 Features

- **Cross-Platform**: Runs on iOS, Android, and Web
- **TypeScript**: Full type safety and IntelliSense
- **Modern Navigation**: React Navigation v6 with stack navigation
- **Rich UI Components**: Pre-built components with consistent styling
- **Hot Reload**: Instant updates during development
- **Testing Suite**: Jest and React Native Testing Library
- **E2B Integration**: Seamless sandbox environment deployment

## 📦 Tech Stack

- **Framework**: React Native 0.72.6
- **Development Platform**: Expo SDK ~49.0.15
- **Language**: TypeScript 5.1.3
- **Navigation**: React Navigation 6.1.7
- **Icons**: Expo Vector Icons
- **Testing**: Jest + React Native Testing Library
- **Build Tool**: Expo CLI

## 🛠 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platforms
npm run web      # Web browser
npm run android  # Android device/emulator
npm run ios      # iOS device/simulator
```

### Development Commands

```bash
npm start        # Start Expo development server
npm run build    # Build production version
npm test         # Run test suite
npm run lint     # Run ESLint
npm run type-check # TypeScript type checking
```

## 📱 App Structure

```
/
├── App.tsx                 # Main app component with navigation
├── screens/               # Screen components
│   ├── HomeScreen.tsx     # Main home screen
│   ├── AboutScreen.tsx    # App information
│   └── ExampleScreen.tsx  # Feature demonstrations
├── tests/                 # Test files
│   ├── setup.ts          # Test configuration
│   ├── App.test.tsx      # App component tests
│   └── screens/          # Screen component tests
├── package.json          # Dependencies and scripts
├── e2b.toml             # E2B sandbox configuration
├── e2b.Dockerfile       # Container setup
└── jest.config.js       # Testing configuration
```

## 🎯 Key Components

### HomeScreen
- Interactive counter with increment/decrement
- Text input with validation
- Feature showcase cards
- Platform detection badge
- Navigation to other screens

### AboutScreen
- App information and version details
- Technology stack overview
- External documentation links
- Device information display
- Feature highlights grid

### ExampleScreen
- Dynamic parameter display from navigation
- Interactive controls (sliders, switches)
- Animation demonstrations
- Modal component example
- Dark mode toggle
- Live statistics display

## 🧪 Testing

The template includes a comprehensive testing setup:

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Test Coverage
- Component rendering tests
- User interaction testing
- Navigation flow testing
- Platform-specific behavior
- Accessibility testing

## 🌍 Platform Support

### Web
- Responsive design for desktop and mobile browsers
- Hot reload for instant development feedback
- Full feature parity with mobile platforms

### iOS
- Native iOS components and styling
- Platform-specific optimizations
- Gesture handling and animations

### Android
- Material Design components
- Android-specific features
- Performance optimizations

## 🔧 Configuration

### E2B Sandbox
The template is pre-configured for E2B deployment:

- **CPU**: 2 cores
- **Memory**: 3GB (optimized for mobile compilation)
- **Ports**: 19000 (Expo), 19001 (Expo), 8081 (Metro)
- **Health Check**: Automatic Expo server monitoring

### Environment Variables
Configure in your E2B environment:

```bash
EXPO_PUBLIC_API_URL=your_api_url
EXPO_PUBLIC_ENVIRONMENT=development
```

## 📚 Learning Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Guide](https://reactnavigation.org/docs/getting-started)
- [TypeScript for React Native](https://reactnative.dev/docs/typescript)
- [E2B Documentation](https://e2b.dev/docs)

## 🛡 Best Practices

### Code Organization
- Separate screens into individual components
- Use TypeScript for type safety
- Follow React Navigation patterns
- Implement proper error boundaries

### Performance
- Optimize images and assets
- Use FlatList for large datasets
- Implement lazy loading where appropriate
- Monitor bundle size

### Testing
- Write tests for critical user flows
- Test platform-specific behavior
- Include accessibility testing
- Maintain high test coverage

## 🚧 Development Roadmap

### Phase 1: Foundation ✅
- [x] Basic navigation setup
- [x] Core screen components
- [x] TypeScript integration
- [x] Testing framework

### Phase 2: Features (Planned)
- [ ] User authentication
- [ ] API integration
- [ ] Local storage
- [ ] Push notifications
- [ ] Camera integration
- [ ] Offline support

### Phase 3: Advanced (Future)
- [ ] Redux/Context state management
- [ ] Animation library integration
- [ ] Native module integration
- [ ] Performance monitoring
- [ ] Crash reporting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- [E2B Community](https://github.com/e2b-dev/e2b)
- [React Native Community](https://reactnative.dev/community/overview)
- [Expo Forums](https://forums.expo.dev/)

---

Built with ❤️ using E2B Fragments for rapid mobile development.