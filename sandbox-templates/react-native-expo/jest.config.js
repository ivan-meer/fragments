/**
 * 🧪 Jest Configuration for React Native Expo Template
 * Testing setup with React Native and Expo support
 */

module.exports = {
  preset: 'jest-expo',
  
  // Test environment
  testEnvironment: 'jsdom',
  
  // Setup files
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup.ts',
  ],
  
  // Module file extensions
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
  ],
  
  // Transform configuration
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  
  // Module name mapping for assets and aliases
  moduleNameMapping: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  
  // Test match patterns
  testMatch: [
    '<rootDir>/tests/**/__tests__/**/*.(ts|tsx|js)',
    '<rootDir>/tests/**/?(*.)(spec|test).(ts|tsx|js)',
    '<rootDir>/**/__tests__/**/*.(ts|tsx|js)',
    '<rootDir>/**/?(*.)(spec|test).(ts|tsx|js)',
  ],
  
  // Test path ignore patterns
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.expo/',
    '<rootDir>/dist/',
  ],
  
  // Coverage configuration
  collectCoverageFrom: [
    'screens/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'App.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.expo/**',
  ],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  
  // Coverage reporters
  coverageReporters: [
    'text',
    'lcov',
    'html',
  ],
  
  // Verbose output
  verbose: true,
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Mock platform modules
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@expo|expo-.*)',
  ],
};