# AudioPlayer Component

A professional, production-ready audio player component for the Predicile Părintelui app, designed to stream sermons using expo-av.

## Features

### Core Functionality
- **Play/Pause Control**: Toggle audio playback with visual feedback
- **Skip Controls**: Jump forward/backward 15 seconds
- **Progress Bar**: Visual progress indicator with seek functionality
- **Time Display**: Shows current position and total duration (MM:SS format)
- **Shuffle Button**: Ready for future playlist implementation
- **Volume Control**: Optional volume adjustment (0-100%)

### User Experience
- **Loading States**: Visual feedback while audio loads
- **Buffering Indicator**: Shows when audio is buffering
- **Error Handling**: User-friendly error messages in Romanian
- **Background Playback**: Continues playing when app is in background
- **Silent Mode Support**: Plays audio even when device is in silent mode (iOS)

### Design
- **Byzantine Modern Theme**: Uses the app's color palette
- **Primary Color (#8B1E3F)**: Main background and controls
- **Accent Gold (#D4AF37)**: Progress bar, active states, and highlights
- **Album Art Placeholder**: Byzantine cross icon (ready for Saint images)
- **Responsive Layout**: Adapts to different screen sizes
- **Platform-Specific Shadows**: Native feel on both iOS and Android

### Security
- **No Download Button**: As per requirements, prevents unauthorized sermon downloads
- **Streaming Only**: Audio is streamed from the server, not cached locally

## Installation

The component is ready to use. Dependencies are already installed:
- `expo-av@~16.0.8` - Audio playback
- `lucide-react-native@^0.563.0` - Icons

## Usage

### Basic Usage

```tsx
import AudioPlayer from '@/components/AudioPlayer';
import { Sermon } from '@/data/data';

function MyScreen() {
  const sermon: Sermon = {
    id: 'sermon-001',
    title: 'Învierea Domnului',
    category: 'Predici Duminicale',
    audio_url: 'https://example.com/audio/sermon.mp3',
    type: 'movable',
    pascha_offset: 0,
    duration: '52:15',
  };

  return <AudioPlayer sermon={sermon} />;
}
```

### As a Modal

```tsx
import { Modal, View } from 'react-native';
import AudioPlayer from '@/components/AudioPlayer';

function MyScreen() {
  const [visible, setVisible] = useState(false);
  const [sermon, setSermon] = useState<Sermon | null>(null);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', padding: 20 }}>
        <AudioPlayer sermon={sermon} onClose={() => setVisible(false)} />
      </View>
    </Modal>
  );
}
```

### As a Persistent Bottom Player

See `AudioPlayer.example.tsx` for a complete implementation of a persistent player that can be collapsed/expanded.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `sermon` | `Sermon` | Yes | The sermon object containing audio URL and metadata |
| `onClose` | `() => void` | No | Callback when player should be closed (optional) |

### Sermon Type

```typescript
interface Sermon {
  id: string;
  title: string;
  category: string;
  audio_url: string;  // Direct URL to MP3 file
  type: 'fixed' | 'movable';
  duration?: string;  // e.g., "45:30"
  description?: string;
  // ... other fields
}
```

## Component State

The AudioPlayer manages the following states:

### Playback State
- `isPlaying`: Whether audio is currently playing
- `isLoading`: Initial loading state
- `isBuffering`: Buffering during playback
- `hasError`: Error state for failed loads

### Progress State
- `position`: Current playback position (milliseconds)
- `duration`: Total audio duration (milliseconds)
- `isSeeking`: Whether user is seeking

### Settings State
- `shuffleEnabled`: Shuffle mode for playlists
- `volume`: Volume level (0-1)
- `showVolumeControl`: Whether volume slider is visible

## Controls

### Main Controls

1. **Play/Pause Button** (Center)
   - Large gold circular button
   - Shows play icon when paused
   - Shows pause icon when playing
   - Shows spinner when loading/buffering

2. **Skip Backward** (Left of play)
   - Jumps back 15 seconds
   - Shows "15" label

3. **Skip Forward** (Right of play)
   - Jumps forward 15 seconds
   - Shows "15" label

4. **Shuffle** (Far left)
   - Toggles shuffle mode
   - Gold when active, gray when inactive
   - Prepared for playlist implementation

5. **Volume** (Far right)
   - Toggles volume control slider
   - Slider allows fine-tuning (0-100%)

### Progress Bar
- Visual indicator of playback progress
- Seek by dragging the thumb
- Gold fill shows completed portion
- Dark background shows remaining portion

### Time Display
- **Left**: Current position (MM:SS)
- **Right**: Total duration (MM:SS)

## Styling

The component uses the Byzantine Modern design system from `@/constants/Theme.ts`:

```typescript
// Colors
Theme.colors.primary.main    // #8B1E3F - Deep Burgundy
Theme.colors.accent.main     // #D4AF37 - Antique Gold
Theme.colors.primary.contrast // #FFFFFF - White text

// Spacing
Theme.spacing.lg             // 24px
Theme.spacing.md             // 16px

// Border Radius
Theme.borderRadius.card      // 12px
Theme.borderRadius.round     // 9999px (circular)
```

## Error Handling

The component handles several error scenarios:

1. **Failed to Load Audio**
   - Shows alert: "Nu s-a putut încărca predica. Verificați conexiunea la internet."
   - Displays error message in the player
   - Disables controls

2. **Network Errors**
   - Gracefully handles network interruptions
   - Shows buffering indicator during recovery

3. **Invalid Audio URL**
   - Catches and logs errors
   - Provides user feedback

## Performance Considerations

- **Audio Cleanup**: Automatically unloads audio when component unmounts
- **Memory Management**: Properly releases audio resources
- **Background Playback**: Configured for optimal battery usage
- **Streaming**: No local caching to save storage space

## Accessibility

- **Romanian Labels**: All text in Romanian for target audience
- **Touch Targets**: Minimum 48x48px for easy interaction
- **Visual Feedback**: Clear states for all interactive elements
- **Error Messages**: Clear, user-friendly Romanian messages

## Future Enhancements

The component is designed to support:

1. **Playlist Mode**: Shuffle is already implemented as a toggle
2. **Skip to Next/Previous**: Add buttons for playlist navigation
3. **Playback Speed**: Add 0.5x, 1x, 1.5x, 2x speed options
4. **Sleep Timer**: Auto-stop after X minutes
5. **Album Art**: Replace placeholder with Saint icons
6. **Lyrics/Transcript**: Show synchronized text
7. **Sharing**: Share sermon with others (without download)
8. **Favorites**: Mark sermons as favorites
9. **Offline Mode**: Cache for offline listening (if requirements change)

## Integration with App

### State Management
Consider using React Context or a state management library to:
- Track currently playing sermon across screens
- Persist player state during navigation
- Implement a global persistent player

### Example Context

```typescript
// AudioPlayerContext.tsx
import { createContext, useState, useContext } from 'react';

interface AudioPlayerContextType {
  currentSermon: Sermon | null;
  setCurrentSermon: (sermon: Sermon | null) => void;
  isPlayerVisible: boolean;
  showPlayer: () => void;
  hidePlayer: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export function AudioPlayerProvider({ children }) {
  const [currentSermon, setCurrentSermon] = useState<Sermon | null>(null);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  return (
    <AudioPlayerContext.Provider value={{
      currentSermon,
      setCurrentSermon,
      isPlayerVisible,
      showPlayer: () => setIsPlayerVisible(true),
      hidePlayer: () => setIsPlayerVisible(false),
    }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
  return context;
};
```

## Troubleshooting

### Audio Won't Play
1. Check internet connection
2. Verify `audio_url` is a valid, accessible MP3 URL
3. Check that expo-av permissions are granted

### Buffering Issues
1. Check network speed
2. Consider reducing audio bitrate on server
3. Implement adaptive streaming if needed

### Silent Mode (iOS)
The component is configured to play in silent mode. If it's not working:
1. Check `playsInSilentModeIOS: true` in audio mode setup
2. Verify app permissions

## License

Part of the Predicile Părintelui app. All rights reserved.

## Support

For issues or questions, contact the development team.
