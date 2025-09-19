import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

interface LogoWidgetProps {
  style?: any;
}

export default function LogoWidget({ style }: LogoWidgetProps) {
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, { color: textColor }]}>
        Silent
      </Text>

      <Image
        source={require('../assets/images/miniicon.png')}
        style={styles.icon}
        resizeMode="contain"
      />

      <Text style={[styles.text, { color: textColor }]}>
        Moon
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  icon: {
    width: 32,
    height: 32,
    marginHorizontal: 4,
  },
});
