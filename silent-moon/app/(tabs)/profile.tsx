import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useApp } from '../../contexts/AppContext';

const { width } = Dimensions.get('window');

const PROFILE_OPTIONS = [
  {
    id: 'theme-toggle',
    title: 'Theme Settings',
    description: 'Switch between light and dark mode',
    icon: '',
    gradient: ['#8B5CF6', '#A855F7'] as const,
  },
  {
    id: 'personal-info',
    title: 'Personal Information',
    description: 'Update your profile details',
    icon: '',
    gradient: ['#667EEA', '#764BA2'] as const,
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Customize your experience',
    icon: '',
    gradient: ['#F093FB', '#F5576C'] as const,
  },
  {
    id: 'statistics',
    title: 'Statistics',
    description: 'View your meditation stats',
    icon: '',
    gradient: ['#4ECDC4', '#44A08D'] as const,
  },
  {
    id: 'achievements',
    title: 'Achievements',
    description: 'Your meditation milestones',
    icon: '',
    gradient: ['#FFD93D', '#FFB347'] as const,
  },
  {
    id: 'logout',
    title: 'Logout',
    description: 'Sign out of your account',
    icon: '',
    gradient: ['#FF6B6B', '#EE5A52'] as const,
  },
];

export default function ProfileScreen() {
  const { theme, themeMode, setThemeMode, toggleTheme } = useTheme();
  const { logout, state } = useApp();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textSecondaryColor = useThemeColor({}, 'textSecondary');
  const textMutedColor = useThemeColor({}, 'textMuted');

  const handleOptionPress = async (optionId: string) => {
    switch (optionId) {
      case 'theme-toggle':
        Alert.alert(
          'Theme Settings',
          `Current theme: ${themeMode === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light'}`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Toggle Theme',
              onPress: toggleTheme,
            },
            {
              text: 'Use System',
              onPress: () => setThemeMode('system'),
            },
          ]
        );
        break;
      case 'logout':
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Logout',
              style: 'destructive',
              onPress: async () => {
                try {
                  await logout();
                  // Navigate to sign-in screen
                  router.replace('/auth/auth');
                } catch (error) {
                  console.error('Error during logout:', error);
                  Alert.alert('Error', 'Failed to logout. Please try again.');
                }
              },
            },
          ]
        );
        break;
      case 'personal-info':
        // TODO: Navigate to personal info screen
        Alert.alert('Coming Soon', 'Personal Information screen is coming soon!');
        break;
      case 'preferences':
        // TODO: Navigate to preferences screen
        Alert.alert('Coming Soon', 'Preferences screen is coming soon!');
        break;
      case 'statistics':
        // TODO: Navigate to statistics screen
        Alert.alert('Coming Soon', 'Statistics screen is coming soon!');
        break;
      case 'achievements':
        // TODO: Navigate to achievements screen
        Alert.alert('Coming Soon', 'Achievements screen is coming soon!');
        break;
      default:
        break;
    }
  };

  const themedStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor,
    },
    scrollView: {
      flex: 1,
    },
    header: {
      padding: 20,
      paddingTop: 10,
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: textColor,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: textMutedColor,
    },
    profileCard: {
      margin: 20,
      marginTop: 0,
      borderRadius: 16,
      overflow: 'hidden',
    },
    profileGradient: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
    },
    avatarContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    avatarEmoji: {
      fontSize: 28,
    },
    profileInfo: {
      flex: 1,
    },
    profileName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 4,
    },
    profileEmail: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.8)',
    },
    optionsContainer: {
      padding: 20,
      paddingTop: 0,
    },
    optionCard: {
      marginBottom: 16,
      borderRadius: 12,
      overflow: 'hidden',
    },
    optionGradient: {
      borderRadius: 12,
    },
    optionContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    optionIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    optionIconText: {
      fontSize: 24,
    },
    optionTextContainer: {
      flex: 1,
    },
    optionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 4,
    },
    optionDescription: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.8)',
    },
  });

  return (
    <SafeAreaView style={themedStyles.container}>
      <ScrollView style={themedStyles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={themedStyles.header}>
          <Text style={themedStyles.title}>Profile</Text>
          <Text style={themedStyles.subtitle}>Manage your meditation journey</Text>
        </View>

        <View style={themedStyles.profileCard}>
          <LinearGradient
            colors={['#6C5CE7', '#A29BFE']}
            style={themedStyles.profileGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={themedStyles.avatarContainer}>
              <Text style={themedStyles.avatarEmoji}></Text>
            </View>
            <View style={themedStyles.profileInfo}>
              <Text style={themedStyles.profileName}>
                {state.auth.currentUser ? `Welcome, ${state.auth.currentUser.name}` : 'Meditation User'}
              </Text>
              <Text style={themedStyles.profileEmail}>
                {state.auth.currentUser ? state.auth.currentUser.username : 'user@meditationapp.com'}
              </Text>
            </View>
          </LinearGradient>
        </View>

        <View style={themedStyles.optionsContainer}>
          {PROFILE_OPTIONS.map((option) => (
            <TouchableOpacity key={option.id} style={themedStyles.optionCard} onPress={() => handleOptionPress(option.id)}>
              <LinearGradient
                colors={option.gradient}
                style={themedStyles.optionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={themedStyles.optionContent}>
                  <View style={themedStyles.optionIcon}>
                    <Text style={themedStyles.optionIconText}>{option.icon}</Text>
                  </View>
                  <View style={themedStyles.optionTextContainer}>
                    <Text style={themedStyles.optionTitle}>{option.title}</Text>
                    <Text style={themedStyles.optionDescription}>{option.description}</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
