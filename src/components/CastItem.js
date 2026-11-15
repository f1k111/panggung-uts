import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, space, radius } from '../theme/colors';
import { type } from '../theme/typography';

// props: member {id, name, role, memorized}, onToggleMemorized, onDelete
export default function CastItem({ member, onToggleMemorized, onDelete }) {
  return (
    <View style={styles.row}>
      {/* Info pemeran */}
      <Pressable style={styles.info} onLongPress={onDelete} hitSlop={8}>
        <Text style={styles.name}>{member.name}</Text>
        <Text style={styles.role}>{member.role}</Text>
      </Pressable>

      {/* Label + saklar hafal */}
      <View style={styles.switchWrap}>
        <Text style={[styles.switchLabel, member.memorized ? styles.labelOn : styles.labelOff]}>
          {member.memorized ? 'HAFAL' : 'BELUM'}
        </Text>
        <Pressable
          onPress={onToggleMemorized}
          style={[styles.track, member.memorized ? styles.trackOn : styles.trackOff]}
          accessibilityRole="switch"
          accessibilityState={{ checked: member.memorized }}
        >
          <View style={[styles.knob, member.memorized ? styles.knobOn : styles.knobOff]} />
        </Pressable>
      </View>
    </View>
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
  info: { flex: 1, gap: 2 },
  name: { ...type.personName, color: colors.cream },
  role: { ...type.roleName, color: colors.muted },
  switchWrap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  switchLabel: { ...type.labelSm },
  labelOn: { color: colors.brass },
  labelOff: { color: colors.muted },
  // Saklar 52×30 radius 2
  track: {
    width: 52,
    height: 30,
    borderRadius: radius,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  trackOn: { backgroundColor: colors.brass },
  trackOff: { borderWidth: 1, borderColor: colors.lineStrong, backgroundColor: 'transparent' },
  knob: {
    width: 22,
    height: 22,
    borderRadius: radius,
  },
  knobOn: { backgroundColor: colors.ink, alignSelf: 'flex-end' },
  knobOff: { backgroundColor: colors.muted, alignSelf: 'flex-start' },
});
