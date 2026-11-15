import React, { useMemo } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePanggung } from '../hooks/usePanggung';
import { colors, space } from '../theme/colors';
import { type } from '../theme/typography';
import {
  skorKesiapan, skorHafal, skorProperti, skorKehadiran,
  pementasanBerikutnya, latihanBerikutnya,
} from '../utils/selectors';
import { formatHariIni, formatTanggal, formatJam, sapaan } from '../utils/date';
import CueBar from '../components/CueBar';
import CountdownBadge from '../components/CountdownBadge';
import { quotes } from '../data/quotes';

export default function HomeScreen() {
  const { productions, rehearsals } = usePanggung();

  // Pementasan dan latihan berikutnya
  const prodBerikut = useMemo(() => pementasanBerikutnya(productions), [productions]);
  const latBerikut = useMemo(() => latihanBerikutnya(rehearsals), [rehearsals]);

  // Skor kesiapan pementasan berikutnya
  const skor = useMemo(() => {
    if (!prodBerikut) return 0;
    const rehProd = rehearsals.filter(r => r.productionId === prodBerikut.id);
    return skorKesiapan(prodBerikut, rehProd);
  }, [prodBerikut, rehearsals]);

  const hafal = prodBerikut ? skorHafal(prodBerikut.cast) : 0;
  const prop = prodBerikut ? skorProperti(prodBerikut.props) : 0;

  const kehadiran = useMemo(() => {
    if (!prodBerikut) return 0;
    const rehProd = rehearsals.filter(r => r.productionId === prodBerikut.id);
    return skorKehadiran(rehProd, prodBerikut.cast);
  }, [prodBerikut, rehearsals]);

  // Kutipan acak per sesi
  const kutipan = useMemo(() => quotes[Math.floor(Math.random() * quotes.length)], []);

  // Pementasan dari latihan berikutnya
  const prodLatBerikut = latBerikut
    ? productions.find(p => p.id === latBerikut.productionId)
    : null;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {/* Tanggal & sapaan */}
        <Text style={styles.tanggal}>{formatHariIni()}</Text>
        <Text style={styles.sapaan}>{sapaan()}, Fiki.</Text>

        <View style={styles.divider} />

        {/* Pementasan berikutnya */}
        {prodBerikut ? (
          <View style={styles.blok}>
            <Text style={styles.blokLabel}>PEMENTASAN BERIKUTNYA</Text>
            <View style={styles.rowSpread}>
              <Text style={styles.judulProd}>{prodBerikut.title}</Text>
              <CountdownBadge date={prodBerikut.showDate} size="big" />
            </View>
            <Text style={styles.metaProd}>
              {formatTanggal(prodBerikut.showDate)} · {prodBerikut.venue}
            </Text>
          </View>
        ) : (
          <View style={styles.blok}>
            <Text style={styles.blokLabel}>PEMENTASAN BERIKUTNYA</Text>
            <Text style={styles.kosong}>Belum ada pementasan dijadwalkan.</Text>
          </View>
        )}

        <View style={styles.divider} />

        {/* Kesiapan */}
        {prodBerikut && (
          <>
            <View style={styles.blok}>
              <View style={styles.rowSpread}>
                <Text style={styles.blokLabel}>KESIAPAN</Text>
                <Text style={styles.skorBesar}>{skor}%</Text>
              </View>
              <CueBar value={skor} />
              <View style={styles.rincian}>
                <View style={styles.rincianBaris}>
                  <Text style={styles.rincianLabel}>Hafal naskah</Text>
                  <Text style={styles.rincianNilai}>
                    {prodBerikut.cast.filter(m => m.memorized).length} / {prodBerikut.cast.length}
                  </Text>
                </View>
                <View style={[styles.rincianBaris, styles.borderTop]}>
                  <Text style={styles.rincianLabel}>Properti siap</Text>
                  <Text style={styles.rincianNilai}>
                    {prodBerikut.props.filter(p => p.ready).length} / {prodBerikut.props.length}
                  </Text>
                </View>
                <View style={[styles.rincianBaris, styles.borderTop]}>
                  <Text style={styles.rincianLabel}>Kehadiran latihan</Text>
                  <Text style={styles.rincianNilai}>{kehadiran}%</Text>
                </View>
              </View>
            </View>
            <View style={styles.divider} />
          </>
        )}

        {/* Latihan berikutnya */}
        {latBerikut ? (
          <View style={styles.blok}>
            <Text style={styles.blokLabel}>LATIHAN BERIKUTNYA</Text>
            <View style={styles.rowAligned}>
              <View style={styles.tglBlok}>
                <Text style={styles.tglAngka}>{new Date(latBerikut.date).getDate()}</Text>
                <Text style={styles.tglBulan}>
                  {['JAN','FEB','MAR','APR','MEI','JUN','JUL','AGS','SEP','OKT','NOV','DES'][new Date(latBerikut.date).getMonth()]}
                </Text>
              </View>
              <View style={styles.latInfo}>
                <Text style={styles.latFokus}>{latBerikut.focus}</Text>
                <Text style={styles.latMeta}>
                  {['MIN','SEN','SEL','RAB','KAM','JUM','SAB'][new Date(latBerikut.date).getDay()]} · {formatJam(latBerikut.date)} · {latBerikut.place}
                </Text>
                {prodLatBerikut && (
                  <Text style={styles.latProd}>{prodLatBerikut.title}</Text>
                )}
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.blok}>
            <Text style={styles.blokLabel}>LATIHAN BERIKUTNYA</Text>
            <Text style={styles.kosong}>Belum ada latihan dijadwalkan.</Text>
          </View>
        )}

        <View style={styles.divider} />

        {/* Kutipan */}
        <View style={styles.blok}>
          <Text style={styles.kutipanTeks}>"{kutipan.text}"</Text>
          <Text style={styles.kutipanAuthor}>— {kutipan.author}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.ink },
  scroll: { flex: 1 },
  content: { paddingHorizontal: space.lg, paddingBottom: space.xxl },
  tanggal: { ...type.label, color: colors.muted, marginTop: space.xl },
  sapaan: { ...type.screenTitle, fontSize: 30, color: colors.cream, marginTop: space.sm },
  divider: { height: 1, backgroundColor: colors.line, marginVertical: space.xl },
  blok: { gap: space.md },
  blokLabel: { ...type.label, color: colors.brass },
  rowSpread: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  rowAligned: { flexDirection: 'row', alignItems: 'flex-start', gap: space.lg },
  judulProd: { ...type.cardTitle, fontSize: 28, color: colors.cream, flex: 1, paddingRight: 8 },
  metaProd: { ...type.label, color: colors.muted },
  skorBesar: { ...type.countdownBig, fontSize: 48, color: colors.brass },
  rincian: { marginTop: space.sm },
  rincianBaris: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: space.sm },
  borderTop: { borderTopWidth: 1, borderTopColor: colors.line },
  rincianLabel: { ...type.body, color: colors.cream },
  rincianNilai: { ...type.bodyMedium, color: colors.cream },
  tglBlok: { alignItems: 'center', minWidth: 40 },
  tglAngka: { ...type.countdownMid, fontSize: 36, color: colors.brass, lineHeight: 40 },
  tglBulan: { ...type.labelSm, color: colors.muted },
  latInfo: { flex: 1, gap: 4 },
  latFokus: { ...type.bodyMedium, color: colors.cream },
  latMeta: { ...type.label, color: colors.muted },
  latProd: { ...type.label, color: colors.muted },
  kosong: { ...type.body, color: colors.muted },
  kutipanTeks: { ...type.roleName, fontSize: 15, color: colors.muted },
  kutipanAuthor: { ...type.labelSm, color: colors.lineStrong },
});
