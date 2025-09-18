import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { useApp } from '@/contexts/AppContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { TOPICS_DATA, TopicType, getCategoryBadgeText, getCategoryBadgeStyle } from '@/data';

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

  // Create masonry layout with 2 columns
  const createMasonryLayout = (): Array<Array<typeof TOPICS_DATA[0]>> => {
    const columns: Array<Array<typeof TOPICS_DATA[0]>> = [[], []];
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
                      { height: topic.height, backgroundColor: cardColor, borderColor },
                      isSelected(topic.id) && styles.topicCardSelected,
                    ]}
                    onPress={() => toggleTopic(topic.id)}
                  >
                    <View style={styles.topicHeader}>
                      <Text style={styles.topicEmoji}>{topic.emoji}</Text>
                      <View style={[
                        styles.categoryBadge,
                        getCategoryBadgeStyle(topic.type) === 'badgeMusicMeditation' ? styles.badgeMusicMeditation :
                        getCategoryBadgeStyle(topic.type) === 'badgeMusicRelaxation' ? styles.badgeMusicRelaxation :
                        styles.badgeDefault
                      ]}>
                        <Text style={styles.categoryBadgeText}>
                          {getCategoryBadgeText(topic.type)}
                        </Text>
                      </View>
                    </View>
                    <Text style={[
                      styles.topicTitle,
                      { color: textColor },
                      isSelected(topic.id) && styles.topicTitleSelected,
                    ]}>
                      {topic.title}
                    </Text>
                    <Text style={[
                      styles.topicDescription,
                      { color: textSecondaryColor },
                      isSelected(topic.id) && styles.topicDescriptionSelected,
                    ]}>
                      {topic.description}
                    </Text>
                    <View style={styles.topicStats}>
                      <Text style={[styles.topicStat, { color: textSecondaryColor }]}>
                        {topic.added_to_favorites_count.toLocaleString()}
                      </Text>
                      <Text style={[styles.topicStat, { color: textSecondaryColor }]}>
                        {topic.listening_count.toLocaleString()}
                      </Text>
                    </View>
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
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: 12,
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
  topicStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.1)',
  },
  topicStat: {
    fontSize: 11,
    fontWeight: '500',
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
  topicTitleSelected: {
    color: '#8B5CF6',
  },
  topicDescription: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  topicDescriptionSelected: {
    color: '#8B5CF6',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  continueButton: {
    borderRadius: 12,
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
