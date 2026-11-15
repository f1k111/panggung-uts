import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { usePanggung } from '../hooks/usePanggung';
import { colors, space } from '../theme/colors';
import { type } from '../theme/typography';
import FormField from '../components/FormField';
import AppButton from '../components/AppButton';

export default function CastForm({ route, navigation }) {
  const { productionId } = route.params;
  const { tambahPemeran } = usePanggung();

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});

  function handleSimpan() {
    const e = {};
    if (!name.trim()) e.name = 'Nama wajib diisi';
    if (!role.trim()) e.role = 'Peran wajib diisi';
    if (Object.keys(e).length) { setErrors(e); return; }

    tambahPemeran(productionId, { name: name.trim(), role: role.trim() });
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.judul}>Tambah Pemeran</Text>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <Feather name="x" size={22} color={colors.muted} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <FormField
          label="NAMA"
          value={name}
          onChangeText={v => { setName(v); setErrors(e => ({ ...e, name: null })); }}
          error={errors.name}
          placeholder="mis. Raka"
          autoFocus
        />
        <FormField
          label="PERAN"
          value={role}
          onChangeText={v => { setRole(v); setErrors(e => ({ ...e, role: null })); }}
          error={errors.role}
          placeholder="mis. Kepala Stasiun"
        />
        <AppButton label="Tambah pemeran" onPress={handleSimpan} style={styles.btn} />
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
