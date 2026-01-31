import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
  Platform,
  Animated,
  PanResponder,
  Dimensions,
  Image,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Audio, AVPlaybackStatus } from 'expo-av';
import {
  ChevronDown,
  Share2,
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Monitor,
  Volume2,
  ListMusic,
} from 'lucide-react-native';
import { Sermon } from '@/data/data';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ALBUM_ART_SIZE = SCREEN_WIDTH - 64; // 32px padding on each side

export default function PlayerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Parse sermon data from params
  const sermon: Sermon | null = params.sermon
    ? JSON.parse(params.sermon as string)
    : null;

  // Audio instance
  const sound = useRef<Audio.Sound | null>(null);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);

  // Progress state
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  // Control states
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const [repeatEnabled, setRepeatEnabled] = useState(false);

  // Volume state
  const [volume, setVolume] = useState(0.6);

  // Animation values
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Initialize audio session
  useEffect(() => {
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.error('Error setting audio mode:', error);
      }
    };

    setupAudio();
  }, []);

  // Load and setup audio
  useEffect(() => {
    if (!sermon) return;

    let mounted = true;

    const loadAudio = async () => {
      try {
        setIsLoading(true);

        // Unload previous sound if exists
        if (sound.current) {
          await sound.current.unloadAsync();
          sound.current = null;
        }

        // Create and load new sound
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: sermon.audio_url },
          {
            shouldPlay: false,
            volume: volume,
            isLooping: repeatEnabled
          },
          onPlaybackStatusUpdate
        );

        if (mounted) {
          sound.current = newSound;
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading audio:', error);
        if (mounted) {
          setIsLoading(false);
          Alert.alert(
            'Eroare',
            'Nu s-a putut încărca predica. Verificați conexiunea la internet.',
            [{ text: 'OK', onPress: () => router.back() }]
          );
        }
      }
    };

    loadAudio();

    return () => {
      mounted = false;
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, [sermon?.audio_url]);

  // Playback status update handler
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      console.error('Audio not loaded');
      return;
    }

    setIsPlaying(status.isPlaying);
    setIsBuffering(status.isBuffering);

    if (!isSeeking) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
    }

    // Handle playback end
    if (status.didJustFinish && !status.isLooping) {
      setIsPlaying(false);
      setPosition(0);
    }
  };

  // Play/Pause toggle with animation
  const togglePlayPause = async () => {
    if (!sound.current || isLoading) return;

    // Animate button
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    try {
      if (isPlaying) {
        await sound.current.pauseAsync();
      } else {
        await sound.current.playAsync();
      }
    } catch (error) {
      console.error('Error toggling play/pause:', error);
      Alert.alert('Eroare', 'Nu s-a putut controla redarea audio.');
    }
  };

  // Skip forward 15 seconds
  const skipForward = async () => {
    if (!sound.current || isLoading) return;

    try {
      const newPosition = Math.min(position + 15000, duration);
      await sound.current.setPositionAsync(newPosition);
    } catch (error) {
      console.error('Error skipping forward:', error);
    }
  };

  // Skip backward 15 seconds
  const skipBackward = async () => {
    if (!sound.current || isLoading) return;

    try {
      const newPosition = Math.max(position - 15000, 0);
      await sound.current.setPositionAsync(newPosition);
    } catch (error) {
      console.error('Error skipping backward:', error);
    }
  };

  // Seek to position
  const seekToPosition = async (value: number) => {
    if (!sound.current || isLoading) return;

    try {
      setIsSeeking(true);
      await sound.current.setPositionAsync(value);
      setIsSeeking(false);
    } catch (error) {
      console.error('Error seeking:', error);
      setIsSeeking(false);
    }
  };

  // Toggle shuffle
  const toggleShuffle = () => {
    setShuffleEnabled(!shuffleEnabled);
    // TODO: Implement shuffle logic when playlist is available
  };

  // Toggle repeat
  const toggleRepeat = async () => {
    const newRepeat = !repeatEnabled;
    setRepeatEnabled(newRepeat);

    if (sound.current) {
      try {
        await sound.current.setIsLoopingAsync(newRepeat);
      } catch (error) {
        console.error('Error setting repeat:', error);
      }
    }
  };

  // Adjust volume
  const adjustVolume = async (newVolume: number) => {
    if (!sound.current) return;

    try {
      const clampedVolume = Math.max(0, Math.min(1, newVolume));
      await sound.current.setVolumeAsync(clampedVolume);
      setVolume(clampedVolume);
    } catch (error) {
      console.error('Error adjusting volume:', error);
    }
  };

  // Share sermon
  const handleShare = () => {
    // TODO: Implement share functionality
    Alert.alert('Distribuie', 'Funcționalitate în curând!');
  };

  // Format time (milliseconds to MM:SS)
  const formatTime = (millis: number): string => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (position / duration) * 100 : 0;

  if (!sermon) {
    return (
      <View className="flex-1 bg-[#fdfbf7] dark:bg-[#1a0f10] items-center justify-center">
        <Text className="text-[#1a0f10] dark:text-[#f8f6f6]">Nu s-a găsit predica</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#fdfbf7] dark:bg-[#1a0f10]">
      {/* Top Navigation Bar */}
      <View className="flex-row items-center justify-between px-6 py-4 pt-12">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center active:bg-black/5 dark:active:bg-white/5"
        >
          <ChevronDown size={24} color="#1a0f10" className="dark:color-[#f8f6f6]" />
        </Pressable>

        <Text className="text-sm font-semibold tracking-widest uppercase opacity-60 text-[#1a0f10] dark:text-[#f8f6f6]">
          Acum Redă
        </Text>

        <Pressable
          onPress={handleShare}
          className="w-10 h-10 rounded-full items-center justify-center active:bg-black/5 dark:active:bg-white/5"
        >
          <Share2 size={24} color="#1a0f10" className="dark:color-[#f8f6f6]" />
        </Pressable>
      </View>

      {/* Main Content */}
      <View className="flex-1 px-8 pb-12 max-w-md mx-auto w-full">
        {/* Album Art */}
        <View className="mt-4 mb-10">
          <View
            className="rounded-xl overflow-hidden shadow-2xl active:scale-[1.02] transition-transform duration-500"
            style={{ width: ALBUM_ART_SIZE, height: ALBUM_ART_SIZE, aspectRatio: 1 }}
          >
            <View className="w-full h-full bg-gradient-to-br from-[#8B1E3F] to-[#6B1730] items-center justify-center">
              {/* Byzantine Cross Icon */}
              <Text className="text-[#D4AF37] text-8xl">✝</Text>
            </View>
          </View>
        </View>

        {/* Sermon Title and Speaker */}
        <View className="text-center mb-10">
          <Text className="font-serif text-3xl mb-2 text-[#1a0f10] dark:text-white leading-tight text-center">
            {sermon.title}
          </Text>
          <Text className="text-[#a22031] dark:text-[#a22031]/90 font-medium text-lg opacity-80 text-center">
            {sermon.category}
          </Text>
        </View>

        {/* Progress Bar Section */}
        <View className="flex-col gap-2 mb-8">
          {/* Progress Bar */}
          <CustomSlider
            value={progressPercentage}
            onValueChange={(value) => {
              const newPosition = (value / 100) * duration;
              seekToPosition(newPosition);
            }}
            disabled={isLoading}
          />

          {/* Time Display */}
          <View className="flex-row justify-between">
            <Text className="text-[11px] font-bold tracking-tighter opacity-50 uppercase text-[#1a0f10] dark:text-[#f8f6f6]">
              {formatTime(position)}
            </Text>
            <Text className="text-[11px] font-bold tracking-tighter opacity-50 uppercase text-[#1a0f10] dark:text-[#f8f6f6]">
              {formatTime(duration)}
            </Text>
          </View>
        </View>

        {/* Playback Controls */}
        <View className="flex-col gap-10">
          {/* Main Controls Row */}
          <View className="flex-row items-center justify-between">
            {/* Shuffle Toggle */}
            <Pressable
              onPress={toggleShuffle}
              disabled={isLoading}
              className="active:opacity-70"
            >
              <Shuffle
                size={24}
                color={shuffleEnabled ? '#D4AF37' : '#1a0f10'}
                className={shuffleEnabled ? '' : 'dark:color-[#f8f6f6]'}
              />
            </Pressable>

            {/* Main Controls */}
            <View className="flex-row items-center gap-8">
              {/* Skip Previous */}
              <Pressable
                onPress={skipBackward}
                disabled={isLoading}
                className="active:opacity-70"
              >
                <SkipBack size={36} color="#1a0f10" className="dark:color-[#f8f6f6]" />
              </Pressable>

              {/* Play/Pause Button */}
              <Pressable
                onPress={togglePlayPause}
                disabled={isLoading}
                className="active:scale-105"
                style={{ transform: [{ scale: scaleAnim }] }}
              >
                <Animated.View
                  className="w-20 h-20 bg-[#a22031] rounded-full items-center justify-center"
                  style={{
                    shadowColor: '#a22031',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.39,
                    shadowRadius: 14,
                    elevation: 8,
                  }}
                >
                  {isLoading || isBuffering ? (
                    <ActivityIndicator size="large" color="#FFFFFF" />
                  ) : isPlaying ? (
                    <Pause size={48} color="#FFFFFF" fill="#FFFFFF" />
                  ) : (
                    <View className="ml-1">
                      <Play size={48} color="#FFFFFF" fill="#FFFFFF" />
                    </View>
                  )}
                </Animated.View>
              </Pressable>

              {/* Skip Next */}
              <Pressable
                onPress={skipForward}
                disabled={isLoading}
                className="active:opacity-70"
              >
                <SkipForward size={36} color="#1a0f10" className="dark:color-[#f8f6f6]" />
              </Pressable>
            </View>

            {/* Repeat Toggle */}
            <Pressable
              onPress={toggleRepeat}
              disabled={isLoading}
              className="active:opacity-70"
            >
              <Repeat
                size={24}
                color={repeatEnabled ? '#D4AF37' : '#1a0f10'}
                className={repeatEnabled ? '' : 'opacity-30 dark:opacity-40 dark:color-[#f8f6f6]'}
              />
            </Pressable>
          </View>

          {/* Bottom Utility Row */}
          <View className="flex-row items-center justify-between px-2 pt-4">
            {/* Devices Button */}
            <Pressable className="opacity-60 active:opacity-100">
              <Monitor size={24} color="#1a0f10" className="dark:color-[#f8f6f6]" />
            </Pressable>

            {/* Volume Slider */}
            <View className="flex-1 mx-8 flex-row items-center gap-3">
              <Volume2 size={16} color="#1a0f10" className="opacity-40 dark:color-[#f8f6f6]" />

              <VolumeSlider
                value={volume * 100}
                onValueChange={(value) => adjustVolume(value / 100)}
              />

              <Volume2 size={20} color="#1a0f10" className="opacity-40 dark:color-[#f8f6f6]" />
            </View>

            {/* Queue Button */}
            <Pressable className="opacity-60 active:opacity-100">
              <ListMusic size={24} color="#1a0f10" className="dark:color-[#f8f6f6]" />
            </Pressable>
          </View>
        </View>
      </View>

      {/* iOS Home Indicator */}
      <View className="h-8 flex justify-center items-end pb-2">
        <View className="w-32 h-1 bg-black/10 dark:bg-white/10 rounded-full" />
      </View>
    </View>
  );
}

// Custom Progress Slider Component
interface CustomSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  disabled?: boolean;
}

function CustomSlider({ value, onValueChange, disabled = false }: CustomSliderProps) {
  const [sliderWidth, setSliderWidth] = useState(0);
  const progressAnim = useRef(new Animated.Value(value)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: value,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: () => {},
      onPanResponderMove: (_, gestureState) => {
        if (disabled) return;

        const newValue = Math.max(0, Math.min(100, (gestureState.moveX / sliderWidth) * 100));
        progressAnim.setValue(newValue);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (disabled) return;

        const newValue = Math.max(0, Math.min(100, (gestureState.moveX / sliderWidth) * 100));
        onValueChange(newValue);
      },
    })
  ).current;

  return (
    <View
      className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden relative"
      onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
      {...panResponder.panHandlers}
    >
      {/* Gold Progress with Glow */}
      <Animated.View
        className="absolute top-0 left-0 h-full bg-[#D4AF37] rounded-full"
        style={{
          width: progressAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
          shadowColor: '#D4AF37',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.4,
          shadowRadius: 8,
        }}
      />
    </View>
  );
}

// Custom Volume Slider Component
interface VolumeSliderProps {
  value: number;
  onValueChange: (value: number) => void;
}

function VolumeSlider({ value, onValueChange }: VolumeSliderProps) {
  const [sliderWidth, setSliderWidth] = useState(0);
  const volumeAnim = useRef(new Animated.Value(value)).current;

  useEffect(() => {
    Animated.timing(volumeAnim, {
      toValue: value,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (_, gestureState) => {
        const newValue = Math.max(0, Math.min(100, (gestureState.moveX / sliderWidth) * 100));
        volumeAnim.setValue(newValue);
      },
      onPanResponderRelease: (_, gestureState) => {
        const newValue = Math.max(0, Math.min(100, (gestureState.moveX / sliderWidth) * 100));
        onValueChange(newValue);
      },
    })
  ).current;

  return (
    <View
      className="flex-1 h-1 bg-gray-200 dark:bg-white/10 rounded-full relative"
      onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
      {...panResponder.panHandlers}
    >
      <Animated.View
        className="absolute top-0 left-0 h-full bg-black/20 dark:bg-white/20 rounded-full"
        style={{
          width: volumeAnim.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          }),
        }}
      />
    </View>
  );
}
