import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../theme/colors';
import { type } from '../theme/typography';

// props: status = 'PERSIAPAN' | 'SELESAI'
export default function StatusTag({ status }) {
  const selesai = status === 'SELESAI';
  return (
    <View style={[styles.base, selesai ? styles.selesai : styles.persiapan]}>
      <Text style={[styles.text, selesai ? styles.textSelesai : styles.textPersiapan]}>
        {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius,
  },
  persiapan: {
    borderWidth: 1,
    borderColor: colors.brass,
  },
  selesai: {
    backgroundColor: colors.brass,
  },
  text: {
    ...type.labelSm,
  },
  textPersiapan: { color: colors.brass },
  textSelesai: { color: colors.ink },
});
