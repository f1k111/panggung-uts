import React, { useEffect, useRef } from 'react';
import {
  View, Text, Animated, Easing, Dimensions, StyleSheet,
} from 'react-native';
import { colors } from '../theme/colors';
import { type } from '../theme/typography';

const { width: SW, height: SH } = Dimensions.get('window');
const VALANCE_H = 72;      // tinggi atas tirai
const PANEL_CLOSED = SW / 2; // lebar tiap panel saat tertutup
const PANEL_OPEN = 48;     // lebar tiap panel saat terbuka

// Lajur tirai: 7 lajur bergantian curtain/curtainDark per panel
const STRIPE_W = 14;
const STRIPE_COUNT = Math.ceil(PANEL_CLOSED / STRIPE_W) + 2;

function CurtainPanel({ translateX }) {
  return (
    <Animated.View style={[styles.panel, { transform: [{ translateX }] }]}>
      <View style={styles.stripes}>
        {Array.from({ length: STRIPE_COUNT }).map((_, i) => (
          <View
            key={i}
            style={[styles.stripe, { backgroundColor: i % 2 === 0 ? colors.curtain : colors.curtainDark }]}
          />
        ))}
      </View>
    </Animated.View>
  );
}

export default function SplashScreen({ navigation }) {
  // Panel kiri: mulai di x=0, geser ke kiri (negatif) hingga hanya 48px tersisa
  const leftX = useRef(new Animated.Value(0)).current;
  // Panel kanan: mulai di x=SW/2, geser ke kanan (positif) hingga hanya 48px dari kanan
  const rightX = useRef(new Animated.Value(0)).current;
  const wordmarkOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Tirai terbuka setelah 400ms jeda kecil, durasi 900ms
    Animated.sequence([
      Animated.delay(400),
      Animated.parallel([
        Animated.timing(leftX, {
          toValue: -(PANEL_CLOSED - PANEL_OPEN),
          duration: 900,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(rightX, {
          toValue: PANEL_CLOSED - PANEL_OPEN,
          duration: 900,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      // Wordmark muncul setelah tirai terbuka
      Animated.timing(wordmarkOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.delay(700),
    ]).start(() => {
      navigation.replace('MainTabs');
    });
  }, [navigation]);

  return (
    <View style={styles.wrap}>
      {/* Valance (panel atas tetap) */}
      <View style={styles.valance}>
        <View style={styles.valanceStripes}>
          {Array.from({ length: Math.ceil(SW / STRIPE_W) + 2 }).map((_, i) => (
            <View
              key={i}
              style={[styles.stripe, { backgroundColor: i % 2 === 0 ? colors.curtain : colors.curtainDark }]}
            />
          ))}
        </View>
        <View style={styles.valanceLine} />
      </View>

      {/* Panel tirai kiri (bergeser ke kiri) */}
      <CurtainPanel translateX={leftX} />

      {/* Panel tirai kanan (bergeser ke kanan, posisi awal SW/2) */}
      <Animated.View style={[styles.panel, styles.panelRight, { transform: [{ translateX: rightX }] }]}>
        <View style={styles.stripes}>
          {Array.from({ length: STRIPE_COUNT }).map((_, i) => (
            <View
              key={i}
              style={[styles.stripe, { backgroundColor: i % 2 === 0 ? colors.curtain : colors.curtainDark }]}
            />
          ))}
        </View>
      </Animated.View>

      {/* Konten tengah (wordmark) */}
      <Animated.View style={[styles.center, { opacity: wordmarkOpacity }]}>
        <Text style={styles.sub}>MANAJER LATIHAN TEATER</Text>
        <Text style={styles.wordmark}>PANGGUNG</Text>
        <View style={styles.garis} />
        <Text style={styles.tagline}>Technology Meets Creativity</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: colors.ink,
  },

  // Valance atas
  valance: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: VALANCE_H,
    overflow: 'hidden',
    zIndex: 10,
  },
  valanceStripes: {
    flexDirection: 'row',
    height: VALANCE_H,
  },
  valanceLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.brass,
  },

  // Panel tirai
  panel: {
    position: 'absolute',
    top: VALANCE_H,
    left: 0,
    width: PANEL_CLOSED,
    bottom: 0,
    overflow: 'hidden',
  },
  panelRight: {
    left: SW / 2,
  },
  stripes: {
    flexDirection: 'row',
    flex: 1,
  },
  stripe: {
    width: STRIPE_W,
    flex: 0,
    height: '100%',
  },

  // Teks tengah
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    zIndex: 5,
  },
  sub: { ...type.label, color: colors.muted },
  wordmark: {
    ...type.screenTitle,
    fontSize: 36,
    letterSpacing: 3.6,
    color: colors.cream,
  },
  garis: { width: 120, height: 1, backgroundColor: colors.brass },
  tagline: { ...type.roleName, fontSize: 16, color: colors.brass },
});
