import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import MainTabs from './MainTabs';
import ProductionForm from '../screens/ProductionForm';
import RehearsalForm from '../screens/RehearsalForm';
import CastForm from '../screens/CastForm';
import PropForm from '../screens/PropForm';

const Stack = createNativeStackNavigator();

// RootNavigator: Splash → MainTabs + modal form (bisa dipanggil dari mana saja)
export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} options={{ animation: 'fade' }} />
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ animation: 'fade' }} />

      {/* Modal form */}
      <Stack.Screen
        name="ProductionForm"
        component={ProductionForm}
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="RehearsalForm"
        component={RehearsalForm}
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="CastForm"
        component={CastForm}
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
      <Stack.Screen
        name="PropForm"
        component={PropForm}
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
    </Stack.Navigator>
  );
}
