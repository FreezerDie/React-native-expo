import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { useApp } from '@/contexts/AppContext';

const { width } = Dimensions.get('window');

const FOCUS_SESSIONS = [
  {
    id: 'morning-focus',
    title: 'Morning Focus',
    duration: '15 min',
    description: 'Start your day with clarity and purpose',
    emoji: '',
    gradient: ['#FF6B6B', '#EE5A52'] as const,
  },
  {
    id: 'deep-work',
    title: 'Deep Work',
    duration: '25 min',
    description: 'Enter flow state for intensive work',
    emoji: '',
    gradient: ['#4ECDC4', '#44A08D'] as const,
  },
  {
    id: 'study-session',
    title: 'Study Session',
    duration: '20 min',
    description: 'Enhanced concentration for learning',
    emoji: '',
    gradient: ['#45B7D1', '#96CEB4'] as const,
  },
  {
    id: 'creative-focus',
    title: 'Creative Focus',
    duration: '18 min',
    description: 'Unlock your creative potential',
    emoji: '',
    gradient: ['#FDCB6E', '#E17055'] as const,
  },
  {
    id: 'evening-wind-down',
    title: 'Evening Wind Down',
    duration: '10 min',
    description: 'Transition from work to relaxation',
    emoji: '',
    gradient: ['#A29BFE', '#6C5CE7'] as const,
  },
  {
    id: 'quick-focus',
    title: 'Quick Focus',
    duration: '5 min',
    description: 'Rapid attention reset',
    emoji: '',
    gradient: ['#FD79A8', '#E84393'] as const,
  },
];

export default function FocusScreen() {
  const { dispatch } = useApp();

  const startMeditationSession = (sessionTitle: string, duration: number) => {
    dispatch({
      type: 'START_SESSION',
      payload: {
        sessionType: 'focus',
        duration,
      },
    });

    dispatch({
      type: 'ADD_RECENT_SESSION',
      payload: {
        id: `${sessionTitle.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        title: sessionTitle,
        duration,
      },
    });

    // Navigate to meditation player
    router.push({
      pathname: '/player/meditation',
      params: {
        sessionTitle,
        duration: duration.toString(),
      },
    });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: '#FF6B6B' }]}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.emoji}></Text>
            <Text style={styles.title}>Focus Sessions</Text>
            <Text style={styles.subtitle}>Sharpen your mind and boost productivity</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>8.5h</Text>
              <Text style={styles.statLabel}>Total Time</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>92%</Text>
              <Text style={styles.statLabel}>Completion</Text>
            </View>
          </View>

          <View style={styles.sessionsSection}>
            <Text style={styles.sectionTitle}>Choose Your Session</Text>
            <View style={styles.sessionsGrid}>
              {FOCUS_SESSIONS.map((session) => (
                <TouchableOpacity key={session.id} style={styles.sessionCard}>
                  <View
                    style={[styles.sessionGradient, { backgroundColor: session.gradient[0] }]}
                  >
                    <Text style={styles.sessionTitle}>{session.title}</Text>
                    <Text style={styles.sessionDuration}>{session.duration}</Text>
                    <TouchableOpacity
                      style={styles.playButton}
                      onPress={() => startMeditationSession(session.title, parseInt(session.duration))}
                    >
                      <Text style={styles.playButtonText}>Start</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.tipsSection}>
            <Text style={styles.sectionTitle}>Focus Tips</Text>
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}></Text>
                <Text style={styles.tipText}>Find a quiet space free from distractions</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}></Text>
                <Text style={styles.tipText}>Set a clear intention for your session</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}></Text>
                <Text style={styles.tipText}>Take deep breaths to center your mind</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}></Text>
                <Text style={styles.tipText}>If your mind wanders, gently bring it back</Text>
              </View>
            </View>
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
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: 80,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  sessionsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  sessionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sessionCard: {
    width: (width - 48 - 16) / 2,
    height: 180,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  sessionGradient: {
    flex: 1,
    padding: 16,
    position: 'relative',
  },
  sessionEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'left',
    position: 'absolute',
    left: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  sessionDuration: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'left',
    position: 'absolute',
    left: 16,
    bottom: 16,
  },
  sessionDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 16,
    marginBottom: 12,
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    position: 'absolute',
    right: 16,
    bottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  tipsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  tipsList: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipBullet: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
    marginTop: 2,
  },
  tipText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
});
