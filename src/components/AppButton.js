import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../theme/colors';
import { type } from '../theme/typography';

// props: label, onPress, variant='primary'|'secondary', style
export default function AppButton({ label, onPress, variant = 'primary', style }) {
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.secondary,
        pressed && styles.pressed,
        style,
      ]}
      accessibilityRole="button"
    >
      <Text style={[type.btnPrimary, isPrimary ? styles.textPrimary : styles.textSecondary]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: radius,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primary: {
    backgroundColor: colors.curtain,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.brass,
  },
  pressed: { opacity: 0.8 },
  textPrimary: { color: colors.cream },
  textSecondary: { color: colors.brass },
});
