import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Play, BookOpen, Calendar, User, Menu } from 'lucide-react-native';

// Byzantine Modern theme colors
const COLORS = {
  primary: '#8B1E3F',      // Deep Burgundy
  accent: '#D4AF37',       // Antique Gold
  background: '#F0F4F8',   // Pale Blue/Cream
  text: '#4B3621',         // Dark Walnut
  card: '#FFFFFF',
};

// Sample data - load only what's needed for home screen
const SAMPLE_SERMON = {
  id: '1',
  title: 'Învierea Domnului - Paștele',
  category: 'Predici Duminicale',
  duration: '25:30',
  liturgicalDate: 'Duminica Învierii',
  gospelReading: 'Ioan 1:1-17',
};

const FEATURED_COURSES = [
  { id: '1', title: 'Evanghelia după Ioan', parts: 12, category: 'Noul Testament' },
  { id: '2', title: 'Liturghia Sf. Ioan Gură de Aur', parts: 8, category: 'Liturgică' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implement actual audio playback
    console.log('Play/Pause toggled');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.iconButton}>
          <Menu size={24} color={COLORS.primary} />
        </Pressable>

        <Text style={styles.headerTitle}>Predicile Părintelui</Text>

        <Pressable style={styles.iconButton}>
          <User size={24} color={COLORS.primary} />
        </Pressable>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Card - Today's Sermon */}
        <View style={styles.heroCard}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>PREDICA ZILEI</Text>
          </View>

          {SAMPLE_SERMON.gospelReading && (
            <View style={styles.gospelRow}>
              <BookOpen size={14} color={COLORS.accent} />
              <Text style={styles.gospel}>{SAMPLE_SERMON.gospelReading}</Text>
            </View>
          )}

          <Text style={styles.heroTitle}>{SAMPLE_SERMON.title}</Text>

          <View style={styles.metaRow}>
            <Calendar size={14} color={COLORS.text} />
            <Text style={styles.metaText}>{SAMPLE_SERMON.liturgicalDate}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.metaText}>{SAMPLE_SERMON.duration}</Text>
          </View>

          <Pressable style={styles.playButton} onPress={handlePlay}>
            <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
            <Text style={styles.playButtonText}>Ascultă Acum</Text>
          </Pressable>
        </View>

        {/* Cursuri Recomandate */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Cursuri Recomandate</Text>
            <Text style={styles.seeAll}>Vezi toate</Text>
          </View>

          {FEATURED_COURSES.map((course) => (
            <View key={course.id} style={styles.courseCard}>
              <BookOpen size={32} color={COLORS.accent} />
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseMeta}>
                  {course.parts} părți • {course.category}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Library Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Biblioteca Ta</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>417</Text>
              <Text style={styles.statLabel}>Predici</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Cursuri</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>176h</Text>
              <Text style={styles.statLabel}>Conținut</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Mini Player */}
      {isPlaying && (
        <View style={styles.miniPlayer}>
          <View style={styles.miniPlayerContent}>
            <View style={styles.miniPlayerInfo}>
              <Text style={styles.miniPlayerTitle}>Acum se redă</Text>
              <Text style={styles.miniPlayerSubtitle}>{SAMPLE_SERMON.title}</Text>
            </View>
            <Pressable onPress={handlePlay}>
              <Play size={24} color={COLORS.accent} />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary + '1A',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    fontFamily: 'serif',
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  content: {
    flex: 1,
  },
  heroCard: {
    margin: 16,
    padding: 24,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.accent + '30',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: 1,
  },
  gospelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  gospel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
    fontFamily: 'serif',
    lineHeight: 32,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  metaText: {
    fontSize: 14,
    color: COLORS.text + 'AA',
  },
  dot: {
    fontSize: 14,
    color: COLORS.text + '60',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  playButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    fontFamily: 'serif',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.accent + '20',
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  courseMeta: {
    fontSize: 12,
    color: COLORS.text + '80',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary + '10',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.text + '80',
  },
  miniPlayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.primary + '20',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  miniPlayerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  miniPlayerInfo: {
    flex: 1,
  },
  miniPlayerTitle: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  miniPlayerSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
});
