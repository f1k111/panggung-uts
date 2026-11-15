import React, { useMemo } from 'react';
import { View, Text, SectionList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { usePanggung } from '../hooks/usePanggung';
import { colors, space } from '../theme/colors';
import { type } from '../theme/typography';
import RehearsalCard from '../components/RehearsalCard';
import EmptyState from '../components/EmptyState';

export default function RehearsalListScreen({ navigation }) {
  const { rehearsals, productions } = usePanggung();

  // Kelompokkan latihan: akan datang vs selesai
  const { akanDatang, selesai } = useMemo(() => {
    const sekarang = new Date();
    const akan = rehearsals
      .filter(r => new Date(r.date) >= sekarang)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    const lewat = rehearsals
      .filter(r => new Date(r.date) < sekarang)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    return { akanDatang: akan, selesai: lewat };
  }, [rehearsals]);

  const sections = [];
  if (akanDatang.length) sections.push({ title: 'AKAN DATANG', data: akanDatang });
  if (selesai.length) sections.push({ title: 'SELESAI', data: selesai });

  function castCountFor(r) {
    const prod = productions.find(p => p.id === r.productionId);
    return prod ? prod.cast.length : 0;
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.judul}>Latihan</Text>
        <Pressable
          style={styles.btnTambah}
          onPress={() => navigation.navigate('RehearsalForm', { mode: 'add' })}
          hitSlop={8}
        >
          <Feather name="plus" size={22} color={colors.brass} />
        </Pressable>
      </View>

      {sections.length === 0 ? (
        <EmptyState
          icon="clock"
          message="Belum ada latihan dijadwalkan."
          actionLabel="+ Tambah latihan"
          onAction={() => navigation.navigate('RehearsalForm', { mode: 'add' })}
        />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionTitle}>{section.title}</Text>
          )}
          renderItem={({ item }) => (
            <RehearsalCard
              rehearsal={item}
              castCount={castCountFor(item)}
              onPress={() => navigation.navigate('RehearsalDetail', { rehearsalId: item.id })}
            />
          )}
        />
      )}
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
  },
  judul: { ...type.screenTitle, color: colors.cream },
  btnTambah: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: colors.brass,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: { paddingHorizontal: space.lg, paddingBottom: space.xxl },
  sectionTitle: { ...type.label, color: colors.brass, marginTop: space.xl, marginBottom: space.sm },
});
