import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const HAPPINESS_SESSIONS = [
  {
    id: 'morning-gratitude',
    title: 'Morning Gratitude',
    duration: '10 min',
    description: 'Start your day with positivity',
    emoji: '🌅',
    gradient: ['#FFD93D', '#FFB347'],
  },
  {
    id: 'joy-meditation',
    title: 'Joy Meditation',
    duration: '15 min',
    description: 'Cultivate inner happiness',
    emoji: '😊',
    gradient: ['#FFE066', '#FFD93D'],
  },
  {
    id: 'positive-affirmations',
    title: 'Positive Affirmations',
    duration: '12 min',
    description: 'Build self-confidence',
    emoji: '✨',
    gradient: ['#F093FB', '#F5576C'],
  },
  {
    id: 'laughter-meditation',
    title: 'Laughter Meditation',
    duration: '8 min',
    description: 'Find joy in the moment',
    emoji: '😂',
    gradient: ['#4ECDC4', '#44A08D'],
  },
  {
    id: 'heart-chakra',
    title: 'Heart Chakra',
    duration: '20 min',
    description: 'Open your heart to love',
    emoji: '💚',
    gradient: ['#A8E6CF', '#52B788'],
  },
  {
    id: 'abundance-mindset',
    title: 'Abundance Mindset',
    duration: '18 min',
    description: 'Attract positivity and success',
    emoji: '🌟',
    gradient: ['#667EEA', '#764BA2'],
  },
];

export default function HappinessScreen() {
  return (
    <LinearGradient
      colors={['#FFD93D', '#FFB347']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.emoji}>😊</Text>
            <Text style={styles.title}>Happiness & Joy</Text>
            <Text style={styles.subtitle}>Cultivate positivity and inner peace</Text>
          </View>

          <View style={styles.moodTracker}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
              style={styles.moodGradient}
            >
              <Text style={styles.moodTitle}>How are you feeling today?</Text>
              <View style={styles.moodOptions}>
                {['😢', '😐', '😊', '😄'].map((mood, index) => (
                  <TouchableOpacity key={index} style={styles.moodButton}>
                    <Text style={styles.moodEmoji}>{mood}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </LinearGradient>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Happiness Sessions</Text>
            <View style={styles.sessionsGrid}>
              {HAPPINESS_SESSIONS.map((session) => (
                <TouchableOpacity key={session.id} style={styles.sessionCard}>
                  <LinearGradient
                    colors={session.gradient}
                    style={styles.sessionGradient}
                  >
                    <Text style={styles.sessionEmoji}>{session.emoji}</Text>
                    <Text style={styles.sessionTitle}>{session.title}</Text>
                    <Text style={styles.sessionDuration}>{session.duration}</Text>
                    <Text style={styles.sessionDescription}>{session.description}</Text>
                    <TouchableOpacity style={styles.playButton}>
                      <Text style={styles.playButtonText}>▶ Start</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.affirmations}>
            <Text style={styles.sectionTitle}>Daily Affirmations</Text>
            <View style={styles.affirmationCard}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                style={styles.affirmationGradient}
              >
                <Text style={styles.affirmationText}>
                  &ldquo;I am worthy of happiness and joy. I choose to see the beauty in every moment.&rdquo;
                </Text>
                <TouchableOpacity style={styles.affirmationButton}>
                  <Text style={styles.affirmationButtonText}>Repeat 3x</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>

          <View style={styles.tipsSection}>
            <Text style={styles.sectionTitle}>Joy Boosters</Text>
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>Practice random acts of kindness daily</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>Keep a gratitude journal</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>Surround yourself with positive people</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>Take time to appreciate small joys</Text>
              </View>
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
  moodTracker: {
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  moodGradient: {
    padding: 24,
    alignItems: 'center',
  },
  moodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  moodButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodEmoji: {
    fontSize: 24,
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
  sessionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sessionCard: {
    width: (width - 48 - 16) / 2,
    height: 160,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  sessionGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  sessionEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  sessionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  sessionDuration: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 6,
  },
  sessionDescription: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 14,
    marginBottom: 8,
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  affirmations: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  affirmationCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  affirmationGradient: {
    padding: 24,
    alignItems: 'center',
  },
  affirmationText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 20,
  },
  affirmationButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  affirmationButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
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
