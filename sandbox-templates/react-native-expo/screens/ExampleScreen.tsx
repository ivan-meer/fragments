/**
 * 🚀 Example Screen Component
 * Demonstrates various React Native features and components
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
  Switch,
  Slider,
  ActivityIndicator,
  Modal,
  Platform,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../App';

type ExampleScreenRouteProp = RouteProp<RootStackParamList, 'Example'>;

export function ExampleScreen() {
  const route = useRoute<ExampleScreenRouteProp>();
  const navigation = useNavigation();
  
  // Animation and state
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [modalVisible, setModalVisible] = useState(false);
  const [counter, setCounter] = useState(0);

  // Get params from navigation
  const { title = 'Example', description = 'Feature demonstration' } = route.params || {};

  // Animation effect on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Auto counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Example functions
  const handleLoadingDemo = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success!', 'Async operation completed');
    }, 2000);
  };

  const handleAnimationDemo = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePlatformAlert = () => {
    if (Platform.OS === 'web') {
      Alert.alert('Platform Info', 'Running on Web Browser');
    } else if (Platform.OS === 'ios') {
      Alert.alert('Platform Info', 'Running on iOS Device');
    } else {
      Alert.alert('Platform Info', 'Running on Android Device');
    }
  };

  const handleModalToggle = () => {
    setModalVisible(!modalVisible);
  };

  // Color scheme based on dark mode
  const colors = {
    background: isDarkMode ? '#1a1a1a' : '#f8f9fa',
    card: isDarkMode ? '#333' : 'white',
    text: isDarkMode ? '#fff' : '#333',
    subtext: isDarkMode ? '#ccc' : '#666',
    border: isDarkMode ? '#555' : '#ddd',
  };

  const dynamicStyles = {
    container: { backgroundColor: colors.background },
    card: { backgroundColor: colors.card },
    text: { color: colors.text },
    subtext: { color: colors.subtext },
  };

  return (
    <ScrollView style={[styles.container, dynamicStyles.container]}>
      <Animated.View 
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Header Section */}
        <View style={[styles.headerSection, dynamicStyles.card]}>
          <Ionicons name="flask" size={48} color="#007AFF" />
          <Text style={[styles.headerTitle, dynamicStyles.text]}>{title}</Text>
          <Text style={[styles.headerDescription, dynamicStyles.subtext]}>
            {description}
          </Text>
        </View>

        {/* Interactive Controls */}
        <View style={[styles.controlsSection, dynamicStyles.card]}>
          <Text style={[styles.sectionTitle, dynamicStyles.text]}>Interactive Controls</Text>
          
          {/* Dark Mode Switch */}
          <View style={styles.controlRow}>
            <Text style={[styles.controlLabel, dynamicStyles.text]}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: '#767577', true: '#007AFF' }}
              thumbColor={isDarkMode ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>

          {/* Slider Control */}
          <View style={styles.controlRow}>
            <Text style={[styles.controlLabel, dynamicStyles.text]}>
              Value: {Math.round(sliderValue)}
            </Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={sliderValue}
            onValueChange={setSliderValue}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor={colors.border}
            thumbStyle={{ backgroundColor: '#007AFF' }}
          />

          {/* Counter Display */}
          <View style={styles.counterDisplay}>
            <Text style={[styles.controlLabel, dynamicStyles.text]}>Auto Counter</Text>
            <Text style={[styles.counterText, dynamicStyles.text]}>{counter}</Text>
          </View>
        </View>

        {/* Animation Demo */}
        <View style={[styles.animationSection, dynamicStyles.card]}>
          <Text style={[styles.sectionTitle, dynamicStyles.text]}>Animation Demo</Text>
          <TouchableOpacity
            style={styles.animationButton}
            onPress={handleAnimationDemo}
          >
            <Ionicons name="play-circle" size={32} color="#4ECDC4" />
            <Text style={styles.animationButtonText}>Trigger Animation</Text>
          </TouchableOpacity>
        </View>

        {/* Async Operation Demo */}
        <View style={[styles.asyncSection, dynamicStyles.card]}>
          <Text style={[styles.sectionTitle, dynamicStyles.text]}>Async Operations</Text>
          <TouchableOpacity
            style={[styles.loadingButton, isLoading && styles.loadingButtonDisabled]}
            onPress={handleLoadingDemo}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Ionicons name="cloud-download" size={24} color="white" />
            )}
            <Text style={styles.loadingButtonText}>
              {isLoading ? 'Loading...' : 'Start Async Task'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Platform Features */}
        <View style={[styles.platformSection, dynamicStyles.card]}>
          <Text style={[styles.sectionTitle, dynamicStyles.text]}>Platform Features</Text>
          
          <TouchableOpacity style={styles.platformButton} onPress={handlePlatformAlert}>
            <Ionicons name="phone-portrait" size={24} color="#FF6B6B" />
            <Text style={styles.platformButtonText}>Platform Detection</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.platformButton} onPress={handleModalToggle}>
            <Ionicons name="layers" size={24} color="#96CEB4" />
            <Text style={styles.platformButtonText}>Show Modal</Text>
          </TouchableOpacity>
        </View>

        {/* Statistics */}
        <View style={[styles.statsSection, dynamicStyles.card]}>
          <Text style={[styles.sectionTitle, dynamicStyles.text]}>Live Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, dynamicStyles.text]}>{counter}</Text>
              <Text style={[styles.statLabel, dynamicStyles.subtext]}>Counter</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, dynamicStyles.text]}>{Math.round(sliderValue)}%</Text>
              <Text style={[styles.statLabel, dynamicStyles.subtext]}>Progress</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, dynamicStyles.text]}>{Platform.OS}</Text>
              <Text style={[styles.statLabel, dynamicStyles.subtext]}>Platform</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Modal Component */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalToggle}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, dynamicStyles.card]}>
            <Text style={[styles.modalTitle, dynamicStyles.text]}>Modal Example</Text>
            <Text style={[styles.modalText, dynamicStyles.subtext]}>
              This is a modal component demonstration. Modals are useful for 
              displaying content that requires user attention or input.
            </Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={handleModalToggle}
            >
              <Text style={styles.modalCloseText}>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  headerSection: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  headerDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  controlsSection: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 15,
  },
  counterDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  animationSection: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  animationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 10,
  },
  animationButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4ECDC4',
    marginLeft: 10,
  },
  asyncSection: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loadingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
  },
  loadingButtonDisabled: {
    backgroundColor: '#ccc',
  },
  loadingButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 10,
  },
  platformSection: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  platformButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  platformButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 15,
  },
  statsSection: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 12,
    elevation: 2,
  },
  modalCloseText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});