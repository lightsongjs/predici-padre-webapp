/**
 * PLAYER INTEGRATION EXAMPLE
 *
 * This file shows how to integrate the Player screen into your app.
 * Copy the relevant parts to your actual screen files.
 */

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { sermons, Sermon } from '@/data/data';
import { Play } from 'lucide-react-native';

// ============================================================================
// EXAMPLE 1: Simple button to open player
// ============================================================================

export function SimplePlayerButton({ sermon }: { sermon: Sermon }) {
  const router = useRouter();

  const openPlayer = () => {
    router.push({
      pathname: '/player',
      params: {
        sermon: JSON.stringify(sermon),
      },
    });
  };

  return (
    <Pressable
      onPress={openPlayer}
      className="bg-[#a22031] px-6 py-3 rounded-full flex-row items-center gap-2"
    >
      <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
      <Text className="text-white font-bold">Ascultă</Text>
    </Pressable>
  );
}

// ============================================================================
// EXAMPLE 2: Card with player integration
// ============================================================================

export function SermonCard({ sermon }: { sermon: Sermon }) {
  const router = useRouter();

  const handlePlay = () => {
    router.push({
      pathname: '/player',
      params: {
        sermon: JSON.stringify(sermon),
      },
    });
  };

  return (
    <Pressable
      onPress={handlePlay}
      className="bg-white dark:bg-[#2d1b1e] rounded-xl p-4 shadow-md active:scale-98"
    >
      <Text className="text-xl font-bold text-[#1a0f10] dark:text-white mb-1">
        {sermon.title}
      </Text>
      <Text className="text-sm text-[#a22031] mb-3">
        {sermon.category}
      </Text>
      <View className="flex-row items-center justify-between">
        <Text className="text-xs text-gray-500">
          {sermon.duration || 'Durată necunoscută'}
        </Text>
        <View className="bg-[#a22031] px-4 py-2 rounded-full">
          <Text className="text-white text-sm font-bold">Ascultă</Text>
        </View>
      </View>
    </Pressable>
  );
}

// ============================================================================
// EXAMPLE 3: List item with play button
// ============================================================================

export function SermonListItem({ sermon }: { sermon: Sermon }) {
  const router = useRouter();

  const handlePlay = () => {
    router.push({
      pathname: '/player',
      params: {
        sermon: JSON.stringify(sermon),
      },
    });
  };

  return (
    <View className="flex-row items-center gap-4 px-4 py-3 border-b border-gray-200">
      {/* Thumbnail */}
      <View className="w-16 h-16 rounded-lg bg-[#a22031]/20 items-center justify-center">
        <Text className="text-2xl">✝</Text>
      </View>

      {/* Info */}
      <View className="flex-1">
        <Text className="text-base font-semibold text-[#1a0f10] dark:text-white" numberOfLines={1}>
          {sermon.title}
        </Text>
        <Text className="text-xs text-gray-500 mt-1">
          {sermon.category} • {sermon.duration || '0 min'}
        </Text>
      </View>

      {/* Play Button */}
      <Pressable
        onPress={handlePlay}
        className="w-10 h-10 rounded-full border border-[#a22031]/20 items-center justify-center"
      >
        <Play size={20} color="#a22031" />
      </Pressable>
    </View>
  );
}

// ============================================================================
// EXAMPLE 4: Update existing home screen handler
// ============================================================================

/**
 * Add this to your existing screen (e.g., app/(tabs)/index.tsx)
 */

/*
import { useRouter } from 'expo-router';
import { sermons } from '@/data/data';

export default function HomeScreen() {
  const router = useRouter();

  // Update your existing handlePlaySermon function:
  const handlePlaySermon = (sermonId: string) => {
    const sermon = sermons.find(s => s.id === sermonId);
    if (sermon) {
      router.push({
        pathname: '/player',
        params: {
          sermon: JSON.stringify(sermon),
        },
      });
    }
  };

  // ... rest of your component
}
*/

// ============================================================================
// EXAMPLE 5: Mini player that opens full player
// ============================================================================

export function MiniPlayer({ currentSermon }: { currentSermon: Sermon | null }) {
  const router = useRouter();

  if (!currentSermon) return null;

  const openFullPlayer = () => {
    router.push({
      pathname: '/player',
      params: {
        sermon: JSON.stringify(currentSermon),
      },
    });
  };

  return (
    <Pressable
      onPress={openFullPlayer}
      className="absolute bottom-0 w-full bg-white dark:bg-[#2d1b1e] border-t border-gray-200 px-4 py-3 flex-row items-center gap-3"
    >
      {/* Album Art */}
      <View className="w-12 h-12 rounded bg-[#a22031]/20 items-center justify-center">
        <Text className="text-xl">✝</Text>
      </View>

      {/* Info */}
      <View className="flex-1">
        <Text className="text-xs font-bold text-[#a22031] uppercase">
          Acum se redă
        </Text>
        <Text className="text-sm font-semibold text-[#1a0f10] dark:text-white" numberOfLines={1}>
          {currentSermon.title}
        </Text>
      </View>

      {/* Controls */}
      <View className="flex-row items-center gap-2">
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            // TODO: Toggle play/pause without opening player
          }}
          className="w-8 h-8 items-center justify-center"
        >
          <Play size={20} color="#a22031" fill="#a22031" />
        </Pressable>
      </View>
    </Pressable>
  );
}

// ============================================================================
// EXAMPLE 6: Featured sermon with large play button
// ============================================================================

export function FeaturedSermon({ sermon }: { sermon: Sermon }) {
  const router = useRouter();

  const handlePlay = () => {
    router.push({
      pathname: '/player',
      params: {
        sermon: JSON.stringify(sermon),
      },
    });
  };

  return (
    <View className="bg-gradient-to-br from-[#a22031] to-[#6B1730] rounded-xl p-6 shadow-xl">
      {/* Badge */}
      <View className="bg-[#D4AF37] px-3 py-1 rounded-full self-start mb-4">
        <Text className="text-[#1a0f10] text-xs font-bold uppercase">
          Predica Zilei
        </Text>
      </View>

      {/* Title */}
      <Text className="text-white text-2xl font-bold mb-2" style={{ fontFamily: 'serif' }}>
        {sermon.title}
      </Text>

      {/* Category */}
      <Text className="text-white/80 text-base mb-6">
        {sermon.category}
      </Text>

      {/* Play Button */}
      <Pressable
        onPress={handlePlay}
        className="bg-white rounded-full px-8 py-4 flex-row items-center justify-center gap-3 active:scale-95"
      >
        <Play size={24} color="#a22031" fill="#a22031" />
        <Text className="text-[#a22031] text-lg font-bold">
          Ascultă Acum
        </Text>
      </Pressable>
    </View>
  );
}

// ============================================================================
// EXAMPLE 7: Programmatic navigation from anywhere
// ============================================================================

/**
 * You can also navigate programmatically from any function:
 */

/*
import { router } from 'expo-router';
import { sermons } from '@/data/data';

// From a utility function
export function playSermonById(sermonId: string) {
  const sermon = sermons.find(s => s.id === sermonId);
  if (sermon) {
    router.push({
      pathname: '/player',
      params: {
        sermon: JSON.stringify(sermon),
      },
    });
  }
}

// From a notification handler
export function handleNotificationPress(sermonId: string) {
  const sermon = sermons.find(s => s.id === sermonId);
  if (sermon) {
    router.push({
      pathname: '/player',
      params: {
        sermon: JSON.stringify(sermon),
      },
    });
  }
}
*/

// ============================================================================
// NOTES
// ============================================================================

/**
 * 1. Always JSON.stringify the sermon object when passing as params
 * 2. The player will automatically parse it back to a Sermon object
 * 3. The player is configured as a full-screen modal in _layout.tsx
 * 4. User can swipe down or press the back button to close the player
 * 5. Audio will stop when the player is closed
 *
 * Color Reference:
 * - Primary (Burgundy): #a22031
 * - Accent (Gold): #D4AF37
 * - Light Background: #fdfbf7
 * - Dark Background: #1a0f10
 * - Text Light: #1a0f10
 * - Text Dark: #f8f6f6
 */
