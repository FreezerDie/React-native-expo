import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AUDIO_TRACKS } from '@/data/audio';

const { width } = Dimensions.get('window');

// Get sleep-related tracks from audio data
const SLEEP_ITEMS = AUDIO_TRACKS
  .filter(track => track.topicId === 'sleep-stories' || track.type === 'music')
  .map(track => ({
    id: track.id,
    title: track.title,
    duration: `${track.durationInMinutes} min`,
    description: `Relaxing ${track.type} session`,
    emoji: track.emoji,
    gradient: track.gradient,
    category: track.type === 'meditation' ? 'mediation' : 'music',
    isLiked: false, // This would typically come from user preferences
    audioUrl: track.url,
    durationInMinutes: track.durationInMinutes,
  }));

export default function SleepScreen() {
  const [activeFilter, setActiveFilter] = useState('all');
  const router = useRouter();

  const filters = [
    { id: 'all', label: 'All', icon: 'moon' },
    { id: 'likes', label: 'Added to Likes', icon: 'heart' },
    { id: 'music', label: 'Music', icon: 'musical-notes' },
    { id: 'mediation', label: 'Mediation', icon: 'body' },
  ];

  const filteredItems = SLEEP_ITEMS.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'likes') return item.isLiked;
    return item.category === activeFilter;
  });

  const handlePlayAudio = (item: typeof SLEEP_ITEMS[0]) => {
    router.push({
      pathname: '/player',
      params: {
        sessionTitle: item.title,
        duration: item.durationInMinutes.toString(),
        audioUrl: item.audioUrl,
      },
    });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Sleep & Relaxation</Text>
            <Text style={styles.subtitle}>Drift into peaceful slumber</Text>
          </View>

          <View style={styles.filtersContainer}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterButton,
                  activeFilter === filter.id && styles.activeFilterButton
                ]}
                onPress={() => setActiveFilter(filter.id)}
              >
                <Ionicons
                  name={filter.icon as any}
                  size={24}
                  color={activeFilter === filter.id ? '#2D3436' : 'rgba(45, 52, 54, 0.7)'}
                  style={{ marginBottom: 4 }}
                />
                <Text style={[
                  styles.filterLabel,
                  activeFilter === filter.id && styles.activeFilterLabel
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.gridContainer}>
            {filteredItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.gridItem}>
                <View
                  style={[styles.gridItemBackground, { backgroundColor: item.gradient[0] }]}
                >
                  <Text style={styles.gridItemTitle}>{item.title}</Text>
                  <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => handlePlayAudio(item)}
                  >
                    <Ionicons name="play" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3436',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(45, 52, 54, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  filterButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: 'rgba(45, 52, 54, 0.05)',
    borderWidth: 2,
    borderColor: 'rgba(45, 52, 54, 0.1)',
  },
  activeFilterButton: {
    backgroundColor: 'rgba(45, 52, 54, 0.1)',
    borderColor: '#2D3436',
  },
  filterLabel: {
    fontSize: 10,
    color: 'rgba(45, 52, 54, 0.7)',
    textAlign: 'center',
    fontWeight: '600',
  },
  activeFilterLabel: {
    color: '#2D3436',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  gridItem: {
    width: (width - 48 - 16) / 2,
    height: 120,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  gridItemBackground: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gridItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
