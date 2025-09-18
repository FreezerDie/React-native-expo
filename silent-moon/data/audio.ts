// Audio data structure
export interface AudioCategory {
  id: string;
  title: string;
  description: string;
  emoji: string;
  gradient: string[];
  tracks: number;
  topicId: string;
  courseId: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
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
    topicId: 'ambient-nature',
    courseId: 'nature-sounds-collection'
  },
  {
    id: 'ambient',
    title: 'Ambient',
    description: 'Calming electronic tones',
    emoji: '🌊',
    gradient: ['#667EEA', '#764BA2'],
    tracks: 18,
    topicId: 'lo-fi-chill',
    courseId: 'ambient-electronic-series'
  },
  {
    id: 'instrumental',
    title: 'Instrumental',
    description: 'Piano, guitar, strings',
    emoji: '🎵',
    gradient: ['#F093FB', '#F5576C'],
    tracks: 32,
    topicId: 'piano-serenades',
    courseId: 'instrumental-masterpieces'
  },
  {
    id: 'meditation-bells',
    title: 'Meditation Bells',
    description: 'Tibetan bowls and chimes',
    emoji: '🔔',
    gradient: ['#4ECDC4', '#44A08D'],
    tracks: 15,
    topicId: 'tibetan-singing-bowls',
    courseId: 'meditation-bells-collection'
  },
];

// Popular tracks with topic and course IDs
export const POPULAR_TRACKS: AudioTrack[] = [
  {
    id: 'rain-forest',
    title: 'Rain in the Forest',
    artist: 'Nature Sounds',
    duration: '∞',
    emoji: '🌧️',
    topicId: 'ambient-nature',
    courseId: 'nature-sounds-collection'
  },
  {
    id: 'ocean-waves',
    title: 'Ocean Waves',
    artist: 'Coastal Collection',
    duration: '∞',
    emoji: '🌊',
    topicId: 'ocean-waves',
    courseId: 'nature-sounds-collection'
  },
  {
    id: 'deep-space',
    title: 'Deep Space',
    artist: 'Ambient Collective',
    duration: '45:32',
    emoji: '🌌',
    topicId: 'lo-fi-chill',
    courseId: 'ambient-electronic-series'
  },
  {
    id: 'mountain-stream',
    title: 'Mountain Stream',
    artist: 'Nature Sounds',
    duration: '∞',
    emoji: '🏔️',
    topicId: 'ambient-nature',
    courseId: 'nature-sounds-collection'
  },
];
