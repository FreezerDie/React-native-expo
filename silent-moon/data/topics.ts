import { Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
export const COLUMN_WIDTH = (screenWidth - 48 - 16) / 2; // 48 for padding, 16 for gap

// Topic types
export type TopicType = 'meditation' | 'music_meditation' | 'music_relaxation' | 'focus' | 'sleep' | 'anxiety' | 'stress' | 'growth';

// Topic data structure
export interface Topic {
  id: string;
  title: string;
  emoji: string;
  color: string;
  description: string;
  type: TopicType;
  height: number;
  category: string;
  added_to_favorites_count: number;
  listening_count: number;
}

// Dummy data for topics with different categories
export const TOPICS_DATA: Topic[] = [
  // Meditation Topics
  {
    id: 'mindfulness',
    title: 'Mindfulness',
    emoji: '',
    color: '#8B5CF6',
    description: 'Practice present moment awareness',
    type: 'meditation' as TopicType,
    height: 140,
    category: 'Meditation',
    added_to_favorites_count: 1247,
    listening_count: 8956
  },
  {
    id: 'stress-relief',
    title: 'Stress Relief',
    emoji: '',
    color: '#10B981',
    description: 'Find calm in the chaos of daily life',
    type: 'meditation' as TopicType,
    height: 150,
    category: 'Meditation',
    added_to_favorites_count: 2156,
    listening_count: 15432
  },
  {
    id: 'anxiety-management',
    title: 'Anxiety Management',
    emoji: '',
    color: '#F59E0B',
    description: 'Manage worry and find inner peace',
    type: 'anxiety' as TopicType,
    height: 130,
    category: 'Meditation',
    added_to_favorites_count: 1893,
    listening_count: 12345
  },

  // Music Meditation Topics
  {
    id: 'tibetan-singing-bowls',
    title: 'Tibetan Singing Bowls',
    emoji: '',
    color: '#7C3AED',
    description: 'Ancient healing frequencies for deep meditation',
    type: 'music_meditation' as TopicType,
    height: 160,
    category: 'Music Meditation',
    added_to_favorites_count: 3421,
    listening_count: 28756
  },
  {
    id: 'binaural-beats',
    title: 'Binaural Beats',
    emoji: '',
    color: '#EC4899',
    description: 'Brainwave entrainment for focus and relaxation',
    type: 'music_meditation' as TopicType,
    height: 145,
    category: 'Music Meditation',
    added_to_favorites_count: 4567,
    listening_count: 32145
  },
  {
    id: 'chakra-balancing',
    title: 'Chakra Balancing',
    emoji: '',
    color: '#EF4444',
    description: 'Harmonize your energy centers with sound',
    type: 'music_meditation' as TopicType,
    height: 155,
    category: 'Music Meditation',
    added_to_favorites_count: 2987,
    listening_count: 19876
  },

  // Music Relaxation Topics
  {
    id: 'ambient-nature',
    title: 'Ambient Nature',
    emoji: '',
    color: '#059669',
    description: 'Soothing nature sounds for deep relaxation',
    type: 'music_relaxation' as TopicType,
    height: 135,
    category: 'Music Relaxation',
    added_to_favorites_count: 5234,
    listening_count: 45678
  },
  {
    id: 'piano-serenades',
    title: 'Piano Serenades',
    emoji: '',
    color: '#0891B2',
    description: 'Gentle piano melodies for peaceful moments',
    type: 'music_relaxation' as TopicType,
    height: 165,
    category: 'Music Relaxation',
    added_to_favorites_count: 6789,
    listening_count: 54321
  },
  {
    id: 'lo-fi-chill',
    title: 'Lo-Fi Chill',
    emoji: '',
    color: '#7C2D12',
    description: 'Chill beats perfect for background listening',
    type: 'music_relaxation' as TopicType,
    height: 140,
    category: 'Music Relaxation',
    added_to_favorites_count: 7891,
    listening_count: 67890
  },
  {
    id: 'classical-calm',
    title: 'Classical Calm',
    emoji: '',
    color: '#BE185D',
    description: 'Timeless classical pieces for serenity',
    type: 'music_relaxation' as TopicType,
    height: 150,
    category: 'Music Relaxation',
    added_to_favorites_count: 3456,
    listening_count: 29876
  },
  {
    id: 'ocean-waves',
    title: 'Ocean Waves',
    emoji: '',
    color: '#0369A1',
    description: 'Rhythmic waves for ultimate relaxation',
    type: 'music_relaxation' as TopicType,
    height: 140,
    category: 'Music Relaxation',
    added_to_favorites_count: 4123,
    listening_count: 36789
  },

  // Focus and Performance Topics
  {
    id: 'concentration',
    title: 'Concentration',
    emoji: '',
    color: '#DC2626',
    description: 'Sharpen your focus and mental clarity',
    type: 'focus' as TopicType,
    height: 150,
    category: 'Focus',
    added_to_favorites_count: 3876,
    listening_count: 32456
  },
  {
    id: 'productivity-boost',
    title: 'Productivity Boost',
    emoji: '',
    color: '#EA580C',
    description: 'Enhance performance and get things done',
    type: 'focus' as TopicType,
    height: 145,
    category: 'Focus',
    added_to_favorites_count: 4123,
    listening_count: 35123
  },

  // Sleep Topics
  {
    id: 'deep-sleep',
    title: 'Deep Sleep',
    emoji: '',
    color: '#1E293B',
    description: 'Rest deeply and wake refreshed',
    type: 'sleep' as TopicType,
    height: 130,
    category: 'Sleep',
    added_to_favorites_count: 5678,
    listening_count: 48901
  },
  {
    id: 'sleep-stories',
    title: 'Sleep Stories',
    emoji: '',
    color: '#374151',
    description: 'Guided narratives for peaceful slumber',
    type: 'sleep' as TopicType,
    height: 155,
    category: 'Sleep',
    added_to_favorites_count: 4234,
    listening_count: 37654
  },

  // Personal Growth Topics
  {
    id: 'self-awareness',
    title: 'Self Awareness',
    emoji: '',
    color: '#92400E',
    description: 'Develop deeper understanding of yourself',
    type: 'growth' as TopicType,
    height: 160,
    category: 'Personal Growth',
    added_to_favorites_count: 2987,
    listening_count: 23456
  },
  {
    id: 'mindful-breathing',
    title: 'Mindful Breathing',
    emoji: '',
    color: '#0D9488',
    description: 'Master the art of conscious breathing',
    type: 'meditation' as TopicType,
    height: 135,
    category: 'Meditation',
    added_to_favorites_count: 3456,
    listening_count: 27890
  },
  {
    id: 'positive-affirmations',
    title: 'Positive Affirmations',
    emoji: '',
    color: '#7C2D12',
    description: 'Build confidence with empowering thoughts',
    type: 'growth' as TopicType,
    height: 170,
    category: 'Personal Growth',
    added_to_favorites_count: 2876,
    listening_count: 21345
  }
];

// Helper functions for category badges
export const getCategoryBadgeText = (type: TopicType): string => {
  switch (type) {
    case 'meditation':
      return 'Meditation';
    case 'music_meditation':
      return 'Music Med.';
    case 'music_relaxation':
      return 'Music Relax';
    case 'focus':
      return 'Focus';
    case 'sleep':
      return 'Sleep';
    case 'anxiety':
      return 'Anxiety';
    case 'stress':
      return 'Stress';
    case 'growth':
      return 'Growth';
    default:
      return '';
  }
};

export const getCategoryBadgeStyle = (type: TopicType): string => {
  switch (type) {
    case 'music_meditation':
      return 'badgeMusicMeditation';
    case 'music_relaxation':
      return 'badgeMusicRelaxation';
    default:
      return 'badgeDefault';
  }
};

export const getTopicColor = (type: TopicType): string => {
  switch (type) {
    case 'meditation':
      return '#8B5CF6';
    case 'music_meditation':
      return '#7C3AED';
    case 'music_relaxation':
      return '#059669';
    case 'focus':
      return '#DC2626';
    case 'sleep':
      return '#1E293B';
    case 'anxiety':
      return '#F59E0B';
    case 'stress':
      return '#10B981';
    case 'growth':
      return '#92400E';
    default:
      return '#8B5CF6';
  }
};
