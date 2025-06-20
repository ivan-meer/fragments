/**
 * ℹ️ About Screen Component
 * Information about the app, E2B, and React Native Expo features
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const APP_VERSION = '1.0.0';
const EXPO_VERSION = '~49.0.15';
const REACT_NATIVE_VERSION = '0.72.6';

export function AboutScreen() {
  const navigation = useNavigation();

  // External links
  const links = [
    {
      title: 'E2B Documentation',
      url: 'https://e2b.dev/docs',
      icon: 'book-outline',
      color: '#007AFF',
    },
    {
      title: 'React Native Docs',
      url: 'https://reactnative.dev/docs/getting-started',
      icon: 'phone-portrait-outline',
      color: '#61DAFB',
    },
    {
      title: 'Expo Documentation',
      url: 'https://docs.expo.dev/',
      icon: 'rocket-outline',
      color: '#000020',
    },
    {
      title: 'TypeScript Guide',
      url: 'https://www.typescriptlang.org/docs/',
      icon: 'code-outline',
      color: '#3178C6',
    },
  ];

  // App features
  const features = [
    {
      icon: 'checkmark-circle',
      title: 'Cross-Platform',
      description: 'Works on iOS, Android, and Web',
      color: '#4CAF50',
    },
    {
      icon: 'flash',
      title: 'Hot Reload',
      description: 'Instant updates during development',
      color: '#FF9800',
    },
    {
      icon: 'shield-checkmark',
      title: 'Type Safety',
      description: 'TypeScript for better code quality',
      color: '#2196F3',
    },
    {
      icon: 'layers',
      title: 'Component Library',
      description: 'Rich UI components out of the box',
      color: '#9C27B0',
    },
    {
      icon: 'construct',
      title: 'Easy Deployment',
      description: 'Deploy to stores with Expo Build',
      color: '#FF5722',
    },
    {
      icon: 'analytics',
      title: 'Performance',
      description: 'Optimized for smooth animations',
      color: '#607D8B',
    },
  ];

  const handleLinkPress = async (url: string, title: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `Cannot open ${title}`);
      }
    } catch (error) {
      Alert.alert('Error', `Failed to open ${title}`);
    }
  };

  const handleDeviceInfo = () => {
    const deviceInfo = `
Platform: ${Platform.OS}
Version: ${Platform.Version}
${Platform.OS === 'ios' ? `Model: ${Platform.constants.systemName}` : ''}
    `.trim();
    
    Alert.alert('Device Information', deviceInfo);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.logoContainer}>
          <Ionicons name="phone-portrait" size={64} color="#007AFF" />
        </View>
        <Text style={styles.appTitle}>E2B React Native Expo</Text>
        <Text style={styles.appSubtitle}>Cross-Platform Mobile Development Template</Text>
        <View style={styles.versionBadge}>
          <Text style={styles.versionText}>v{APP_VERSION}</Text>
        </View>
      </View>

      {/* Description Section */}
      <View style={styles.descriptionSection}>
        <Text style={styles.descriptionTitle}>About This Template</Text>
        <Text style={styles.descriptionText}>
          This React Native Expo template provides a complete foundation for building 
          cross-platform mobile applications. It includes TypeScript support, navigation, 
          UI components, and integration with E2B's sandbox environment for rapid development 
          and testing.
        </Text>
      </View>

      {/* Features Grid */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Key Features</Text>
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View key={index} style={[styles.featureCard, { borderLeftColor: feature.color }]}>
              <Ionicons
                name={feature.icon as any}
                size={24}
                color={feature.color}
                style={styles.featureIcon}
              />
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tech Stack */}
      <View style={styles.techSection}>
        <Text style={styles.sectionTitle}>Technology Stack</Text>
        <View style={styles.techGrid}>
          <View style={styles.techItem}>
            <Text style={styles.techLabel}>React Native</Text>
            <Text style={styles.techVersion}>{REACT_NATIVE_VERSION}</Text>
          </View>
          <View style={styles.techItem}>
            <Text style={styles.techLabel}>Expo SDK</Text>
            <Text style={styles.techVersion}>{EXPO_VERSION}</Text>
          </View>
          <View style={styles.techItem}>
            <Text style={styles.techLabel}>TypeScript</Text>
            <Text style={styles.techVersion}>5.1.3</Text>
          </View>
          <View style={styles.techItem}>
            <Text style={styles.techLabel}>Navigation</Text>
            <Text style={styles.techVersion}>6.1.7</Text>
          </View>
        </View>
      </View>

      {/* Useful Links */}
      <View style={styles.linksSection}>
        <Text style={styles.sectionTitle}>Useful Links</Text>
        {links.map((link, index) => (
          <TouchableOpacity
            key={index}
            style={styles.linkItem}
            onPress={() => handleLinkPress(link.url, link.title)}
          >
            <Ionicons name={link.icon as any} size={24} color={link.color} />
            <Text style={styles.linkText}>{link.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Device Info */}
      <View style={styles.deviceSection}>
        <TouchableOpacity style={styles.deviceButton} onPress={handleDeviceInfo}>
          <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
          <Text style={styles.deviceButtonText}>Device Information</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footerSection}>
        <Text style={styles.footerText}>
          Built with ❤️ using E2B Fragments
        </Text>
        <Text style={styles.footerSubtext}>
          Open source template for rapid mobile development
        </Text>
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
  headerSection: {
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  versionBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  versionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  descriptionSection: {
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
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featuresSection: {
    marginBottom: 20,
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
    width: '48%',
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
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  techSection: {
    marginBottom: 20,
  },
  techGrid: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  techItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  techLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  techVersion: {
    fontSize: 14,
    color: '#666',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  linksSection: {
    marginBottom: 20,
  },
  linkItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    fontWeight: '500',
  },
  deviceSection: {
    marginBottom: 20,
  },
  deviceButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  deviceButtonText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 10,
    fontWeight: '600',
  },
  footerSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#666',
  },
});