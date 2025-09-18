import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    router.push('/onboarding/topics');
  };

  return (
    <LinearGradient
      colors={['#8B5CF6', '#A855F7', '#C084FC']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.emoji}>🧘‍♀️</Text>
            <Text style={styles.title}>
              Welcome to Silent Moon
            </Text>
            <Text style={styles.subtitle}>
              Your journey to inner peace begins here. Let&apos;s personalize your experience to help you achieve your mindfulness goals.
            </Text>
          </View>

          <View style={styles.features}>
            <View style={styles.feature}>
              <Text style={styles.featureEmoji}>🌅</Text>
              <Text style={styles.featureText}>Daily Meditation</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureEmoji}>🌙</Text>
              <Text style={styles.featureText}>Sleep Stories</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureEmoji}>🎵</Text>
              <Text style={styles.featureText}>Relaxing Music</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureEmoji}>📈</Text>
              <Text style={styles.featureText}>Progress Tracking</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
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
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
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
    borderRadius: 12,
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
