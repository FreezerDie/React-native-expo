import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { useApp } from '@/contexts/AppContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { TOPICS_DATA } from '@/data';
import { BorderRadius } from '@/constants/theme';
import BackNavigation from '@/components/BackNavigation';

export default function TopicsScreen() {
  const { state, dispatch } = useApp();
  const [selectedTopics, setSelectedTopics] = useState<string[]>(state.userPreferences.selectedTopics);

  // Theme colors
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textSecondaryColor = useThemeColor({}, 'textSecondary');
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');

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

  // Function to determine text color based on background contrast
  const getTextColor = (bgColor: string) => {
    // Convert hex to RGB
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return white for dark backgrounds, black for light backgrounds
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  // Create masonry layout with 2 columns
  const createMasonryLayout = (): (typeof TOPICS_DATA[0])[][] => {
    const columns: (typeof TOPICS_DATA[0])[][] = [[], []];
    const columnHeights = [0, 0];

    TOPICS_DATA.forEach((topic) => {
      const shorterColumn = columnHeights[0] <= columnHeights[1] ? 0 : 1;
      columns[shorterColumn].push(topic);
      columnHeights[shorterColumn] += topic.height;
    });

    return columns;
  };

  const masonryColumns = createMasonryLayout();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SafeAreaView style={styles.safeArea}>
        <BackNavigation />
        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]}>
            What Brings You to Silent Moon?
          </Text>
          <Text style={[styles.subtitle, { color: textSecondaryColor }]}>
            Choose the areas you&apos;d like to focus on. You can select multiple options.
          </Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.masonryContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.masonryColumns}>
            {masonryColumns.map((column, columnIndex) => (
              <View key={columnIndex} style={styles.masonryColumn}>
                {column.map((topic) => (
                  <TouchableOpacity
                    key={topic.id}
                    style={[
                      styles.topicCard,
                      { height: topic.height, backgroundColor: topic.color, borderColor },
                      isSelected(topic.id) && styles.topicCardSelected,
                    ]}
                    onPress={() => toggleTopic(topic.id)}
                  >
                    <Text style={[
                      styles.topicTitle,
                      { color: getTextColor(topic.color) },
                    ]}>
                      {topic.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              { backgroundColor: cardColor },
              selectedTopics.length === 0 && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={selectedTopics.length === 0}
          >
            <Text style={[
              styles.continueButtonText,
              { color: textColor },
              selectedTopics.length === 0 && styles.continueButtonTextDisabled,
            ]}>
              Continue ({selectedTopics.length} selected)
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
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
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  masonryContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  masonryColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  masonryColumn: {
    flex: 1,
    marginHorizontal: 8,
  },
  topicCard: {
    borderRadius: BorderRadius.large,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  topicCardSelected: {
    borderColor: '#8B5CF6',
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.medium,
    alignSelf: 'flex-start',
  },
  badgeDefault: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  badgeMusicMeditation: {
    backgroundColor: 'rgba(168, 230, 207, 0.2)',
  },
  badgeMusicRelaxation: {
    backgroundColor: 'rgba(110, 92, 231, 0.2)',
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  topicEmoji: {
    fontSize: 28,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  continueButton: {
    borderRadius: BorderRadius.medium,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  continueButtonTextDisabled: {
    opacity: 0.5,
  },
});
