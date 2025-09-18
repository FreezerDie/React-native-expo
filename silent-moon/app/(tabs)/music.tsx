import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const MUSIC_CATEGORIES = [
  {
    id: 'nature',
    title: 'Nature Sounds',
    description: 'Forest, rain, ocean waves',
    emoji: '🌲',
    gradient: ['#A8E6CF', '#52B788'],
    tracks: 25,
  },
  {
    id: 'ambient',
    title: 'Ambient',
    description: 'Calming electronic tones',
    emoji: '🎵',
    gradient: ['#667EEA', '#764BA2'],
    tracks: 18,
  },
  {
    id: 'instrumental',
    title: 'Instrumental',
    description: 'Piano, guitar, strings',
    emoji: '🎼',
    gradient: ['#F093FB', '#F5576C'],
    tracks: 32,
  },
  {
    id: 'meditation-bells',
    title: 'Meditation Bells',
    description: 'Tibetan bowls and chimes',
    emoji: '🔔',
    gradient: ['#4ECDC4', '#44A08D'],
    tracks: 15,
  },
];

const POPULAR_TRACKS = [
  {
    id: 'rain-forest',
    title: 'Rain in the Forest',
    artist: 'Nature Sounds',
    duration: '∞',
    emoji: '🌧️',
  },
  {
    id: 'ocean-waves',
    title: 'Ocean Waves',
    artist: 'Coastal Collection',
    duration: '∞',
    emoji: '🌊',
  },
  {
    id: 'deep-space',
    title: 'Deep Space',
    artist: 'Ambient Collective',
    duration: '45:32',
    emoji: '🌌',
  },
  {
    id: 'mountain-stream',
    title: 'Mountain Stream',
    artist: 'Nature Sounds',
    duration: '∞',
    emoji: '🏔️',
  },
];

export default function MusicScreen() {
  const [selectedCategory, setSelectedCategory] = useState('nature');

  return (
    <LinearGradient
      colors={['#A8E6CF', '#52B788']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.emoji}>🎵</Text>
            <Text style={styles.title}>Relaxing Music</Text>
            <Text style={styles.subtitle}>Ambient sounds for peace and focus</Text>
          </View>

          <View style={styles.categoriesSection}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesScroll}
            >
              {MUSIC_CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryCard,
                    selectedCategory === category.id && styles.categoryCardSelected,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <LinearGradient
                    colors={category.gradient}
                    style={styles.categoryGradient}
                  >
                    <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                    <Text style={styles.categoryDescription}>{category.description}</Text>
                    <Text style={styles.categoryTracks}>{category.tracks} tracks</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.nowPlaying}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
              style={styles.nowPlayingGradient}
            >
              <View style={styles.nowPlayingInfo}>
                <Text style={styles.nowPlayingEmoji}>🌧️</Text>
                <View style={styles.nowPlayingDetails}>
                  <Text style={styles.nowPlayingTitle}>Rain in the Forest</Text>
                  <Text style={styles.nowPlayingArtist}>Nature Sounds</Text>
                </View>
              </View>
              <View style={styles.nowPlayingControls}>
                <TouchableOpacity style={styles.controlButton}>
                  <Text style={styles.controlText}>⏮️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.playMainButton}>
                  <Text style={styles.playMainText}>⏸️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                  <Text style={styles.controlText}>⏭️</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.popularSection}>
            <Text style={styles.sectionTitle}>Popular Tracks</Text>
            <View style={styles.tracksList}>
              {POPULAR_TRACKS.map((track, index) => (
                <TouchableOpacity key={track.id} style={styles.trackItem}>
                  <View style={styles.trackInfo}>
                    <Text style={styles.trackNumber}>{index + 1}</Text>
                    <Text style={styles.trackEmoji}>{track.emoji}</Text>
                    <View style={styles.trackDetails}>
                      <Text style={styles.trackTitle}>{track.title}</Text>
                      <Text style={styles.trackArtist}>{track.artist}</Text>
                    </View>
                  </View>
                  <View style={styles.trackActions}>
                    <Text style={styles.trackDuration}>{track.duration}</Text>
                    <TouchableOpacity style={styles.trackPlayButton}>
                      <Text style={styles.trackPlayText}>▶</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.sleepTimer}>
            <Text style={styles.sectionTitle}>Sleep Timer</Text>
            <View style={styles.timerOptions}>
              {['15 min', '30 min', '45 min', '60 min', '∞'].map((time) => (
                <TouchableOpacity key={time} style={styles.timerButton}>
                  <Text style={styles.timerButtonText}>{time}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.tipsSection}>
            <Text style={styles.sectionTitle}>Music Tips</Text>
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>Use ambient music for background focus</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>Try nature sounds for stress relief</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>Instrumental music aids deep concentration</Text>
              </View>
              <View style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>Set a sleep timer for bedtime listening</Text>
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
  categoriesSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  categoriesScroll: {
    marginTop: 8,
  },
  categoryCard: {
    width: 140,
    height: 120,
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryCardSelected: {
    borderColor: '#FFFFFF',
  },
  categoryGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  categoryEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 14,
    marginBottom: 6,
  },
  categoryTracks: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  nowPlaying: {
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  nowPlayingGradient: {
    padding: 20,
  },
  nowPlayingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  nowPlayingEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  nowPlayingDetails: {
    flex: 1,
  },
  nowPlayingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  nowPlayingArtist: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  nowPlayingControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  controlText: {
    fontSize: 16,
  },
  playMainButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  playMainText: {
    fontSize: 24,
  },
  popularSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  tracksList: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  trackInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  trackNumber: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    width: 24,
    textAlign: 'center',
  },
  trackEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  trackDetails: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  trackArtist: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  trackActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackDuration: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginRight: 12,
  },
  trackPlayButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackPlayText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  sleepTimer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  timerOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
