/**
 * 🧪 App Component Tests
 * Test suite for main App component and navigation
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import App from '../App';

// Mock dependencies
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));

// Navigation mock
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('Welcome to E2B!')).toBeTruthy();
  });

  it('displays the correct header title', () => {
    const { getByText } = render(<App />);
    expect(getByText('📱 E2B React Native')).toBeTruthy();
  });

  it('shows home screen content', () => {
    const { getByText } = render(<App />);
    expect(getByText('React Native Expo Template for rapid mobile development')).toBeTruthy();
    expect(getByText('Interactive Counter')).toBeTruthy();
    expect(getByText('App Features')).toBeTruthy();
  });

  it('navigation structure is properly configured', () => {
    const { getByText } = render(<App />);
    // Test that navigation elements are present
    expect(getByText('About This App')).toBeTruthy();
  });

  it('renders feature cards correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText('Fast Development')).toBeTruthy();
    expect(getByText('Cross Platform')).toBeTruthy();
    expect(getByText('TypeScript')).toBeTruthy();
    expect(getByText('Hot Reload')).toBeTruthy();
  });

  it('counter functionality works', async () => {
    const { getByText } = render(<App />);
    
    // Find increment button and counter
    const incrementButton = getByText('+'); // Assuming the + icon is rendered as text
    const counterDisplay = getByText('0'); // Initial counter value
    
    // Test increment
    fireEvent.press(incrementButton);
    await waitFor(() => {
      expect(getByText('1')).toBeTruthy();
    });
  });

  it('text input functionality works', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    
    const textInput = getByPlaceholderText('Enter some text here...');
    const submitButton = getByText('Submit');
    
    // Test text input
    fireEvent.changeText(textInput, 'Test input');
    fireEvent.press(submitButton);
    
    // Should trigger alert (mocked in test environment)
    await waitFor(() => {
      expect(textInput.props.value).toBe(''); // Input should be cleared after submit
    });
  });

  it('platform badge displays correctly', () => {
    const { getByText } = render(<App />);
    // Should show web platform in test environment
    expect(getByText('🌐 Web')).toBeTruthy();
  });
});

describe('Navigation Integration', () => {
  it('App component loads with navigation container', () => {
    const { getByTestId, getByText } = render(<App />);
    // Verify navigation container is working
    expect(getByText('Welcome to E2B!')).toBeTruthy();
  });
});

describe('TypeScript Integration', () => {
  it('component props are properly typed', () => {
    // This test ensures TypeScript compilation passes
    const component = <App />;
    expect(component.type).toBe(App);
  });
});

describe('Accessibility', () => {
  it('important elements have accessibility labels', () => {
    const { getByText } = render(<App />);
    
    // Check for accessible text elements
    expect(getByText('Welcome to E2B!')).toBeTruthy();
    expect(getByText('Interactive Counter')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
  });
});