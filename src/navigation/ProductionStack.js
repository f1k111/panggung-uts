import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductionListScreen from '../screens/ProductionListScreen';
import ProductionDetailScreen from '../screens/ProductionDetailScreen';

const Stack = createNativeStackNavigator();

export default function ProductionStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProductionList" component={ProductionListScreen} />
      <Stack.Screen name="ProductionDetail" component={ProductionDetailScreen} />
    </Stack.Navigator>
  );
}
