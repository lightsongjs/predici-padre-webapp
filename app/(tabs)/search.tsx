import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  RefreshControl,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Search as SearchIcon, X, PlayCircle, Clock, Calendar, Filter } from 'lucide-react-native';
import {
  libraryMetadata,
  searchLibrary,
  getSermonsByCategory,
  liturgicalSermons,
  coursesSermons,
  saintsSermons,
  topicalSermons,
  archivedSermons,
  LibraryItem
} from '@/data/complete-library';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Course series information
const COURSE_SERIES = [
  { id: 'matei', title: 'Evanghelia după Matei', count: 101 },
  { id: 'marcu', title: 'Evanghelia după Marcu', count: 55 },
  { id: 'luca', title: 'Evanghelia după Luca', count: 57 },
  { id: 'ioan', title: 'Evanghelia după Ioan', count: 15 },
  { id: 'tatal-nostru', title: 'Rugăciunea Domnească - Tatăl Nostru', count: 5 },
  { id: '10-porunci', title: 'Cele 10 Porunci ale lui Dumnezeu', count: 12 },
  { id: 'cursuri-aprofundate', title: 'Cursuri Aprofundate', count: 21 },
];

// Topical themes
const TOPICAL_THEMES = [
  { id: 'familie', title: 'Familie', icon: '👨‍👩‍👧‍👦' },
  { id: 'rugaciune', title: 'Rugăciune', icon: '🙏' },
  { id: 'credinta', title: 'Credință', icon: '✝️' },
  { id: 'post', title: 'Post', icon: '🕯️' },
  { id: 'iertare', title: 'Iertare', icon: '🤝' },
  { id: 'pocainta', title: 'Pocăință', icon: '💭' },
];

// Quick filter categories
const QUICK_FILTERS = [
  { id: 'all', label: 'Toate', count: 417 },
  { id: 'liturgical', label: 'Liturgice', count: 124 },
  { id: 'courses', label: 'Cursuri', count: 266 },
  { id: 'archived', label: 'Sărbători', count: 27 },
  { id: 'saints', label: 'Despre Sfinți', count: 2 },
  { id: 'topical', label: 'Teme', count: 25 },
];

const RECENT_SEARCHES_KEY = '@recent_searches';
const MAX_RECENT_SEARCHES = 5;

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  // Load recent searches on mount
  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    try {
      const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load recent searches:', error);
    }
  };

  const saveRecentSearch = async (query: string) => {
    if (!query.trim()) return;

    try {
      const trimmedQuery = query.trim();
      const updated = [
        trimmedQuery,
        ...recentSearches.filter(q => q !== trimmedQuery)
      ].slice(0, MAX_RECENT_SEARCHES);

      setRecentSearches(updated);
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save recent search:', error);
    }
  };

  const clearRecentSearches = async () => {
    try {
      setRecentSearches([]);
      await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch (error) {
      console.error('Failed to clear recent searches:', error);
    }
  };

  // Get filtered sermons based on active filter and search query
  const filteredSermons = useMemo(() => {
    let results: LibraryItem[] = [];

    if (searchQuery.trim()) {
      // Search mode: use search function
      results = searchLibrary(searchQuery);

      // Apply category filter if not "all"
      if (activeFilter !== 'all') {
        results = results.filter(item => {
          const categoryMap: { [key: string]: string } = {
            'liturgical': 'Predici Liturgice',
            'courses': 'Cursuri Biblice',
            'saints': 'Despre Sfinți',
            'topical': 'Învățături Tematice',
            'archived': 'Arhivă Sărbători',
          };
          return item.category === categoryMap[activeFilter];
        });
      }
    } else {
      // Browse mode: get by category
      if (activeFilter === 'all') {
        results = [
          ...liturgicalSermons,
          ...coursesSermons,
          ...saintsSermons,
          ...topicalSermons,
          ...archivedSermons,
        ];
      } else {
        results = getSermonsByCategory(activeFilter);
      }
    }

    return results;
  }, [searchQuery, activeFilter]);

  // Group sermons by category for display
  const groupedSermons = useMemo(() => {
    const groups: { [key: string]: LibraryItem[] } = {};

    filteredSermons.forEach(sermon => {
      if (!groups[sermon.category]) {
        groups[sermon.category] = [];
      }
      groups[sermon.category].push(sermon);
    });

    return groups;
  }, [filteredSermons]);

  // Group liturgical sermons by year
  const liturgicalByYear = useMemo(() => {
    const years: { [key: number]: LibraryItem[] } = {};

    liturgicalSermons.forEach(sermon => {
      const year = sermon.year || sermon.recordingYear || 2026;
      if (!years[year]) {
        years[year] = [];
      }
      years[year].push(sermon);
    });

    return years;
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      saveRecentSearch(query);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handlePlaySermon = (sermonId: string) => {
    // TODO: Navigate to player or start playback
    console.log('Playing sermon:', sermonId);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;

    return (
      <>
        {text.substring(0, index)}
        <Text className="bg-antique-gold/30 font-bold">
          {text.substring(index, index + query.length)}
        </Text>
        {text.substring(index + query.length)}
      </>
    );
  };

  // Render a single sermon item
  const renderSermonItem = (sermon: LibraryItem) => (
    <Pressable
      key={sermon.id}
      className="flex-row items-center gap-3 px-4 py-3 active:bg-primary/5 border-b border-primary/5"
      onPress={() => handlePlaySermon(sermon.id)}
    >
      {/* Thumbnail */}
      <View className="relative w-14 h-14 rounded-lg bg-primary/10 flex-shrink-0 items-center justify-center">
        <PlayCircle size={24} color="#a22031" opacity={0.6} />
      </View>

      {/* Sermon Info */}
      <View className="flex-1 justify-center min-w-0">
        <Text
          className="text-walnut-brown dark:text-background-light text-sm font-semibold leading-tight mb-1"
          numberOfLines={2}
        >
          {highlightMatch(sermon.title, searchQuery)}
        </Text>

        <View className="flex-row items-center gap-2 flex-wrap">
          {/* Category Badge */}
          <View className="bg-primary/10 px-2 py-0.5 rounded">
            <Text className="text-primary text-[10px] font-bold uppercase">
              {sermon.subcategory || sermon.category}
            </Text>
          </View>

          {/* Duration */}
          {sermon.duration && (
            <View className="flex-row items-center gap-1">
              <Clock size={10} color="#4B3621" opacity={0.5} />
              <Text className="text-walnut-brown/60 dark:text-background-light/60 text-[10px]">
                {sermon.duration}
              </Text>
            </View>
          )}

          {/* Year */}
          {sermon.recordingYear && (
            <View className="flex-row items-center gap-1">
              <Calendar size={10} color="#4B3621" opacity={0.5} />
              <Text className="text-walnut-brown/60 dark:text-background-light/60 text-[10px]">
                {sermon.recordingYear}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Play Icon */}
      <View className="shrink-0 flex items-center justify-center w-10 h-10">
        <PlayCircle size={28} color="#a22031" />
      </View>
    </Pressable>
  );

  // Render category sections for browse mode
  const renderCategorySections = () => {
    if (searchQuery.trim()) {
      // Search results view
      return (
        <View className="flex-1">
          {/* Results count */}
          <View className="px-4 py-3 border-b border-primary/10">
            <Text className="text-walnut-brown dark:text-background-light font-semibold">
              {filteredSermons.length} rezultat{filteredSermons.length !== 1 ? 'e' : ''} găsit{filteredSermons.length !== 1 ? 'e' : ''}
            </Text>
          </View>

          {/* Grouped results */}
          {filteredSermons.length > 0 ? (
            Object.entries(groupedSermons).map(([category, sermons]) => (
              <View key={category} className="mb-4">
                <View className="px-4 py-2 bg-primary/5">
                  <Text className="text-primary font-bold uppercase text-xs tracking-wider">
                    {category} ({sermons.length})
                  </Text>
                </View>
                {sermons.map(renderSermonItem)}
              </View>
            ))
          ) : (
            // Empty state
            <View className="flex-1 items-center justify-center p-8">
              <SearchIcon size={64} color="#a22031" opacity={0.2} />
              <Text className="text-walnut-brown dark:text-background-light text-xl font-bold mt-4 text-center" style={{ fontFamily: 'serif' }}>
                Nu am găsit nimic
              </Text>
              <Text className="text-walnut-brown/60 dark:text-background-light/60 text-sm text-center mt-2">
                Încercați un alt termen de căutare
              </Text>
            </View>
          )}
        </View>
      );
    }

    // Browse mode - show category sections
    return (
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Predici Liturgice Section */}
        <View className="mb-6">
          <View className="px-4 py-3 bg-primary/5 flex-row items-center justify-between">
            <Text className="text-primary font-bold text-base" style={{ fontFamily: 'serif' }}>
              📅 Predici Liturgice ({libraryMetadata.categories.liturgical + libraryMetadata.categories.archived})
            </Text>
          </View>

          {/* Year pills */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 py-3 border-b border-primary/10">
            {Object.keys(liturgicalByYear).sort((a, b) => Number(b) - Number(a)).map(year => (
              <Pressable
                key={year}
                className="mr-2 px-4 py-2 bg-primary/10 rounded-full active:bg-primary/20"
                onPress={() => toggleSection(`liturgical-${year}`)}
              >
                <Text className="text-primary font-bold">
                  {year} ({liturgicalByYear[Number(year)].length})
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Recent liturgical sermons preview */}
          <View>
            {liturgicalSermons.slice(0, 3).map(renderSermonItem)}
            <Pressable className="px-4 py-3 items-center border-t border-primary/10">
              <Text className="text-primary font-semibold text-sm">
                Vezi toate predicile liturgice →
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Cursuri Biblice Section */}
        <View className="mb-6">
          <View className="px-4 py-3 bg-primary/5 flex-row items-center justify-between">
            <Text className="text-primary font-bold text-base" style={{ fontFamily: 'serif' }}>
              📖 Cursuri Biblice ({libraryMetadata.categories.courses})
            </Text>
          </View>

          {/* Course series cards */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 py-3">
            {COURSE_SERIES.map(series => (
              <Pressable
                key={series.id}
                className="mr-3 w-44 rounded-xl bg-white dark:bg-[#2d1b1e] border border-antique-gold/20 shadow-sm overflow-hidden active:scale-95"
                onPress={() => toggleSection(`course-${series.id}`)}
              >
                <View className="p-4">
                  <View className="bg-primary/10 rounded-lg p-3 mb-3 items-center justify-center h-20">
                    <Text className="text-4xl">📚</Text>
                  </View>
                  <Text
                    className="text-walnut-brown dark:text-background-light font-bold text-sm mb-2 leading-tight"
                    numberOfLines={2}
                    style={{ fontFamily: 'serif' }}
                  >
                    {series.title}
                  </Text>
                  <View className="bg-antique-gold/20 px-2 py-1 rounded self-start">
                    <Text className="text-walnut-brown text-[10px] font-bold">
                      {series.count} părți
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Învățături Tematice Section */}
        <View className="mb-6">
          <View className="px-4 py-3 bg-primary/5 flex-row items-center justify-between">
            <Text className="text-primary font-bold text-base" style={{ fontFamily: 'serif' }}>
              💡 Învățături Tematice ({libraryMetadata.categories.topical})
            </Text>
          </View>

          {/* Topic pills */}
          <View className="px-4 py-3 flex-row flex-wrap gap-2">
            {TOPICAL_THEMES.map(theme => (
              <Pressable
                key={theme.id}
                className="flex-row items-center gap-2 px-3 py-2 bg-primary/10 rounded-full active:bg-primary/20"
                onPress={() => {
                  setSearchQuery(theme.title);
                  setActiveFilter('topical');
                }}
              >
                <Text className="text-base">{theme.icon}</Text>
                <Text className="text-primary font-semibold text-sm">{theme.title}</Text>
              </Pressable>
            ))}
          </View>

          {/* Preview topical sermons */}
          <View>
            {topicalSermons.slice(0, 3).map(renderSermonItem)}
          </View>
        </View>

        {/* Despre Sfinți Section */}
        {libraryMetadata.categories.saints > 0 && (
          <View className="mb-6">
            <View className="px-4 py-3 bg-primary/5 flex-row items-center justify-between">
              <Text className="text-primary font-bold text-base" style={{ fontFamily: 'serif' }}>
                ✨ Despre Sfinți ({libraryMetadata.categories.saints})
              </Text>
            </View>
            {saintsSermons.map(renderSermonItem)}
          </View>
        )}

        {/* Library Stats */}
        <View className="px-4 py-6 mb-8">
          <View className="bg-gradient-to-br from-primary/5 to-antique-gold/10 rounded-xl p-4 border border-antique-gold/20">
            <Text className="text-center text-walnut-brown dark:text-background-light font-bold text-lg mb-2" style={{ fontFamily: 'serif' }}>
              Biblioteca Completă
            </Text>
            <View className="flex-row justify-around mt-3">
              <View className="items-center">
                <Text className="text-primary font-bold text-2xl">{libraryMetadata.totalFiles}</Text>
                <Text className="text-walnut-brown/60 text-xs">Predici</Text>
              </View>
              <View className="items-center">
                <Text className="text-primary font-bold text-2xl">{libraryMetadata.totalDuration}</Text>
                <Text className="text-walnut-brown/60 text-xs">Durată</Text>
              </View>
              <View className="items-center">
                <Text className="text-primary font-bold text-2xl">{Math.round(libraryMetadata.totalSizeMB / 1024)} GB</Text>
                <Text className="text-walnut-brown/60 text-xs">Mărime</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      {/* Header */}
      <View className="bg-background-light dark:bg-background-dark border-b border-primary/10 pt-12 pb-4 px-4">
        <Text className="text-primary text-2xl font-bold mb-4" style={{ fontFamily: 'serif' }}>
          Căutare & Bibliotecă
        </Text>

        {/* Search Bar */}
        <View className="relative mb-3">
          <View className="absolute left-3 top-3.5 z-10">
            <SearchIcon size={20} color="#a22031" opacity={0.5} />
          </View>
          <TextInput
            className="bg-white dark:bg-[#2d1b1e] border border-primary/20 rounded-xl pl-11 pr-10 py-3 text-walnut-brown dark:text-background-light"
            placeholder="Caută predici, cursuri, teme..."
            placeholderTextColor="#4B362166"
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <Pressable
              className="absolute right-3 top-3.5 z-10"
              onPress={handleClearSearch}
            >
              <X size={20} color="#a22031" />
            </Pressable>
          )}
        </View>

        {/* Recent Searches */}
        {!searchQuery && recentSearches.length > 0 && (
          <View className="mb-3">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-walnut-brown/60 dark:text-background-light/60 text-xs font-semibold uppercase">
                Căutări recente
              </Text>
              <Pressable onPress={clearRecentSearches}>
                <Text className="text-primary text-xs font-semibold">Șterge</Text>
              </Pressable>
            </View>
            <View className="flex-row flex-wrap gap-2">
              {recentSearches.map((query, index) => (
                <Pressable
                  key={index}
                  className="px-3 py-1.5 bg-primary/10 rounded-full active:bg-primary/20"
                  onPress={() => setSearchQuery(query)}
                >
                  <Text className="text-primary text-sm">{query}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* Quick Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="-mx-4 px-4"
          contentContainerStyle={{ gap: 8 }}
        >
          {QUICK_FILTERS.map(filter => (
            <Pressable
              key={filter.id}
              className={`px-4 py-2 rounded-full border ${
                activeFilter === filter.id
                  ? 'bg-primary border-primary'
                  : 'bg-white dark:bg-[#2d1b1e] border-primary/20'
              }`}
              onPress={() => handleFilterChange(filter.id)}
            >
              <Text
                className={`font-semibold text-sm ${
                  activeFilter === filter.id
                    ? 'text-white'
                    : 'text-walnut-brown dark:text-background-light'
                }`}
              >
                {filter.label} ({filter.count})
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      {renderCategorySections()}
    </View>
  );
}
