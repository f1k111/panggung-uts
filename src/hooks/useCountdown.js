import { useState, useEffect } from 'react';
import { hitungHariTersisa } from '../utils/date';

// Hitung hari tersisa ke tanggal pementasan, diperbarui tiap menit
export function useCountdown(isoDate) {
  const [sisa, setSisa] = useState(() => hitungHariTersisa(isoDate));

  useEffect(() => {
    setSisa(hitungHariTersisa(isoDate));
    const interval = setInterval(() => {
      setSisa(hitungHariTersisa(isoDate));
    }, 60000);
    return () => clearInterval(interval);
  }, [isoDate]);

  return sisa; // positif = hari tersisa, 0 = hari H, negatif = selesai
}
