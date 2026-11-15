import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { loadState, saveState } from '../utils/storage';
import { seedData } from '../data/seed';

// ─── State awal ───────────────────────────────────────────────────────────────
const initialState = {
  productions: [],
  rehearsals: [],
  loaded: false,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {

    case 'LOAD':
      return { ...action.payload, loaded: true };

    // Pementasan
    case 'ADD_PRODUCTION':
      return { ...state, productions: [...state.productions, action.payload] };

    case 'UPDATE_PRODUCTION':
      return {
        ...state,
        productions: state.productions.map(p =>
          p.id === action.payload.id ? { ...p, ...action.payload } : p
        ),
      };

    case 'DELETE_PRODUCTION':
      return {
        ...state,
        productions: state.productions.filter(p => p.id !== action.payload),
        // Hapus juga latihan yang terkait
        rehearsals: state.rehearsals.filter(r => r.productionId !== action.payload),
      };

    // Pemeran
    case 'ADD_CAST':
      return {
        ...state,
        productions: state.productions.map(p =>
          p.id === action.payload.productionId
            ? { ...p, cast: [...p.cast, action.payload.member] }
            : p
        ),
      };

    case 'TOGGLE_MEMORIZED':
      return {
        ...state,
        productions: state.productions.map(p =>
          p.id === action.payload.productionId
            ? {
                ...p,
                cast: p.cast.map(m =>
                  m.id === action.payload.castId
                    ? { ...m, memorized: !m.memorized }
                    : m
                ),
              }
            : p
        ),
      };

    case 'DELETE_CAST':
      return {
        ...state,
        productions: state.productions.map(p =>
          p.id === action.payload.productionId
            ? { ...p, cast: p.cast.filter(m => m.id !== action.payload.castId) }
            : p
        ),
      };

    // Properti
    case 'ADD_PROP':
      return {
        ...state,
        productions: state.productions.map(p =>
          p.id === action.payload.productionId
            ? { ...p, props: [...p.props, action.payload.prop] }
            : p
        ),
      };

    case 'TOGGLE_PROP':
      return {
        ...state,
        productions: state.productions.map(p =>
          p.id === action.payload.productionId
            ? {
                ...p,
                props: p.props.map(pr =>
                  pr.id === action.payload.propId
                    ? { ...pr, ready: !pr.ready }
                    : pr
                ),
              }
            : p
        ),
      };

    case 'DELETE_PROP':
      return {
        ...state,
        productions: state.productions.map(p =>
          p.id === action.payload.productionId
            ? { ...p, props: p.props.filter(pr => pr.id !== action.payload.propId) }
            : p
        ),
      };

    // Latihan
    case 'ADD_REHEARSAL':
      return { ...state, rehearsals: [...state.rehearsals, action.payload] };

    case 'UPDATE_REHEARSAL':
      return {
        ...state,
        rehearsals: state.rehearsals.map(r =>
          r.id === action.payload.id ? { ...r, ...action.payload } : r
        ),
      };

    case 'DELETE_REHEARSAL':
      return {
        ...state,
        rehearsals: state.rehearsals.filter(r => r.id !== action.payload),
      };

    // Absensi
    case 'SET_ATTENDANCE':
      return {
        ...state,
        rehearsals: state.rehearsals.map(r =>
          r.id === action.payload.rehearsalId
            ? {
                ...r,
                attendance: action.payload.attendance,
                notes: action.payload.notes ?? r.notes,
              }
            : r
        ),
      };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
export const PanggungContext = createContext(null);

export function PanggungProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Muat state dari AsyncStorage saat pertama kali
  useEffect(() => {
    (async () => {
      const saved = await loadState();
      if (saved && saved.productions && saved.productions.length > 0) {
        dispatch({ type: 'LOAD', payload: saved });
      } else {
        // Muat seed data jika storage kosong
        dispatch({ type: 'LOAD', payload: seedData });
      }
    })();
  }, []);

  // Simpan ke AsyncStorage setiap kali state berubah (kecuali sebelum loaded)
  useEffect(() => {
    if (!state.loaded) return;
    saveState({ productions: state.productions, rehearsals: state.rehearsals });
  }, [state]);

  // Bungkus dispatch agar stabil (useCallback)
  const stableDispatch = useCallback(dispatch, []);

  return (
    <PanggungContext.Provider value={{ state, dispatch: stableDispatch }}>
      {children}
    </PanggungContext.Provider>
  );
}
