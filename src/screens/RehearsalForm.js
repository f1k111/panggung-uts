import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { usePanggung } from '../hooks/usePanggung';
import { colors, space } from '../theme/colors';
import { type } from '../theme/typography';
import FormField from '../components/FormField';
import AppButton from '../components/AppButton';

export default function RehearsalForm({ route, navigation }) {
  const { mode, productionId, rehearsalId } = route.params ?? {};
  const { productions, rehearsals, tambahLatihan, ubahLatihan, hapusLatihan } = usePanggung();

  const existing = mode === 'edit' ? rehearsals.find(r => r.id === rehearsalId) : null;

  // Jika productionId tidak dikirim, tampilkan pilihan dari state (ambil dari existing)
  const resolvedProductionId = productionId ?? existing?.productionId ?? productions[0]?.id ?? '';

  const [date, setDate] = useState(existing?.date ? existing.date.slice(0, 10) : '');
  const [time, setTime] = useState(existing?.date ? existing.date.slice(11, 16) : '19:00');
  const [place, setPlace] = useState(existing?.place ?? '');
  const [focus, setFocus] = useState(existing?.focus ?? '');
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!focus.trim()) e.focus = 'Fokus latihan wajib diisi';
    if (!date.trim()) e.date = 'Tanggal wajib diisi';
    else if (isNaN(Date.parse(date))) e.date = 'Format tanggal tidak valid (YYYY-MM-DD)';
    if (!place.trim()) e.place = 'Tempat wajib diisi';
    return e;
  }

  function handleSimpan() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const isoDate = new Date(`${date}T${time || '19:00'}:00`).toISOString();
    const data = {
      productionId: resolvedProductionId,
      date: isoDate,
      place: place.trim(),
      focus: focus.trim(),
    };

    if (mode === 'edit') {
      ubahLatihan({ id: rehearsalId, ...data });
    } else {
      tambahLatihan(data);
    }
    navigation.goBack();
  }

  function handleHapus() {
    hapusLatihan(rehearsalId);
    navigation.goBack();
  }

  const prodLabel = productions.find(p => p.id === resolvedProductionId)?.title ?? '—';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.judul}>{mode === 'edit' ? 'Ubah Latihan' : 'Latihan Baru'}</Text>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <Feather name="x" size={22} color={colors.muted} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.infoField}>
          <Text style={styles.infoLabel}>PEMENTASAN</Text>
          <Text style={styles.infoValue}>{prodLabel}</Text>
        </View>

        <FormField
          label="FOKUS LATIHAN"
          value={focus}
          onChangeText={v => { setFocus(v); setErrors(e => ({ ...e, focus: null })); }}
          error={errors.focus}
          placeholder="mis. Blocking adegan 2–3"
        />
        <FormField
          label="TANGGAL (YYYY-MM-DD)"
          value={date}
          onChangeText={v => { setDate(v); setErrors(e => ({ ...e, date: null })); }}
          error={errors.date}
          placeholder="2026-11-21"
          keyboardType="numeric"
        />
        <FormField
          label="JAM (HH:MM)"
          value={time}
          onChangeText={setTime}
          placeholder="19:00"
          keyboardType="numeric"
        />
        <FormField
          label="TEMPAT"
          value={place}
          onChangeText={v => { setPlace(v); setErrors(e => ({ ...e, place: null })); }}
          error={errors.place}
          placeholder="mis. Aula Sanggar"
        />

        <AppButton label="Simpan" onPress={handleSimpan} style={styles.btnSimpan} />
        {mode === 'edit' && (
          <AppButton label="Hapus latihan" onPress={handleHapus} variant="secondary" style={styles.btnHapus} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.ink },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: space.lg,
    paddingTop: space.lg,
    paddingBottom: space.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  judul: { ...type.cardTitle, color: colors.cream },
  content: { padding: space.lg, gap: space.lg },
  infoField: { gap: 4 },
  infoLabel: { ...type.label, color: colors.brass },
  infoValue: { ...type.bodyMedium, color: colors.cream },
  btnSimpan: { marginTop: space.sm },
  btnHapus: { marginTop: space.sm },
});
