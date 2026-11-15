import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { usePanggung } from '../hooks/usePanggung';
import { colors, space } from '../theme/colors';
import { type } from '../theme/typography';
import FormField from '../components/FormField';
import AppButton from '../components/AppButton';

export default function PropForm({ route, navigation }) {
  const { productionId } = route.params;
  const { tambahProperti } = usePanggung();

  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  function handleSimpan() {
    if (!name.trim()) { setError('Nama properti wajib diisi'); return; }
    tambahProperti(productionId, { name: name.trim() });
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.judul}>Tambah Properti</Text>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <Feather name="x" size={22} color={colors.muted} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <FormField
          label="NAMA PROPERTI"
          value={name}
          onChangeText={v => { setName(v); setError(null); }}
          error={error}
          placeholder="mis. Lonceng stasiun"
          autoFocus
        />
        <AppButton label="Tambah properti" onPress={handleSimpan} style={styles.btn} />
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
  btn: { marginTop: space.sm },
});
