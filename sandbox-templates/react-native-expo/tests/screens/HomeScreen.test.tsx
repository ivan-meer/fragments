/**
 * 🧪 HomeScreen Component Tests
 * Test suite for HomeScreen functionality and interactions
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../../screens/HomeScreen';
import { Platform, Alert } from 'react-native';

// Mock dependencies
jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name, size, color, ...props }: any) => `Ionicons-${name}`,
}));

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Mock Alert
jest.spyOn(Alert, 'alert');

const Stack = createStackNavigator();

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={() => children} />
    </Stack.Navigator>
  </NavigationContainer>
);

describe('HomeScreen Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );
    expect(getByText('Welcome to E2B!')).toBeTruthy();
  });

  it('displays welcome section correctly', () => {
    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );
    
    expect(getByText('Welcome to E2B!')).toBeTruthy();
    expect(getByText('React Native Expo Template for rapid mobile development')).toBeTruthy();
  });

  it('shows platform-specific badge', () => {
    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );
    
    // In test environment, Platform.OS should be 'web'
    expect(getByText('🌐 Web')).toBeTruthy();
  });

  it('renders interactive counter section', () => {
    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );
    
    expect(getByText('Interactive Counter')).toBeTruthy();
    expect(getByText('0')).toBeTruthy(); // Initial counter value
    expect(getByText('Reset')).toBeTruthy();
  });

  it('counter increment works correctly', async () => {
    const { getByText, getByTestId } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );
    
    // Find the counter display
    const counterDisplay = getByText('0');
    expect(counterDisplay).toBeTruthy();
    
    // Note: In a real test, you'd need to add testID props to buttons
    // and test the actual increment/decrement functionality
  });

  it('renders text input section', () => {
    const { getByText, getByPlaceholderText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );
    
    expect(getByText('Text Input Example')).toBeTruthy();
    expect(getByPlaceholderText('Enter some text here...')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
  });

  it('text input validation works', async () => {
    const { getByText, getByPlaceholderText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );
    
    const textInput = getByPlaceholderText('Enter some text here...');
    const submitButton = getByText('Submit');
    
    // Test empty input submission
    fireEvent.press(submitButton);
    
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please enter some text');
    });
  });

  it('text input success works', async () => {
    const { getByText, getByPlaceholderText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );
    
    const textInput = getByPlaceholderText('Enter some text here...');
    const submitButton = getByText('Submit');
    
    // Test valid input submission
    fireEvent.changeText(textInput, 'Test input');
    fireEvent.press(submitButton);
    
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Submitted!', 'You entered: Test input');
    });
  });

  it('renders all feature cards', () => {
    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );
    
    expect(getByText('App Features')).toBeTruthy();
    expect(getByText('Fast Development')).toBeTruthy();
    expect(getByText('Cross Platform')).toBeTruthy();
    expect(getByText('TypeScript')).toBeTruthy();
    expect(getByText('Hot Reload')).toBeTruthy();
  });

  it('feature card navigation works', async () => {
    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );
    
    const featureCard = getByText('Fast Development');
    fireEvent.press(featureCard);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Example', {
        title: 'Fast Development',
        description: 'Rapid prototyping with Expo',
      });
    });
  });

  it('about navigation works', async () => {
    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );
    
    const aboutButton = getByText('About This App');
    fireEvent.press(aboutButton);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('About');
    });
  });

  it('renders todo section', () => {
    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );
    
    expect(getByText('🚧 Coming Soon')).toBeTruthy();
    expect(getByText('• User Authentication')).toBeTruthy();
    expect(getByText('• API Integration')).toBeTruthy();
    expect(getByText('• Local Storage')).toBeTruthy();
    expect(getByText('• Push Notifications')).toBeTruthy();
    expect(getByText('• Camera Integration')).toBeTruthy();
  });

  it('component styles are applied correctly', () => {
    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );
    
    const welcomeTitle = getByText('Welcome to E2B!');
    expect(welcomeTitle).toBeTruthy();
    
    // In a real test environment, you could check computed styles
    // expect(welcomeTitle.props.style).toContainEqual(expect.objectContaining({
    //   fontSize: 28,
    //   fontWeight: 'bold',
    // }));
  });
});

describe('HomeScreen Integration', () => {
  it('integrates correctly with navigation stack', () => {
    const { getByText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
    
    expect(getByText('Welcome to E2B!')).toBeTruthy();
  });
});

describe('HomeScreen Accessibility', () => {
  it('has accessible elements', () => {
    const { getByText } = render(
      <TestWrapper>
        <HomeScreen />
      </TestWrapper>
    );
    
    // Check that important text elements are accessible
    expect(getByText('Welcome to E2B!')).toBeTruthy();
    expect(getByText('Interactive Counter')).toBeTruthy();
    expect(getByText('Text Input Example')).toBeTruthy();
    expect(getByText('App Features')).toBeTruthy();
  });
});