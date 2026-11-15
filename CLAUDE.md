# CLAUDE.md — Panggung

**Baca docs/PANGGUNG_SPEC.md dan docs/DESIGN.md sebelum menulis kode apa pun.**

## Aturan proyek
- Framework: React Native + Expo (JavaScript, blank template)
- Semua warna/spacing dari `src/theme/colors.js` — tidak ada hex langsung di komponen
- Radius 2px untuk semua elemen UI; tidak ada shadow/gradien
- Font: BodoniModa (judul), InstrumentSans (isi), DMMono (label/tanggal)
- Teks UI seluruhnya Bahasa Indonesia
- `StyleSheet.create` di bawah tiap file komponen
- Satu komponen = satu file di `src/components/`
- State global via `PanggungContext` + `useReducer`; custom hook `usePanggung()`
- Komentar singkat Bahasa Indonesia pada Hooks dan navigasi

## Urutan pengerjaan (§11 spec)
1. Init + deps + theme + folder + git  ← selesai
2. Context/reducer + storage + seed + selectors
3. Komponen dasar + navigasi + layar read-only
4. Form & aksi (tambah/hapus/toggle/absensi)
5. Splash tirai + polish visual
6. Uji Expo Go, README, commit + push GitHub
