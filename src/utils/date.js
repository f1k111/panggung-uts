const HARI = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'];
const BULAN = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGS', 'SEP', 'OKT', 'NOV', 'DES'];

// "SAB, 28 NOV 2026"
export function formatTanggal(isoString) {
  const d = new Date(isoString);
  const hari = HARI[d.getDay()];
  const tgl = d.getDate();
  const bln = BULAN[d.getMonth()];
  const thn = d.getFullYear();
  return `${hari}, ${tgl} ${bln} ${thn}`;
}

// "19.00"
export function formatJam(isoString) {
  const d = new Date(isoString);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}.${m}`;
}

// "MINGGU · 15 NOV 2026"
export function formatHariIni() {
  const HARI_PANJANG = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
  const d = new Date();
  return `${HARI_PANJANG[d.getDay()]} · ${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
}

// Hitung hari tersisa dari sekarang ke tanggal target
// Negatif = sudah lewat
export function hitungHariTersisa(isoString) {
  const target = new Date(isoString);
  const sekarang = new Date();
  // Bandingkan tanggal saja (abaikan jam)
  const tTarget = Date.UTC(target.getFullYear(), target.getMonth(), target.getDate());
  const tHariIni = Date.UTC(sekarang.getFullYear(), sekarang.getMonth(), sekarang.getDate());
  return Math.round((tTarget - tHariIni) / 86400000);
}

// Sapaan berdasarkan jam
export function sapaan() {
  const jam = new Date().getHours();
  if (jam < 11) return 'Selamat pagi';
  if (jam < 15) return 'Selamat siang';
  if (jam < 18) return 'Selamat sore';
  return 'Selamat malam';
}
