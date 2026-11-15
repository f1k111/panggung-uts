# PANGGUNG — Manajer Latihan Teater

> *Technology Meets Creativity.*

Aplikasi mobile (React Native / Expo) untuk pelatih, sutradara, dan ketua komunitas teater agar mengelola persiapan pementasan dalam satu tempat.

---

## Fitur

| Fitur | Keterangan |
|---|---|
| **Pementasan** | Buat, ubah, dan hapus data pementasan (judul, genre, tanggal, tempat, sinopsis) |
| **Pemeran & Peran** | Kelola daftar pemeran + toggle hafal/belum hafal naskah |
| **Properti** | Checklist properti panggung + toggle siap/belum |
| **Jadwal Latihan** | Tambah latihan per pementasan, dikelompokkan akan datang/selesai |
| **Absensi** | Tandai kehadiran tiap pemeran per sesi latihan + catatan evaluasi |
| **Skor Kesiapan** | Dihitung otomatis: rata-rata % hafal naskah, % properti siap, % kehadiran |
| **Countdown** | H-X hari menuju pementasan, diperbarui real-time |
| **Splash Tirai** | Animasi dua panel tirai merah membuka (Animated + useNativeDriver) |
| **Beranda** | Pementasan berikutnya, skor kesiapan (CueBar 20 tick), latihan berikutnya |

---

## Cara Menjalankan

### Prasyarat
- Node.js ≥ 18
- Expo Go di HP (iOS atau Android)

### Langkah

```bash
# 1. Clone repo
git clone https://github.com/<username>/panggung-uts.git
cd panggung-uts/panggung

# 2. Install dependensi
npm install

# 3. Jalankan dev server
npx expo start

# 4. Scan QR code dengan Expo Go
```

---

## Struktur Folder

```
panggung/
├─ App.js                   # Entry point: font + Provider + NavigationContainer
├─ src/
│  ├─ navigation/           # RootNavigator, MainTabs, ProductionStack, RehearsalStack
│  ├─ screens/              # 9 layar: Splash, Home, ProductionList/Detail, RehearsalList/Detail, form, About
│  ├─ components/           # 12 komponen reusable
│  ├─ context/              # PanggungContext (useReducer + AsyncStorage)
│  ├─ hooks/                # usePanggung, useCountdown
│  ├─ utils/                # selectors.js, date.js, storage.js, id.js
│  ├─ data/                 # seed.js, quotes.js
│  └─ theme/                # colors.js, typography.js
└─ docs/                    # PANGGUNG_SPEC.md, DESIGN.md
```

---

## Pemenuhan Ketentuan Soal

| Ketentuan | Implementasi |
|---|---|
| Min. 4 komponen | 12 komponen reusable di `src/components/` |
| State & props | `useReducer` + Context; data mengalir via props + callback |
| Navigasi | Bottom tabs (4 tab) + native stack + modal form |
| Hooks | `useState`, `useEffect`, `useReducer`, `useContext`, `useMemo`, `useCallback`, `useFocusEffect`, `useRef`, custom hook `usePanggung`, `useCountdown` |
| Tema positif | Manajemen kegiatan seni/komunitas teater |
| Kreativitas | Animasi tirai splash, skor kesiapan CueBar 20 tick, countdown H-X |

---

## Stack

- **Expo** SDK 58 (blank template, JavaScript)
- **React Navigation** v7 — bottom tabs + native stack
- **AsyncStorage** — persistensi data lokal
- **@expo/vector-icons** — ikon Feather
- **Google Fonts** — Bodoni Moda · Instrument Sans · DM Mono

---

## Info

**Pembuat:** Taufiq Komara (Fiki)  
**Mata Kuliah:** Mobile Programming Native — UTS 2026  
**Dosen:** Prajoko, M.Kom
