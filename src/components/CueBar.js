import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

// 20 tick skor kesiapan — props: value (0–100)
export default function CueBar({ value }) {
  const terisi = Math.round((Math.min(100, Math.max(0, value)) / 100) * 20);
  return (
    <View style={styles.row}>
      {Array.from({ length: 20 }).map((_, i) => (
        <View key={i} style={[styles.tick, i < terisi ? styles.on : styles.off]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 4,
    height: 28,
    alignItems: 'center',
  },
  tick: {
    flex: 1,
    height: 20,
    borderRadius: 1,
  },
  on: { backgroundColor: colors.brass },
  off: { backgroundColor: colors.line },
});
