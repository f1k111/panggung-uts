import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { usePanggung } from '../hooks/usePanggung';
import { colors, space } from '../theme/colors';
import { type } from '../theme/typography';
import FormField from '../components/FormField';
import AppButton from '../components/AppButton';

export default function ProductionForm({ route, navigation }) {
  const { mode, productionId } = route.params ?? {};
  const { productions, tambahPementasan, ubahPementasan, hapusPementasan } = usePanggung();

  const existing = mode === 'edit' ? productions.find(p => p.id === productionId) : null;

  const [title, setTitle] = useState(existing?.title ?? '');
  const [genre, setGenre] = useState(existing?.genre ?? '');
  const [showDate, setShowDate] = useState(
    existing?.showDate ? existing.showDate.slice(0, 10) : ''
  );
  const [venue, setVenue] = useState(existing?.venue ?? '');
  const [synopsis, setSynopsis] = useState(existing?.synopsis ?? '');
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!title.trim()) e.title = 'Judul wajib diisi';
    if (!showDate.trim()) e.showDate = 'Tanggal wajib diisi';
    else if (isNaN(Date.parse(showDate))) e.showDate = 'Format tanggal tidak valid (YYYY-MM-DD)';
    if (!venue.trim()) e.venue = 'Tempat wajib diisi';
    return e;
  }

  function handleSimpan() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const data = {
      title: title.trim(),
      genre: genre.trim(),
      showDate: new Date(showDate).toISOString(),
      venue: venue.trim(),
      synopsis: synopsis.trim(),
    };

    if (mode === 'edit') {
      ubahPementasan({ id: productionId, ...data });
      navigation.goBack();
    } else {
      tambahPementasan(data);
      navigation.goBack();
    }
  }

  function handleHapus() {
    hapusPementasan(productionId);
    // Kembali dua level (detail → list)
    navigation.pop(2);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.judul}>{mode === 'edit' ? 'Ubah Pementasan' : 'Pementasan Baru'}</Text>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <Feather name="x" size={22} color={colors.muted} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <FormField
          label="JUDUL"
          value={title}
          onChangeText={v => { setTitle(v); setErrors(e => ({ ...e, title: null })); }}
          error={errors.title}
          placeholder="mis. Senja di Stasiun Lama"
        />
        <FormField
          label="GENRE"
          value={genre}
          onChangeText={setGenre}
          placeholder="mis. Drama, Monolog, Komedi"
        />
        <FormField
          label="TANGGAL PEMENTASAN (YYYY-MM-DD)"
          value={showDate}
          onChangeText={v => { setShowDate(v); setErrors(e => ({ ...e, showDate: null })); }}
          error={errors.showDate}
          placeholder="2026-11-28"
          keyboardType="numeric"
        />
        <FormField
          label="TEMPAT"
          value={venue}
          onChangeText={v => { setVenue(v); setErrors(e => ({ ...e, venue: null })); }}
          error={errors.venue}
          placeholder="mis. Aula Sanggar"
        />
        <FormField
          label="SINOPSIS"
          value={synopsis}
          onChangeText={setSynopsis}
          placeholder="Cerita singkat pementasan..."
          multiline
          style={{ minHeight: 80, textAlignVertical: 'top' }}
        />

        <AppButton label="Simpan" onPress={handleSimpan} style={styles.btnSimpan} />

        {mode === 'edit' && (
          <AppButton
            label="Hapus pementasan"
            onPress={handleHapus}
            variant="secondary"
            style={styles.btnHapus}
          />
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
  btnSimpan: { marginTop: space.sm },
  btnHapus: { marginTop: space.sm },
});
