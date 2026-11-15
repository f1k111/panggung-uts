import React, { useMemo } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { usePanggung } from '../hooks/usePanggung';
import { colors, space } from '../theme/colors';
import { type } from '../theme/typography';
import { skorKesiapan } from '../utils/selectors';
import ProductionCard from '../components/ProductionCard';
import EmptyState from '../components/EmptyState';

export default function ProductionListScreen({ navigation }) {
  const { productions, rehearsals } = usePanggung();

  // Hitung skor kesiapan tiap pementasan
  const withScore = useMemo(() =>
    productions.map(p => ({
      ...p,
      readiness: skorKesiapan(p, rehearsals.filter(r => r.productionId === p.id)),
    })),
    [productions, rehearsals]
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.judul}>Pementasan</Text>
        <Pressable
          style={styles.btnTambah}
          onPress={() => navigation.navigate('ProductionForm', { mode: 'add' })}
          hitSlop={8}
        >
          <Feather name="plus" size={22} color={colors.brass} />
        </Pressable>
      </View>

      <FlatList
        data={withScore}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProductionCard
            production={item}
            readiness={item.readiness}
            onPress={() => navigation.navigate('ProductionDetail', { productionId: item.id })}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="book"
            message="Belum ada pementasan. Buat pementasan pertama untuk memulai."
            actionLabel="+ Tambah pementasan"
            onAction={() => navigation.navigate('ProductionForm', { mode: 'add' })}
          />
        }
      />
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
});
