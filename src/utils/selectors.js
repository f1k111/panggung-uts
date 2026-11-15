// Semua kalkulasi skor menggunakan useMemo di layar pemanggil

// Persentase pemeran hafal naskah (0–100)
export function skorHafal(cast) {
  if (!cast || cast.length === 0) return 0;
  const hafal = cast.filter(m => m.memorized).length;
  return Math.round((hafal / cast.length) * 100);
}

// Persentase properti siap (0–100)
export function skorProperti(props) {
  if (!props || props.length === 0) return 0;
  const siap = props.filter(p => p.ready).length;
  return Math.round((siap / props.length) * 100);
}

// Rata-rata kehadiran semua latihan satu pementasan (0–100)
export function skorKehadiran(rehearsals, cast) {
  if (!rehearsals || rehearsals.length === 0) return 0;
  if (!cast || cast.length === 0) return 0;

  // Hanya hitung latihan yang sudah punya data absensi (ada minimal 1 entri)
  const latihanDenganAbsensi = rehearsals.filter(
    r => r.attendance && Object.keys(r.attendance).length > 0
  );
  if (latihanDenganAbsensi.length === 0) return 0;

  const totalPersen = latihanDenganAbsensi.reduce((sum, r) => {
    const hadir = cast.filter(m => r.attendance[m.id]).length;
    return sum + (hadir / cast.length) * 100;
  }, 0);

  return Math.round(totalPersen / latihanDenganAbsensi.length);
}

// Skor kesiapan keseluruhan pementasan (rata-rata tiga komponen)
export function skorKesiapan(production, rehearsals) {
  const h = skorHafal(production.cast);
  const p = skorProperti(production.props);
  const k = skorKehadiran(rehearsals, production.cast);
  return Math.round((h + p + k) / 3);
}

// Pementasan berikutnya (tanggal paling dekat di masa depan)
export function pementasanBerikutnya(productions) {
  const sekarang = new Date();
  const akan = productions
    .filter(p => new Date(p.showDate) > sekarang)
    .sort((a, b) => new Date(a.showDate) - new Date(b.showDate));
  return akan[0] || null;
}

// Latihan berikutnya dari semua pementasan
export function latihanBerikutnya(rehearsals) {
  const sekarang = new Date();
  const akan = rehearsals
    .filter(r => new Date(r.date) > sekarang)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  return akan[0] || null;
}
