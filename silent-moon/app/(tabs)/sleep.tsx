import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const SLEEP_STORIES = [
  {
    id: 'ocean-dreams',
    title: 'Ocean Dreams',
    duration: '25 min',
    description: 'Drift away on gentle waves',
    emoji: '',
    gradient: ['#667EEA', '#764BA2'],
  },
  {
    id: 'mountain-retreat',
    title: 'Mountain Retreat',
    duration: '30 min',
    description: 'Peaceful alpine journey',
    emoji: '',
    gradient: ['#F093FB', '#F5576C'],
  },
  {
    id: 'forest-whispers',
    title: 'Forest Whispers',
    duration: '20 min',
    description: 'Secrets of the ancient woods',
    emoji: '',
    gradient: ['#4ECDC4', '#44A08D'],
  },
  {
    id: 'starlight-stories',
    title: 'Starlight Stories',
    duration: '22 min',
    description: 'Tales from the night sky',
    emoji: '',
    gradient: ['#A8E6CF', '#52B788'],
  },
];

const SLEEP_SOUNDS = [
  {
    id: 'rain',
    title: 'Gentle Rain',
    emoji: '',
    gradient: ['#667EEA', '#764BA2'],
  },
  {
    id: 'waves',
    title: 'Ocean Waves',
    emoji: '',
    gradient: ['#F093FB', '#F5576C'],
  },
  {
    id: 'wind',
    title: 'Soft Wind',
    emoji: '',
    gradient: ['#4ECDC4', '#44A08D'],
  },
  {
    id: 'white-noise',
    title: 'White Noise',
    emoji: '',
    gradient: ['#A8E6CF', '#52B788'],
  },
];

export default function SleepScreen() {
  return (
    <View
      style={[styles.container, { backgroundColor: '#6C5CE7' }]}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.emoji}></Text>
            <Text style={styles.title}>Sleep & Relaxation</Text>
            <Text style={styles.subtitle}>Drift into peaceful slumber</Text>
          </View>

          <View style={styles.sleepTimer}>
            <View
              style={[styles.timerGradient, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}
            >
              <Text style={styles.timerEmoji}></Text>
              <Text style={styles.timerTitle}>Sleep Timer</Text>
              <Text style={styles.timerSubtitle}>Automatically stop playback</Text>
              <View style={styles.timerOptions}>
                {['15 min', '30 min', '45 min', '60 min', '∞'].map((time) => (
                  <TouchableOpacity key={time} style={styles.timerButton}>
                    <Text style={styles.timerButtonText}>{time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sleep Stories</Text>
            <View style={styles.storiesGrid}>
              {SLEEP_STORIES.map((story) => (
                <TouchableOpacity key={story.id} style={styles.storyCard}>
                  <View
                    style={[styles.storyGradient, { backgroundColor: story.gradient[0] }]}
                  >
                    <Text style={styles.storyEmoji}>{story.emoji}</Text>
                    <Text style={styles.storyTitle}>{story.title}</Text>
                    <Text style={styles.storyDuration}>{story.duration}</Text>
                    <Text style={styles.storyDescription}>{story.description}</Text>
                    <TouchableOpacity style={styles.playButton}>
                      <Text style={styles.playButtonText}>Play</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ambient Sounds</Text>
            <View style={styles.soundsGrid}>
              {SLEEP_SOUNDS.map((sound) => (
                <TouchableOpacity key={sound.id} style={styles.soundCard}>
                  <View
                    style={[styles.soundGradient, { backgroundColor: sound.gradient[0] }]}
                  >
                    <Text style={styles.soundEmoji}>{sound.emoji}</Text>
                    <Text style={styles.soundTitle}>{sound.title}</Text>
                    <TouchableOpacity style={styles.soundPlayButton}>
                      <Text style={styles.soundPlayButtonText}></Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.tipsSection}>
            <Text style={styles.sectionTitle}>Sleep Tips</Text>
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}></Text>
                <Text style={styles.tipText}>Create a consistent bedtime routine</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}></Text>
                <Text style={styles.tipText}>Keep your bedroom cool and dark</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}></Text>
                <Text style={styles.tipText}>Avoid screens at least 1 hour before bed</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}></Text>
                <Text style={styles.tipText}>Try deep breathing exercises to relax</Text>
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
  sleepTimer: {
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  timerGradient: {
    padding: 24,
    alignItems: 'center',
  },
  timerEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  timerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  timerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 20,
  },
  timerOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  timerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  timerButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
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
  storiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  storyCard: {
    width: (width - 48 - 16) / 2,
    height: 160,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  storyGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  storyEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  storyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  storyDuration: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 6,
  },
  storyDescription: {
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
  soundsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  soundCard: {
    width: (width - 48 - 32) / 4,
    height: 80,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  soundGradient: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  soundEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  soundTitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  soundPlayButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  soundPlayButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
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
