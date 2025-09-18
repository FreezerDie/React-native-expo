import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'expo-image';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#0F0F23',
          borderTopColor: '#1A1A2E',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('../../assets/icons/home-icon.svg')}
              style={{
                width: 22,
                height: 22,
                aspectRatio: 22/22,
                tintColor: focused ? color : '#A0A3B1'
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sleep"
        options={{
          title: 'Sleep',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('../../assets/icons/sleep-icon.svg')}
              style={{
                width: 22,
                height: 22,
                aspectRatio: 23/22,
                tintColor: focused ? color : '#A0A3B1'
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="focus"
        options={{
          title: 'Meditate',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('../../assets/icons/meditate-icon.svg')}
              style={{
                width: 20,
                height: 24,
                aspectRatio: 18/22,
                tintColor: focused ? color : '#A0A3B1'
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="music"
        options={{
          title: 'Music',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('../../assets/icons/music-icon.svg')}
              style={{
                width: 24,
                height: 20,
                aspectRatio: 26/22,
                tintColor: focused ? color : '#A0A3B1'
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('../../assets/icons/profile-icon.svg')}
              style={{
                width: 18,
                height: 22,
                aspectRatio: 20/24,
                tintColor: focused ? color : '#A0A3B1'
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
