import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, space, radius } from '../theme/colors';
import { type } from '../theme/typography';

// props: label, value, onChangeText, error, ...TextInputProps
export default function FormField({ label, value, onChangeText, error, ...rest }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.lineStrong}
        {...rest}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.xs },
  label: { ...type.label, color: colors.brass },
  input: {
    backgroundColor: colors.velvet,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius,
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    ...type.body,
    color: colors.cream,
    minHeight: 44,
  },
  inputError: { borderColor: colors.error },
  error: { ...type.labelSm, color: colors.error },
});
