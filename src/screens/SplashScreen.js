import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, space } from '../theme/colors';
import { type } from '../theme/typography';

// Placeholder — animasi tirai penuh dibuat di Tahap 5
export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace('MainTabs');
    }, 1800);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={styles.wrap}>
      <Text style={styles.sub}>MANAJER LATIHAN TEATER</Text>
      <Text style={styles.wordmark}>PANGGUNG</Text>
      <View style={styles.line} />
      <Text style={styles.tagline}>Technology Meets Creativity</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.lg,
  },
  sub: { ...type.label, color: colors.muted },
  wordmark: {
    ...type.screenTitle,
    fontSize: 36,
    letterSpacing: 3.6,
    color: colors.cream,
  },
  line: { width: 120, height: 1, backgroundColor: colors.brass },
  tagline: { ...type.roleName, color: colors.brass, fontSize: 16 },
});
