import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, space } from '../theme/colors';
import { type } from '../theme/typography';
import { formatTanggal } from '../utils/date';
import { hitungHariTersisa } from '../utils/date';
import StatusTag from './StatusTag';
import CountdownBadge from './CountdownBadge';
import ProgressBar from './ProgressBar';

// props: production, readiness (0–100), onPress
export default function ProductionCard({ production, readiness, onPress }) {
  const sisa = hitungHariTersisa(production.showDate);
  const status = sisa < 0 ? 'SELESAI' : 'PERSIAPAN';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.wrap, pressed && styles.pressed]}
    >
      <View style={styles.topRow}>
        <StatusTag status={status} />
        <CountdownBadge date={production.showDate} size="normal" />
      </View>
      <Text style={styles.title}>{production.title}</Text>
      <Text style={styles.meta}>
        {formatTanggal(production.showDate)} · {production.venue}
      </Text>
      <ProgressBar value={readiness} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingVertical: space.xl,
    gap: space.sm,
  },
  pressed: { opacity: 0.7 },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { ...type.cardTitle, color: colors.cream },
  meta: { ...type.label, color: colors.muted },
});
