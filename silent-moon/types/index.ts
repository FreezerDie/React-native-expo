// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  selectedTopics: string[];
  preferredTime: string;
  preferredDays: string[];
  completedSessions: number;
  totalMeditationTime: number; // in minutes
  streakCount: number;
  notificationsEnabled: boolean;
  sleepTimer: number; // in minutes
}

// Meditation Session Types
export interface MeditationSession {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  category: SessionCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructor?: string;
  backgroundMusic?: string;
  emoji: string;
}

export interface ActiveSession {
  session: MeditationSession;
  startTime: Date;
  isPlaying: boolean;
  currentTime: number; // in seconds
  isCompleted: boolean;
}

export type SessionCategory =
  | 'focus'
  | 'sleep'
  | 'anxiety'
  | 'stress'
  | 'performance';

// Audio Types
export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  url: string;
  category: 'nature' | 'ambient' | 'instrumental' | 'meditation';
  thumbnail?: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  tracks: AudioTrack[];
  createdBy: string;
  isPublic: boolean;
}

// Progress and Statistics Types
export interface SessionProgress {
  sessionId: string;
  completedAt: Date;
  duration: number;
  rating?: number; // 1-5 stars
  notes?: string;
}

export interface UserStats {
  totalSessions: number;
  totalTime: number; // in minutes
  currentStreak: number;
  longestStreak: number;
  favoriteCategory: SessionCategory;
  averageSessionLength: number;
  completionRate: number; // percentage
}

// Sleep Types
export interface SleepSession {
  id: string;
  title: string;
  duration: number; // in minutes
  storyType: 'bedtime' | 'nature' | 'guided';
  backgroundSound?: string;
  wakeUpTime?: Date;
}

export interface SleepTimer {
  duration: number; // in minutes
  isActive: boolean;
  endTime?: Date;
}

// Navigation Types
export type RootStackParamList = {
  '(tabs)': undefined;
  'auth/auth': undefined;
  'onboarding/welcome': undefined;
  'onboarding/topics': undefined;
  'onboarding/time-preferences': undefined;
  'player/meditation': {
    sessionId: string;
    sessionTitle: string;
    duration: number;
  };
  modal: undefined;
};

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Theme Types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}

export interface GradientDefinition {
  id: string;
  name: string;
  colors: string[];
  angle?: number;
}

// Component Props Types
export interface SessionCardProps {
  session: MeditationSession;
  onPress: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export interface AudioPlayerProps {
  track: AudioTrack;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface OnboardingData {
  selectedTopics: string[];
  preferredTime: string;
  preferredDays: string[];
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Settings Types
export interface AppSettings {
  notifications: {
    sessionReminders: boolean;
    dailyGoal: boolean;
    weeklyReport: boolean;
  };
  audio: {
    backgroundPlay: boolean;
    downloadQuality: 'low' | 'medium' | 'high';
    autoPlay: boolean;
  };
  appearance: {
    theme: 'light' | 'dark' | 'system';
    language: string;
  };
  privacy: {
    analytics: boolean;
    crashReports: boolean;
  };
}
