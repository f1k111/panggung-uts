# DESIGN.md — Panggung (React Native / Expo)

Acuan visual: kanvas desain "Panggung — Desain UI Manajer Latihan Teater" (5 layar + lembar gaya).
Kalau kode berbeda dari kanvas, **kanvas yang benar**. Baca file ini sebelum menulis komponen apa pun.

## 1. Arah gaya (satu kalimat)
Buku catatan sutradara: latar tinta gelap, teks krem, satu aksen kuningan, tirai merah hanya untuk tombol utama.
Rasa **editorial / program pementasan**, bukan dashboard SaaS. Hierarki dibuat dari **tipografi dan garis rambut**, bukan dari kartu.

## 2. Token (salin ke `src/theme/colors.js` dan `typography.js`)
```js
export const colors = {
  ink: '#15100E',        // latar semua layar
  velvet: '#1F1815',     // kolom input / area catatan saja
  line: '#3A2E29',       // garis 1px, tick kosong, track
  lineStrong: '#6B5A50', // border saklar/checkbox off
  cream: '#F2E8D5',      // teks utama
  muted: '#B4A593',      // teks sekunder & label
  curtain: '#A32630',    // tombol utama (blok isi) + splash
  curtainDark: '#8A1C26',
  brass: '#D9A441',      // angka, tick, tab aktif, tombol sekunder, fokus
};
export const radius = 2;           // SEMUA elemen. Jangan lebih.
export const hairline = 1;         // garis pemisah
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 28 };
```
Fonts (Expo): `@expo-google-fonts/bodoni-moda` (500Medium, 500Medium_Italic), `@expo-google-fonts/instrument-sans` (400, 500, 600), `@expo-google-fonts/dm-mono` (400, 500). Muat dengan `useFonts`; tampilkan splash sampai font siap.

| Peran | Font | Ukuran/line | Catatan |
|---|---|---|---|
| Judul layar | BodoniModa 500 | 30–34 / 34–38 | |
| Judul kartu/baris | BodoniModa 500 | 24–28 / 28–32 | |
| Angka besar (H-13, 72%) | BodoniModa 500 | 28–72 | warna brass untuk countdown |
| Nama peran | BodoniModa 500 italic | 14–15 | warna muted |
| Isi | InstrumentSans 400/500 | 15–17 | nama orang 17/500 |
| Penanda/label/tanggal | DMMono 500, HURUF KAPITAL | 11–12, letterSpacing 0.08em | label bagian = brass, tanggal = muted |

## 3. Aturan anti-AI-slop (wajib)
**Jangan:**
- gradien (kecuali garis-garis tirai di splash, itu hard-stop), bayangan, blur, glassmorphism
- kartu dengan sudut bulat besar, kartu dengan border-kiri berwarna, kartu di dalam kartu
- emoji sebagai ikon atau hiasan; ikon berwarna-warni
- ungu/biru neon, banyak aksen; **hanya** brass + tirai
- sapaan generik ("Selamat datang di aplikasi kami!"), data/statistik palsu, kutipan motivasi pengisi
- animasi di mana-mana; micro-interaction acak
- teks rata tengah di semua tempat; semua ukuran font sama
- `Alert.alert` untuk hal biasa (pakai teks inline)

**Lakukan:**
- pemisah = garis 1px `line`, bukan kotak. Daftar = baris berdiri sendiri dengan `borderTopWidth: 1`
- sudut 2px di semua tombol, tag, kolom, checkbox
- angka penting dibuat **besar** dengan Bodoni (H-13, 72%); label kecil dengan DM Mono kapital
- warna punya tugas: brass = "perhatikan/aktif", tirai = "aksi utama", muted = "info sekunder"
- satu tombol utama (tirai) per layar; tombol sekunder = outline brass
- teks Indonesia, ringkas, spesifik ("Simpan absensi", bukan "Submit")
- target sentuh minimal 44×44 (pakai `hitSlop`/tinggi baris ≥ 44)
- kontras: teks muted hanya di atas `ink`/`velvet`; jangan taruh teks brass di atas tirai

## 4. Komponen (cocokkan dengan kanvas)
- **CueBar (skor kesiapan)**: 20 tick sejajar (`flexDirection:'row', gap:4, height:28`); tick terisi = brass, kosong = `line`. Jumlah terisi = `Math.round(skor/100*20)`. Bukan lingkaran/progress ring.
- **ProgressBar tipis** (di daftar): track 4px `line`, isi 4px brass.
- **CountdownBadge**: teks Bodoni besar brass: `H-13`, `Hari H`, `Tuntas` (italic jika selesai).
- **StatusTag**: DMMono 11 kapital, padding 4×8, radius 2. `PERSIAPAN` = outline brass; `SELESAI` = isi brass, teks ink.
- **Saklar hafal**: 52×30, radius 2. On: isi brass + kenop ink di kanan. Off: border `lineStrong` + kenop muted di kiri. Label kecil "HAFAL"/"BELUM" di kiri saklar. Pakai `Pressable` + `accessibilityRole="switch"`.
- **Checkbox kehadiran**: 28×28, radius 2. On: isi brass + centang ink. Off: border `lineStrong`. Area sentuh 44×44.
- **Tombol utama**: tinggi 52, bg `curtain`, teks cream InstrumentSans 600/16, radius 2.
- **Tombol sekunder**: tinggi 52, border 1 brass, teks brass 500/16, transparan.
- **Tab bar bawah**: 4 item (Beranda, Pementasan, Latihan, Tentang), tinggi 72, border atas 1px `line`. Item aktif: warna brass + garis 2px brass di atas item. Label DMMono 11 kapital. Ikon outline 22px stroke 1.6 (`@expo/vector-icons` Feather: `home`, `book`, `clock`, `info`).
- **Tab segmen** (Peran · Properti · Latihan): teks DMMono 12 kapital, tinggi 44, aktif = brass + garis bawah 2px brass.
- **Kolom catatan**: bg `velvet`, border 1 `line`, radius 2, padding 12.
- **EmptyState**: teks 1 kalimat spesifik + tombol sekunder. Tanpa ilustrasi.

## 5. Layar (ringkas; lihat kanvas untuk ukuran)
1. **Splash**: ink. Valance atas 72px + dua panel tirai 48px di sisi, garis-garis vertikal bergantian `curtain`/`curtainDark` (14px), garis kuningan 3px di bawah valance. Tengah: label mono "MANAJER LATIHAN TEATER", wordmark **PANGGUNG** (Bodoni 36, letterSpacing 0.1em), garis brass 120×1, tagline italic brass "Technology Meets Creativity".
   **Animasi (satu-satunya animasi besar):** mulai dengan dua panel menutup layar (masing-masing 50% lebar), lalu bergeser membuka ke tepi sampai lebar 48px (durasi ±900ms, `Easing.out(Easing.cubic)`, `useNativeDriver` untuk transform). Wordmark fade-in setelah tirai terbuka. Total ±2 detik lalu `navigation.replace('MainTabs')`.
2. **Beranda**: tanggal (mono), sapaan Bodoni 30 → blok "PEMENTASAN BERIKUTNYA" (judul + H-xx besar) → blok KESIAPAN (CueBar + 3 baris rincian: hafal naskah, properti siap, kehadiran) → blok "LATIHAN BERIKUTNYA" (angka tanggal besar + judul + info). Antar blok: garis 1px.
3. **Daftar Pementasan**: judul + tombol tambah 48×48 outline brass. Baris: StatusTag, judul Bodoni 24, meta mono muted, ProgressBar + persen; kanan: CountdownBadge.
4. **Detail Pementasan**: tombol kembali (ikon + "PEMENTASAN" mono), judul Bodoni 32, meta mono, tab segmen, ringkasan 1 baris, daftar pemeran (baris ≥ 60px: nama + peran italic; kanan saklar hafal), tombol sekunder "+ Tambah pemeran". Tab Properti: sama polanya dengan checkbox "siap". Tab Latihan: daftar latihan pementasan ini.
5. **Absensi Latihan**: kembali, judul Bodoni 30, meta mono, ringkasan "5 dari 6 pemeran hadir" + persen brass besar (garis atas brass 1px), daftar checkbox, kolom catatan evaluasi, tombol utama "Simpan absensi".
6. **Form (modal)** — tidak ada di kanvas, ikuti pola: judul Bodoni, label mono kapital brass di atas tiap kolom, kolom = `velvet` + border `line`, error = teks inline `curtain`-terang (`#E26A72`, cek kontras) di bawah kolom, tombol utama di bawah.

## 6. Data contoh (seed) — dipakai di kanvas
Pementasan: "Senja di Stasiun Lama" (28 Nov 2026, Aula Sanggar, kesiapan 72%), "Monolog Tiga Pintu" (19 Des 2026, 41%), "Pagi di Teras Sekolah" (selesai, 100%).
Pemeran "Senja di Stasiun Lama": Raka—Kepala Stasiun ✓, Laras—Penumpang Terakhir ✓, Dimas—Porter ✗, Sekar—Ibu Penjual Kopi ✓, Bima—Masinis ✗, Nadia—Narator ✓.
Properti: Lonceng stasiun ✓, Koper kulit tua ✓, Bangku kayu (3) ✗, Papan jadwal kereta ✗, Lampu petromaks ✓, Termos & gelas seng ✓.
Rumus skor = rata-rata (% hafal, % properti siap, % kehadiran). Contoh: (67+67+83)/3 ≈ 72.

## 7. Kebiasaan kode (supaya rapi saat presentasi)
- Semua warna/ukuran dari `theme/`, tidak ada hex di komponen.
- Satu komponen = satu file di `src/components/`, props jelas dan diberi komentar singkat (dosen menilai state/props).
- `StyleSheet.create` di bawah tiap komponen; tanpa style inline kecuali nilai dinamis.
- Komentar Bahasa Indonesia singkat pada bagian Hooks dan navigasi (berguna untuk video & PDF).
- Teks UI Bahasa Indonesia. Tanggal format "SAB, 28 NOV 2026".
