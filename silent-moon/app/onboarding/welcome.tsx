import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useApp } from '../../contexts/AppContext';

export default function WelcomeScreen() {
  const { state } = useApp();
  const userName = state.auth.currentUser?.name || 'User';

  const handleGetStarted = () => {
    router.push('/onboarding/topics');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/oboardingbg.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              Hi {userName}, Welcome{'\n'}to Silent Moon
            </Text>
            <Text style={styles.subtitle}>
              Explore the app, Find some peace of mind to prepare for meditation.
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  header: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 64,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 48,
  },
  feature: {
    alignItems: 'center',
    width: '45%',
    marginBottom: 24,
  },
  featureEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#8B5CF6',
    fontSize: 18,
    fontWeight: '600',
  },
});
