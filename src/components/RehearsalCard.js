import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, space } from '../theme/colors';
import { type } from '../theme/typography';
import { formatTanggal, formatJam } from '../utils/date';

// props: rehearsal, castCount (jumlah pemeran), onPress
export default function RehearsalCard({ rehearsal, castCount = 0, onPress }) {
  const hadirCount = Object.values(rehearsal.attendance || {}).filter(Boolean).length;
  const totalDenganAbsensi = castCount > 0 && Object.keys(rehearsal.attendance || {}).length > 0;
  const pct = totalDenganAbsensi ? Math.round((hadirCount / castCount) * 100) : null;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.info}>
        <Text style={styles.focus}>{rehearsal.focus}</Text>
        <Text style={styles.meta}>
          {formatTanggal(rehearsal.date)} · {formatJam(rehearsal.date)} · {rehearsal.place}
        </Text>
      </View>
      {pct !== null && (
        <Text style={styles.pct}>{pct}%</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingVertical: space.md,
  },
  pressed: { opacity: 0.7 },
  info: { flex: 1, gap: 4 },
  focus: { ...type.bodyMedium, color: colors.cream },
  meta: { ...type.label, color: colors.muted },
  pct: { ...type.countdownMid, color: colors.brass },
});
