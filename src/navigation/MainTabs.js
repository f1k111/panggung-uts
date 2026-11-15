import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { type } from '../theme/typography';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import ProductionStack from './ProductionStack';
import RehearsalStack from './RehearsalStack';

const Tab = createBottomTabNavigator();

// Ikon tab aktif dengan garis atas brass
function TabIcon({ name, focused }) {
  return (
    <View style={styles.iconWrap}>
      {focused && <View style={styles.garisAtas} />}
      <Feather
        name={name}
        size={22}
        color={focused ? colors.brass : colors.muted}
        strokeWidth={1.6}
      />
    </View>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.brass,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'BERANDA',
          tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Productions"
        component={ProductionStack}
        options={{
          tabBarLabel: 'PEMENTASAN',
          tabBarIcon: ({ focused }) => <TabIcon name="book" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Rehearsals"
        component={RehearsalStack}
        options={{
          tabBarLabel: 'LATIHAN',
          tabBarIcon: ({ focused }) => <TabIcon name="clock" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarLabel: 'TENTANG',
          tabBarIcon: ({ focused }) => <TabIcon name="info" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.ink,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    height: 72,
    paddingBottom: 8,
  },
  tabLabel: {
    ...type.labelSm,
    marginTop: 2,
  },
  iconWrap: {
    alignItems: 'center',
    width: 40,
  },
  garisAtas: {
    position: 'absolute',
    top: -12,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.brass,
  },
});
