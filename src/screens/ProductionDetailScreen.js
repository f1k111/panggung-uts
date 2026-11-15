import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { usePanggung } from '../hooks/usePanggung';
import { colors, space, radius } from '../theme/colors';
import { type } from '../theme/typography';
import { formatTanggal } from '../utils/date';
import { hitungHariTersisa } from '../utils/date';
import { skorHafal, skorProperti } from '../utils/selectors';
import CastItem from '../components/CastItem';
import PropChecklistItem from '../components/PropChecklistItem';
import RehearsalCard from '../components/RehearsalCard';
import AppButton from '../components/AppButton';
import EmptyState from '../components/EmptyState';

const TABS = ['PERAN', 'PROPERTI', 'LATIHAN'];

export default function ProductionDetailScreen({ route, navigation }) {
  const { productionId } = route.params;
  const { productions, rehearsals, toggleHafal, toggleProperti, hapusPemeran, hapusProperti } = usePanggung();
  const [activeTab, setActiveTab] = useState(0);

  const production = productions.find(p => p.id === productionId);
  const rehProd = useMemo(
    () => rehearsals.filter(r => r.productionId === productionId),
    [rehearsals, productionId]
  );

  if (!production) return null;

  const sisa = hitungHariTersisa(production.showDate);
  const countdownTeks = sisa > 0 ? `H-${sisa}` : sisa === 0 ? 'Hari H' : 'Selesai';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Tombol kembali + edit */}
      <View style={styles.topBar}>
        <Pressable style={styles.back} onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={18} color={colors.muted} />
          <Text style={styles.backLabel}>PEMENTASAN</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('ProductionForm', { mode: 'edit', productionId })}
          hitSlop={8}
        >
          <Feather name="edit-2" size={18} color={colors.muted} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Header pementasan */}
        <Text style={styles.judul}>{production.title}</Text>
        <Text style={styles.meta}>
          {formatTanggal(production.showDate)} · {countdownTeks}
        </Text>

        {/* Tab segmen */}
        <View style={styles.tabRow}>
          {TABS.map((tab, i) => (
            <Pressable key={tab} style={styles.tabItem} onPress={() => setActiveTab(i)}>
              <Text style={[styles.tabLabel, activeTab === i && styles.tabAktif]}>{tab}</Text>
              {activeTab === i && <View style={styles.tabGaris} />}
            </Pressable>
          ))}
        </View>

        {/* Tab: PERAN */}
        {activeTab === 0 && (
          <View style={styles.tabContent}>
            <Text style={styles.ringkasan}>
              {skorHafal(production.cast)}% hafal naskah ({production.cast.filter(m => m.memorized).length} dari {production.cast.length} pemeran)
            </Text>
            {production.cast.map(member => (
              <CastItem
                key={member.id}
                member={member}
                onToggleMemorized={() => toggleHafal(productionId, member.id)}
                onDelete={() => hapusPemeran(productionId, member.id)}
              />
            ))}
            {production.cast.length === 0 && (
              <EmptyState icon="users" message="Belum ada pemeran ditambahkan." />
            )}
            <AppButton
              label="+ Tambah pemeran"
              variant="secondary"
              style={styles.btnTambah}
              onPress={() => navigation.navigate('CastForm', { productionId })}
            />
          </View>
        )}

        {/* Tab: PROPERTI */}
        {activeTab === 1 && (
          <View style={styles.tabContent}>
            <Text style={styles.ringkasan}>
              {skorProperti(production.props)}% siap ({production.props.filter(p => p.ready).length} dari {production.props.length} properti)
            </Text>
            {production.props.map(prop => (
              <PropChecklistItem
                key={prop.id}
                prop={prop}
                onToggle={() => toggleProperti(productionId, prop.id)}
                onDelete={() => hapusProperti(productionId, prop.id)}
              />
            ))}
            {production.props.length === 0 && (
              <EmptyState icon="box" message="Belum ada properti ditambahkan." />
            )}
            <AppButton
              label="+ Tambah properti"
              variant="secondary"
              style={styles.btnTambah}
              onPress={() => navigation.navigate('PropForm', { productionId })}
            />
          </View>
        )}

        {/* Tab: LATIHAN */}
        {activeTab === 2 && (
          <View style={styles.tabContent}>
            {rehProd.length > 0 ? rehProd.map(r => (
              <RehearsalCard
                key={r.id}
                rehearsal={r}
                castCount={production.cast.length}
                onPress={() => navigation.navigate('RehearsalDetail', { rehearsalId: r.id })}
              />
            )) : (
              <EmptyState icon="clock" message="Belum ada latihan untuk pementasan ini." />
            )}
            <AppButton
              label="+ Tambah latihan"
              variant="secondary"
              style={styles.btnTambah}
              onPress={() => navigation.navigate('RehearsalForm', { mode: 'add', productionId })}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.ink },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: space.lg, paddingTop: space.lg, paddingBottom: space.sm },
  back: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  backLabel: { ...type.label, color: colors.muted },
  content: { paddingHorizontal: space.lg, paddingBottom: space.xxl },
  judul: { ...type.screenTitle, fontSize: 32, color: colors.cream, marginBottom: space.xs },
  meta: { ...type.label, color: colors.muted, marginBottom: space.lg },
  tabRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.line, marginBottom: space.lg },
  tabItem: { flex: 1, alignItems: 'center', height: 44, justifyContent: 'center', position: 'relative' },
  tabLabel: { ...type.label, color: colors.muted },
  tabAktif: { color: colors.brass },
  tabGaris: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, backgroundColor: colors.brass },
  tabContent: { gap: 0 },
  ringkasan: { ...type.body, color: colors.muted, marginBottom: space.sm },
  btnTambah: { marginTop: space.lg },
});
