import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useApp } from '../../contexts/AppContext';
// @ts-ignore
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const { width } = Dimensions.get('window');

type ProfileOption = {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: readonly [string, string];
};

const PROFILE_OPTIONS: ProfileOption[] = [
  {
    id: 'theme-toggle',
    title: 'Theme Settings',
    description: 'Switch between light and dark mode',
    icon: 'settings',
    gradient: ['#F9FAFB', '#F3F4F6'] as const,
  },
  {
    id: 'personal-info',
    title: 'Personal Information',
    description: 'Update your profile details',
    icon: 'user',
    gradient: ['#F9FAFB', '#F3F4F6'] as const,
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Customize your experience',
    icon: 'wrench',
    gradient: ['#F9FAFB', '#F3F4F6'] as const,
  },
  {
    id: 'statistics',
    title: 'Statistics',
    description: 'View your meditation stats',
    icon: 'chart',
    gradient: ['#F9FAFB', '#F3F4F6'] as const,
  },
  {
    id: 'achievements',
    title: 'Achievements',
    description: 'Your meditation milestones',
    icon: 'trophy',
    gradient: ['#F9FAFB', '#F3F4F6'] as const,
  },
  {
    id: 'logout',
    title: 'Logout',
    description: 'Sign out of your account',
    icon: 'logout',
    gradient: ['#F9FAFB', '#F3F4F6'] as const,
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
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    profileWidget: {
      backgroundColor: backgroundColor,
      borderWidth: 1,
      borderColor: textMutedColor,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      borderRadius: 16,
    },
    avatarContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: textSecondaryColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    avatarInitial: {
      fontSize: 24,
      fontWeight: 'bold',
      color: backgroundColor,
    },
    profileInfo: {
      flex: 1,
    },
    profileName: {
      fontSize: 20,
      fontWeight: '600',
      color: textColor,
      marginBottom: 4,
    },
    profileEmail: {
      fontSize: 14,
      color: textMutedColor,
      fontWeight: '400',
    },
    optionsContainer: {
      padding: 20,
      paddingTop: 0,
    },
    optionCard: {
      marginBottom: 12,
      borderRadius: 16,
      overflow: 'hidden',
    },
    optionGradient: {
      borderRadius: 16,
    },
    optionContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
    },
    optionIcon: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 18,
    },
    optionTextContainer: {
      flex: 1,
    },
    optionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: textColor,
      marginBottom: 2,
    },
    optionDescription: {
      fontSize: 13,
      color: textMutedColor,
      lineHeight: 18,
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
          <View style={themedStyles.profileWidget}>
            <View style={themedStyles.avatarContainer}>
              <Text style={themedStyles.avatarInitial}>
                {state.auth.currentUser ? state.auth.currentUser.name.charAt(0).toUpperCase() : 'M'}
              </Text>
            </View>
            <View style={themedStyles.profileInfo}>
              <Text style={themedStyles.profileName}>
                {state.auth.currentUser ? state.auth.currentUser.name : 'Meditation User'}
              </Text>
              <Text style={themedStyles.profileEmail}>
                {state.auth.currentUser ? state.auth.currentUser.username : 'user@meditationapp.com'}
              </Text>
            </View>
          </View>
        </View>

        <View style={themedStyles.optionsContainer}>
          {PROFILE_OPTIONS.map((option) => (
            <TouchableOpacity key={option.id} style={themedStyles.optionCard} onPress={() => handleOptionPress(option.id)}>
              <View
                style={[themedStyles.optionGradient, { backgroundColor: option.gradient[0] }]}
              >
                <View style={themedStyles.optionContent}>
                  <View style={themedStyles.optionIcon}>
                    <Icon name={option.icon} size={20} color={textSecondaryColor} />
                  </View>
                  <View style={themedStyles.optionTextContainer}>
                    <Text style={themedStyles.optionTitle}>{option.title}</Text>
                    <Text style={themedStyles.optionDescription}>{option.description}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
