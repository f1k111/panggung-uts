// Nama font harus cocok dengan yang dimuat useFonts di App.js
export const fonts = {
  bodoni: 'BodoniModa_9pt-Medium',
  bodoniItalic: 'BodoniModa_9pt-MediumItalic',
  sans: 'InstrumentSans_400Regular',
  sansMedium: 'InstrumentSans_500Medium',
  sansBold: 'InstrumentSans_600SemiBold',
  mono: 'DMMono_400Regular',
  monoMedium: 'DMMono_500Medium',
};

export const type = {
  // Judul layar
  screenTitle: { fontFamily: fonts.bodoni, fontSize: 32, lineHeight: 36 },
  // Judul kartu
  cardTitle: { fontFamily: fonts.bodoni, fontSize: 26, lineHeight: 30 },
  // Angka besar countdown
  countdownBig: { fontFamily: fonts.bodoni, fontSize: 64, lineHeight: 68 },
  countdownMid: { fontFamily: fonts.bodoni, fontSize: 28, lineHeight: 32 },
  // Nama peran (italic)
  roleName: { fontFamily: fonts.bodoniItalic, fontSize: 14, lineHeight: 18 },
  // Isi teks biasa
  body: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 24 },
  bodyMedium: { fontFamily: fonts.sansMedium, fontSize: 16, lineHeight: 24 },
  // Nama orang
  personName: { fontFamily: fonts.sansMedium, fontSize: 17, lineHeight: 22 },
  // Label mono kapital
  label: {
    fontFamily: fonts.monoMedium,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  labelSm: {
    fontFamily: fonts.monoMedium,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  // Tombol utama
  btnPrimary: { fontFamily: fonts.sansBold, fontSize: 16, lineHeight: 20 },
  // Tombol sekunder
  btnSecondary: { fontFamily: fonts.sansMedium, fontSize: 16, lineHeight: 20 },
};
