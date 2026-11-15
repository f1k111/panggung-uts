import { useContext } from 'react';
import { PanggungContext } from '../context/PanggungContext';
import { nanoid } from '../utils/id';

// Custom hook — satu pintu masuk ke seluruh state & aksi
export function usePanggung() {
  const ctx = useContext(PanggungContext);
  if (!ctx) throw new Error('usePanggung harus dipakai di dalam PanggungProvider');

  const { state, dispatch } = ctx;

  // ── Helpers aksi ────────────────────────────────────────────────────────────

  function tambahPementasan(data) {
    dispatch({ type: 'ADD_PRODUCTION', payload: { id: nanoid(), cast: [], props: [], ...data } });
  }

  function ubahPementasan(data) {
    dispatch({ type: 'UPDATE_PRODUCTION', payload: data });
  }

  function hapusPementasan(id) {
    dispatch({ type: 'DELETE_PRODUCTION', payload: id });
  }

  function tambahPemeran(productionId, member) {
    dispatch({ type: 'ADD_CAST', payload: { productionId, member: { id: nanoid(), memorized: false, ...member } } });
  }

  function toggleHafal(productionId, castId) {
    dispatch({ type: 'TOGGLE_MEMORIZED', payload: { productionId, castId } });
  }

  function hapusPemeran(productionId, castId) {
    dispatch({ type: 'DELETE_CAST', payload: { productionId, castId } });
  }

  function tambahProperti(productionId, prop) {
    dispatch({ type: 'ADD_PROP', payload: { productionId, prop: { id: nanoid(), ready: false, ...prop } } });
  }

  function toggleProperti(productionId, propId) {
    dispatch({ type: 'TOGGLE_PROP', payload: { productionId, propId } });
  }

  function hapusProperti(productionId, propId) {
    dispatch({ type: 'DELETE_PROP', payload: { productionId, propId } });
  }

  function tambahLatihan(data) {
    dispatch({ type: 'ADD_REHEARSAL', payload: { id: nanoid(), attendance: {}, notes: '', ...data } });
  }

  function ubahLatihan(data) {
    dispatch({ type: 'UPDATE_REHEARSAL', payload: data });
  }

  function hapusLatihan(id) {
    dispatch({ type: 'DELETE_REHEARSAL', payload: id });
  }

  function simpanAbsensi(rehearsalId, attendance, notes) {
    dispatch({ type: 'SET_ATTENDANCE', payload: { rehearsalId, attendance, notes } });
  }

  return {
    ...state,
    tambahPementasan,
    ubahPementasan,
    hapusPementasan,
    tambahPemeran,
    toggleHafal,
    hapusPemeran,
    tambahProperti,
    toggleProperti,
    hapusProperti,
    tambahLatihan,
    ubahLatihan,
    hapusLatihan,
    simpanAbsensi,
  };
}
