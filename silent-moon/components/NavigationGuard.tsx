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
    console.log('NavigationGuard - segments:', segments);
    console.log('NavigationGuard - isAuthenticated:', state.auth.isAuthenticated);
    console.log('NavigationGuard - isOnboarded:', state.isOnboarded);
    console.log('NavigationGuard - isLoading:', state.auth.isLoading);

    const inAuthGroup = segments[0] === 'auth';
    const inOnboardingGroup = segments[0] === 'onboarding';
    const inTabsGroup = segments[0] === '(tabs)';

    console.log('NavigationGuard - inAuthGroup:', inAuthGroup, 'inOnboardingGroup:', inOnboardingGroup, 'inTabsGroup:', inTabsGroup);

    // Don't redirect while authentication is in progress
    if (state.auth.isLoading) {
      console.log('NavigationGuard - Skipping redirect: auth is loading');
      return;
    }

    // If user is authenticated and on auth screen, redirect based on onboarding status
    if (state.auth.isAuthenticated && inAuthGroup) {
      console.log('NavigationGuard - User authenticated on auth screen, redirecting...');
      setTimeout(() => {
        if (state.isOnboarded) {
          console.log('NavigationGuard - Redirecting to tabs (onboarded user)');
          router.replace('/(tabs)');
        } else {
          console.log('NavigationGuard - Redirecting to onboarding (new user)');
          router.replace('/onboarding/welcome');
        }
      }, 100);
      return;
    }

    // If user is not onboarded and not in auth/onboarding flow, redirect to welcome
    if (!state.isOnboarded && !inAuthGroup && !inOnboardingGroup && !inTabsGroup) {
      console.log('NavigationGuard - Redirecting non-onboarded user to welcome');
      setTimeout(() => router.replace('/onboarding/welcome'), 100);
      return;
    }

    // If user is onboarded and in onboarding flow, redirect to main app
    if (state.isOnboarded && inOnboardingGroup) {
      console.log('NavigationGuard - Redirecting onboarded user from onboarding to tabs');
      setTimeout(() => router.replace('/(tabs)'), 100);
      return;
    }

    // If user is authenticated and onboarded but on some other screen, go to tabs
    if (state.auth.isAuthenticated && state.isOnboarded && !inAuthGroup && !inOnboardingGroup && !inTabsGroup) {
      console.log('NavigationGuard - Redirecting authenticated onboarded user to tabs');
      setTimeout(() => router.replace('/(tabs)'), 100);
    }
  }, [state.isOnboarded, state.auth.isLoading, state.auth.isAuthenticated, segments, router]);

  return <>{children}</>;
}
