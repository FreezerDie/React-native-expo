import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
// import { Audio } from 'expo-av'; // Not needed for local simulation
import { MaterialIcons } from '@expo/vector-icons';
import BackNavigation from '@/components/BackNavigation';
import ActionButtons from '@/components/ActionButtons';

export default function MeditationPlayer() {
  const params = useLocalSearchParams();

  const sessionTitle = params.sessionTitle as string || "Morning Meditation";
  const duration = parseInt(params.duration as string) || 10;
  const backgroundColor = ['#8B5CF6', '#A855F7']; // Default colors

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime] = useState(duration * 60); // Convert to seconds
  // Note: Audio state removed since we're simulating playback locally
  // const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Auto-start playback when component mounts
  useEffect(() => {
    // Small delay to ensure component is fully mounted
    const timer = setTimeout(() => {
      if (!isPlaying) {
        togglePlayback();
      }
    }, 500) as any;

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this runs once on mount

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayback = () => {
    // For demo purposes, we'll simulate playback locally without loading actual audio
    // This ensures the app works offline as intended
    // In a real app, you'd load and play actual meditation audio from local assets
    console.log(isPlaying ? 'Pausing meditation playback' : 'Starting meditation playback simulation');
    setIsPlaying(!isPlaying);
  };

  // const handleSeek = (value: number) => {
  //   setCurrentTime(value);
  //   // In a real app, you'd seek the audio to this position
  // };

  const skipBackward = () => {
    const newTime = Math.max(0, currentTime - 15);
    setCurrentTime(newTime);
  };

  const skipForward = () => {
    const newTime = Math.min(totalTime, currentTime + 15);
    setCurrentTime(newTime);
  };

  // Simulate progress for demo
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalTime) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalTime]);

  return (
    <View
      style={[styles.container, { backgroundColor: backgroundColor[0] }]}
    >
      <BackNavigation />

      {/* Right side action buttons */}
      <ActionButtons
        buttons={[
          {
            iconName: 'favorite-border',
            onPress: () => {
              // TODO: Implement add to favorites functionality
              console.log('Add to favorites');
            },
            accessibilityLabel: 'Add to favorites'
          },
          {
            iconName: 'download',
            onPress: () => {
              // TODO: Implement download functionality
              console.log('Download');
            },
            accessibilityLabel: 'Download'
          }
        ]}
        style={styles.rightOverlayContainer}
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.sessionTitle}>{sessionTitle}</Text>
            <Text style={styles.duration}>{duration} minutes</Text>
          </View>

          <View style={styles.playerSection}>
            <View style={styles.visualizer}>
              <View style={styles.waveform}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <View
                    key={i}
                    style={[
                      styles.waveBar,
                      isPlaying && styles.waveBarActive,
                      { height: isPlaying ? Math.random() * 60 + 20 : 20 }
                    ]}
                  />
                ))}
              </View>
            </View>

            <View style={styles.timeDisplay}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <Text style={styles.timeText}>{formatTime(totalTime)}</Text>
            </View>

            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(currentTime / totalTime) * 100}%` }
                ]}
              />
            </View>

            <View style={styles.controls}>
              <TouchableOpacity style={styles.controlButton} onPress={skipBackward}>
                <MaterialIcons name="replay-10" size={24} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
                <MaterialIcons
                  name={isPlaying ? "pause" : "play-arrow"}
                  size={32}
                  color={backgroundColor[0]}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.controlButton} onPress={skipForward}>
                <MaterialIcons name="forward-10" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  sessionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  duration: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  playerSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  visualizer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  waveBar: {
    width: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 2,
    borderRadius: 2,
  },
  waveBarActive: {
    backgroundColor: '#FFFFFF',
  },
  timeDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  controlButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
  },
  playButtonText: {
    fontSize: 32,
  },
  rightOverlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: 50,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
});
