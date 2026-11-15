import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, space } from '../theme/colors';
import { type } from '../theme/typography';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.judul}>Tentang</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>APLIKASI</Text>
        <Text style={styles.nama}>PANGGUNG</Text>
        <Text style={styles.sub}>Manajer Latihan Teater</Text>
        <Text style={styles.body}>
          Panggung membantu pelatih, sutradara, dan ketua komunitas teater
          mengelola persiapan pementasan — pemeran, properti, jadwal latihan,
          absensi, dan skor kesiapan — dalam satu tempat.
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>PEMBUAT</Text>
        <Text style={styles.nama}>Taufiq Komara (Fiki)</Text>
        <Text style={styles.body}>UTS Mobile Programming Native · 2026</Text>
        <Text style={styles.body}>Dosen: Prajoko, M.Kom</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>TEKNOLOGI</Text>
        <Text style={styles.body}>React Native · Expo SDK 58</Text>
        <Text style={styles.body}>React Navigation · AsyncStorage</Text>
        <Text style={styles.body}>Bodoni Moda · Instrument Sans · DM Mono</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>VERSI</Text>
        <Text style={styles.body}>1.0.0</Text>

        <View style={styles.divider} />

        <Text style={styles.tagline}>Technology Meets Creativity.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.ink },
  content: { paddingHorizontal: space.lg, paddingBottom: space.xxl },
  judul: { ...type.screenTitle, color: colors.cream, marginTop: space.xl },
  divider: { height: 1, backgroundColor: colors.line, marginVertical: space.xl },
  label: { ...type.label, color: colors.brass, marginBottom: space.sm },
  nama: { ...type.cardTitle, color: colors.cream, marginBottom: space.xs },
  sub: { ...type.body, color: colors.muted, marginBottom: space.sm },
  body: { ...type.body, color: colors.muted, marginBottom: space.xs },
  tagline: { ...type.roleName, fontSize: 16, color: colors.brass, textAlign: 'center' },
});
