import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { Play, Pause, SkipForward, SkipBack, Shuffle, Volume2 } from 'lucide-react-native';
import { Theme } from '@/constants/Theme';
import { Sermon } from '@/data/data';

interface AudioPlayerProps {
  sermon: Sermon;
  onClose?: () => void;
}

export default function AudioPlayer({ sermon, onClose }: AudioPlayerProps) {
  // Audio instance
  const sound = useRef<Audio.Sound | null>(null);

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Progress state
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  // Shuffle state (for future playlist implementation)
  const [shuffleEnabled, setShuffleEnabled] = useState(false);

  // Volume state (0-1)
  const [volume, setVolume] = useState(1.0);
  const [showVolumeControl, setShowVolumeControl] = useState(false);

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
    let mounted = true;

    const loadAudio = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        // Unload previous sound if exists
        if (sound.current) {
          await sound.current.unloadAsync();
          sound.current = null;
        }

        // Create and load new sound
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: sermon.audio_url },
          { shouldPlay: false, volume: volume },
          onPlaybackStatusUpdate
        );

        if (mounted) {
          sound.current = newSound;
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading audio:', error);
        if (mounted) {
          setHasError(true);
          setIsLoading(false);
          Alert.alert(
            'Eroare',
            'Nu s-a putut încărca predica. Verificați conexiunea la internet.',
            [{ text: 'OK' }]
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
  }, [sermon.audio_url]);

  // Playback status update handler
  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      // Error handling for unloaded state
      console.error('Audio not loaded');
      setHasError(true);
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

  // Play/Pause toggle
  const togglePlayPause = async () => {
    if (!sound.current || isLoading) return;

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

  // Toggle shuffle (placeholder for future playlist functionality)
  const toggleShuffle = () => {
    setShuffleEnabled(!shuffleEnabled);
    // TODO: Implement shuffle logic when playlist is available
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

  // Format time (milliseconds to MM:SS)
  const formatTime = (millis: number): string => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      {/* Album Art Placeholder */}
      <View style={styles.albumArtContainer}>
        <View style={styles.albumArt}>
          <Text style={styles.albumArtIcon}>✟</Text>
        </View>
      </View>

      {/* Sermon Title */}
      <Text style={styles.title} numberOfLines={2}>
        {sermon.title}
      </Text>

      {/* Category */}
      <Text style={styles.category}>{sermon.category}</Text>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
        </View>
        <TouchableOpacity
          style={[
            styles.progressThumb,
            { left: `${Math.min(progressPercentage, 100)}%` }
          ]}
          onPressIn={() => setIsSeeking(true)}
          disabled={isLoading || hasError}
        />
      </View>

      {/* Time Display */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      {/* Main Controls */}
      <View style={styles.controlsContainer}>
        {/* Shuffle Button */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={toggleShuffle}
          disabled={isLoading || hasError}
        >
          <Shuffle
            size={24}
            color={shuffleEnabled ? Theme.colors.accent.main : Theme.colors.text.tertiary}
            strokeWidth={2}
          />
        </TouchableOpacity>

        {/* Skip Backward */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={skipBackward}
          disabled={isLoading || hasError}
        >
          <SkipBack
            size={32}
            color={Theme.colors.text.primary}
            strokeWidth={2}
          />
          <Text style={styles.skipLabel}>15</Text>
        </TouchableOpacity>

        {/* Play/Pause Button */}
        <TouchableOpacity
          style={[
            styles.playButton,
            (isLoading || hasError) && styles.playButtonDisabled
          ]}
          onPress={togglePlayPause}
          disabled={isLoading || hasError}
        >
          {isLoading || isBuffering ? (
            <ActivityIndicator size="large" color={Theme.colors.primary.contrast} />
          ) : (
            <>
              {isPlaying ? (
                <Pause size={40} color={Theme.colors.primary.contrast} fill={Theme.colors.primary.contrast} />
              ) : (
                <Play size={40} color={Theme.colors.primary.contrast} fill={Theme.colors.primary.contrast} />
              )}
            </>
          )}
        </TouchableOpacity>

        {/* Skip Forward */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={skipForward}
          disabled={isLoading || hasError}
        >
          <SkipForward
            size={32}
            color={Theme.colors.text.primary}
            strokeWidth={2}
          />
          <Text style={styles.skipLabel}>15</Text>
        </TouchableOpacity>

        {/* Volume Button */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setShowVolumeControl(!showVolumeControl)}
          disabled={isLoading || hasError}
        >
          <Volume2
            size={24}
            color={Theme.colors.text.tertiary}
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>

      {/* Volume Control (Optional) */}
      {showVolumeControl && (
        <View style={styles.volumeContainer}>
          <Text style={styles.volumeLabel}>Volum</Text>
          <View style={styles.volumeSliderContainer}>
            <TouchableOpacity onPress={() => adjustVolume(volume - 0.1)}>
              <Text style={styles.volumeButton}>-</Text>
            </TouchableOpacity>
            <View style={styles.volumeBar}>
              <View style={[styles.volumeFill, { width: `${volume * 100}%` }]} />
            </View>
            <TouchableOpacity onPress={() => adjustVolume(volume + 0.1)}>
              <Text style={styles.volumeButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Error State */}
      {hasError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Nu s-a putut încărca predica. Verificați conexiunea la internet.
          </Text>
        </View>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Theme.colors.accent.main} />
          <Text style={styles.loadingText}>Se încarcă...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.primary.main,
    borderRadius: Theme.borderRadius.card,
    padding: Theme.spacing.lg,
    ...(Platform.OS === 'ios' ? Theme.shadows.ios.lg : {}),
    ...(Platform.OS === 'android' ? { elevation: Theme.shadows.android.lg } : {}),
  },
  albumArtContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  albumArt: {
    width: 200,
    height: 200,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.primary.dark,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Theme.colors.accent.main,
  },
  albumArtIcon: {
    fontSize: 80,
    color: Theme.colors.accent.main,
  },
  title: {
    fontSize: Theme.typography.fontSize.h4,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.primary.contrast,
    textAlign: 'center',
    marginBottom: Theme.spacing.xs,
  },
  category: {
    fontSize: Theme.typography.fontSize.bodySmall,
    color: Theme.colors.accent.light,
    textAlign: 'center',
    marginBottom: Theme.spacing.lg,
  },
  progressContainer: {
    position: 'relative',
    marginBottom: Theme.spacing.sm,
  },
  progressBar: {
    height: 4,
    backgroundColor: Theme.colors.primary.dark,
    borderRadius: Theme.borderRadius.round,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Theme.colors.accent.main,
  },
  progressThumb: {
    position: 'absolute',
    top: -6,
    width: 16,
    height: 16,
    borderRadius: Theme.borderRadius.round,
    backgroundColor: Theme.colors.accent.main,
    marginLeft: -8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: { elevation: 5 },
    }),
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.lg,
  },
  timeText: {
    fontSize: Theme.typography.fontSize.caption,
    color: Theme.colors.primary.contrast,
    fontWeight: Theme.typography.fontWeight.medium,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: Theme.borderRadius.round,
    backgroundColor: Theme.colors.accent.main,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: { elevation: 8 },
    }),
  },
  playButtonDisabled: {
    opacity: 0.5,
  },
  secondaryButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  skipLabel: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.text.primary,
    bottom: 8,
  },
  volumeContainer: {
    marginTop: Theme.spacing.md,
    paddingTop: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.primary.dark,
  },
  volumeLabel: {
    fontSize: Theme.typography.fontSize.bodySmall,
    color: Theme.colors.primary.contrast,
    marginBottom: Theme.spacing.sm,
    textAlign: 'center',
  },
  volumeSliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  volumeButton: {
    fontSize: 24,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.accent.main,
    paddingHorizontal: Theme.spacing.sm,
  },
  volumeBar: {
    flex: 1,
    height: 4,
    backgroundColor: Theme.colors.primary.dark,
    borderRadius: Theme.borderRadius.round,
    overflow: 'hidden',
  },
  volumeFill: {
    height: '100%',
    backgroundColor: Theme.colors.accent.main,
  },
  errorContainer: {
    marginTop: Theme.spacing.md,
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.status.error,
    borderRadius: Theme.borderRadius.sm,
  },
  errorText: {
    color: Theme.colors.text.inverse,
    fontSize: Theme.typography.fontSize.bodySmall,
    textAlign: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 30, 63, 0.95)',
    borderRadius: Theme.borderRadius.card,
  },
  loadingText: {
    marginTop: Theme.spacing.sm,
    color: Theme.colors.primary.contrast,
    fontSize: Theme.typography.fontSize.body,
  },
});
