import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from './ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import { BorderRadius } from '@/constants/theme';

interface BackNavigationProps {
  onPress?: () => void;
  style?: any;
}

export default function BackNavigation({ onPress, style }: BackNavigationProps) {
  const textColor = useThemeColor({}, 'text');

  const handleBack = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.overlayContainer, style ]}>
      <TouchableOpacity
        style={[
          styles.backButton,
          {
            backgroundColor: '#FFFFFF',
            borderColor: '#FFFFFF',
          }
        ]}
        onPress={handleBack}
        activeOpacity={0.7}
      >
        <IconSymbol
          name="chevron.left"
          size={20}
          color={textColor}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    paddingTop: 50,
    paddingLeft: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
});
