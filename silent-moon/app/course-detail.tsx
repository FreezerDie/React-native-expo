import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useThemeColor } from '@/hooks/use-theme-color';
import { getCourseById } from '@/data/courses';
import { getAudioTracksByCourseId } from '@/data/audio';
import BackNavigation from '@/components/BackNavigation';

const { width } = Dimensions.get('window');

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textSecondary = useThemeColor({}, 'textSecondary');

  const course = getCourseById(id || '');
  const audioTracks = getAudioTracksByCourseId(id || '');

  if (!course) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <SafeAreaView style={styles.safeArea}>
          {/* Back Navigation Overlay */}
          <BackNavigation />
          <View style={[styles.errorContainer, styles.overlayContent]}>
            <Text style={[styles.errorText, { color: textColor }]}>Course not found</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDuration = (duration: string, durationInMinutes: number) => {
    if (duration === '∞') return '∞';
    return duration;
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SafeAreaView style={styles.safeArea}>
        {/* Back Navigation Overlay */}
        <BackNavigation />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Cover Image */}
          <View style={styles.coverImageContainer}>
            <Image
              source={{ uri: course.coverImage }}
              style={styles.coverImage}
              resizeMode="cover"
            />
            <View style={[styles.coverOverlay, { backgroundColor: course.gradient[0] + '80' }]} />
          </View>

          {/* Course Info */}
          <View style={styles.contentContainer}>
            <Text style={[styles.courseTitle, { color: textColor }]}>{course.title}</Text>
            <Text style={[styles.courseType, { color: textSecondary }]}>Course</Text>

            <Text style={[styles.courseDescription, { color: textColor }]}>
              {course.description}
            </Text>

            {/* Stats Row */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Ionicons name="heart" size={20} color="#FF6B6B" />
                <Text style={[styles.statText, { color: textSecondary }]}>
                  {formatNumber(course.favorites)} favorites
                </Text>
              </View>

              <View style={styles.statItem}>
                <Ionicons name="headset" size={20} color="#4ECDC4" />
                <Text style={[styles.statText, { color: textSecondary }]}>
                  {formatNumber(course.listeningCount)} listens
                </Text>
              </View>
            </View>

            {/* Instructor Info */}
            {course.instructor && (
              <View style={styles.instructorContainer}>
                <Ionicons name="person-circle" size={24} color={textSecondary} />
                <Text style={[styles.instructorText, { color: textSecondary }]}>
                  Instructor: {course.instructor}
                </Text>
              </View>
            )}

            {/* Audio Tracks List */}
            <View style={styles.audioSection}>
              <Text style={[styles.sectionTitle, { color: textColor }]}>
                Audio Sessions ({audioTracks.length})
              </Text>

              {audioTracks.length > 0 ? (
                <View style={styles.audioList}>
                  {audioTracks.map((track, index) => (
                    <TouchableOpacity
                      key={track.id}
                      style={[
                        styles.audioTrack,
                        index === audioTracks.length - 1 ? styles.audioTrackLast : null
                      ]}
                      onPress={() => {
                        // Navigate to player screen with track details
                        router.push({
                          pathname: '/player/meditation',
                          params: {
                            sessionTitle: track.title,
                            duration: track.durationInMinutes.toString()
                          }
                        });
                      }}
                    >
                      <View style={styles.trackLeft}>
                        <TouchableOpacity
                          style={styles.playButton}
                          onPress={() => {
                            // Navigate to player screen with track details
                            router.push({
                              pathname: '/player/meditation',
                              params: {
                                sessionTitle: track.title,
                                duration: track.durationInMinutes.toString()
                              }
                            });
                          }}
                        >
                          <Ionicons name="play" size={16} color="#FFFFFF" />
                        </TouchableOpacity>
                        <View style={styles.trackInfo}>
                          <Text style={[styles.trackTitle, { color: textColor }]}>
                            {track.title}
                          </Text>
                          <Text style={[styles.trackArtist, { color: textSecondary }]}>
                            {track.artist}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.trackRight}>
                        <Text style={[styles.trackDuration, { color: textSecondary }]}>
                          {formatDuration(track.duration, track.durationInMinutes)}
                        </Text>
                        <TouchableOpacity style={styles.moreButton}>
                          <Ionicons name="ellipsis-vertical" size={16} color={textSecondary} />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View style={styles.noTracksContainer}>
                  <Ionicons name="musical-notes" size={48} color={textSecondary} />
                  <Text style={[styles.noTracksText, { color: textSecondary }]}>
                    No audio tracks available for this course
                  </Text>
                </View>
              )}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  overlayContent: {
    paddingTop: 0, // Space for the overlay back button
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0, // Space for the overlay back button
  },
  coverImageContainer: {
    width: width,
    height: 280,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  courseTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 34,
  },
  courseType: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  courseDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 14,
    fontWeight: '500',
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    gap: 12,
  },
  instructorText: {
    fontSize: 14,
    fontWeight: '500',
  },
  audioSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  audioList: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  audioTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  audioTrackLast: {
    borderBottomWidth: 0,
  },
  trackLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  trackArtist: {
    fontSize: 14,
    opacity: 0.8,
  },
  trackRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  trackDuration: {
    fontSize: 14,
    fontWeight: '500',
    minWidth: 50,
    textAlign: 'right',
  },
  moreButton: {
    padding: 4,
  },
  noTracksContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  noTracksText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    opacity: 0.7,
  },
});
