import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const CONFIG = {
  ios:     { bg: '#e0f2fe', border: '#0284c7', text: '#0c4a6e', label: '🍎 iOS Native' },
  android: { bg: '#dcfce7', border: '#16a34a', text: '#14532d', label: '🤖 Android Native' },
} as const;

const PlatformHeader: React.FC = () => {
  const cfg = CONFIG[Platform.OS as keyof typeof CONFIG] ?? CONFIG.android;
  return (
    <View style={[styles.chip, { backgroundColor: cfg.bg, borderColor: cfg.border }]}>
      <Text style={[styles.label, { color: cfg.text }]}>{cfg.label}</Text>
    </View>
  );
};

export default PlatformHeader;

const styles = StyleSheet.create({
  chip: {
    marginBottom: 32, borderWidth: 1.5, borderRadius: 12,
    paddingVertical: 10, paddingHorizontal: 14, elevation: 2,
  },
  label: { fontSize: 14, fontWeight: '700' },
});
