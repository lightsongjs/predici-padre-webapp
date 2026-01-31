import React, { useState, useMemo } from 'react';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  Modal,
} from 'react-native';
import { courseSeries, CourseSeries } from '@/data/cursuri';
import {
  BookOpen,
  GraduationCap,
  Church,
  Heart,
  Users,
  Sparkles,
  FileText,
  Play,
  X,
  Clock,
  ListOrdered,
} from 'lucide-react-native';

// Helper to convert duration string to minutes
const durationToMinutes = (duration: string): number => {
  const parts = duration.split(':');
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }
  return 0;
};

// Calculate total duration for a series
const calculateSeriesDuration = (series: CourseSeries): string => {
  const totalMinutes = series.parts.reduce((sum, part) => {
    return sum + durationToMinutes(part.duration);
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}min`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${minutes}min`;
  }
};

// Get icon for series
const getSeriesIcon = (seriesId: string) => {
  const iconProps = { size: 24, color: '#D4AF37' };

  switch (seriesId) {
    case 'rugaciunea-domneasca':
      return <Heart {...iconProps} />;
    case 'cele-10-porunci':
      return <BookOpen {...iconProps} />;
    case 'cursuri-mari':
      return <GraduationCap {...iconProps} />;
    case 'despre-viata-duhovniceasca':
      return <Sparkles {...iconProps} />;
    case 'scoala-de-duminica':
      return <Users {...iconProps} />;
    case 'despre-sfinti':
      return <Church {...iconProps} />;
    case 'invatături-generale':
      return <FileText {...iconProps} />;
    default:
      return <BookOpen {...iconProps} />;
  }
};

export default function CursuriScreen() {
  const [selectedSeries, setSelectedSeries] = useState<CourseSeries | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalSeries = courseSeries.length;
    const totalParts = courseSeries.reduce((sum, series) => sum + series.parts.length, 0);
    const totalMinutes = courseSeries.reduce((sum, series) => {
      return sum + series.parts.reduce((partSum, part) => {
        return partSum + durationToMinutes(part.duration);
      }, 0);
    }, 0);
    const totalHours = Math.floor(totalMinutes / 60);

    return {
      series: totalSeries,
      parts: totalParts,
      hours: totalHours,
    };
  }, []);

  // Featured series (first 3)
  const featuredSeries = useMemo(() => courseSeries.slice(0, 3), []);

  // Remaining series
  const remainingSeries = useMemo(() => courseSeries.slice(3), []);

  const handleSeriesPress = (series: CourseSeries) => {
    setSelectedSeries(series);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedSeries(null), 300);
  };

  const handlePlayPart = (audioFile: string) => {
    // TODO: Navigate to player with this audio file
    console.log('Playing:', audioFile);
  };

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 128 }}>
        {/* Header Section */}
        <View className="px-6 pt-8 pb-6 bg-primary/5">
          <Text
            className="text-primary text-3xl font-bold mb-2"
            style={{ fontFamily: 'serif' }}
          >
            Cursuri Biblice
          </Text>
          <Text className="text-walnut-brown/70 dark:text-background-light/70 text-base mb-4">
            Învățături aprofundate despre credință
          </Text>

          {/* Stats Row */}
          <View className="flex-row items-center gap-4 mt-2">
            <View className="flex-row items-center gap-1.5">
              <BookOpen size={16} color="#a22031" />
              <Text className="text-walnut-brown dark:text-background-light text-sm font-semibold">
                {stats.series} Serii
              </Text>
            </View>
            <View className="w-1 h-1 rounded-full bg-walnut-brown/30" />
            <View className="flex-row items-center gap-1.5">
              <ListOrdered size={16} color="#a22031" />
              <Text className="text-walnut-brown dark:text-background-light text-sm font-semibold">
                {stats.parts} Predici
              </Text>
            </View>
            <View className="w-1 h-1 rounded-full bg-walnut-brown/30" />
            <View className="flex-row items-center gap-1.5">
              <Clock size={16} color="#a22031" />
              <Text className="text-walnut-brown dark:text-background-light text-sm font-semibold">
                ~{stats.hours} ore
              </Text>
            </View>
          </View>
        </View>

        {/* Featured Series Section */}
        <View className="px-6 pt-6">
          <Text
            className="text-walnut-brown dark:text-background-light text-xl font-bold mb-4"
            style={{ fontFamily: 'serif' }}
          >
            Serii Recomandate
          </Text>

          <View className="gap-4">
            {featuredSeries.map((series, index) => (
              <Pressable
                key={series.id}
                className="rounded-2xl overflow-hidden shadow-lg active:scale-[0.98]"
                onPress={() => handleSeriesPress(series)}
              >
                {/* Gradient Background - simulated with layered colors */}
                <View className="relative">
                  {/* Base gradient colors */}
                  <View
                    className={`absolute inset-0 ${
                      index === 0 ? 'bg-primary' :
                      index === 1 ? 'bg-[#6B4423]' :
                      'bg-[#1e5a7a]'
                    }`}
                  />
                  <View className="absolute inset-0 bg-black/10" />

                  {/* Content */}
                  <View className="p-6">
                    {/* Icon Badge */}
                    <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mb-4 border border-white/30">
                      {getSeriesIcon(series.id)}
                    </View>

                    {/* Title */}
                    <Text
                      className="text-white text-2xl font-bold mb-2 leading-tight"
                      style={{ fontFamily: 'serif' }}
                    >
                      {series.title}
                    </Text>

                    {/* Description */}
                    <Text className="text-white/90 text-sm mb-4 leading-relaxed">
                      {series.description}
                    </Text>

                    {/* Stats Row */}
                    <View className="flex-row items-center gap-3 mb-4">
                      <View className="flex-row items-center gap-1.5">
                        <ListOrdered size={14} color="#fff" />
                        <Text className="text-white/90 text-xs font-semibold">
                          {series.parts.length} părți
                        </Text>
                      </View>
                      <View className="w-1 h-1 rounded-full bg-white/50" />
                      <View className="flex-row items-center gap-1.5">
                        <Clock size={14} color="#fff" />
                        <Text className="text-white/90 text-xs font-semibold">
                          {calculateSeriesDuration(series)}
                        </Text>
                      </View>
                    </View>

                    {/* CTA Button */}
                    <Pressable
                      className="bg-antique-gold rounded-full px-6 py-3 flex-row items-center justify-center gap-2 active:scale-95"
                      onPress={() => handleSeriesPress(series)}
                    >
                      <Play size={16} color="#4B3621" fill="#4B3621" />
                      <Text className="text-walnut-brown text-sm font-bold">
                        Începe Seria
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* All Series Grid */}
        <View className="px-6 pt-8 pb-6">
          <Text
            className="text-walnut-brown dark:text-background-light text-xl font-bold mb-4"
            style={{ fontFamily: 'serif' }}
          >
            Toate Seriile
          </Text>

          <View className="gap-3">
            {remainingSeries.map((series) => (
              <Pressable
                key={series.id}
                className="bg-white dark:bg-[#2d1b1e] rounded-xl p-4 shadow-md border border-antique-gold/20 active:scale-[0.98]"
                onPress={() => handleSeriesPress(series)}
              >
                <View className="flex-row items-start gap-4">
                  {/* Icon */}
                  <View className="w-12 h-12 rounded-lg bg-primary/10 items-center justify-center flex-shrink-0">
                    {getSeriesIcon(series.id)}
                  </View>

                  {/* Content */}
                  <View className="flex-1 min-w-0">
                    <Text
                      className="text-walnut-brown dark:text-background-light text-base font-bold mb-1"
                      numberOfLines={2}
                    >
                      {series.title}
                    </Text>
                    <Text
                      className="text-walnut-brown/60 dark:text-background-light/60 text-xs mb-2"
                      numberOfLines={2}
                    >
                      {series.description}
                    </Text>
                    <View className="flex-row items-center gap-2">
                      <Text className="text-primary text-xs font-semibold">
                        {series.parts.length} fișiere
                      </Text>
                      <View className="w-1 h-1 rounded-full bg-walnut-brown/30" />
                      <Text className="text-walnut-brown/50 dark:text-background-light/50 text-xs">
                        {calculateSeriesDuration(series)}
                      </Text>
                    </View>
                  </View>

                  {/* Arrow */}
                  <View className="pt-1">
                    <Text className="text-primary text-lg">›</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Series Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View className="flex-1 bg-black/50">
          <Pressable
            className="flex-1"
            onPress={handleCloseModal}
          />

          <View className="bg-background-light dark:bg-background-dark rounded-t-3xl max-h-[85%] shadow-2xl">
            {/* Modal Header */}
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-antique-gold/20">
              <View className="flex-1 pr-4">
                <Text
                  className="text-walnut-brown dark:text-background-light text-xl font-bold"
                  style={{ fontFamily: 'serif' }}
                  numberOfLines={2}
                >
                  {selectedSeries?.title}
                </Text>
              </View>
              <Pressable
                className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center active:bg-primary/20"
                onPress={handleCloseModal}
              >
                <X size={20} color="#a22031" />
              </Pressable>
            </View>

            {/* Modal Content */}
            <ScrollView className="flex-1 px-6 py-4">
              {selectedSeries && (
                <>
                  {/* Description */}
                  <View className="mb-6">
                    <Text className="text-walnut-brown/70 dark:text-background-light/70 text-sm mb-4 leading-relaxed">
                      {selectedSeries.description}
                    </Text>

                    {/* Stats */}
                    <View className="flex-row items-center gap-4 p-4 bg-primary/5 rounded-xl">
                      <View className="flex-row items-center gap-2">
                        <ListOrdered size={16} color="#a22031" />
                        <Text className="text-walnut-brown dark:text-background-light text-sm font-semibold">
                          {selectedSeries.parts.length} părți
                        </Text>
                      </View>
                      <View className="w-1 h-1 rounded-full bg-walnut-brown/30" />
                      <View className="flex-row items-center gap-2">
                        <Clock size={16} color="#a22031" />
                        <Text className="text-walnut-brown dark:text-background-light text-sm font-semibold">
                          {calculateSeriesDuration(selectedSeries)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Play All Button */}
                  <Pressable
                    className="bg-primary rounded-full px-6 py-4 flex-row items-center justify-center gap-2 mb-6 active:scale-95 shadow-md"
                    onPress={() => handlePlayPart(selectedSeries.parts[0]?.audioFile)}
                  >
                    <Play size={18} color="#fff" fill="#fff" />
                    <Text className="text-white text-base font-bold">
                      Ascultă Serie Completă
                    </Text>
                  </Pressable>

                  {/* Parts List */}
                  <View className="gap-2 mb-6">
                    <Text className="text-walnut-brown dark:text-background-light text-lg font-bold mb-2">
                      Toate Părțile
                    </Text>

                    {selectedSeries.parts.map((part, index) => (
                      <Pressable
                        key={index}
                        className="bg-white dark:bg-[#2d1b1e] rounded-lg p-4 border border-antique-gold/10 active:bg-primary/5"
                        onPress={() => handlePlayPart(part.audioFile)}
                      >
                        <View className="flex-row items-center gap-3">
                          {/* Part Number */}
                          <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center flex-shrink-0">
                            <Text className="text-primary text-sm font-bold">
                              {index + 1}
                            </Text>
                          </View>

                          {/* Part Info */}
                          <View className="flex-1 min-w-0">
                            <Text
                              className="text-walnut-brown dark:text-background-light text-sm font-semibold mb-0.5"
                              numberOfLines={2}
                            >
                              {part.title}
                            </Text>
                            <View className="flex-row items-center gap-2">
                              <Clock size={12} color="#a22031" />
                              <Text className="text-walnut-brown/50 dark:text-background-light/50 text-xs">
                                {part.duration}
                              </Text>
                              {part.recordingYear && (
                                <>
                                  <View className="w-1 h-1 rounded-full bg-walnut-brown/30" />
                                  <Text className="text-walnut-brown/50 dark:text-background-light/50 text-xs">
                                    {part.recordingYear}
                                  </Text>
                                </>
                              )}
                            </View>
                          </View>

                          {/* Play Button */}
                          <View className="w-8 h-8 rounded-full border border-primary/30 items-center justify-center">
                            <Play size={14} color="#a22031" fill="#a22031" />
                          </View>
                        </View>
                      </Pressable>
                    ))}
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
