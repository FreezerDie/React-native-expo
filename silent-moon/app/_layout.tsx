import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AppProvider } from '@/contexts/AppContext';
import { ThemeProvider as AppThemeProvider } from '@/contexts/ThemeContext';
import { useTheme } from '@/contexts/ThemeContext';
import NavigationGuard from '@/components/NavigationGuard';

function RootLayoutNav() {
  const { theme } = useTheme();

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <NavigationGuard>
        <Stack>
          <Stack.Screen name="auth/auth" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="player" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
      </NavigationGuard>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <AppProvider>
        <RootLayoutNav />
      </AppProvider>
    </AppThemeProvider>
  );
}
