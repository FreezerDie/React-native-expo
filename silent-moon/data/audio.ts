// Audio data structure
export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  durationInMinutes: number;
  emoji: string;
  topicId: string;
  courseId: string;
  type: string;
  gradient: string[];
  url: string;
}

// S3 Audio URLs array
export const S3_AUDIO_URLS = [
  'https://s3.tebi.io/silent-moon/audio/Alberto%20Benati%20-%20Glittering%20Key.mp3',
  'https://s3.tebi.io/silent-moon/audio/Alberto%20Benati%20-%20Night%20Before.mp3',
  'https://s3.tebi.io/silent-moon/audio/Alberto%20Benati%20-%20Northern%20Star.mp3',
  'https://s3.tebi.io/silent-moon/audio/Alberto%20Benati%20-%20Rain%20Forest.mp3',
  'https://s3.tebi.io/silent-moon/audio/Daniel%20Crane%20-%20Sundance.mp3',
  'https://s3.tebi.io/silent-moon/audio/Limitless%20-%20Japan%20Relaxing.mp3',
  'https://s3.tebi.io/silent-moon/audio/Limitless%20-%20The%20Healing%20Stone.mp3',
  'https://s3.tebi.io/silent-moon/audio/Vivian%20%20Giovani%20-%20Sunny%20Fields.mp3',
  'https://s3.tebi.io/silent-moon/audio/Vlasta%20Marek%20-%20Life.mp3',
  'https://s3.tebi.io/silent-moon/audio/autumn-sky-meditation-7618.mp3',
  'https://s3.tebi.io/silent-moon/audio/meditation-background-music-386976.mp3',
  'https://s3.tebi.io/silent-moon/audio/meditation-blue-138131.mp3',
  'https://s3.tebi.io/silent-moon/audio/meditation-music-256141.mp3',
  'https://s3.tebi.io/silent-moon/audio/meditation-music-289149.mp3',
  'https://s3.tebi.io/silent-moon/audio/meditation-music-338902.mp3',
  'https://s3.tebi.io/silent-moon/audio/meditation-music-without-nature-sound-256142.mp3',
  'https://s3.tebi.io/silent-moon/audio/meditation-relax-406595.mp3',
  'https://s3.tebi.io/silent-moon/audio/meditation-relax-with-nature-sound-406596.mp3',
  'https://s3.tebi.io/silent-moon/audio/meditation-relaxing-music-background-320405.mp3',
  'https://s3.tebi.io/silent-moon/audio/meditation-spiritual-music-330169.mp3'
];

// Function to get a random S3 URL for audio tracks
export const getRandomS3Url = (): string => {
  const randomIndex = Math.floor(Math.random() * S3_AUDIO_URLS.length);
  return S3_AUDIO_URLS[randomIndex];
};

// Helper functions for audio data
export const getAudioTracksByCourseId = (courseId: string) => {
  return AUDIO_TRACKS.filter(track => track.courseId === courseId);
};

export const getAudioTracksByType = (type: string) => {
  return AUDIO_TRACKS.filter(track => track.type === type);
};

// Generate random gradient colors
const generateRandomGradient = (): [string, string] => {
  const colors = [
    '#FF6B6B', '#EE5A52', '#6C5CE7', '#A29BFE', '#A8E6CF', '#52B788',
    '#F093FB', '#F5576C', '#4ECDC4', '#44A08D', '#667EEA', '#764BA2',
    '#45B7D1', '#96CEB4', '#FDCB6E', '#E17055', '#FD79A8', '#E84393',
    '#74B9FF', '#0984E3', '#00B894', '#00CEC9', '#E17055', '#D63031',
    '#FD79A8', '#E84393', '#6C5CE7', '#A29BFE', '#FD79A8', '#E84393'
  ];

  const color1 = colors[Math.floor(Math.random() * colors.length)];
  let color2 = colors[Math.floor(Math.random() * colors.length)];

  // Ensure different colors for gradient
  while (color2 === color1) {
    color2 = colors[Math.floor(Math.random() * colors.length)];
  }

  return [color1, color2];
};



// Course-specific audio tracks
export const AUDIO_TRACKS: AudioTrack[] = [
  // Mindfulness Basics course tracks
  {
    id: 'mindfulness-session-1',
    title: 'Breathing Awareness',
    artist: 'Sarah Johnson',
    duration: '12:34',
    durationInMinutes: 13,
    emoji: '🫁',
    topicId: 'mindfulness-basics',
    courseId: 'mindfulness-basics',
    type: 'meditation',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()
  },
  {
    id: 'mindfulness-session-2',
    title: 'Body Scan Meditation',
    artist: 'Sarah Johnson',
    duration: '18:45',
    durationInMinutes: 19,
    emoji: '🧘',
    topicId: 'mindfulness-basics',
    courseId: 'mindfulness-basics',
    type: 'meditation',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()
  },
  {
    id: 'mindfulness-session-3',
    title: 'Mindful Walking',
    artist: 'Sarah Johnson',
    duration: '15:22',
    durationInMinutes: 16,
    emoji: '🚶',
    topicId: 'mindfulness-basics',
    courseId: 'mindfulness-basics',
    type: 'meditation',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()
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
    courseId: 'daily-meditation',
    type: 'music',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()
  },
  {
    id: 'daily-meditation-2',
    title: 'Evening Wind Down',
    artist: 'Michael Chen',
    duration: '12:30',
    durationInMinutes: 13,
    emoji: '🌙',
    topicId: 'daily-meditation',
    courseId: 'daily-meditation',
    type: 'music',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()
  },
  {
    id: 'daily-meditation-3',
    title: 'Gratitude Practice',
    artist: 'Michael Chen',
    duration: '8:45',
    durationInMinutes: 9,
    emoji: '🙏',
    topicId: 'daily-meditation',
    courseId: 'daily-meditation',
    type: 'music',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()
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
    courseId: 'stress-relief-course',
    type: 'music',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()
  },
  {
    id: 'stress-relief-2',
    title: 'Breathwork for Stress',
    artist: 'Dr. Emma Wilson',
    duration: '15:30',
    durationInMinutes: 16,
    emoji: '🫁',
    topicId: 'stress-relief',
    courseId: 'stress-relief-course',
    type: 'music',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()
  },
  {
    id: 'stress-relief-3',
    title: 'Mindful Stress Response',
    artist: 'Dr. Emma Wilson',
    duration: '18:45',
    durationInMinutes: 19,
    emoji: '🧠',
    topicId: 'stress-relief',
    courseId: 'stress-relief-course',
    type: 'music',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()
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
    courseId: 'sleep-stories',
    type: 'music',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()
  },
  {
    id: 'sleep-story-2',
    title: 'Ocean Dreams',
    artist: 'James Parker',
    duration: '22:30',
    durationInMinutes: 23,
    emoji: '🌊',
    topicId: 'sleep-stories',
    courseId: 'sleep-stories',
    type: 'music',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()
  },
  {
    id: 'sleep-story-3',
    title: 'Mountain Retreat',
    artist: 'James Parker',
    duration: '19:45',
    durationInMinutes: 20,
    emoji: '🏔️',
    topicId: 'sleep-stories',
    courseId: 'sleep-stories',
    type: 'music',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()

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
    courseId: 'focus-enhancement',
    type: 'music',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()
  },
  {
    id: 'focus-session-2',
    title: 'Attention Training',
    artist: 'Lisa Thompson',
    duration: '14:15',
    durationInMinutes: 15,
    emoji: '🧠',
    topicId: 'focus-enhancement',
    courseId: 'focus-enhancement',
    type: 'music',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()
  },
  {
    id: 'focus-session-3',
    title: 'Mental Clarity',
    artist: 'Lisa Thompson',
    duration: '12:40',
    durationInMinutes: 13,
    emoji: '✨',
    topicId: 'focus-enhancement',
    courseId: 'focus-enhancement',
    type: 'meditation',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()

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
    courseId: 'nature-sounds-collection',
    type: 'music',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()
  },
  {
    id: 'nature-birds',
    title: 'Morning Birds',
    artist: 'Nature Sounds',
    duration: '∞',
    durationInMinutes: 0,
    emoji: '🐦',
    topicId: 'ambient-nature',
    courseId: 'nature-sounds-collection',
    type: 'meditation',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()
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
    courseId: 'meditation-bells-collection',
    type: 'meditation',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()
  },
  {
    id: 'tibetan-bowl-2',
    title: 'Crystal Bowl Meditation',
    artist: 'Tibetan Masters',
    duration: '12:45',
    durationInMinutes: 13,
    emoji: '🔮',
    topicId: 'tibetan-singing-bowls',
    courseId: 'meditation-bells-collection',
    type: 'meditation',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()
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
    courseId: 'ambient-electronic-series',
    type: 'music',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()
  },
  {
    id: 'ambient-piano',
    title: 'Floating Piano',
    artist: 'Ambient Collective',
    duration: '25:20',
    durationInMinutes: 26,
    emoji: '🎹',
    topicId: 'piano-serenades',
    courseId: 'ambient-electronic-series',
    type: 'meditation',
    gradient: generateRandomGradient(),
    url: getRandomS3Url()
  }
];

// Audio categories for music screen
export const AUDIO_CATEGORIES = [
  {
    id: 'nature',
    title: 'Nature Sounds',
    tracks: 4,
    gradient: ['#A8E6CF', '#52B788']
  },
  {
    id: 'meditation',
    title: 'Meditation',
    tracks: 8,
    gradient: ['#6C5CE7', '#A29BFE']
  },
  {
    id: 'music',
    title: 'Ambient Music',
    tracks: 12,
    gradient: ['#F093FB', '#F5576C']
  },
  {
    id: 'sleep',
    title: 'Sleep Stories',
    tracks: 3,
    gradient: ['#667EEA', '#764BA2']
  }
];

// Popular tracks for music screen
export const POPULAR_TRACKS = AUDIO_TRACKS.slice(0, 5);