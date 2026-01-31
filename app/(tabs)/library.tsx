import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { sermons, Sermon } from '@/data/data';
import { sermons2027 } from '@/data/data-2027';
import { courseSeries } from '@/data/cursuri';
import { libraryMetadata } from '@/data/complete-library';
import {
  Church,
  Search,
  User,
  Play,
  PlayCircle,
  FolderOpen,
  Home,
  BookOpen,
  Folder,
  Heart,
  Calendar,
  Award,
  Clock,
  ChevronDown,
  ChevronRight,
  BookMarked,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Library stats
const LIBRARY_STATS = {
  totalSermons: 417,
  totalSeries: 7,
  totalHours: 176,
  liturgicalSermons: 124,
};

// Liturgical calendar structure for 2026
const LITURGICAL_CALENDAR_2026 = {
  triod: [
    { title: 'Vameșului și Fariseului', offset: -70 },
    { title: 'Fiului Risipitor', offset: -63 },
    { title: 'Înfricoșătoarei Judecăți', offset: -56 },
    { title: 'Lăsatului Sec de Brânză', offset: -49 },
  ],
  postulMare: [
    { title: 'Duminica Ortodoxiei', offset: -42 },
    { title: 'Sf. Grigorie Palama', offset: -35 },
    { title: 'Închinarea Sfintei Cruci', offset: -28 },
    { title: 'Sf. Ioan Scărarul', offset: -21 },
    { title: 'Sf. Maria Egipteanca', offset: -14 },
    { title: 'Floriile', offset: -7 },
  ],
  dupaPasti: [
    { title: 'Învierea Domnului', offset: 0 },
    { title: 'Duminica Mironosițelor', offset: 7 },
    { title: 'Duminica Slăbănogului', offset: 14 },
    { title: 'Duminica Samarinencii', offset: 21 },
    { title: 'Duminica Orbului', offset: 28 },
    { title: 'Părinții de la Sinodul I', offset: 35 },
    { title: 'Rusaliile', offset: 42 },
  ],
  dupaRusalii: Array.from({ length: 30 }, (_, i) => ({
    title: `Duminica ${i + 1} după Rusalii`,
    offset: 49 + i * 7,
  })),
};

// Topics for browsing
const BROWSE_TOPICS = [
  { id: 'familie', name: 'Familie', count: 23 },
  { id: 'rugaciune', name: 'Rugăciune', count: 18 },
  { id: 'credinta', name: 'Credință', count: 34 },
  { id: 'iubire', name: 'Iubire', count: 27 },
  { id: 'sfinti', name: 'Sfinți', count: 42 },
];

const COLORS = {
  primary: '#a2202f',
  accentGold: '#D4AF37',
  bgLight: '#FFFBF0',
  bgDark: '#1a0f10',
  textDark: '#1a0f10',
  textLight: '#92545b',
  white: '#ffffff',
};

export default function LibraryScreen() {
  const [selectedYear, setSelectedYear] = useState<'2026' | '2027'>('2026');
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  // Get featured sermon that rotates daily
  const featuredSermon = useMemo(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const allSermons = [...sermons, ...sermons2027];
    return allSermons[dayOfYear % allSermons.length];
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handlePlaySermon = (sermon: Sermon) => {
    console.log('Playing sermon:', sermon.title);
    // TODO: Implement audio playback
  };

  const handleSeriesPress = (seriesId: string) => {
    console.log('Opening series:', seriesId);
    // TODO: Navigate to series detail
  };

  const handleTopicPress = (topicId: string) => {
    console.log('Browsing topic:', topicId);
    // TODO: Navigate to topic view
  };

  const getTotalDuration = (parts: any[]) => {
    const totalMinutes = parts.reduce((sum, part) => {
      const duration = part.duration || '0:00';
      const [hours, minutes] = duration.split(':').map(Number);
      return sum + (hours * 60) + (minutes || 0);
    }, 0);
    return `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
  };

  const renderCourseSeriesItem = ({ item }: { item: typeof courseSeries[0] }) => (
    <Pressable onPress={() => handleSeriesPress(item.id)} style={styles.courseCard}>
      {({ pressed }) => (
        <View style={[styles.courseCardContent, pressed && styles.courseCardPressed]}>
          <View style={styles.courseIconContainer}>
            <BookMarked color={COLORS.accentGold} size={32} />
          </View>
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.courseDescription} numberOfLines={2}>
              {item.description}
            </Text>
            <View style={styles.courseMetaRow}>
              <View style={styles.courseMeta}>
                <BookOpen color={COLORS.textLight} size={14} />
                <Text style={styles.courseMetaText}>{item.totalParts} părți</Text>
              </View>
              <View style={styles.courseMeta}>
                <Clock color={COLORS.textLight} size={14} />
                <Text style={styles.courseMetaText}>{getTotalDuration(item.parts)}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );

  const renderTopicItem = ({ item }: { item: typeof BROWSE_TOPICS[0] }) => (
    <Pressable onPress={() => handleTopicPress(item.id)} style={styles.topicCard}>
      {({ pressed }) => (
        <View style={[styles.topicCardContent, pressed && styles.topicCardPressed]}>
          <Text style={styles.topicName}>{item.name}</Text>
          <Text style={styles.topicCount}>{item.count} predici</Text>
          <ChevronRight color={COLORS.primary} size={20} style={styles.topicArrow} />
        </View>
      )}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.topBar}>
        <View style={styles.churchIcon}>
          <Church color="white" size={20} />
        </View>
        <View style={styles.topBarText}>
          <Text style={styles.topBarTitle}>Predicile Părintelui</Text>
          <Text style={styles.topBarSubtitle}>Biserica Ortodoxă</Text>
        </View>
        <View style={styles.topBarActions}>
          <TouchableOpacity style={styles.searchButton}>
            <Search color={COLORS.textDark} size={24} />
          </TouchableOpacity>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL2oc-iAlBfnriArVTioDt_gn1yz-nuIUew-twZBIj4M5zRxox82lDf3sWEoFwvjzgbzMUvggkxGSp6vnOipu_lHcExyq2hTtEyWRp7sa8rEFOT1NkOzXhzpZR572KfxcSNHpHhQE1MGcIcqGcA1MGRCpqMYia40V0Ky9iTVM_Mkpul35CapdGpD4xUeQbExnZ2QJC5r-U-MUkKHVtlcbMCAoQlcT-vlBu7HUvlS90JB_BarEQSJJb4u5j_cyi8yThnaFx8sXa54qP',
              }}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Section - Featured Daily */}
        <View style={styles.heroSection}>
          <View style={styles.heroCard}>
            <View style={styles.heroDotPattern} />
            <View style={styles.heroContent}>
              <View style={styles.heroTextContainer}>
                <View style={styles.heroBadge}>
                  <Text style={styles.heroBadgeText}>Predica Zilei</Text>
                </View>

                <Text style={styles.heroTitle} numberOfLines={2}>
                  {featuredSermon?.title || 'Predică Specială'}
                </Text>

                <Text style={styles.heroQuote}>
                  "Eu sunt Lumina lumii; cel ce Îmi urmează Mie nu va umbla în întuneric, ci va avea lumina vieții."
                </Text>

                <View style={styles.heroActions}>
                  <Pressable
                    onPress={() => featuredSermon && handlePlaySermon(featuredSermon)}
                    style={({ pressed }) => [styles.heroButton, pressed && styles.heroButtonPressed]}
                  >
                    <Play color="white" size={20} fill="white" />
                    <Text style={styles.heroButtonText}>Ascultă Acum</Text>
                  </Pressable>

                  <Text style={styles.heroDuration}>{featuredSermon?.duration || '20:00'}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Stats Row */}
        <View style={styles.statsSection}>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <BookOpen color={COLORS.primary} size={24} />
              <Text style={styles.statNumber}>{LIBRARY_STATS.totalSermons}</Text>
              <Text style={styles.statLabel}>Predici</Text>
            </View>
            <View style={styles.statCard}>
              <Folder color={COLORS.accentGold} size={24} />
              <Text style={styles.statNumber}>{LIBRARY_STATS.totalSeries}</Text>
              <Text style={styles.statLabel}>Serii Complete</Text>
            </View>
            <View style={styles.statCard}>
              <Clock color={COLORS.primary} size={24} />
              <Text style={styles.statNumber}>~{LIBRARY_STATS.totalHours}h</Text>
              <Text style={styles.statLabel}>Conținut</Text>
            </View>
            <View style={styles.statCard}>
              <Calendar color={COLORS.accentGold} size={24} />
              <Text style={styles.statNumber}>{LIBRARY_STATS.liturgicalSermons}</Text>
              <Text style={styles.statLabel}>Liturgice</Text>
            </View>
          </View>
        </View>

        {/* Calendar Liturgic Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Calendar color={COLORS.primary} size={20} />
              <Text style={styles.sectionTitle}>Calendarul Liturgic</Text>
            </View>
          </View>

          {/* Year Tabs */}
          <View style={styles.yearTabs}>
            <TouchableOpacity
              onPress={() => setSelectedYear('2026')}
              style={[styles.yearTab, selectedYear === '2026' && styles.yearTabActive]}
            >
              <Text style={[styles.yearTabText, selectedYear === '2026' && styles.yearTabTextActive]}>
                2026
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedYear('2027')}
              style={[styles.yearTab, selectedYear === '2027' && styles.yearTabActive]}
            >
              <Text style={[styles.yearTabText, selectedYear === '2027' && styles.yearTabTextActive]}>
                2027
              </Text>
            </TouchableOpacity>
          </View>

          {/* Liturgical Periods */}
          <View style={styles.liturgicalSections}>
            {/* Triod */}
            <TouchableOpacity
              onPress={() => toggleSection('triod')}
              style={styles.liturgicalHeader}
            >
              <Text style={styles.liturgicalTitle}>Triod ({LITURGICAL_CALENDAR_2026.triod.length} duminici)</Text>
              {expandedSections.triod ? (
                <ChevronDown color={COLORS.primary} size={20} />
              ) : (
                <ChevronRight color={COLORS.textLight} size={20} />
              )}
            </TouchableOpacity>
            {expandedSections.triod && (
              <View style={styles.liturgicalList}>
                {LITURGICAL_CALENDAR_2026.triod.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.liturgicalItem}>
                    <Text style={styles.liturgicalItemText}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Postul Mare */}
            <TouchableOpacity
              onPress={() => toggleSection('postulMare')}
              style={styles.liturgicalHeader}
            >
              <Text style={styles.liturgicalTitle}>Postul Mare ({LITURGICAL_CALENDAR_2026.postulMare.length} duminici)</Text>
              {expandedSections.postulMare ? (
                <ChevronDown color={COLORS.primary} size={20} />
              ) : (
                <ChevronRight color={COLORS.textLight} size={20} />
              )}
            </TouchableOpacity>
            {expandedSections.postulMare && (
              <View style={styles.liturgicalList}>
                {LITURGICAL_CALENDAR_2026.postulMare.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.liturgicalItem}>
                    <Text style={styles.liturgicalItemText}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* După Paști */}
            <TouchableOpacity
              onPress={() => toggleSection('dupaPasti')}
              style={styles.liturgicalHeader}
            >
              <Text style={styles.liturgicalTitle}>După Paști ({LITURGICAL_CALENDAR_2026.dupaPasti.length} duminici)</Text>
              {expandedSections.dupaPasti ? (
                <ChevronDown color={COLORS.primary} size={20} />
              ) : (
                <ChevronRight color={COLORS.textLight} size={20} />
              )}
            </TouchableOpacity>
            {expandedSections.dupaPasti && (
              <View style={styles.liturgicalList}>
                {LITURGICAL_CALENDAR_2026.dupaPasti.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.liturgicalItem}>
                    <Text style={styles.liturgicalItemText}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* După Rusalii */}
            <TouchableOpacity
              onPress={() => toggleSection('dupaRusalii')}
              style={styles.liturgicalHeader}
            >
              <Text style={styles.liturgicalTitle}>După Rusalii ({LITURGICAL_CALENDAR_2026.dupaRusalii.length} duminici)</Text>
              {expandedSections.dupaRusalii ? (
                <ChevronDown color={COLORS.primary} size={20} />
              ) : (
                <ChevronRight color={COLORS.textLight} size={20} />
              )}
            </TouchableOpacity>
            {expandedSections.dupaRusalii && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.liturgicalScrollList}
              >
                {LITURGICAL_CALENDAR_2026.dupaRusalii.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.liturgicalScrollItem}>
                    <Text style={styles.liturgicalScrollItemText}>{index + 1}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </View>

        {/* Course Series */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Award color={COLORS.accentGold} size={20} />
              <Text style={styles.sectionTitle}>Învățături Aprofundate</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>Vezi toate</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            data={courseSeries}
            renderItem={renderCourseSeriesItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.coursesList}
            snapToInterval={280 + 16}
            decelerationRate="fast"
          />
        </View>

        {/* Browse by Topic */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explorează după Temă</Text>
          </View>

          <FlatList
            data={BROWSE_TOPICS}
            renderItem={renderTopicItem}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.topicsRow}
            scrollEnabled={false}
          />
        </View>

        {/* Spacer for bottom elements */}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Persistent Mini Player */}
      <View style={styles.miniPlayer}>
        <Pressable style={styles.miniPlayerContent}>
          <View style={styles.miniPlayerCover}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTz3A_00XEcgJqx-g4sSbMD60TRw5if9haiBAjrtxF_92B0KZe4phg1YdddJSEWw5tKLzpKvWgc5e2pDuU9gHqgsyiQQx3yqX0ZpsN4zevRFGsA8d0lTpZFQTGlrghzInG-dr-3SfAeCxoIaVdn9Lpi8WiTDUaJ8Jp9lFR-PiC59U1msx1w9qLcgg2yWXeUNOMDLbDmMktavk2YI9O4zWvi0dCsfe19VBT2dzIJTyUQmRM1ecXXrurmk9WmBlRwshB0Jg2Wmsp32Gw',
              }}
              style={styles.miniPlayerCoverImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.miniPlayerInfo}>
            <Text style={styles.miniPlayerTitle} numberOfLines={1}>
              Vindecarea Orbului
            </Text>
            <Text style={styles.miniPlayerSubtitle}>Predica de Duminică</Text>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
          </View>

          <View style={styles.miniPlayerControls}>
            <TouchableOpacity style={styles.miniPlayerButton}>
              <Text style={styles.miniPlayerControlIcon}>⏮</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.miniPlayerButton}>
              <Text style={styles.miniPlayerControlIconLarge}>⏸</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.miniPlayerButton}>
              <Text style={styles.miniPlayerControlIcon}>⏭</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Home color={COLORS.primary} size={24} fill={COLORS.primary} />
          <Text style={styles.navItemTextActive}>Acasă</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <BookOpen color={COLORS.textLight} size={24} />
          <Text style={styles.navItemText}>Bibliotecă</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Folder color={COLORS.textLight} size={24} />
          <Text style={styles.navItemText}>Serii</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Heart color={COLORS.textLight} size={24} />
          <Text style={styles.navItemText}>Favorite</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgLight,
  },
  topBar: {
    backgroundColor: COLORS.bgLight + 'F2',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary + '1A',
  },
  churchIcon: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topBarText: {
    flex: 1,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
    letterSpacing: 0.3,
  },
  topBarSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.primary,
  },
  topBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchButton: {
    padding: 8,
    borderRadius: 20,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.accentGold,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 180,
  },
  heroSection: {
    padding: 16,
  },
  heroCard: {
    borderRadius: 12,
    backgroundColor: COLORS.bgDark,
    padding: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  heroDotPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.accentGold,
    opacity: 0.05,
  },
  heroContent: {
    position: 'relative',
    zIndex: 10,
  },
  heroTextContainer: {
    gap: 16,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accentGold,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
  },
  heroBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    lineHeight: 32,
  },
  heroQuote: {
    fontSize: 14,
    color: COLORS.white + 'B3',
    lineHeight: 20,
  },
  heroActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingTop: 8,
  },
  heroButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heroButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  heroButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  heroDuration: {
    fontSize: 12,
    color: COLORS.white + '80',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  section: {
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  seeAllButton: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  seriesList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  seriesCard: {
    width: 176,
    marginRight: 16,
  },
  seriesImageContainer: {
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.accentGold + '33',
  },
  seriesImage: {
    width: '100%',
    height: '100%',
  },
  seriesImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seriesImageOverlayPressed: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  seriesInfo: {
    marginTop: 12,
  },
  seriesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  seriesCount: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  recentSection: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
    paddingTop: 24,
    paddingBottom: 16,
  },
  recentSermonCard: {
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primary + '0D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  recentSermonCardPressed: {
    opacity: 0.8,
  },
  recentSermonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  recentSermonImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  recentSermonText: {
    flex: 1,
    minWidth: 0,
  },
  recentSermonCategory: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  recentSermonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginTop: 4,
  },
  recentSermonTime: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },
  miniPlayer: {
    position: 'absolute',
    bottom: 72,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    zIndex: 50,
  },
  miniPlayerContent: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  miniPlayerCover: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  miniPlayerCoverImage: {
    width: '100%',
    height: '100%',
  },
  miniPlayerInfo: {
    flex: 1,
    minWidth: 0,
  },
  miniPlayerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  miniPlayerSubtitle: {
    fontSize: 10,
    color: COLORS.white + 'CC',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    marginTop: 4,
    overflow: 'hidden',
  },
  progressFill: {
    width: '33%',
    height: '100%',
    backgroundColor: COLORS.accentGold,
  },
  miniPlayerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  miniPlayerButton: {
    padding: 4,
  },
  miniPlayerControlIcon: {
    fontSize: 24,
    color: COLORS.white,
  },
  miniPlayerControlIconLarge: {
    fontSize: 30,
    color: COLORS.white,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white + 'F2',
    borderTopWidth: 1,
    borderTopColor: COLORS.primary + '1A',
    height: 72,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 50,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navItemTextActive: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  navItemText: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.textLight,
  },
  // Stats Section
  statsSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary + '0D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 4,
    textAlign: 'center',
  },
  // Section Title Row
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  // Year Tabs
  yearTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  yearTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary + '1A',
    alignItems: 'center',
  },
  yearTabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  yearTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  yearTabTextActive: {
    color: COLORS.white,
  },
  // Liturgical Calendar
  liturgicalSections: {
    paddingHorizontal: 16,
  },
  liturgicalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.primary + '0D',
  },
  liturgicalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  liturgicalList: {
    paddingLeft: 16,
    marginBottom: 12,
  },
  liturgicalItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: COLORS.bgLight,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accentGold,
    marginBottom: 6,
    borderRadius: 4,
  },
  liturgicalItemText: {
    fontSize: 13,
    color: COLORS.textDark,
  },
  liturgicalScrollList: {
    marginBottom: 12,
    paddingLeft: 16,
  },
  liturgicalScrollItem: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.accentGold + '33',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  liturgicalScrollItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  // Course Series Cards
  coursesList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  courseCard: {
    width: 280,
    marginRight: 16,
  },
  courseCardContent: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.accentGold + '33',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  courseCardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  courseIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: COLORS.primary + '0D',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  courseInfo: {
    gap: 8,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
    lineHeight: 22,
  },
  courseDescription: {
    fontSize: 12,
    color: COLORS.textLight,
    lineHeight: 18,
  },
  courseMetaRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 4,
  },
  courseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  courseMetaText: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  // Topics Grid
  topicsRow: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  topicCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.primary + '0D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    position: 'relative',
    minHeight: 80,
  },
  topicCardContent: {
    gap: 4,
  },
  topicCardPressed: {
    opacity: 0.8,
    backgroundColor: COLORS.primary + '05',
  },
  topicName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  topicCount: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  topicArrow: {
    position: 'absolute',
    right: 12,
    top: 16,
  },
});
