/**
 * 📱 Home Screen Component
 * Main landing screen with app features and navigation
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackParamList } from '../App';
import type { StackNavigationProp } from '@react-navigation/stack';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [inputText, setInputText] = useState('');
  const [counter, setCounter] = useState(0);

  // Example features array
  const features = [
    {
      icon: 'rocket-outline',
      title: 'Fast Development',
      description: 'Rapid prototyping with Expo',
      color: '#FF6B6B',
    },
    {
      icon: 'phone-portrait-outline',
      title: 'Cross Platform',
      description: 'iOS, Android, and Web',
      color: '#4ECDC4',
    },
    {
      icon: 'code-outline',
      title: 'TypeScript',
      description: 'Type-safe development',
      color: '#45B7D1',
    },
    {
      icon: 'refresh-outline',
      title: 'Hot Reload',
      description: 'Instant updates',
      color: '#96CEB4',
    },
  ];

  const handleFeaturePress = (feature: any) => {
    navigation.navigate('Example', {
      title: feature.title,
      description: feature.description,
    });
  };

  const handleTextSubmit = () => {
    if (inputText.trim()) {
      Alert.alert('Submitted!', `You entered: ${inputText}`);
      setInputText('');
    } else {
      Alert.alert('Error', 'Please enter some text');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome to E2B!</Text>
        <Text style={styles.welcomeSubtitle}>
          React Native Expo Template for rapid mobile development
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {Platform.OS === 'web' ? '🌐 Web' : Platform.OS === 'ios' ? '📱 iOS' : '🤖 Android'}
          </Text>
        </View>
      </View>

      {/* Interactive Counter */}
      <View style={styles.counterSection}>
        <Text style={styles.counterTitle}>Interactive Counter</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={[styles.counterButton, styles.decrementButton]}
            onPress={() => setCounter(counter - 1)}
          >
            <Ionicons name="remove" size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.counterDisplay}>
            <Text style={styles.counterText}>{counter}</Text>
          </View>
          
          <TouchableOpacity
            style={[styles.counterButton, styles.incrementButton]}
            onPress={() => setCounter(counter + 1)}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setCounter(0)}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Text Input Section */}
      <View style={styles.inputSection}>
        <Text style={styles.inputTitle}>Text Input Example</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter some text here..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          numberOfLines={3}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleTextSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Features Grid */}
      <View style={styles.featuresSection}>
        <Text style={styles.featuresTitle}>App Features</Text>
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.featureCard, { borderLeftColor: feature.color }]}
              onPress={() => handleFeaturePress(feature)}
            >
              <Ionicons
                name={feature.icon as any}
                size={32}
                color={feature.color}
                style={styles.featureIcon}
              />
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Navigation Section */}
      <View style={styles.navigationSection}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('About')}
        >
          <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
          <Text style={styles.navButtonText}>About This App</Text>
        </TouchableOpacity>
      </View>

      {/* TODO Section */}
      <View style={styles.todoSection}>
        <Text style={styles.todoTitle}>🚧 Coming Soon</Text>
        <View style={styles.todoList}>
          <Text style={styles.todoItem}>• User Authentication</Text>
          <Text style={styles.todoItem}>• API Integration</Text>
          <Text style={styles.todoItem}>• Local Storage</Text>
          <Text style={styles.todoItem}>• Push Notifications</Text>
          <Text style={styles.todoItem}>• Camera Integration</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 20,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 15,
  },
  badge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  badgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  counterSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  counterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  counterButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decrementButton: {
    backgroundColor: '#FF6B6B',
  },
  incrementButton: {
    backgroundColor: '#4ECDC4',
  },
  counterDisplay: {
    marginHorizontal: 30,
    minWidth: 60,
    alignItems: 'center',
  },
  counterText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#95A5A6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  inputSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  featuresSection: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    width: (width - 60) / 2,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureIcon: {
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  navigationSection: {
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 12,
  },
  todoSection: {
    backgroundColor: '#FFF3CD',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FFEAA7',
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#856404',
    marginBottom: 10,
  },
  todoList: {
    paddingLeft: 10,
  },
  todoItem: {
    fontSize: 14,
    color: '#856404',
    marginBottom: 5,
    lineHeight: 20,
  },
});