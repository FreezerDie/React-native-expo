// Audio data structure
export interface AudioCategory {
  id: string;
  title: string;
  description: string;
  emoji: string;
  gradient: string[];
  tracks: number;
  durationInMinutes: number;
  topicId: string;
  courseId: string;
  type: 'music' | 'meditation';
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  durationInMinutes: number;
  emoji: string;
  topicId: string;
  courseId: string;
}

// Music categories with topic and course IDs
export const AUDIO_CATEGORIES: AudioCategory[] = [
  {
    id: 'nature',
    title: 'Nature Sounds',
    description: 'Forest, rain, ocean waves',
    emoji: '🌿',
    gradient: ['#A8E6CF', '#52B788'],
    tracks: 25,
    durationInMinutes: 120,
    topicId: 'ambient-nature',
    courseId: 'nature-sounds-collection',
    type: 'music'
  },
  {
    id: 'ambient',
    title: 'Ambient',
    description: 'Calming electronic tones',
    emoji: '🌊',
    gradient: ['#667EEA', '#764BA2'],
    tracks: 18,
    durationInMinutes: 90,
    topicId: 'lo-fi-chill',
    courseId: 'ambient-electronic-series',
    type: 'music'
  },
  {
    id: 'instrumental',
    title: 'Instrumental',
    description: 'Piano, guitar, strings',
    emoji: '🎵',
    gradient: ['#F093FB', '#F5576C'],
    tracks: 32,
    durationInMinutes: 160,
    topicId: 'piano-serenades',
    courseId: 'instrumental-masterpieces',
    type: 'music'
  },
  {
    id: 'meditation-bells',
    title: 'Meditation Bells',
    description: 'Tibetan bowls and chimes',
    emoji: '🔔',
    gradient: ['#4ECDC4', '#44A08D'],
    tracks: 15,
    durationInMinutes: 75,
    topicId: 'tibetan-singing-bowls',
    courseId: 'meditation-bells-collection',
    type: 'meditation'
  },
];

// Helper functions for audio data
export const getAudioCategoriesByType = (type: AudioCategory['type']) => {
  return AUDIO_CATEGORIES.filter(category => category.type === type);
};

export const getAudioTracksByCourseId = (courseId: string) => {
  return COURSE_AUDIO_TRACKS.filter(track => track.courseId === courseId);
};

// Popular tracks with topic and course IDs
export const POPULAR_TRACKS: AudioTrack[] = [
  {
    id: 'rain-forest',
    title: 'Rain in the Forest',
    artist: 'Nature Sounds',
    duration: '∞',
    durationInMinutes: 0,
    emoji: '🌧️',
    topicId: 'ambient-nature',
    courseId: 'nature-sounds-collection'
  },
  {
    id: 'ocean-waves',
    title: 'Ocean Waves',
    artist: 'Coastal Collection',
    duration: '∞',
    durationInMinutes: 0,
    emoji: '🌊',
    topicId: 'ocean-waves',
    courseId: 'nature-sounds-collection'
  },
  {
    id: 'deep-space',
    title: 'Deep Space',
    artist: 'Ambient Collective',
    duration: '45:32',
    durationInMinutes: 46,
    emoji: '🌌',
    topicId: 'lo-fi-chill',
    courseId: 'ambient-electronic-series'
  },
  {
    id: 'mountain-stream',
    title: 'Mountain Stream',
    artist: 'Nature Sounds',
    duration: '∞',
    durationInMinutes: 0,
    emoji: '🏔️',
    topicId: 'ambient-nature',
    courseId: 'nature-sounds-collection'
  },
];

// Course-specific audio tracks
export const COURSE_AUDIO_TRACKS: AudioTrack[] = [
  // Mindfulness Basics course tracks
  {
    id: 'mindfulness-session-1',
    title: 'Breathing Awareness',
    artist: 'Sarah Johnson',
    duration: '12:34',
    durationInMinutes: 13,
    emoji: '🫁',
    topicId: 'mindfulness-basics',
    courseId: 'mindfulness-basics'
  },
  {
    id: 'mindfulness-session-2',
    title: 'Body Scan Meditation',
    artist: 'Sarah Johnson',
    duration: '18:45',
    durationInMinutes: 19,
    emoji: '🧘',
    topicId: 'mindfulness-basics',
    courseId: 'mindfulness-basics'
  },
  {
    id: 'mindfulness-session-3',
    title: 'Mindful Walking',
    artist: 'Sarah Johnson',
    duration: '15:22',
    durationInMinutes: 16,
    emoji: '🚶',
    topicId: 'mindfulness-basics',
    courseId: 'mindfulness-basics'
  },

  // Daily Meditation course tracks
  {
    id: 'daily-meditation-1',
    title: 'Morning Awakening',
    artist: 'Michael Chen',
    duration: '10:15',
    durationInMinutes: 11,
    emoji: '🌅',
    topicId: 'daily-meditation',
    courseId: 'daily-meditation'
  },
  {
    id: 'daily-meditation-2',
    title: 'Evening Wind Down',
    artist: 'Michael Chen',
    duration: '12:30',
    durationInMinutes: 13,
    emoji: '🌙',
    topicId: 'daily-meditation',
    courseId: 'daily-meditation'
  },
  {
    id: 'daily-meditation-3',
    title: 'Gratitude Practice',
    artist: 'Michael Chen',
    duration: '8:45',
    durationInMinutes: 9,
    emoji: '🙏',
    topicId: 'daily-meditation',
    courseId: 'daily-meditation'
  },

  // Stress Relief Mastery course tracks
  {
    id: 'stress-relief-1',
    title: 'Progressive Muscle Relaxation',
    artist: 'Dr. Emma Wilson',
    duration: '20:15',
    durationInMinutes: 21,
    emoji: '💪',
    topicId: 'stress-relief',
    courseId: 'stress-relief-course'
  },
  {
    id: 'stress-relief-2',
    title: 'Breathwork for Stress',
    artist: 'Dr. Emma Wilson',
    duration: '15:30',
    durationInMinutes: 16,
    emoji: '🫁',
    topicId: 'stress-relief',
    courseId: 'stress-relief-course'
  },
  {
    id: 'stress-relief-3',
    title: 'Mindful Stress Response',
    artist: 'Dr. Emma Wilson',
    duration: '18:45',
    durationInMinutes: 19,
    emoji: '🧠',
    topicId: 'stress-relief',
    courseId: 'stress-relief-course'
  },

  // Sleep Stories course tracks
  {
    id: 'sleep-story-1',
    title: 'Peaceful Forest Journey',
    artist: 'James Parker',
    duration: '25:10',
    durationInMinutes: 26,
    emoji: '🌲',
    topicId: 'sleep-stories',
    courseId: 'sleep-stories'
  },
  {
    id: 'sleep-story-2',
    title: 'Ocean Dreams',
    artist: 'James Parker',
    duration: '22:30',
    durationInMinutes: 23,
    emoji: '🌊',
    topicId: 'sleep-stories',
    courseId: 'sleep-stories'
  },
  {
    id: 'sleep-story-3',
    title: 'Mountain Retreat',
    artist: 'James Parker',
    duration: '19:45',
    durationInMinutes: 20,
    emoji: '🏔️',
    topicId: 'sleep-stories',
    courseId: 'sleep-stories'
  },

  // Focus Enhancement course tracks
  {
    id: 'focus-session-1',
    title: 'Concentration Building',
    artist: 'Lisa Thompson',
    duration: '16:20',
    durationInMinutes: 17,
    emoji: '🎯',
    topicId: 'focus-enhancement',
    courseId: 'focus-enhancement'
  },
  {
    id: 'focus-session-2',
    title: 'Attention Training',
    artist: 'Lisa Thompson',
    duration: '14:15',
    durationInMinutes: 15,
    emoji: '🧠',
    topicId: 'focus-enhancement',
    courseId: 'focus-enhancement'
  },
  {
    id: 'focus-session-3',
    title: 'Mental Clarity',
    artist: 'Lisa Thompson',
    duration: '12:40',
    durationInMinutes: 13,
    emoji: '✨',
    topicId: 'focus-enhancement',
    courseId: 'focus-enhancement'
  },

  // Nature Sounds Collection tracks
  {
    id: 'nature-wind-chimes',
    title: 'Wind Chimes in Garden',
    artist: 'Nature Sounds',
    duration: '∞',
    durationInMinutes: 0,
    emoji: '🎐',
    topicId: 'ambient-nature',
    courseId: 'nature-sounds-collection'
  },
  {
    id: 'nature-birds',
    title: 'Morning Birds',
    artist: 'Nature Sounds',
    duration: '∞',
    durationInMinutes: 0,
    emoji: '🐦',
    topicId: 'ambient-nature',
    courseId: 'nature-sounds-collection'
  },

  // Meditation Bells tracks
  {
    id: 'tibetan-bowl-1',
    title: 'Tibetan Singing Bowl - OM',
    artist: 'Tibetan Masters',
    duration: '15:30',
    durationInMinutes: 16,
    emoji: '🔔',
    topicId: 'tibetan-singing-bowls',
    courseId: 'meditation-bells-collection'
  },
  {
    id: 'tibetan-bowl-2',
    title: 'Crystal Bowl Meditation',
    artist: 'Tibetan Masters',
    duration: '12:45',
    durationInMinutes: 13,
    emoji: '🔮',
    topicId: 'tibetan-singing-bowls',
    courseId: 'meditation-bells-collection'
  },

  // Ambient Meditation tracks
  {
    id: 'ambient-drone',
    title: 'Cosmic Drone',
    artist: 'Ambient Collective',
    duration: '30:15',
    durationInMinutes: 31,
    emoji: '🌌',
    topicId: 'lo-fi-chill',
    courseId: 'ambient-electronic-series'
  },
  {
    id: 'ambient-piano',
    title: 'Floating Piano',
    artist: 'Ambient Collective',
    duration: '25:20',
    durationInMinutes: 26,
    emoji: '🎹',
    topicId: 'piano-serenades',
    courseId: 'ambient-electronic-series'
  }
];