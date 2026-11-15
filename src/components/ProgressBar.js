import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { type } from '../theme/typography';

// props: value (0–100), showLabel=true
export default function ProgressBar({ value, showLabel = true }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <View style={styles.row}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%` }]} />
      </View>
      {showLabel && (
        <Text style={styles.label}>{pct}%</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  track: {
    flex: 1,
    height: 4,
    backgroundColor: colors.line,
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: 4,
    backgroundColor: colors.brass,
    borderRadius: 2,
  },
  label: {
    ...type.label,
    color: colors.muted,
    minWidth: 36,
    textAlign: 'right',
  },
});
