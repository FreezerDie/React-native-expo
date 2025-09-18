import CryptoJS from 'crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  username: string;
  email?: string;
  passwordHash: string;
  createdAt: Date;
  lastLogin?: Date;
  preferences?: {
    selectedTopics: string[];
    preferredTime: string;
    preferredDays: string[];
    completedSessions: number;
    totalMeditationTime: number;
    streakCount: number;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  isLoading: boolean;
}

const USERS_STORAGE_KEY = 'silentMoon_users';
const CURRENT_USER_KEY = 'silentMoon_currentUser';

// Password hashing utilities
export const hashPassword = (password: string): string => {
  return CryptoJS.SHA256(password + 'silentMoon_salt_2024').toString();
};

export const verifyPassword = (password: string, hash: string): boolean => {
  const hashedPassword = hashPassword(password);
  return hashedPassword === hash;
};

// Generate unique user ID
export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// User data management
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    if (!usersJson) return [];

    const users = JSON.parse(usersJson);
    // Convert date strings back to Date objects
    return users.map((user: any) => ({
      ...user,
      createdAt: new Date(user.createdAt),
      lastLogin: user.lastLogin ? new Date(user.lastLogin) : undefined,
    }));
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

export const saveUser = async (user: User): Promise<void> => {
  try {
    const users = await getAllUsers();
    const existingUserIndex = users.findIndex(u => u.id === user.id);

    if (existingUserIndex >= 0) {
      users[existingUserIndex] = user;
    } else {
      users.push(user);
    }

    await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving user:', error);
    throw new Error('Failed to save user data');
  }
};

export const findUserByUsername = async (username: string): Promise<User | null> => {
  try {
    const users = await getAllUsers();
    return users.find(user => user.username.toLowerCase() === username.toLowerCase()) || null;
  } catch (error) {
    console.error('Error finding user:', error);
    return null;
  }
};

export const findUserById = async (id: string): Promise<User | null> => {
  try {
    const users = await getAllUsers();
    return users.find(user => user.id === id) || null;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    return null;
  }
};

// Authentication functions
export const registerUser = async (
  name: string,
  username: string,
  password: string,
  email?: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    // Check if username already exists
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return { success: false, error: 'Username already exists' };
    }

    // Create new user
    const newUser: User = {
      id: generateUserId(),
      name,
      username,
      email,
      passwordHash: hashPassword(password),
      createdAt: new Date(),
      preferences: {
        selectedTopics: [],
        preferredTime: '',
        preferredDays: [],
        completedSessions: 0,
        totalMeditationTime: 0,
        streakCount: 0,
      },
    };

    await saveUser(newUser);
    return { success: true, user: newUser };
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, error: 'Registration failed' };
  }
};

export const loginUser = async (
  username: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    if (!verifyPassword(password, user.passwordHash)) {
      return { success: false, error: 'Invalid password' };
    }

    // Update last login
    user.lastLogin = new Date();
    await saveUser(user);

    return { success: true, user };
  } catch (error) {
    console.error('Error logging in user:', error);
    return { success: false, error: 'Login failed' };
  }
};

// Session management
export const saveCurrentUser = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify({
      ...user,
      createdAt: user.createdAt.toISOString(),
      lastLogin: user.lastLogin?.toISOString(),
    }));
  } catch (error) {
    console.error('Error saving current user:', error);
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const userJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
    if (!userJson) return null;

    const user = JSON.parse(userJson);
    return {
      ...user,
      createdAt: new Date(user.createdAt),
      lastLogin: user.lastLogin ? new Date(user.lastLogin) : undefined,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  } catch (error) {
    console.error('Error logging out user:', error);
  }
};

export const updateUserPreferences = async (
  userId: string,
  preferences: Partial<User['preferences']>
): Promise<{ success: boolean; error?: string }> => {
  try {
    const user = await findUserById(userId);
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    user.preferences = {
      selectedTopics: [],
      preferredTime: '',
      preferredDays: [],
      completedSessions: 0,
      totalMeditationTime: 0,
      streakCount: 0,
      ...user.preferences,
      ...preferences
    };
    await saveUser(user);

    // Update current user session if it's the same user
    const currentUser = await getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      await saveCurrentUser(user);
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return { success: false, error: 'Failed to update preferences' };
  }
};
