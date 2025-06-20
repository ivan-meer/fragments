/**
 * 📱 React Native Expo Template - Main App Component
 * Cross-platform mobile application with navigation and TypeScript
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// TODO: Import custom components and screens
import { HomeScreen } from './screens/HomeScreen';
import { AboutScreen } from './screens/AboutScreen';
import { ExampleScreen } from './screens/ExampleScreen';

// Navigation stack setup
const Stack = createStackNavigator();

// Type definitions for navigation
export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Example: { title: string; description: string };
};

// Main App component with navigation
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '📱 E2B React Native',
            headerRight: () => (
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => Alert.alert('Info', 'E2B React Native Expo Template')}
              >
                <Ionicons name="information-circle" size={24} color="white" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: 'About' }}
        />
        <Stack.Screen
          name="Example"
          component={ExampleScreen}
          options={({ route }) => ({ 
            title: route.params?.title || 'Example' 
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 15,
    padding: 5,
  },
});

// TODO: Add Redux/Context for state management
// TODO: Add authentication flow
// TODO: Add API integration
// TODO: Add offline storage
// TODO: Add push notifications