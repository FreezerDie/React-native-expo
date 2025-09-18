import React, { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useApp } from '@/contexts/AppContext';

interface NavigationGuardProps {
  children: React.ReactNode;
}

export default function NavigationGuard({ children }: NavigationGuardProps) {
  const { state } = useApp();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === 'auth';
    const inOnboardingGroup = segments[0] === 'onboarding';
    const inTabsGroup = segments[0] === '(tabs)';

    // If user is not onboarded and not in auth/onboarding flow, redirect to welcome
    if (!state.isOnboarded && !inAuthGroup && !inOnboardingGroup) {
      router.replace('/onboarding/welcome');
      return;
    }

    // If user is onboarded and in auth/onboarding flow, redirect to main app
    if (state.isOnboarded && (inAuthGroup || inOnboardingGroup)) {
      router.replace('/(tabs)');
      return;
    }

    // For demo purposes, let's assume users are always onboarded after the first run
    // In a real app, you'd check authentication status here
    if (!inAuthGroup && !inOnboardingGroup && !inTabsGroup) {
      router.replace('/(tabs)');
    }
  }, [state.isOnboarded, segments, router]);

  return <>{children}</>;
}
