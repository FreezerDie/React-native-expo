import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthState, getCurrentUser, saveCurrentUser, logoutUser, loginUser, registerUser, updateUserPreferences } from '../utils/auth';

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
  // Authentication state
  auth: AuthState;
}

type AppAction =
  | { type: 'SET_USER_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'COMPLETE_ONBOARDING'; payload: UserPreferences }
  | { type: 'START_SESSION'; payload: { sessionType: string; duration: number } }
  | { type: 'END_SESSION' }
  | { type: 'ADD_FAVORITE'; payload: string }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'ADD_RECENT_SESSION'; payload: { id: string; title: string; duration: number } }
  | { type: 'LOAD_STATE'; payload: AppState }
  // Authentication actions
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER_PREFERENCES'; payload: Partial<UserPreferences> };

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
  auth: {
    isAuthenticated: false,
    currentUser: null,
    isLoading: false,
  },
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

    // Authentication cases
    case 'SET_LOADING':
      return {
        ...state,
        auth: {
          ...state.auth,
          isLoading: action.payload,
        },
      };

    case 'LOGIN_SUCCESS':
      const userPreferences = action.payload.preferences || state.userPreferences;
      const isOnboarded = userPreferences.selectedTopics.length > 0 && userPreferences.preferredTime !== '';

      console.log('LOGIN_SUCCESS - user preferences:', userPreferences);
      console.log('LOGIN_SUCCESS - calculated isOnboarded:', isOnboarded);

      return {
        ...state,
        auth: {
          isAuthenticated: true,
          currentUser: action.payload,
          isLoading: false,
        },
        userPreferences,
        isOnboarded,
      };

    case 'LOGOUT':
      return {
        ...state,
        auth: {
          isAuthenticated: false,
          currentUser: null,
          isLoading: false,
        },
        // Reset to initial state on logout
        userPreferences: initialState.userPreferences,
        isOnboarded: false,
        currentSession: null,
        favoriteSessions: [],
        recentSessions: [],
      };

    case 'UPDATE_USER_PREFERENCES':
      return {
        ...state,
        userPreferences: { ...state.userPreferences, ...action.payload },
      };

    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  saveState: () => Promise<void>;
  loadState: () => Promise<void>;
  // Authentication methods
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, username: string, password: string, email?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUserPrefs: (preferences: Partial<UserPreferences>) => Promise<{ success: boolean; error?: string }>;
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

  // Authentication methods
  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const result = await loginUser(username, password);

      if (result.success && result.user) {
        await saveCurrentUser(result.user);
        dispatch({ type: 'LOGIN_SUCCESS', payload: result.user });
        return { success: true };
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
        return { success: false, error: result.error };
      }
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (name: string, username: string, password: string, email?: string): Promise<{ success: boolean; error?: string }> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const result = await registerUser(name, username, password, email);

      if (result.success && result.user) {
        await saveCurrentUser(result.user);
        dispatch({ type: 'LOGIN_SUCCESS', payload: result.user });
        return { success: true };
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
        return { success: false, error: result.error };
      }
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutUser();
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateUserPrefs = async (preferences: Partial<UserPreferences>): Promise<{ success: boolean; error?: string }> => {
    if (!state.auth.currentUser) {
      return { success: false, error: 'No user logged in' };
    }

    try {
      const result = await updateUserPreferences(state.auth.currentUser.id, preferences);

      if (result.success) {
        dispatch({ type: 'UPDATE_USER_PREFERENCES', payload: preferences });
        // Update current user in storage with proper type safety
        const updatedUser = {
          ...state.auth.currentUser,
          preferences: {
            selectedTopics: preferences.selectedTopics ?? state.auth.currentUser.preferences?.selectedTopics ?? [],
            preferredTime: preferences.preferredTime ?? state.auth.currentUser.preferences?.preferredTime ?? '',
            preferredDays: preferences.preferredDays ?? state.auth.currentUser.preferences?.preferredDays ?? [],
            completedSessions: preferences.completedSessions ?? state.auth.currentUser.preferences?.completedSessions ?? 0,
            totalMeditationTime: preferences.totalMeditationTime ?? state.auth.currentUser.preferences?.totalMeditationTime ?? 0,
            streakCount: preferences.streakCount ?? state.auth.currentUser.preferences?.streakCount ?? 0,
          }
        };
        await saveCurrentUser(updatedUser);
      }

      return result;
    } catch (error) {
      return { success: false, error: 'Failed to update preferences' };
    }
  };

  // Load user session on app start
  const initializeAuth = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: currentUser });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await loadState();
      await initializeAuth();
    };
    initialize();
  }, []);

  // Auto-save state changes
  useEffect(() => {
    saveState();
  }, [state]);

  return (
    <AppContext.Provider value={{
      state,
      dispatch,
      saveState,
      loadState,
      login,
      register,
      logout,
      updateUserPrefs
    }}>
      {children}
    </AppContext.Provider>
  );
};
