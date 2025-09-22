import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useThemeColor } from '@/hooks/use-theme-color';
import { AUDIO_TRACKS, AudioTrack } from '@/data/audio';

export default function AudioListScreen() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const renderAudioItem = ({ item }: { item: AudioTrack }) => (
    <View style={styles.audioItem}>
      <Text style={[styles.audioTitle, { color: textColor }]}>{item.title}</Text>
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => router.push({
          pathname: '/player' as any,
          params: {
            sessionTitle: item.title,
            duration: item.durationInMinutes,
            audioUrl: item.url
          }
        })}
      >
        <Ionicons name="play" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={AUDIO_TRACKS}
          renderItem={renderAudioItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
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
  listContainer: {
    padding: 16,
  },
  audioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  audioTitle: {
    fontSize: 16,
    flex: 1,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
