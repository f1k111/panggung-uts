# PANGGUNG — Manajer Latihan Teater (UTS Mobile Programming Native)

Pemilik: Taufiq Komara (Fiki) · Dosen: Prajoko, M.Kom · Deadline LMS: **17 Nov 2026, 23.59**
Framework: **React Native (Expo)** · Bahasa UI: **Indonesia** · Dikerjakan individu.

## 1. Konsep
Aplikasi untuk pelatih/sutradara/ketua komunitas teater agar mengelola persiapan pementasan di satu tempat:
pementasan, pemeran dan peran, jadwal latihan + absensi, checklist properti, dan **skor kesiapan** pementasan.
Nilai manfaat: persiapan pementasan sering berantakan (catatan tersebar di grup chat). Panggung merapikannya.
Tagline: *Technology Meets Creativity.*

## 2. Pemetaan ke ketentuan soal
| Soal | Pemenuhan di Panggung |
|---|---|
| a. Min. 4 komponen | 8+ komponen reusable (lihat §5) |
| b. State & props | State global (Context + useReducer), data mengalir ke komponen anak lewat props + callback |
| c. Navigasi | Bottom tabs + native stack (React Navigation) |
| d. Hooks | useState, useEffect, useReducer, useContext, useMemo, useCallback, useFocusEffect, custom hook |
| e. Tema positif | Manajemen kegiatan seni/komunitas |
| f. Kreativitas | Tirai panggung (animasi pembuka), skor kesiapan, countdown H-X, Mode Hafalan (stretch) |
| g–i. Output | PDF tata cara, video YouTube, repo GitHub |

## 3. Tech stack
- Expo (template `blank`, JavaScript atau TypeScript; pilih **JavaScript** agar cepat)
- `@react-navigation/native`, `@react-navigation/bottom-tabs`, `@react-navigation/native-stack`
- `@react-native-async-storage/async-storage` (data tersimpan)
- `@expo/vector-icons` (ikon), `react-native-safe-area-context`, `react-native-screens`
- Uji lewat **Expo Go** di HP (tanpa emulator)

## 4. Navigasi
```
RootStack
├─ Splash (animasi tirai terbuka, ±2 dtk) → replace ke MainTabs
├─ MainTabs (bottom tabs)
│   ├─ Beranda        (HomeScreen)
│   ├─ Pementasan     (ProductionStack: ProductionList → ProductionDetail)
│   ├─ Latihan        (RehearsalStack: RehearsalList → RehearsalDetail)
│   └─ Tentang        (AboutScreen)
└─ Modal: ProductionForm, RehearsalForm (tambah/ubah)
```

## 5. Komponen (src/components)
1. `ProductionCard` — kartu pementasan (judul, tanggal, countdown, ProgressBar). props: `production`, `readiness`, `onPress`
2. `CastItem` — pemeran + peran + switch "sudah hafal naskah". props: `member`, `onToggleMemorized`, `onDelete`
3. `PropChecklistItem` — properti + checkbox siap. props: `prop`, `onToggle`, `onDelete`
4. `RehearsalCard` — jadwal latihan (tanggal, lokasi, fokus, % hadir). props: `rehearsal`, `onPress`
5. `ProgressBar` — bar kesiapan 0–100 (animated). props: `value`, `label`
6. `CountdownBadge` — "H-12" / "Hari H!" / "Selesai". props: `date`
7. `EmptyState` — ilustrasi ikon + teks + tombol aksi. props: `icon`, `message`, `actionLabel`, `onAction`
8. `AppButton`, `FormField`, `SectionHeader` — UI dasar

## 6. Model data
```js
Production { id, title, genre, showDate (ISO), venue, synopsis,
             cast: [{ id, name, role, memorized: bool }],
             props: [{ id, name, ready: bool }] }
Rehearsal  { id, productionId, date (ISO), place, focus,
             attendance: { [castId]: bool }, notes }
```
**Skor kesiapan** (0–100) per pementasan = rata-rata dari:
- % pemeran sudah hafal naskah
- % properti siap
- % rata-rata kehadiran latihan
Dihitung dengan `useMemo` di `selectors.js`.

## 7. State management
- `src/context/PanggungContext.js`: `useReducer` + Context. Actions: `LOAD`, `ADD_PRODUCTION`, `UPDATE_PRODUCTION`, `DELETE_PRODUCTION`, `ADD_CAST`, `TOGGLE_MEMORIZED`, `ADD_PROP`, `TOGGLE_PROP`, `ADD_REHEARSAL`, `SET_ATTENDANCE`, `DELETE_*`.
- Custom hook `usePanggung()` (membungkus useContext).
- Custom hook `usePersistedReducer` / effect: `useEffect` memuat dari AsyncStorage saat start dan menyimpan tiap state berubah.
- Custom hook `useCountdown(date)` untuk hitung hari tersisa.
- Seed data contoh dimuat bila storage kosong (supaya demo video langsung terisi).

## 8. Layar & perilaku
- **Beranda**: sapaan, pementasan terdekat + countdown + skor kesiapan, latihan berikutnya, ringkasan properti belum siap, kutipan teater (array lokal).
- **Daftar Pementasan**: FlatList `ProductionCard`, tombol tambah, EmptyState.
- **Detail Pementasan**: header info; 3 segmen (Peran · Properti · Latihan); tambah/hapus; toggle hafal/siap.
- **Daftar Latihan**: dikelompokkan "Akan datang" / "Selesai" (useMemo).
- **Detail Latihan**: daftar pemeran dengan checkbox hadir (absensi) + catatan evaluasi.
- **Form** (modal): validasi sederhana (judul wajib, tanggal valid).
- **Tentang**: info pembuat, tujuan app, versi.
- **Stretch (jika waktu ada)**: *Mode Hafalan* — tempel teks dialog, kata acak disembunyikan, ketuk untuk mengungkap.

## 9. Desain visual
- Palet "panggung": burgundy tirai `#5B0E1B`, gelap `#1A0B0F`, emas `#E3B23C`, krem `#F6EBD9`.
- Judul pakai font serif (Playfair Display via `expo-font`, atau fallback serif sistem).
- Splash: dua panel burgundy bergeser membuka ke kiri-kanan (`Animated`), logo "PANGGUNG" muncul.
- Dark theme konsisten, sudut membulat, ikon emas.

## 10. Struktur folder
```
panggung/
├─ App.js
├─ src/
│  ├─ navigation/ (RootNavigator, MainTabs, stacks)
│  ├─ screens/    (Splash, Home, ProductionList, ProductionDetail, RehearsalList, RehearsalDetail, ProductionForm, RehearsalForm, About)
│  ├─ components/
│  ├─ context/    (PanggungContext.js)
│  ├─ hooks/      (usePanggung, useCountdown)
│  ├─ utils/      (selectors.js, date.js, storage.js)
│  ├─ data/       (seed.js, quotes.js)
│  └─ theme/      (colors.js, typography.js)
└─ README.md
```

## 11. Urutan pengerjaan (untuk Claude Code)
1. Init Expo + install dependensi, theme, struktur folder, git init + repo GitHub.
2. Context/reducer + storage + seed + selectors.
3. Komponen dasar → navigasi → layar read-only (Beranda, daftar, detail).
4. Form & aksi (tambah/hapus/toggle/absensi).
5. Splash tirai + polish visual.
6. Uji di Expo Go, perbaiki bug, README, commit + push.
7. (Stretch) Mode Hafalan.

## 12. Deliverable LMS
- **PDF tata cara pembuatan**: Pendahuluan & tujuan → Rancangan (alur, komponen, data) → Langkah pembuatan (setup, tiap fitur, potongan kode + screenshot) → Hasil (screenshot semua layar) → Penutup → Link GitHub & YouTube.
- **Video YouTube** (3–6 menit): intro diri & tema → demo semua fitur → tunjukkan kode (komponen, props, state, hooks, navigasi) → penutup. Set *Unlisted* dan cantumkan link di lembar jawaban.
- **GitHub**: repo publik berisi kode + README (cara menjalankan, fitur, screenshot).

## 13. Jadwal
- 15–16 Nov (pagi): rancangan final, setup, state + komponen + navigasi.
- 16 Nov (siang–malam): fitur lengkap, polish, uji di HP, push GitHub.
- 17 Nov (siang): screenshot, PDF, rekam & upload video.
- 17 Nov (sore, **target selesai sebelum 20.00**): upload LMS (sisakan buffer).
