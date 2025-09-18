import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { useApp } from '@/contexts/AppContext';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  {
    id: 'focus',
    title: 'Focus',
    emoji: '',
    description: 'Attention & Concentration',
    gradient: ['#FF6B6B', '#EE5A52'] as const,
  },
  {
    id: 'sleep',
    title: 'Sleep',
    emoji: '',
    description: 'Rest & Relaxation',
    gradient: ['#6C5CE7', '#A29BFE'] as const,
  },
  {
    id: 'music',
    title: 'Music',
    emoji: '',
    description: 'Ambient Sounds',
    gradient: ['#A8E6CF', '#52B788'] as const,
  },
];

export default function HomeScreen() {
  const { state } = useApp();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // const formatTime = (minutes: number) => {
  //   const hours = Math.floor(minutes / 60);
  //   const mins = minutes % 60;
  //   if (hours > 0) {
  //     return `${hours}h ${mins}m`;
  //   }
  //   return `${mins}m`;
  // };

  return (
    <LinearGradient
      colors={['#8B5CF6', '#A855F7', '#C084FC']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.name}>Sarah</Text>
            <Text style={styles.subtitle}>Ready for today&apos;s mindfulness practice?</Text>
          </View>

          <View style={styles.dailyCard}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
              style={styles.cardGradient}
            >
              <Text style={styles.cardEmoji}></Text>
              <Text style={styles.cardTitle}>Daily Meditation</Text>
              <Text style={styles.cardSubtitle}>10 minutes • Morning Focus</Text>
              <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startButtonText}>Start Session</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Explore Categories</Text>
            <View style={styles.categoriesGrid}>
              {CATEGORIES.map((category) => (
                <TouchableOpacity key={category.id} style={styles.categoryCard} onPress={() => router.push(`/(tabs)/${category.id}` as any)}>
                    <LinearGradient
                      colors={category.gradient}
                      style={styles.categoryGradient}
                    >
                      <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                      <Text style={styles.categoryTitle}>{category.title}</Text>
                      <Text style={styles.categoryDescription}>{category.description}</Text>
                    </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.recommendationsScroll}
            >
              <View style={styles.recommendationCard}>
                <LinearGradient
                  colors={['#FF6B6B', '#EE5A52']}
                  style={styles.recommendationGradient}
                >
                  <Text style={styles.recommendationEmoji}></Text>
                  <Text style={styles.recommendationTitle}>Morning Calm</Text>
                  <Text style={styles.recommendationDuration}>15 min</Text>
                </LinearGradient>
              </View>

              <View style={styles.recommendationCard}>
                <LinearGradient
                  colors={['#6C5CE7', '#A29BFE']}
                  style={styles.recommendationGradient}
                >
                  <Text style={styles.recommendationEmoji}></Text>
                  <Text style={styles.recommendationTitle}>Sleep Story</Text>
                  <Text style={styles.recommendationDuration}>20 min</Text>
                </LinearGradient>
              </View>

              <View style={styles.recommendationCard}>
                <LinearGradient
                  colors={['#A8E6CF', '#52B788']}
                  style={styles.recommendationGradient}
                >
                  <Text style={styles.recommendationEmoji}></Text>
                  <Text style={styles.recommendationTitle}>Ocean Waves</Text>
                  <Text style={styles.recommendationDuration}>∞</Text>
                </LinearGradient>
              </View>
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.activityList}>
              {state.recentSessions.length > 0 ? (
                state.recentSessions.slice(0, 3).map((session, index) => (
                  <View key={session.id} style={styles.activityItem}>
                    <Text style={styles.activityEmoji}>
                      {session.title.includes('Meditation') ? '' :
                       session.title.includes('Sleep') ? '' : ''}
                    </Text>
                    <View style={styles.activityContent}>
                      <Text style={styles.activityTitle}>{session.title}</Text>
                      <Text style={styles.activityTime}>
                        {Math.floor((new Date().getTime() - session.date.getTime()) / (1000 * 60 * 60 * 24))} days ago • {session.duration} min
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.activityItem}>
                  <Text style={styles.activityEmoji}></Text>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>Start your first session!</Text>
                    <Text style={styles.activityTime}>Choose from our meditation collection</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  greeting: {
    fontSize: 16,
    color: '#E0E7FF',
    fontWeight: '500',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    marginTop: 8,
    lineHeight: 24,
  },
  dailyCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 24,
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#E0E7FF',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 120,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 48 - 16) / 2,
    height: 120,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  categoryGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  recommendationsScroll: {
    marginTop: 8,
  },
  recommendationCard: {
    width: 140,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
  },
  recommendationGradient: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  recommendationDuration: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  activityList: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  activityEmoji: {
    fontSize: 24,
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#E0E7FF',
  },
});
