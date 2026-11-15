import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { usePanggung } from '../hooks/usePanggung';
import { colors, space, radius } from '../theme/colors';
import { type } from '../theme/typography';
import { formatTanggal, formatJam } from '../utils/date';
import AppButton from '../components/AppButton';

export default function RehearsalDetailScreen({ route, navigation }) {
  const { rehearsalId } = route.params;
  const { rehearsals, productions, simpanAbsensi } = usePanggung();

  const rehearsal = rehearsals.find(r => r.id === rehearsalId);
  const production = rehearsal ? productions.find(p => p.id === rehearsal.productionId) : null;

  const [attendance, setAttendance] = useState(rehearsal?.attendance ?? {});
  const [notes, setNotes] = useState(rehearsal?.notes ?? '');
  const [saved, setSaved] = useState(false);

  const cast = production?.cast ?? [];

  const hadirCount = useMemo(
    () => cast.filter(m => attendance[m.id]).length,
    [attendance, cast]
  );
  const pct = cast.length > 0 ? Math.round((hadirCount / cast.length) * 100) : 0;

  if (!rehearsal || !production) return null;

  function toggleHadir(castId) {
    setSaved(false);
    setAttendance(prev => ({ ...prev, [castId]: !prev[castId] }));
  }

  function handleSimpan() {
    simpanAbsensi(rehearsalId, attendance, notes);
    setSaved(true);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={18} color={colors.muted} />
        <Text style={styles.backLabel}>LATIHAN</Text>
      </Pressable>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <Text style={styles.judul}>{rehearsal.focus}</Text>
        <Text style={styles.meta}>
          {formatTanggal(rehearsal.date)} · {formatJam(rehearsal.date)} · {rehearsal.place}
        </Text>

        {/* Ringkasan kehadiran */}
        <View style={styles.ringkasanWrap}>
          <Text style={styles.ringkasanTeks}>{hadirCount} dari {cast.length} pemeran hadir</Text>
          <Text style={styles.pctBesar}>{pct}%</Text>
        </View>
        <View style={styles.garisBrass} />

        {/* Daftar absensi */}
        {cast.map(member => (
          <Pressable
            key={member.id}
            onPress={() => toggleHadir(member.id)}
            style={styles.absenRow}
          >
            <View style={styles.namaWrap}>
              <Text style={styles.nama}>{member.name}</Text>
              <Text style={styles.peran}>{member.role}</Text>
            </View>
            <Pressable
              onPress={() => toggleHadir(member.id)}
              style={[styles.checkbox, attendance[member.id] ? styles.checkOn : styles.checkOff]}
              hitSlop={8}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: !!attendance[member.id] }}
            >
              {attendance[member.id] && <Feather name="check" size={16} color={colors.ink} />}
            </Pressable>
          </Pressable>
        ))}

        {/* Catatan evaluasi */}
        <Text style={styles.catatanLabel}>CATATAN EVALUASI</Text>
        <TextInput
          style={styles.catatanInput}
          value={notes}
          onChangeText={v => { setNotes(v); setSaved(false); }}
          multiline
          placeholder="Tulis catatan evaluasi latihan..."
          placeholderTextColor={colors.lineStrong}
        />

        {saved && <Text style={styles.savedTeks}>Absensi tersimpan.</Text>}

        <AppButton label="Simpan absensi" onPress={handleSimpan} style={styles.btnSimpan} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.ink },
  back: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: space.lg, paddingTop: space.lg, paddingBottom: space.sm },
  backLabel: { ...type.label, color: colors.muted },
  content: { paddingHorizontal: space.lg, paddingBottom: space.xxl },
  judul: { ...type.screenTitle, fontSize: 30, color: colors.cream },
  meta: { ...type.label, color: colors.muted, marginTop: space.xs, marginBottom: space.lg },
  ringkasanWrap: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: space.sm },
  ringkasanTeks: { ...type.body, color: colors.cream },
  pctBesar: { ...type.countdownBig, fontSize: 40, color: colors.brass },
  garisBrass: { height: 1, backgroundColor: colors.brass, marginBottom: space.sm },
  absenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingVertical: space.sm,
  },
  namaWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: space.sm },
  nama: { ...type.personName, color: colors.cream },
  peran: { ...type.roleName, color: colors.muted },
  checkbox: { width: 28, height: 28, borderRadius: radius, alignItems: 'center', justifyContent: 'center' },
  checkOn: { backgroundColor: colors.brass },
  checkOff: { borderWidth: 1, borderColor: colors.lineStrong },
  catatanLabel: { ...type.label, color: colors.brass, marginTop: space.xl, marginBottom: space.sm },
  catatanInput: {
    backgroundColor: colors.velvet,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius,
    padding: space.md,
    ...type.body,
    color: colors.cream,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  savedTeks: { ...type.label, color: colors.brass, marginTop: space.sm },
  btnSimpan: { marginTop: space.lg },
});
