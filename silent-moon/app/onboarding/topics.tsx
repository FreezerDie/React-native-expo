import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { useApp } from '@/contexts/AppContext';

const TOPICS = [
  { id: 'stress', title: 'Reduce Stress', emoji: '😌', description: 'Find calm in the chaos' },
  { id: 'performance', title: 'Improve Performance', emoji: '💪', description: 'Boost focus and productivity' },
  { id: 'happiness', title: 'Increase Happiness', emoji: '😊', description: 'Cultivate joy and positivity' },
  { id: 'anxiety', title: 'Reduce Anxiety', emoji: '🧘‍♀️', description: 'Manage worry and fear' },
  { id: 'growth', title: 'Personal Growth', emoji: '🌱', description: 'Develop self-awareness' },
  { id: 'sleep', title: 'Better Sleep', emoji: '🌙', description: 'Rest deeply and wake refreshed' },
];

export default function TopicsScreen() {
  const { state, dispatch } = useApp();
  const [selectedTopics, setSelectedTopics] = useState<string[]>(state.userPreferences.selectedTopics);

  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleContinue = () => {
    if (selectedTopics.length === 0) {
      return;
    }
    // Save selected topics to context
    dispatch({
      type: 'SET_USER_PREFERENCES',
      payload: { selectedTopics }
    });
    router.push('/onboarding/time-preferences');
  };

  const isSelected = (topicId: string) => selectedTopics.includes(topicId);

  return (
    <LinearGradient
      colors={['#8B5CF6', '#A855F7', '#C084FC']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>
            What Brings You to Silent Moon?
          </Text>
          <Text style={styles.subtitle}>
            Choose the areas you&apos;d like to focus on. You can select multiple options.
          </Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.topicsGrid}
          showsVerticalScrollIndicator={false}
        >
          {TOPICS.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={[
                styles.topicCard,
                isSelected(topic.id) && styles.topicCardSelected,
              ]}
              onPress={() => toggleTopic(topic.id)}
            >
              <Text style={styles.topicEmoji}>{topic.emoji}</Text>
              <Text style={[
                styles.topicTitle,
                isSelected(topic.id) && styles.topicTitleSelected,
              ]}>
                {topic.title}
              </Text>
              <Text style={[
                styles.topicDescription,
                isSelected(topic.id) && styles.topicDescriptionSelected,
              ]}>
                {topic.description}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              selectedTopics.length === 0 && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={selectedTopics.length === 0}
          >
            <Text style={[
              styles.continueButtonText,
              selectedTopics.length === 0 && styles.continueButtonTextDisabled,
            ]}>
              Continue ({selectedTopics.length} selected)
            </Text>
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    textAlign: 'center',
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  topicsGrid: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  topicCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  topicCardSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: '#FFFFFF',
  },
  topicEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  topicTitleSelected: {
    color: '#FFFFFF',
  },
  topicDescription: {
    fontSize: 14,
    color: '#E0E7FF',
    textAlign: 'center',
    lineHeight: 20,
  },
  topicDescriptionSelected: {
    color: '#FFFFFF',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  continueButtonTextDisabled: {
    color: 'rgba(139, 92, 246, 0.5)',
  },
});
