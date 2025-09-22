import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Audio, AVPlaybackStatus } from 'expo-av';
import * as FileSystem from 'expo-file-system/legacy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import BackNavigation from '@/components/BackNavigation';
import ActionButtons from '@/components/ActionButtons';

export default function MeditationPlayer() {
  const params = useLocalSearchParams();

  const sessionTitle = params.sessionTitle as string || "Morning Meditation";
  const duration = parseInt(params.duration as string) || 10;
  const audioUrl = params.audioUrl as string || "";

  // Log the parameters for debugging (only in development)
  if (__DEV__) {
    console.log('Player params:', { sessionTitle, duration, audioUrl });
  }
  const backgroundColor = ['#8B5CF6', '#A855F7']; // Default colors

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(duration * 60); // Convert to seconds
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);
  const localAudioUriRef = useRef<string | null>(null);
  const loadAudioRef = useRef<(() => Promise<void>) | null>(null);
  const currentAudioUrlRef = useRef<string | null>(null);

  // Playback status update handler
  const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    console.log('Playback status update:', status);
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis / 1000);
      setTotalTime(status.durationMillis ? status.durationMillis / 1000 : duration * 60);
      setIsPlaying(status.isPlaying);

      if (status.didJustFinish) {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    } else if (status.error) {
      console.error('Audio playback error:', status.error);
      setIsPlaying(false);
      setIsLoaded(false);
      // Don't show alert for every status error, let the main error handling deal with it
      console.log('Audio status error, resetting states');
    }
  }, [duration]);

  // Download audio to local storage and then load it
  const downloadAndLoadAudio = useCallback(async (remoteUri: string) => {
    try {
      console.log('📥 downloadAndLoadAudio called for:', remoteUri);

      // Create a local file path
      const filename = remoteUri.split('/').pop() || 'audio.mp3';
      const localUri = `${FileSystem.documentDirectory!}${filename}`;

      // Download the file
      const downloadResult = await FileSystem.downloadAsync(remoteUri, localUri, {
        headers: {
          'User-Agent': 'SilentMoon/1.0',
        }
      });

      console.log('Download completed:', downloadResult);

      if (downloadResult.status === 200) {
        localAudioUriRef.current = downloadResult.uri;
        return downloadResult.uri;
      } else {
        throw new Error(`Download failed with status ${downloadResult.status}`);
      }
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  }, []);

  // Load audio function
  const loadAudio = useCallback(async () => {
    try {
      console.log('🔄 loadAudio called for URL:', audioUrl);
      setIsLoading(true);
      setIsLoaded(false);

      // Unload previous sound if exists using soundRef instead of sound state
      if (soundRef.current) {
        console.log('Unloading previous sound');
        await soundRef.current.unloadAsync();
        setSound(null);
        soundRef.current = null;
      }

      // Set audio mode for playback
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      // Try to load the audio with the provided URL first
      let audioUri = audioUrl;

      // If no URL provided, show error
      if (!audioUri) {
        throw new Error('No audio URL provided');
      }

      // Decode URL encoding for spaces and special characters
      try {
        audioUri = decodeURIComponent(audioUri);
        console.log('Decoded URI:', audioUri);
      } catch (decodeError) {
        console.error('Failed to decode URI:', decodeError);
        // Use original URL if decoding fails
      }

      console.log('Creating audio sound object with URI:', audioUri);

      let finalUri = audioUri;
      let audioSource: any = { uri: audioUri };

      // For S3 URLs, try downloading first
      if (audioUri.includes('s3.tebi.io') || audioUri.includes('amazonaws.com')) {
        try {
          console.log('Attempting to download S3 audio locally...');
          finalUri = await downloadAndLoadAudio(audioUri);
          audioSource = { uri: finalUri };
          console.log('Using downloaded local file:', finalUri);
        } catch (downloadError) {
          console.error('Download failed, trying direct stream:', downloadError);
          // Fallback to direct streaming with headers
          audioSource = {
            uri: audioUri,
            headers: {
              'User-Agent': 'SilentMoon/1.0',
              'Accept': 'audio/*',
              'Cache-Control': 'no-cache',
            }
          };
        }
      } else {
        // For other URLs, try direct streaming first
        console.log('Using direct streaming for non-S3 URL');
        audioSource = {
          uri: audioUri,
          headers: {
            'User-Agent': 'SilentMoon/1.0',
            'Accept': 'audio/*',
          }
        };
      }

      console.log('Final audio source:', audioSource);

      const { sound: newSound } = await Audio.Sound.createAsync(
        audioSource,
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );

      console.log('Audio loaded successfully');
      setSound(newSound);
      soundRef.current = newSound;
      setIsLoaded(true);

      if (__DEV__) {
        console.log('Sound object set:', !!newSound, 'soundRef set:', !!soundRef.current);
      }
    } catch (error) {
      console.error('Error loading audio:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      Alert.alert(
        'Audio Loading Error',
        `Failed to load audio: ${errorMessage}. Please check your internet connection and try again.`
      );
      setIsLoaded(false);
      setSound(null);
      currentAudioUrlRef.current = null;
    } finally {
      setIsLoading(false);
    }
  }, [audioUrl, downloadAndLoadAudio, onPlaybackStatusUpdate]);

  // Store the loadAudio function in ref for stable access
  useEffect(() => {
    loadAudioRef.current = loadAudio;
  }, [loadAudio]);

  const togglePlayback = useCallback(async () => {
    if (__DEV__) {
      console.log('togglePlayback called - isLoading:', isLoading, 'isLoaded:', isLoaded, 'soundRef exists:', !!soundRef.current);
    }

    if (isLoading) {
      console.log('Audio is currently loading');
      Alert.alert(
        'Audio Loading',
        'Please wait while the audio loads.'
      );
      return;
    }

    if (!isLoaded) {
      console.log('Audio not loaded yet');
      Alert.alert(
        'Audio Not Ready',
        'The audio is still loading. Please wait a moment and try again.'
      );
      return;
    }

    // Use soundRef instead of sound state for more reliable access
    const currentSound = soundRef.current;
    if (!currentSound) {
      console.log('No sound object available');
      Alert.alert(
        'Audio Not Ready',
        'The audio is not available. Please try reloading.'
      );
      return;
    }

    try {
      const status = await currentSound.getStatusAsync();
      console.log('Current sound status:', status);

      if (isPlaying) {
        console.log('Pausing audio playback');
        await currentSound.pauseAsync();
        setIsPlaying(false);
      } else {
        console.log('Starting audio playback');
        await currentSound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      // If player doesn't exist, reset the state and auto-retry
      if (errorMessage.includes('Player does not exist')) {
        console.log('Player was unloaded, resetting state and retrying...');
        setSound(null);
        soundRef.current = null;
        setIsLoaded(false);
        setIsPlaying(false);
        
        // Auto-retry loading the audio
        if (loadAudioRef.current && audioUrl) {
          console.log('Auto-retrying audio load...');
          loadAudioRef.current().then(() => {
            console.log('Audio reloaded successfully, starting playback...');
            // Try to play again after reload
            setTimeout(() => {
              if (soundRef.current) {
                soundRef.current.playAsync().then(() => {
                  setIsPlaying(true);
                }).catch(retryError => {
                  console.error('Failed to play after reload:', retryError);
                });
              }
            }, 500);
          }).catch(retryError => {
            console.error('Auto-retry failed:', retryError);
            Alert.alert(
              'Audio Error',
              'Failed to reload audio. Please try again manually.'
            );
          });
        }
      } else {
        Alert.alert(
          'Playback Error',
          `Failed to control audio playback: ${errorMessage}`
        );
        setIsPlaying(false);
      }
    }
  }, [isLoaded, isPlaying, isLoading, audioUrl]);

  // Load audio when component mounts or audioUrl changes
  useEffect(() => {
    if (__DEV__) {
      console.log('useEffect running with audioUrl:', audioUrl, 'current:', currentAudioUrlRef.current);
    }

    // Load audio on mount or when URL changes
    if (audioUrl && loadAudioRef.current) {
      // Always load if no current URL is set (first load)
      if (!currentAudioUrlRef.current || audioUrl !== currentAudioUrlRef.current) {
        currentAudioUrlRef.current = audioUrl;
        loadAudioRef.current();
      }
    }
  }, [audioUrl]); // Only depend on audioUrl

  // Sync sound state with soundRef
  useEffect(() => {
    if (soundRef.current && !sound) {
      setSound(soundRef.current);
    } else if (!soundRef.current && sound) {
      setSound(null);
    }
  }, [sound]);

  // Cleanup effect for when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup audio on unmount
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(err =>
          console.error('Failed to unload audio on cleanup:', err)
        );
      }
      // Cleanup downloaded file
      if (localAudioUriRef.current) {
        FileSystem.deleteAsync(localAudioUriRef.current, { idempotent: true }).catch(err =>
          console.error('Failed to cleanup local audio file:', err)
        );
      }
    };
  }, []); // Empty dependency array for cleanup on unmount only

  // Auto-start playback when audio is loaded (optional - commented out for manual control)
  // useEffect(() => {
  //   if (isLoaded && !isPlaying && !isLoading) {
  //     const timer = setTimeout(() => {
  //       togglePlayback();
  //     }, 500);

  //     return () => clearTimeout(timer);
  //   }
  // }, [isLoaded, isPlaying, isLoading, togglePlayback]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // const handleSeek = (value: number) => {
  //   setCurrentTime(value);
  //   // In a real app, you'd seek the audio to this position
  // };

  const skipBackward = async () => {
    if (!soundRef.current || !isLoaded) return;

    const newTime = Math.max(0, currentTime - 15);
    try {
      await soundRef.current.setPositionAsync(newTime * 1000);
      setCurrentTime(newTime);
    } catch (error) {
      console.error('Error seeking backward:', error);
    }
  };

  const skipForward = async () => {
    if (!soundRef.current || !isLoaded) return;

    const newTime = Math.min(totalTime, currentTime + 15);
    try {
      await soundRef.current.setPositionAsync(newTime * 1000);
      setCurrentTime(newTime);
    } catch (error) {
      console.error('Error seeking forward:', error);
    }
  };

  // Load liked items from AsyncStorage
  const loadLikedItems = useCallback(async () => {
    try {
      const likedItems = await AsyncStorage.getItem('likedItems');
      if (likedItems) {
        const parsedItems = JSON.parse(likedItems);
        // Check if current session is liked
        const itemKey = `${sessionTitle}_${audioUrl}`;
        setIsLiked(parsedItems.includes(itemKey));
      }
    } catch (error) {
      console.error('Error loading liked items:', error);
    }
  }, [sessionTitle, audioUrl]);

  // Check if audio is already downloaded
  const checkDownloadStatus = useCallback(async () => {
    try {
      const downloadedItems = await AsyncStorage.getItem('downloadedItems');
      if (downloadedItems) {
        const parsedDownloads = JSON.parse(downloadedItems);
        const existingDownload = parsedDownloads.find((item: any) =>
          item.title === sessionTitle && item.url === audioUrl
        );
        setDownloadComplete(!!existingDownload);
      }
    } catch (error) {
      console.error('Error checking download status:', error);
    }
  }, [sessionTitle, audioUrl]);

  // Save liked items to AsyncStorage
  const saveLikedItems = useCallback(async (items: string[]) => {
    try {
      await AsyncStorage.setItem('likedItems', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving liked items:', error);
    }
  }, []);

  // Toggle like status
  const toggleLike = useCallback(async () => {
    try {
      const likedItems = await AsyncStorage.getItem('likedItems');
      const parsedItems = likedItems ? JSON.parse(likedItems) : [];
      const itemKey = `${sessionTitle}_${audioUrl}`;

      let updatedItems;
      if (isLiked) {
        // Remove from likes
        updatedItems = parsedItems.filter((item: string) => item !== itemKey);
        setIsLiked(false);
      } else {
        // Add to likes
        updatedItems = [...parsedItems, itemKey];
        setIsLiked(true);
      }

      await saveLikedItems(updatedItems);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  }, [isLiked, sessionTitle, audioUrl, saveLikedItems]);

  // Download audio permanently to device
  const downloadAudio = useCallback(async () => {
    if (!audioUrl) {
      Alert.alert('Error', 'No audio URL available for download');
      return;
    }

    // Check if already downloaded
    if (downloadComplete) {
      Alert.alert('Already Downloaded', `"${sessionTitle}" is already saved to your device.`);
      return;
    }

    try {
      setIsDownloading(true);
      setDownloadComplete(false);

      console.log('📥 Starting permanent download for:', audioUrl);

      // Create a unique filename for permanent storage
      const cleanTitle = sessionTitle.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      const filename = `${cleanTitle}_${Date.now()}.mp3`;
      const localUri = `${FileSystem.documentDirectory!}downloads/${filename}`;

      // Ensure downloads directory exists
      const downloadsDir = `${FileSystem.documentDirectory!}downloads/`;
      await FileSystem.makeDirectoryAsync(downloadsDir, { intermediates: true });

      // Download with progress tracking
      const downloadResult = await FileSystem.downloadAsync(audioUrl, localUri, {
        headers: {
          'User-Agent': 'SilentMoon/1.0',
          'Accept': 'audio/*',
        }
      });

      console.log('Download completed:', downloadResult);

      if (downloadResult.status === 200) {
        setDownloadComplete(true);
        Alert.alert(
          'Download Complete',
          `Audio "${sessionTitle}" has been saved to your device.`,
          [{ text: 'OK' }]
        );

        // Store download record in AsyncStorage
        const downloadedItems = await AsyncStorage.getItem('downloadedItems');
        const parsedDownloads = downloadedItems ? JSON.parse(downloadedItems) : [];
        const downloadRecord = {
          title: sessionTitle,
          url: audioUrl,
          localUri: downloadResult.uri,
          downloadedAt: new Date().toISOString(),
          filename: filename
        };

        const updatedDownloads = [...parsedDownloads, downloadRecord];
        await AsyncStorage.setItem('downloadedItems', JSON.stringify(updatedDownloads));

      } else {
        throw new Error(`Download failed with status ${downloadResult.status}`);
      }
    } catch (error) {
      console.error('Download failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      Alert.alert(
        'Download Failed',
        `Failed to download audio: ${errorMessage}. Please check your internet connection and try again.`
      );
    } finally {
      setIsDownloading(false);
    }
  }, [audioUrl, sessionTitle, downloadComplete]);

  // Load liked state and download status when component mounts or session changes
  useEffect(() => {
    loadLikedItems();
    checkDownloadStatus();
  }, [loadLikedItems, checkDownloadStatus]);


  return (
    <View
      style={[styles.container, { backgroundColor: backgroundColor[0] }]}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <View style={styles.backNavigationContainer}>
            <BackNavigation style={styles.backNavigationStyle} />
          </View>
          <View style={styles.actionButtonsContainer}>
            <ActionButtons
              buttons={[
                {
                  iconName: isLiked ? 'favorite' : 'favorite-border',
                  onPress: toggleLike,
                  accessibilityLabel: isLiked ? 'Remove from favorites' : 'Add to favorites'
                },
                {
                  iconName: isDownloading ? 'hourglass-empty' : downloadComplete ? 'check-circle' : 'download',
                  onPress: downloadAudio,
                  accessibilityLabel: isDownloading ? 'Downloading...' : downloadComplete ? 'Downloaded' : 'Download'
                }
              ]}
              style={styles.actionButtonsStyle}
            />
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.sessionTitle}>{sessionTitle}</Text>
            <Text style={styles.duration}>
              {isLoading ? 'Loading audio...' : `${duration} minutes`}
            </Text>
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

            {/* Debug info and reload button */}
            {__DEV__ && (
              <View style={styles.debugContainer}>
                <Text style={styles.debugText}>
                  Status: {isLoading ? 'Loading...' : isLoaded ? 'Loaded' : 'Not loaded'}
                </Text>
                <TouchableOpacity
                  style={styles.debugButton}
                  onPress={() => {
                    setIsPlaying(false);
                    setIsLoaded(false);
                    loadAudio();
                  }}
                >
                  <Text style={styles.debugButtonText}>Reload Audio</Text>
                </TouchableOpacity>
              </View>
            )}

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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backNavigationContainer: {
    flex: 0.5,
  },
  backNavigationStyle: {
    position: 'relative',
    paddingTop: 0,
    paddingLeft: 0,
  },
  actionButtonsContainer: {
    flex: 0.5,
    alignItems: 'flex-end',
  },
  actionButtonsStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
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
  debugContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  debugText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginBottom: 8,
  },
  debugButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  debugButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});
