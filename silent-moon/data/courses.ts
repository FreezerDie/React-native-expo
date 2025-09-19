// Course data structure and dummy data
export interface Course {
  id: string;
  title: string;
  type: 'course' | 'music' | 'meditation';
  description: string;
  emoji: string;
  coverImage: string;
  gradient: string[];
  duration: string;
  durationInMinutes: number;
  sessions: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  instructor?: string;
  rating: number;
  enrolled: number;
  favorites: number;
  listeningCount: number;
}

// Dummy course data
export const COURSES_DATA: Course[] = [
  {
    id: 'mindfulness-basics',
    title: 'Mindfulness Basics',
    type: 'course',
    description: 'Learn the fundamentals of mindfulness meditation with guided sessions designed to help you develop awareness, reduce stress, and cultivate inner peace through simple breathing techniques and body scan exercises.',
    emoji: '📚',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    gradient: ['#FF6B6B', '#EE5A52'],
    duration: '2 weeks',
    durationInMinutes: 40,
    sessions: 14,
    level: 'beginner',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    enrolled: 1250,
    favorites: 856,
    listeningCount: 2450,
  },
  {
    id: 'nature-sounds-collection',
    title: 'Nature Sounds',
    type: 'music',
    description: 'Immerse yourself in the soothing sounds of nature. From gentle rain showers to ocean waves and forest ambiances, these recordings will help you relax and find inner peace in the natural world.',
    emoji: '🌿',
    coverImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    gradient: ['#6C5CE7', '#A29BFE'],
    duration: '∞',
    durationInMinutes: 30,
    sessions: 25,
    level: 'beginner',
    rating: 4.9,
    enrolled: 3200,
    favorites: 2150,
    listeningCount: 8900,
  },
  {
    id: 'daily-meditation',
    title: 'Daily Meditation',
    type: 'meditation',
    description: 'Start your day with intention through guided meditation sessions. These practices are designed to help you cultivate mindfulness, reduce anxiety, and develop a deeper sense of calm and clarity.',
    emoji: '🧘',
    coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    gradient: ['#A8E6CF', '#52B788'],
    duration: '10-30 min',
    durationInMinutes: 20,
    sessions: 30,
    level: 'intermediate',
    instructor: 'Michael Chen',
    rating: 4.7,
    enrolled: 2100,
    favorites: 1420,
    listeningCount: 5200,
  },
  {
    id: 'stress-relief-course',
    title: 'Stress Relief Mastery',
    type: 'course',
    description: 'Master the art of stress management with this comprehensive course. Learn proven techniques to identify stress triggers, develop coping strategies, and create lasting changes for a more balanced life.',
    emoji: '🌸',
    coverImage: 'https://images.unsplash.com/photo-1499209979604-b4c0556fa7b?w=400&h=300&fit=crop',
    gradient: ['#F093FB', '#F5576C'],
    duration: '4 weeks',
    durationInMinutes: 80,
    sessions: 28,
    level: 'intermediate',
    instructor: 'Dr. Emma Wilson',
    rating: 4.6,
    enrolled: 890,
    favorites: 623,
    listeningCount: 1850,
  },
  {
    id: 'sleep-stories',
    title: 'Sleep Stories',
    type: 'meditation',
    description: 'Drift off to sleep with these beautifully narrated stories designed to calm your mind and prepare your body for restful sleep. Each story is crafted to guide you into deep relaxation.',
    emoji: '🌙',
    coverImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop',
    gradient: ['#4ECDC4', '#44A08D'],
    duration: '15-45 min',
    durationInMinutes: 30,
    sessions: 20,
    level: 'beginner',
    instructor: 'James Parker',
    rating: 4.8,
    enrolled: 1800,
    favorites: 1280,
    listeningCount: 4200,
  },
  {
    id: 'focus-enhancement',
    title: 'Focus Enhancement',
    type: 'course',
    description: 'Sharpen your mind and improve productivity with concentration techniques backed by neuroscience. Learn to eliminate distractions, build mental stamina, and achieve deeper levels of focus.',
    emoji: '🎯',
    coverImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    gradient: ['#667EEA', '#764BA2'],
    duration: '3 weeks',
    durationInMinutes: 60,
    sessions: 21,
    level: 'intermediate',
    instructor: 'Lisa Thompson',
    rating: 4.5,
    enrolled: 1450,
    favorites: 980,
    listeningCount: 3100,
  },
];

// Helper functions for course data
export const getCoursesByType = (type: Course['type']) => {
  return COURSES_DATA.filter(course => course.type === type);
};

export const getFeaturedCourses = () => {
  return COURSES_DATA.slice(0, 3);
};

export const getCourseById = (id: string) => {
  return COURSES_DATA.find(course => course.id === id);
};

// Recommended items combining courses and audio content
export const RECOMMENDED_ITEMS = [
  {
    id: 'meditation-bells-recommended',
    title: 'Meditation Bells',
    type: 'meditation' as const,
    description: 'Experience the ancient healing vibrations of Tibetan singing bowls and meditation bells. These resonant tones create a sacred space for deep meditation and spiritual connection.',
    emoji: '🔔',
    coverImage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    gradient: ['#4ECDC4', '#44A08D'],
    duration: '15-30 min',
    durationInMinutes: 22,
    sessions: 15,
    level: 'beginner' as const,
    instructor: 'Tibetan Masters',
    rating: 4.8,
    enrolled: 950,
    favorites: 680,
    listeningCount: 1650,
  },
  {
    id: 'ambient-recommended',
    title: 'Ambient Meditation',
    type: 'meditation' as const,
    description: 'Calming electronic tones designed specifically for meditation practice. Let these ambient soundscapes guide you into deeper states of relaxation and mindfulness.',
    emoji: '🌊',
    coverImage: 'https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?w=400&h=300&fit=crop',
    gradient: ['#667EEA', '#764BA2'],
    duration: '45 min',
    durationInMinutes: 45,
    sessions: 18,
    level: 'intermediate' as const,
    instructor: 'Ambient Collective',
    rating: 4.6,
    enrolled: 1200,
    favorites: 840,
    listeningCount: 2100,
  },
  {
    id: 'nature-sounds-recommended',
    title: 'Nature Sounds Collection',
    type: 'music' as const,
    description: 'A comprehensive collection of nature recordings including forest ambiances, ocean waves, and gentle rain. Perfect for creating a peaceful environment for meditation or relaxation.',
    emoji: '🌿',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    gradient: ['#A8E6CF', '#52B788'],
    duration: '∞',
    durationInMinutes: 60,
    sessions: 25,
    level: 'beginner' as const,
    instructor: 'Nature Collective',
    rating: 4.9,
    enrolled: 2100,
    favorites: 1450,
    listeningCount: 5200,
  }
];

export const getRecommendedItems = () => {
  // Combine meditation courses with recommended items
  return [
    ...getCoursesByType('meditation'),
    ...RECOMMENDED_ITEMS
  ];
};