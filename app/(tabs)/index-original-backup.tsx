import React, { useMemo, useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { sermons } from '@/data/data';
import { sermons2027 } from '@/data/data-2027';
import { courseSeries } from '@/data/cursuri';
import {
  searchIndex,
  libraryMetadata,
  liturgicalSermons,
  coursesSermons,
  getSermonsByCategory
} from '@/data/complete-library';
import { getTodaysSermon, calculatePaschaOffset } from '@/utils/calendarUtils';
import { getDateMatchInfo } from '@/services/sermonMatcher';
import { sermonCache } from '@/utils/sermonCache';
import { Menu, User, PlayCircle, Play, Pause, X, BookOpen, Library, Calendar } from 'lucide-react-native';

// Enable dev mode for debugging (set to false for production)
const DEV_MODE = __DEV__;

export default function HomeScreen() {
  const router = useRouter();
  const [debugInfo, setDebugInfo] = useState<string>('');

  // Get today's sermon with caching - check both 2026 and 2027
  const todaysSermon = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const sermonsToCheck = year === 2027 ? sermons2027 : sermons;
    return getTodaysSermon(sermonsToCheck);
  }, []);

  // Get debugging information in dev mode
  useEffect(() => {
    if (DEV_MODE) {
      const today = new Date();
      const year = today.getFullYear();
      const sermonsToCheck = year === 2027 ? sermons2027 : sermons;
      const matchInfo = getDateMatchInfo(today, sermonsToCheck);
      const cacheStats = sermonCache.getCacheStats();

      const debug = `
Debug Info:
Date: ${matchInfo.date}
Pascha Offset: ${matchInfo.paschaOffset}
Season: ${matchInfo.season}
Sermon Found: ${matchInfo.matchingSermon ? 'Yes' : 'No'}
Total Library: ${libraryMetadata.totalFiles} files (${libraryMetadata.totalSizeMB.toFixed(0)} MB)
Cache Stats: ${cacheStats.easterCacheSize} Easter / ${cacheStats.offsetCacheSize} Offsets / ${cacheStats.sermonCacheSize} Sermons
      `.trim();

      setDebugInfo(debug);
    }
  }, []);

  // Get featured courses (first 4)
  const featuredCourses = useMemo(() => {
    return courseSeries.slice(0, 4);
  }, []);

  // Get recent sermons - mix of liturgical and courses
  const recentSermons = useMemo(() => {
    // Get recent liturgical (excluding today's sermon)
    const recentLiturgical = liturgicalSermons
      .filter(s => s.id !== todaysSermon?.id)
      .slice(0, 2);

    // Get recent courses
    const recentCourses = coursesSermons.slice(0, 2);

    // Interleave them
    const mixed = [];
    for (let i = 0; i < Math.max(recentLiturgical.length, recentCourses.length); i++) {
      if (recentLiturgical[i]) mixed.push(recentLiturgical[i]);
      if (recentCourses[i]) mixed.push(recentCourses[i]);
    }

    return mixed.slice(0, 4);
  }, [todaysSermon]);

  // Library categories for quick access
  const libraryCategories = useMemo(() => [
    {
      id: 'liturgical',
      name: 'Predici Liturgice',
      count: libraryMetadata.categories.liturgical,
      icon: Calendar,
      color: '#a22031'
    },
    {
      id: 'courses',
      name: 'Cursuri Biblice',
      count: libraryMetadata.categories.courses,
      icon: BookOpen,
      color: '#c5a572'
    },
    {
      id: 'saints',
      name: 'Viețile Sfinților',
      count: libraryMetadata.categories.saints,
      icon: User,
      color: '#4a2c2a'
    },
    {
      id: 'topical',
      name: 'Teme Speciale',
      count: libraryMetadata.categories.topical,
      icon: Library,
      color: '#8b7355'
    }
  ], []);

  const handlePlaySermon = (sermonId: string) => {
    // TODO: Navigate to player screen
    console.log('Playing sermon:', sermonId);
  };

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark max-w-[480px] mx-auto">
      {/* TopAppBar - Sticky with blur effect */}
      <View className="bg-background-light/95 dark:bg-background-dark/95 border-b border-primary/10">
        <View className="flex-row items-center justify-between p-4 pb-4">
          <Pressable
            className="flex items-center justify-center w-10 h-10 rounded-full active:bg-primary/5"
            onPress={() => {/* TODO: Open menu */}}
          >
            <Menu size={24} color="#a22031" />
          </Pressable>

          <Text className="flex-1 text-center text-primary text-xl font-bold tracking-tight" style={{ fontFamily: 'serif' }}>
            Predicile Părintelui
          </Text>

          <Pressable
            className="flex items-center justify-center w-10 h-10 rounded-full active:bg-primary/5"
            onPress={() => {/* TODO: Open profile */}}
          >
            <User size={24} color="#a22031" />
          </Pressable>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 128 }}>
        {/* Debug Info (Dev Mode Only) */}
        {DEV_MODE && debugInfo && (
          <View className="p-4 bg-yellow-100 dark:bg-yellow-900/20 border-b border-yellow-300 dark:border-yellow-700">
            <Text className="text-xs font-mono text-yellow-900 dark:text-yellow-300">
              {debugInfo}
            </Text>
          </View>
        )}

        {/* Hero Card - Today's Sermon */}
        {todaysSermon && (
          <View className="p-4">
            <Pressable
              className="flex flex-col rounded-xl overflow-hidden shadow-lg bg-white dark:bg-[#2d1b1e] border border-antique-gold/20"
              onPress={() => handlePlaySermon(todaysSermon.id)}
            >
              {/* Hero Image with gradient overlay */}
              <View className="relative w-full aspect-[16/10]">
                <View className="w-full h-full bg-primary/20" />
                {/* Gradient overlay - simulated with layered views */}
                <View className="absolute inset-0 flex-col justify-end">
                  <View className="h-1/3 bg-black/10" />
                  <View className="h-1/3 bg-black/30" />
                  <View className="h-1/3 bg-black/60" />
                </View>
                {/* Badge */}
                <View className="absolute bottom-4 left-4">
                  <View className="bg-antique-gold px-2 py-1 rounded-sm">
                    <Text className="text-walnut-brown text-[10px] font-bold uppercase tracking-widest">
                      Duminica de Astăzi
                    </Text>
                  </View>
                </View>
              </View>

              {/* Content */}
              <View className="p-5 gap-2">
                {/* Gospel Reading */}
                {todaysSermon.gospelReading && (
                  <View className="flex-row items-center gap-2 mb-1">
                    <BookOpen size={14} color="#a22031" opacity={0.7} />
                    <Text className="text-primary/70 text-sm font-semibold uppercase tracking-wider">
                      {todaysSermon.gospelReading}
                    </Text>
                  </View>
                )}

                {/* Title */}
                <Text className="text-walnut-brown dark:text-background-light text-2xl font-bold leading-tight mb-1" style={{ fontFamily: 'serif' }}>
                  {todaysSermon.title}
                </Text>

                {/* Liturgical Context */}
                <View className="flex-row items-center gap-2 mb-2">
                  <Calendar size={14} color="#8b7355" />
                  <Text className="text-walnut-brown/60 dark:text-background-light/60 text-sm font-medium">
                    {todaysSermon.liturgicalDate || 'Data necunoscută'}
                  </Text>
                  {todaysSermon.duration && (
                    <>
                      <Text className="text-walnut-brown/40 dark:text-background-light/40 text-xs">•</Text>
                      <Text className="text-walnut-brown/60 dark:text-background-light/60 text-sm font-medium">
                        {todaysSermon.duration}
                      </Text>
                    </>
                  )}
                </View>

                {/* Action Button */}
                <View className="flex-row items-center justify-between mt-2">
                  <Text className="text-walnut-brown/50 dark:text-background-light/50 text-xs font-medium italic">
                    {todaysSermon.category}
                  </Text>
                  <Pressable
                    className="flex-row items-center justify-center gap-2 min-w-[120px] h-10 px-5 bg-primary rounded-full shadow-md active:scale-95"
                    onPress={() => handlePlaySermon(todaysSermon.id)}
                  >
                    <Play size={18} color="#fff" fill="#fff" />
                    <Text className="text-white text-sm font-bold truncate">
                      Ascultă Acum
                    </Text>
                  </Pressable>
                </View>
              </View>
            </Pressable>
          </View>
        )}

        {/* No Sermon Fallback */}
        {!todaysSermon && (
          <View className="p-4">
            <View className="flex flex-col rounded-xl overflow-hidden shadow-lg bg-white dark:bg-[#2d1b1e] border border-antique-gold/20 p-6">
              <Text className="text-walnut-brown dark:text-background-light text-xl font-bold mb-2" style={{ fontFamily: 'serif' }}>
                Nicio predică pentru astăzi
              </Text>
              <Text className="text-walnut-brown/70 dark:text-background-light/70 text-sm">
                Nu există o predică specifică pentru data de astăzi. Vă rugăm să explorați biblioteca noastră de predici sau să reveniți mâine.
              </Text>
            </View>
          </View>
        )}

        {/* Cursuri Recomandate Section */}
        <View className="flex-row items-center justify-between px-4 pt-6">
          <Text className="text-walnut-brown dark:text-background-light text-xl font-bold" style={{ fontFamily: 'serif' }}>
            Cursuri Recomandate
          </Text>
          <Pressable onPress={() => {/* TODO: Navigate to all courses */}}>
            <Text className="text-primary text-sm font-semibold">Vezi toate</Text>
          </Pressable>
        </View>

        {/* Featured Courses Horizontal Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-3"
          contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
        >
          {featuredCourses.map((course) => (
            <Pressable
              key={course.id}
              className="w-72 rounded-xl overflow-hidden shadow-md bg-white dark:bg-[#2d1b1e] border border-antique-gold/20 active:scale-[0.98]"
              onPress={() => {/* TODO: Navigate to course detail */}}
            >
              {/* Course Thumbnail */}
              <View className="relative w-full aspect-[16/9] bg-gradient-to-br from-primary/20 to-antique-gold/30">
                <View className="w-full h-full bg-primary/10" />
                {/* Course Badge */}
                <View className="absolute top-3 left-3">
                  <View className="bg-antique-gold px-2 py-1 rounded-sm">
                    <Text className="text-walnut-brown text-[9px] font-bold uppercase tracking-widest">
                      Curs Biblic
                    </Text>
                  </View>
                </View>
              </View>

              {/* Course Info */}
              <View className="p-4">
                <Text
                  className="text-walnut-brown dark:text-background-light text-base font-bold leading-tight mb-2"
                  style={{ fontFamily: 'serif' }}
                  numberOfLines={2}
                >
                  {course.title}
                </Text>
                <View className="flex-row items-center gap-3">
                  <View className="flex-row items-center gap-1">
                    <BookOpen size={14} color="#8b7355" />
                    <Text className="text-walnut-brown/60 dark:text-background-light/60 text-xs font-medium">
                      {course.totalParts} {course.totalParts === 1 ? 'parte' : 'părți'}
                    </Text>
                  </View>
                  <Text className="text-walnut-brown/40 dark:text-background-light/40 text-xs">•</Text>
                  <Text className="text-walnut-brown/60 dark:text-background-light/60 text-xs font-medium">
                    {course.category}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* Section Header */}
        <View className="flex-row items-center justify-between px-4 pt-6">
          <Text className="text-walnut-brown dark:text-background-light text-xl font-bold" style={{ fontFamily: 'serif' }}>
            Predici Recente
          </Text>
          <Pressable onPress={() => {/* TODO: Navigate to all sermons */}}>
            <Text className="text-primary text-sm font-semibold">Vezi toate</Text>
          </Pressable>
        </View>

        {/* Recent Sermons List */}
        <View className="mt-2">
          {recentSermons.map((sermon) => (
            <Pressable
              key={sermon.id}
              className="flex-row items-center gap-4 px-4 py-3 active:bg-primary/5"
              onPress={() => handlePlaySermon(sermon.id)}
            >
              {/* Thumbnail */}
              <View className="relative w-16 h-16 rounded-lg bg-primary/20 shadow-sm flex-shrink-0 overflow-hidden">
                {/* Placeholder for image */}
                <View className="w-full h-full bg-primary/10" />
                {sermon.seriesId && (
                  <View className="absolute bottom-0 right-0 bg-antique-gold/90 px-1 rounded-tl">
                    <BookOpen size={10} color="#4a2c2a" />
                  </View>
                )}
              </View>

              {/* Sermon Info */}
              <View className="flex-1 justify-center min-w-0">
                <Text
                  className="text-walnut-brown dark:text-background-light text-base font-semibold leading-tight"
                  numberOfLines={1}
                >
                  {sermon.title}
                </Text>
                <Text className="text-walnut-brown/60 dark:text-background-light/50 text-xs font-medium mt-1 uppercase tracking-wide">
                  {sermon.date || sermon.category} • {sermon.duration || '0 min'}
                </Text>
              </View>

              {/* Play Button */}
              <View className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-primary/20">
                <PlayCircle size={24} color="#a22031" />
              </View>
            </Pressable>
          ))}
        </View>

        {/* Explorează Biblioteca Section */}
        <View className="flex-row items-center justify-between px-4 pt-6 pb-2">
          <Text className="text-walnut-brown dark:text-background-light text-xl font-bold" style={{ fontFamily: 'serif' }}>
            Explorează Biblioteca
          </Text>
          <Pressable onPress={() => {/* TODO: Navigate to library */}}>
            <Text className="text-primary text-sm font-semibold">Vezi tot</Text>
          </Pressable>
        </View>

        {/* Library Stats */}
        <View className="px-4 pb-3">
          <Text className="text-walnut-brown/60 dark:text-background-light/60 text-sm">
            {libraryMetadata.totalFiles} predici • {libraryMetadata.totalDuration} • {libraryMetadata.totalSizeMB.toFixed(0)} MB
          </Text>
        </View>

        {/* Library Categories Grid */}
        <View className="px-4 pb-6">
          <View className="flex-row flex-wrap gap-3">
            {libraryCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Pressable
                  key={category.id}
                  className="flex-1 min-w-[45%] rounded-xl overflow-hidden shadow-sm bg-white dark:bg-[#2d1b1e] border border-antique-gold/20 active:scale-[0.98] p-4"
                  onPress={() => {/* TODO: Navigate to category */}}
                >
                  <View className="flex-row items-center gap-2 mb-2">
                    <IconComponent size={20} color={category.color} />
                    <Text className="text-2xl font-bold" style={{ color: category.color }}>
                      {category.count}
                    </Text>
                  </View>
                  <Text
                    className="text-walnut-brown dark:text-background-light text-sm font-semibold leading-tight"
                    numberOfLines={2}
                  >
                    {category.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Mini Player - Fixed at bottom */}
      <View className="absolute bottom-0 w-full max-w-[480px] bg-background-light/95 dark:bg-background-dark/95 border-t border-primary/10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {/* Mini Player Controls */}
        <View className="px-4 py-2 flex-row items-center gap-3 bg-primary/5 border-b border-primary/5">
          <View className="w-10 h-10 rounded overflow-hidden bg-primary/20" />
          <View className="flex-1 min-w-0">
            <Text className="text-primary text-[12px] font-bold uppercase tracking-tighter">
              Acum se redă
            </Text>
            <Text className="text-sm font-semibold truncate text-walnut-brown dark:text-background-light">
              {todaysSermon?.title || 'Nicio predică'}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Pressable className="p-1">
              <Pause size={20} color="#a22031" />
            </Pressable>
            <Pressable className="p-1">
              <X size={20} color="#a22031" />
            </Pressable>
          </View>
        </View>

        {/* Bottom Tabs Navigation - Placeholder for now */}
        <View className="flex-row justify-around items-center py-2 px-6">
          <Pressable className="flex flex-col items-center gap-0.5">
            <Text className="text-primary text-2xl">🏠</Text>
            <Text className="text-primary text-[10px] font-bold uppercase">Acasă</Text>
          </Pressable>
          <Pressable className="flex flex-col items-center gap-0.5">
            <Text className="text-walnut-brown/40 dark:text-background-light/40 text-2xl">🔍</Text>
            <Text className="text-walnut-brown/40 dark:text-background-light/40 text-[10px] font-bold uppercase">Căutare</Text>
          </Pressable>
          <Pressable className="flex flex-col items-center gap-0.5">
            <Text className="text-walnut-brown/40 dark:text-background-light/40 text-2xl">📚</Text>
            <Text className="text-walnut-brown/40 dark:text-background-light/40 text-[10px] font-bold uppercase">Bibliotecă</Text>
          </Pressable>
          <Pressable className="flex flex-col items-center gap-0.5">
            <Text className="text-walnut-brown/40 dark:text-background-light/40 text-2xl">⚙️</Text>
            <Text className="text-walnut-brown/40 dark:text-background-light/40 text-[10px] font-bold uppercase">Setări</Text>
          </Pressable>
        </View>

        {/* iOS Indicator Spacer */}
        <View className="h-6" />
      </View>
    </View>
  );
}

