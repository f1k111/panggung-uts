import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import {
  BodoniModa_500Medium,
  BodoniModa_500Medium_Italic,
} from '@expo-google-fonts/bodoni-moda';
import {
  InstrumentSans_400Regular,
  InstrumentSans_500Medium,
  InstrumentSans_600SemiBold,
} from '@expo-google-fonts/instrument-sans';
import {
  DMMono_400Regular,
  DMMono_500Medium,
} from '@expo-google-fonts/dm-mono';

import { PanggungProvider } from './src/context/PanggungContext';
import RootNavigator from './src/navigation/RootNavigator';
import { colors } from './src/theme/colors';

export default function App() {
  // Muat semua font sebelum render
  const [fontsLoaded] = useFonts({
    BodoniModa_500Medium,
    BodoniModa_500Medium_Italic,
    InstrumentSans_400Regular,
    InstrumentSans_500Medium,
    InstrumentSans_600SemiBold,
    DMMono_400Regular,
    DMMono_500Medium,
  });

  // Tampilkan layar kosong gelap sambil font dimuat
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={colors.brass} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <PanggungProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PanggungProvider>
    </SafeAreaProvider>
  );
}
