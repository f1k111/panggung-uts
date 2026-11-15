import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, space } from '../theme/colors';
import { type } from '../theme/typography';

// props: title (string), style
export default function SectionHeader({ title, style }) {
  return (
    <View style={[styles.wrap, style]}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingBottom: space.sm,
  },
  text: {
    ...type.label,
    color: colors.brass,
  },
});
