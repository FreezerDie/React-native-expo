import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserPreferences {
  selectedTopics: string[];
  preferredTime: string;
  preferredDays: string[];
  completedSessions: number;
  totalMeditationTime: number;
  streakCount: number;
}

interface AppState {
  userPreferences: UserPreferences;
  isOnboarded: boolean;
  currentSession: {
    isActive: boolean;
    sessionType: string;
    startTime: Date | null;
    duration: number;
  } | null;
  favoriteSessions: string[];
  recentSessions: Array<{
    id: string;
    title: string;
    date: Date;
    duration: number;
  }>;
}

type AppAction =
  | { type: 'SET_USER_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'COMPLETE_ONBOARDING'; payload: UserPreferences }
  | { type: 'START_SESSION'; payload: { sessionType: string; duration: number } }
  | { type: 'END_SESSION' }
  | { type: 'ADD_FAVORITE'; payload: string }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'ADD_RECENT_SESSION'; payload: { id: string; title: string; duration: number } }
  | { type: 'LOAD_STATE'; payload: AppState };

const initialState: AppState = {
  userPreferences: {
    selectedTopics: [],
    preferredTime: '',
    preferredDays: [],
    completedSessions: 0,
    totalMeditationTime: 0,
    streakCount: 0,
  },
  isOnboarded: false,
  currentSession: null,
  favoriteSessions: [],
  recentSessions: [],
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER_PREFERENCES':
      return {
        ...state,
        userPreferences: { ...state.userPreferences, ...action.payload },
      };

    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        userPreferences: action.payload,
        isOnboarded: true,
      };

    case 'START_SESSION':
      return {
        ...state,
        currentSession: {
          isActive: true,
          sessionType: action.payload.sessionType,
          startTime: new Date(),
          duration: action.payload.duration,
        },
      };

    case 'END_SESSION':
      if (!state.currentSession) return state;
      const sessionDuration = state.currentSession.duration;
      return {
        ...state,
        currentSession: null,
        userPreferences: {
          ...state.userPreferences,
          completedSessions: state.userPreferences.completedSessions + 1,
          totalMeditationTime: state.userPreferences.totalMeditationTime + sessionDuration,
        },
      };

    case 'ADD_FAVORITE':
      return {
        ...state,
        favoriteSessions: [...state.favoriteSessions, action.payload],
      };

    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favoriteSessions: state.favoriteSessions.filter(id => id !== action.payload),
      };

    case 'ADD_RECENT_SESSION':
      const newRecentSession = {
        id: action.payload.id,
        title: action.payload.title,
        date: new Date(),
        duration: action.payload.duration,
      };
      return {
        ...state,
        recentSessions: [newRecentSession, ...state.recentSessions.slice(0, 9)], // Keep last 10
      };

    case 'LOAD_STATE':
      return action.payload;

    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  saveState: () => Promise<void>;
  loadState: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const saveState = async () => {
    try {
      const stateToSave = {
        ...state,
        currentSession: state.currentSession ? {
          ...state.currentSession,
          startTime: state.currentSession.startTime?.toISOString(),
        } : null,
        recentSessions: state.recentSessions.map(session => ({
          ...session,
          date: session.date.toISOString(),
        })),
      };
      await AsyncStorage.setItem('silentMoonAppState', JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Error saving app state:', error);
    }
  };

  const loadState = async () => {
    try {
      const savedState = await AsyncStorage.getItem('silentMoonAppState');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        // Convert date strings back to Date objects
        if (parsedState.currentSession?.startTime) {
          parsedState.currentSession.startTime = new Date(parsedState.currentSession.startTime);
        }
        parsedState.recentSessions = parsedState.recentSessions.map((session: any) => ({
          ...session,
          date: new Date(session.date),
        }));
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      }
    } catch (error) {
      console.error('Error loading app state:', error);
    }
  };

  useEffect(() => {
    loadState();
  }, []);

  // Auto-save state changes
  useEffect(() => {
    saveState();
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch, saveState, loadState }}>
      {children}
    </AppContext.Provider>
  );
};
