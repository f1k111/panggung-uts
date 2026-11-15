import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@panggung_state';

export async function loadState() {
  try {
    const json = await AsyncStorage.getItem(KEY);
    return json ? JSON.parse(json) : null;
  } catch {
    return null;
  }
}

export async function saveState(state) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // simpan gagal, lanjutkan saja
  }
}
