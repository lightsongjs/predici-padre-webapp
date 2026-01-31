import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { setupNotifications } from '@/utils/notificationUtils';

// Import global CSS for NativeWind
import '../global.css';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Byzantine Modern theme colors
const THEME_COLORS = {
  primary: '#8B1E3F',      // Deep Burgundy/Red - Vestments
  accent: '#D4AF37',       // Antique Gold - Halo
  background: '#F0F4F8',   // Pale Blue/Cream
  text: '#4B3621',         // Dark Walnut
  card: '#FFFFFF',         // White for cards
  border: '#E5E5E5',       // Light gray for borders
};

// Custom theme based on Byzantine Modern colors
const ByzantineTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: THEME_COLORS.primary,
    background: THEME_COLORS.background,
    card: THEME_COLORS.card,
    text: THEME_COLORS.text,
    border: THEME_COLORS.border,
    notification: THEME_COLORS.accent,
  },
};

const ByzantineDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: THEME_COLORS.accent,
    background: THEME_COLORS.text,
    card: '#2C1810',
    text: THEME_COLORS.background,
    border: '#5A4A3D',
    notification: THEME_COLORS.accent,
  },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Set up notifications on app load
  useEffect(() => {
    setupNotifications().catch((err) => {
      console.error('Failed to set up notifications:', err);
    });
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider value={ByzantineTheme}>
      <StatusBar style="light" backgroundColor={THEME_COLORS.primary} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
            headerStyle: {
              backgroundColor: THEME_COLORS.primary,
            },
            headerTintColor: THEME_COLORS.accent,
            headerTitleStyle: {
              fontWeight: '700',
            },
          }}
        />
        <Stack.Screen
          name="player"
          options={{
            presentation: 'fullScreenModal',
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
