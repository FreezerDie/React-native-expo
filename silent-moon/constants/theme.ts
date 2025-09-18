/**
 * Silent Moon App Theme
 * Meditation-focused color scheme with calming gradients and serene colors
 */

import { Platform } from 'react-native';

const tintColorLight = '#8B5CF6';
const tintColorDark = '#A855F7';

// Primary meditation colors
export const MeditationColors = {
  primary: '#8B5CF6',
  secondary: '#A855F7',
  accent: '#C084FC',
  calm: '#E0E7FF',
  serenity: '#F3F4F6',
  focus: '#FF6B6B',
  sleep: '#6C5CE7',
  nature: '#A8E6CF',
};

export const Colors = {
  light: {
    text: '#1F2937',
    background: '#E5E5E5',
    tint: tintColorLight,
    icon: '#6B7280',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: tintColorLight,
    card: '#F9FAFB',
    border: '#E5E7EB',
    muted: '#9CA3AF',
    textSecondary: '#4B5563',
    textMuted: '#6B7280',
  },
  dark: {
    text: '#F9FAFB',
    background: '#03174D',
    tint: tintColorDark,
    icon: '#D1D5DB',
    tabIconDefault: '#6B7280',
    tabIconSelected: tintColorDark,
    card: '#1F2937',
    border: '#374151',
    muted: '#6B7280',
    textSecondary: '#D1D5DB',
    textMuted: '#9CA3AF',
  },
};

// Gradient collections for different meditation categories
export const Gradients = {
  primary: ['#8B5CF6', '#A855F7', '#C084FC'],
  focus: ['#FF6B6B', '#EE5A52', '#FF8A80'],
  sleep: ['#6C5CE7', '#A29BFE', '#D2CEFF'],
  nature: ['#A8E6CF', '#52B788', '#B8E6D1'],
  ocean: ['#667EEA', '#764BA2', '#9B7EDE'],
  sunset: ['#F093FB', '#F5576C', '#FF9FF3'],
  forest: ['#4ECDC4', '#44A08D', '#78E08F'],
  sunrise: ['#FF9FF3', '#FECA57', '#FF9FF3'],
  twilight: ['#667EEA', '#764BA2', '#F093FB'],
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
