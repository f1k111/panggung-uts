import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { type } from '../theme/typography';
import { hitungHariTersisa } from '../utils/date';

// props: date (ISO string), size='big'|'normal'
export default function CountdownBadge({ date, size = 'big' }) {
  const sisa = hitungHariTersisa(date);

  if (sisa > 0) {
    if (size === 'big') {
      return <Text style={styles.big}>{`H-\n${sisa}`}</Text>;
    }
    return <Text style={styles.normal}>{`H-${sisa}`}</Text>;
  }
  if (sisa === 0) return <Text style={[styles.normal, styles.hariH]}>Hari H</Text>;
  return <Text style={[styles.normal, styles.tuntas]}>Tuntas</Text>;
}

const styles = StyleSheet.create({
  big: {
    ...type.countdownBig,
    color: colors.brass,
    textAlign: 'right',
    lineHeight: 64,
  },
  normal: {
    ...type.countdownMid,
    color: colors.brass,
  },
  hariH: {
    color: colors.brass,
  },
  tuntas: {
    ...type.countdownMid,
    fontFamily: type.roleName.fontFamily, // italic
    color: colors.brass,
  },
});
