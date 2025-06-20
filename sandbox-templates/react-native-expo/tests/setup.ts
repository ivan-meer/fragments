/**
 * 🧪 Jest Test Setup
 * Global test configuration and mocks for React Native Expo
 */

import '@testing-library/jest-native/extend-expect';

// Mock React Native components and APIs
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  
  // Mock platform
  RN.Platform.OS = 'web';
  RN.Platform.Version = 'test';
  RN.Platform.constants = {
    systemName: 'Test Environment',
  };
  
  // Mock Dimensions
  RN.Dimensions.get = jest.fn((dimension: string) => {
    if (dimension === 'window') {
      return { width: 375, height: 667 };
    }
    return { width: 375, height: 667 };
  });
  
  // Mock Alert
  RN.Alert.alert = jest.fn();
  
  // Mock Linking
  RN.Linking.canOpenURL = jest.fn(() => Promise.resolve(true));
  RN.Linking.openURL = jest.fn(() => Promise.resolve());
  
  return RN;
});

// Mock Expo modules
jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name, size, color, ...props }: any) => {
    const React = require('react');
    return React.createElement('Text', props, `Ionicons-${name}`);
  },
}));

jest.mock('expo-constants', () => ({
  default: {
    statusBarHeight: 20,
    deviceName: 'Test Device',
    platform: {
      ios: undefined,
      android: undefined,
      web: {
        ua: 'test-user-agent',
      },
    },
  },
}));

jest.mock('expo-linking', () => ({
  makeUrl: jest.fn((path: string) => `exp://test.com${path}`),
  parse: jest.fn((url: string) => ({ path: url })),
}));

// Mock React Navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      dispatch: jest.fn(),
      setOptions: jest.fn(),
      canGoBack: jest.fn(() => true),
    }),
    useRoute: () => ({
      params: {},
      name: 'Test',
      key: 'test-key',
    }),
    useFocusEffect: jest.fn(),
    useIsFocused: jest.fn(() => true),
  };
});

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(() => ({
    Navigator: ({ children }: any) => children,
    Screen: ({ children }: any) => children,
  })),
}));

// Mock Animated
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock async storage (if used)
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

// Mock gesture handler
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(),
    Directions: {},
  };
});

// Mock safe area context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: any) => children,
  SafeAreaView: ({ children }: any) => children,
  useSafeAreaInsets: jest.fn(() => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  })),
}));

// Mock reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Global test timeout
jest.setTimeout(10000);

// Suppress console warnings in tests
const originalWarn = console.warn;
console.warn = (...args: any[]) => {
  if (
    args[0] &&
    (args[0].includes('ReactNativeFiberHostComponent') ||
     args[0].includes('Warning: React.createElement') ||
     args[0].includes('Warning: Failed prop type'))
  ) {
    return;
  }
  originalWarn(...args);
};

// Mock performance.now for animations
global.performance = global.performance || {
  now: jest.fn(() => Date.now()),
  mark: jest.fn(),
  measure: jest.fn(),
  clearMarks: jest.fn(),
  clearMeasures: jest.fn(),
};

// Setup fetch mock for API tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    headers: new Map(),
  } as Response)
);