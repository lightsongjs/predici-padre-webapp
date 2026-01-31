import React from 'react';
import { Tabs } from 'expo-router';
import { Home, BookOpen, GraduationCap, Search } from 'lucide-react-native';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// Byzantine Modern theme colors
const THEME_COLORS = {
  primary: '#a22031',      // Primary Byzantine Red
  accent: '#D4AF37',       // Antique Gold - Halo
  background: '#F0F4F8',   // Pale Blue/Cream
  text: '#4B3621',         // Dark Walnut Brown
  tabIconInactive: 'rgba(75, 54, 33, 0.5)', // Walnut brown with opacity
  white: '#FFFFFF',
  border: 'rgba(162, 32, 49, 0.1)', // Subtle primary color border
};

// TabBarIcon component for consistent icon rendering with Lucide icons
interface TabBarIconProps {
  Icon: React.ComponentType<any>;
  color: string;
  focused: boolean;
}

function TabBarIcon({ Icon, color, focused }: TabBarIconProps) {
  return (
    <Icon
      size={24}
      color={color}
      strokeWidth={focused ? 2.5 : 2}
      style={{ marginBottom: -3 }}
    />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: THEME_COLORS.primary,
        tabBarInactiveTintColor: THEME_COLORS.tabIconInactive,
        tabBarStyle: {
          backgroundColor: THEME_COLORS.white,
          borderTopColor: THEME_COLORS.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          elevation: 8,
          shadowColor: THEME_COLORS.text,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: THEME_COLORS.primary,
          elevation: 4,
          shadowColor: THEME_COLORS.text,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        headerTintColor: THEME_COLORS.white,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
          color: THEME_COLORS.white,
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      {/* Home Screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Acasă',
          headerTitle: 'Predicile Părintelui',
          headerShown: false, // Hide header since we have custom top bar
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={Home} color={color} focused={focused} />
          ),
        }}
      />

      {/* Library Screen */}
      <Tabs.Screen
        name="library"
        options={{
          title: 'Bibliotecă',
          headerTitle: 'Biblioteca Mea',
          headerShown: false, // Hide header since we have custom top bar
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={BookOpen} color={color} focused={focused} />
          ),
        }}
      />

      {/* Courses Screen */}
      <Tabs.Screen
        name="cursuri"
        options={{
          title: 'Cursuri',
          headerTitle: 'Cursuri Ortodoxe',
          headerShown: false, // Hide header since we have custom header in the screen
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={GraduationCap} color={color} focused={focused} />
          ),
        }}
      />

      {/* Settings Screen */}
      <Tabs.Screen
        name="two"
        options={{
          title: 'Setări',
          headerTitle: 'Setări',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon Icon={Search} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
