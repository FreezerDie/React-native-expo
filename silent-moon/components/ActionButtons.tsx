import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ActionButtonConfig {
  iconName: string;
  onPress: () => void;
  accessibilityLabel?: string;
}

interface ActionButtonsProps {
  buttons: ActionButtonConfig[];
  style?: any;
}

export default function ActionButtons({ buttons, style }: ActionButtonsProps) {
  return (
    <View style={[styles.container, style]}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={styles.actionButton}
          onPress={button.onPress}
          activeOpacity={0.7}
          accessibilityLabel={button.accessibilityLabel}
        >
          <MaterialIcons name={button.iconName as keyof typeof MaterialIcons.glyphMap} size={20} color="#333333" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
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
