import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

import { useApp } from '@/contexts/AppContext';

export default function MeditationPlayer() {
  const { dispatch } = useApp();
  const params = useLocalSearchParams();

  const sessionTitle = params.sessionTitle as string || "Morning Meditation";
  const duration = parseInt(params.duration as string) || 10;
  const backgroundColor = ['#8B5CF6', '#A855F7']; // Default colors

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime] = useState(duration * 60); // Convert to seconds
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      await sound?.pauseAsync();
    } else {
      // For demo purposes, we'll just simulate playback
      // In a real app, you'd load and play actual meditation audio
      if (!sound) {
        // Create a placeholder sound object for demo
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: 'https://example.com/meditation-audio.mp3' },
          { shouldPlay: true }
        );
        setSound(newSound);
      } else {
        await sound.playAsync();
      }
    }
    setIsPlaying(!isPlaying);
  };

  // const handleSeek = (value: number) => {
  //   setCurrentTime(value);
  //   // In a real app, you'd seek the audio to this position
  // };

  const skipBackward = () => {
    const newTime = Math.max(0, currentTime - 30);
    setCurrentTime(newTime);
  };

  const skipForward = () => {
    const newTime = Math.min(totalTime, currentTime + 30);
    setCurrentTime(newTime);
  };

  // Simulate progress for demo
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTime < totalTime) {
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
  }, [isPlaying, currentTime, totalTime]);

  return (
    <LinearGradient
      colors={backgroundColor}
      style={styles.container}
    >
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
                <Text style={styles.controlButtonText}></Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
                <Text style={styles.playButtonText}>
                  {isPlaying ? '' : ''}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.controlButton} onPress={skipForward}>
                <Text style={styles.controlButtonText}></Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.instructions}>
            <Text style={styles.instructionTitle}>Meditation Guide</Text>
            <Text style={styles.instructionText}>
              Find a comfortable position. Close your eyes and focus on your breath.
              When your mind wanders, gently bring it back to your breath.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.endSessionButton}
            onPress={() => {
              dispatch({ type: 'END_SESSION' });
              router.back();
            }}
          >
            <Text style={styles.endSessionButtonText}>End Session</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
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
  instructions: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
  },
  endSessionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  endSessionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
