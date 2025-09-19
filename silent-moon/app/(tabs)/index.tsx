import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useApp } from '@/contexts/AppContext';
import LogoWidget from '@/components/LogoWidget';
import { useThemeColor } from '@/hooks/use-theme-color';
import { COURSES_DATA, getCoursesByType, getRecommendedItems } from '@/data/courses';
import { getAudioCategoriesByType } from '@/data/audio';
const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { state } = useApp();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textSecondary = useThemeColor({}, 'textSecondary');

  // Get featured courses for the grid
  const courseData = COURSES_DATA[0]; // First course: Mindfulness Basics

  // Get first audio data for music and meditation types
  const musicAudioData = getAudioCategoriesByType('music')[0]; // First music type audio
  const meditationAudioData = getAudioCategoriesByType('meditation')[0]; // First meditation type audio

  // Fallback to course data if audio not found
  const musicData = musicAudioData || getCoursesByType('music')[0];
  const meditationData = meditationAudioData || getCoursesByType('meditation')[0];

  // Get recommended items from dummy data
  const recommendedItems = getRecommendedItems();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <LogoWidget />
            <Text style={[styles.greeting, { color: textColor }]}>Good Morning, {state.auth.currentUser?.name || 'User'}</Text>
            <Text style={[styles.subtitle, { color: textSecondary }]}>We Wish you have a good day</Text>
          </View>

          {/* Grid Layout */}
          <View style={styles.gridContainer}>
            {/* First Row - Course and Music Audio (half width each) */}
            <View style={styles.gridRow}>
              {/* Course Section */}
              <TouchableOpacity
                style={[styles.gridItem, styles.halfWidth]}
                onPress={() => router.push(`/course-detail?id=${courseData.id}` as any)}
              >
                <View
                  style={[styles.gridItemGradient, { backgroundColor: courseData.gradient[0] }]}
                >
                  <Text style={styles.gridItemTitle}>{courseData.title}</Text>
                  <Text style={styles.gridItemSubtitle}>A COURSE</Text>
                  <Text style={styles.gridItemLength}>{courseData.durationInMinutes} min</Text>
                  <TouchableOpacity style={styles.startButton}>
                    <Text style={styles.startButtonText}>Start</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>

              {/* Music Audio Section */}
              <TouchableOpacity
                style={[styles.gridItem, styles.halfWidth]}
                onPress={() => router.push(`/course-detail?id=${musicData.id}` as any)}
              >
                <View
                  style={[styles.gridItemGradient, { backgroundColor: musicData.gradient[0] }]}
                >
                  <Text style={styles.gridItemTitle}>{musicData.title}</Text>
                  <Text style={styles.gridItemSubtitle}>MUSIC</Text>
                  <Text style={styles.gridItemLength}>
                    {musicData.durationInMinutes} min
                  </Text>
                  <TouchableOpacity style={styles.startButton}>
                    <Text style={styles.startButtonText}>Start</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>

            {/* Second Row - Meditation Audio (full width, smaller height) */}
            <TouchableOpacity
              style={[styles.gridItem, styles.fullWidth, styles.smallerHeight]}
              onPress={() => router.push(`/course-detail?id=${meditationData.id}` as any)}
            >
              <View
                style={[styles.gridItemGradient, styles.smallerHeight, { backgroundColor: meditationData.gradient[0] }]}
              >
                <Text style={styles.gridItemTitle}>{meditationData.title}</Text>
                <Text style={styles.gridItemSubtitle}>MEDITATION</Text>
                <Text style={styles.gridItemLength}>
                  {meditationData.durationInMinutes} min
                </Text>

                <TouchableOpacity style={styles.startButton}>
                  <Ionicons name="play" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>

          {/* Recommended for you section */}
          <View style={styles.recommendedSection}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>Recommended for you</Text>
            <Text style={[styles.sectionSubtitle, { color: textSecondary }]}>Meditation sessions tailored to your preferences</Text>

            {/* Recommended Horizontal Scroll */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.recommendedScroll}
              contentContainerStyle={styles.recommendedScrollContent}
            >
              {recommendedItems.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.recommendedItem,
                    index === 0 ? styles.recommendedItemFirst : styles.recommendedItemMargin
                  ]}
                  onPress={() => router.push(`/course-detail?id=${item.id}` as any)}
                >
                  <View style={styles.recommendedCardContainer}>
                    <View
                      style={[styles.recommendedCard, { backgroundColor: item.gradient[0] }]}
                    >
                      <View style={styles.recommendedCardContent}>
                        <Text style={styles.recommendedCardDuration}>{item.durationInMinutes} min</Text>
                      </View>
                    </View>

                    <View style={styles.recommendedTextContainer}>
                      <Text style={styles.recommendedTitle} numberOfLines={2}>{item.title}</Text>
                      <Text style={styles.recommendedTopic}>{item.type}</Text>
                      <Text style={styles.recommendedLength}>{item.durationInMinutes} min</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 16,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    lineHeight: 24,
    textAlign: 'left',
  },
  // Grid styles
  gridContainer: {
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridItem: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  halfWidth: {
    width: (width - 48 - 16) / 2, // 48 for padding, 16 for gap
    height: 140,
  },
  fullWidth: {
    width: width - 48, // Full width minus padding
    height: 120,
  },
  smallerHeight: {
    height: 100,
  },
  gridItemGradient: {
    flex: 1,
    padding: 20,
    position: 'relative',
  },
  gridItemEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  gridItemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'left',
    position: 'absolute',
    left: 20,
    top: '50%',
    transform: [{ translateY: -20 }],
  },
  gridItemSubtitle: {
    fontSize: 8,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'left',
    textTransform: 'uppercase',
    position: 'absolute',
    left: 20,
    top: '50%',
    transform: [{ translateY: 0 }],
  },
  gridItemType: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 8,
  },
  gridItemLength: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'left',
    position: 'absolute',
    left: 20,
    bottom: 20,
  },
  gridItemDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  // Recommended section styles
  recommendedSection: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 24,
    textAlign: 'left',
    opacity: 0.8,
  },
  recommendedScroll: {
    marginHorizontal: -24, // Extend to full width
  },
  recommendedScrollContent: {
    paddingHorizontal: 24, // Restore padding for content
  },
  recommendedItem: {
    width: 140, // Fixed width for horizontal items
    height: 220, // Increased height to accommodate text below
    borderRadius: 16,
    overflow: 'hidden',
  },
  recommendedItemFirst: {
    marginRight: 16,
  },
  recommendedItemMargin: {
    marginRight: 16,
  },
  recommendedCardContainer: {
    flex: 1,
  },
  recommendedCard: {
    height: 120, // Smaller card height
    borderRadius: 16,
    overflow: 'hidden',
  },
  recommendedCardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  recommendedCardDuration: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  recommendedTextContainer: {
    paddingTop: 12,
    paddingHorizontal: 4,
  },
  recommendedTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 4,
  },
  recommendedTopic: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 2,
  },
  recommendedLength: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
  },
});
