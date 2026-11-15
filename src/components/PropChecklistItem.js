import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, space, radius } from '../theme/colors';
import { type } from '../theme/typography';

// props: prop {id, name, ready}, onToggle, onDelete
export default function PropChecklistItem({ prop, onToggle, onDelete }) {
  return (
    <View style={styles.row}>
      <Pressable style={styles.nameWrap} onLongPress={onDelete} hitSlop={8}>
        <Text style={styles.name}>{prop.name}</Text>
      </Pressable>

      {/* Checkbox 28×28 */}
      <Pressable
        onPress={onToggle}
        style={[styles.checkbox, prop.ready ? styles.checkOn : styles.checkOff]}
        hitSlop={8}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: prop.ready }}
      >
        {prop.ready && <Feather name="check" size={16} color={colors.ink} />}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingVertical: space.md,
  },
  nameWrap: { flex: 1 },
  name: { ...type.bodyMedium, color: colors.cream },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: radius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOn: { backgroundColor: colors.brass },
  checkOff: { borderWidth: 1, borderColor: colors.lineStrong },
});
