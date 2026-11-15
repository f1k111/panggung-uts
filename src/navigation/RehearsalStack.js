import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RehearsalListScreen from '../screens/RehearsalListScreen';
import RehearsalDetailScreen from '../screens/RehearsalDetailScreen';

const Stack = createNativeStackNavigator();

export default function RehearsalStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RehearsalList" component={RehearsalListScreen} />
      <Stack.Screen name="RehearsalDetail" component={RehearsalDetailScreen} />
    </Stack.Navigator>
  );
}
