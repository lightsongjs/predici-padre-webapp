# Player Screen Usage Guide

## Overview

The Player Screen (`app/player.tsx`) is a full-screen modal that provides a beautiful, Byzantine-inspired Now Playing interface for sermon audio playback. It features a minimalist design with gold accents and smooth animations.

## Features

### Design Elements
- **Large Album Art**: Square, rounded corners with Byzantine cross icon
- **Sermon Information**: Title (Playfair Display style) and category/speaker
- **Gold Progress Bar**: Custom slider with glow effect (#D4AF37)
- **Time Stamps**: Current position and total duration
- **Playback Controls**:
  - Shuffle toggle (gold when active)
  - Skip backward 15 seconds
  - Large circular play/pause button with shadow
  - Skip forward 15 seconds
  - Repeat toggle (gold when active)
- **Bottom Utility Controls**:
  - Device selector
  - Volume slider with custom implementation
  - Queue/playlist button
- **iOS-style home indicator**

### Technical Features
- Full audio playback using `expo-av`
- Custom slider components (no external dependencies)
- Smooth animations using React Native Animated API
- NativeWind/Tailwind CSS styling
- Route parameter support for sermon data
- Responsive layout with max width constraints

## Navigation

### From any screen:

```typescript
import { useRouter } from 'expo-router';
import { Sermon } from '@/data/data';

const router = useRouter();

const handlePlaySermon = (sermon: Sermon) => {
  router.push({
    pathname: '/player',
    params: {
      sermon: JSON.stringify(sermon),
    },
  });
};
```

### Example: Update Home Screen

To enable navigation from the home screen, update the `handlePlaySermon` function in `app/(tabs)/index.tsx`:

```typescript
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
```

## Component Architecture

### Main Components

1. **PlayerScreen**: Main screen component
   - Manages audio playback state
   - Handles navigation and params
   - Coordinates all UI elements

2. **CustomSlider**: Progress bar component
   - Handles seeking through audio
   - Gold color with glow effect
   - PanResponder for touch interaction

3. **VolumeSlider**: Volume control component
   - Adjusts playback volume
   - Gray color scheme
   - PanResponder for touch interaction

## Audio Playback

### State Management

```typescript
// Playback state
const [isPlaying, setIsPlaying] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const [isBuffering, setIsBuffering] = useState(false);

// Progress tracking
const [position, setPosition] = useState(0);
const [duration, setDuration] = useState(0);

// Controls
const [shuffleEnabled, setShuffleEnabled] = useState(false);
const [repeatEnabled, setRepeatEnabled] = useState(false);
const [volume, setVolume] = useState(0.6);
```

### Audio Functions

- `togglePlayPause()`: Play/pause with animation
- `skipForward()`: Jump 15 seconds ahead
- `skipBackward()`: Jump 15 seconds back
- `seekToPosition(value)`: Seek to specific position
- `adjustVolume(newVolume)`: Change volume (0-1)
- `toggleShuffle()`: Enable/disable shuffle (placeholder)
- `toggleRepeat()`: Enable/disable repeat mode

## Styling

### Color Scheme

```javascript
// From HTML design
primary: '#a22031'      // Burgundy - Play button
accent: '#D4AF37'       // Gold - Progress bar, active icons
background: '#fdfbf7'   // Light mode background
darkBg: '#1a0f10'       // Dark mode background
text: '#1a0f10'         // Light mode text
textDark: '#f8f6f6'     // Dark mode text
```

### Key CSS Classes (NativeWind)

```
bg-[#fdfbf7] dark:bg-[#1a0f10]        // Background
text-[#1a0f10] dark:text-[#f8f6f6]   // Text
bg-[#a22031]                          // Primary button
bg-[#D4AF37]                          // Gold accent
rounded-xl                             // Album art
rounded-full                           // Buttons
```

### Shadow Effects

**Play Button Shadow:**
```javascript
{
  shadowColor: '#a22031',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.39,
  shadowRadius: 14,
  elevation: 8,
}
```

**Gold Progress Glow:**
```javascript
{
  shadowColor: '#D4AF37',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.4,
  shadowRadius: 8,
}
```

## Animations

### Play Button Scale Animation

```typescript
const scaleAnim = useRef(new Animated.Value(1)).current;

// On press
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
```

### Slider Progress Animation

```typescript
const progressAnim = useRef(new Animated.Value(value)).current;

useEffect(() => {
  Animated.timing(progressAnim, {
    toValue: value,
    duration: 100,
    useNativeDriver: false,
  }).start();
}, [value]);
```

## Icons

All icons use Lucide React Native:

```typescript
import {
  ChevronDown,    // Back button
  Share2,         // Share button
  Shuffle,        // Shuffle toggle
  SkipBack,       // Skip backward
  Play,           // Play button
  Pause,          // Pause button
  SkipForward,    // Skip forward
  Repeat,         // Repeat toggle
  Monitor,        // Devices button
  Volume2,        // Volume icons
  ListMusic,      // Queue button
} from 'lucide-react-native';
```

## Responsive Design

- Maximum width: 480px (centered on larger screens)
- Album art: Calculated based on screen width minus padding
- Touch targets: Minimum 44x44 for accessibility
- Safe area insets: Home indicator bar at bottom

## Future Enhancements

### Planned Features
- [ ] Queue management
- [ ] Playlist support
- [ ] Shuffle implementation
- [ ] Device casting (Chromecast, AirPlay)
- [ ] Share functionality
- [ ] Download for offline playback
- [ ] Lyrics/transcript display
- [ ] Sleep timer
- [ ] Playback speed control
- [ ] Background playback with lock screen controls

### Potential Improvements
- [ ] Add background blur effect to album art
- [ ] Implement real album art images
- [ ] Add waveform visualization
- [ ] Gesture controls (swipe down to dismiss)
- [ ] Haptic feedback on interactions
- [ ] Animated icon transitions
- [ ] Crossfade between tracks

## Troubleshooting

### Audio not loading
- Check internet connection
- Verify audio_url in sermon data
- Check console for error messages

### Progress bar not updating
- Ensure `onPlaybackStatusUpdate` is set correctly
- Check if `isSeeking` state is stuck

### Navigation issues
- Verify sermon data is properly JSON stringified
- Check route configuration in `_layout.tsx`

## Dependencies

```json
{
  "expo-av": "^16.0.8",
  "lucide-react-native": "^0.563.0",
  "expo-router": "latest",
  "nativewind": "latest"
}
```

## File Structure

```
app/
├── _layout.tsx           # Route configuration
├── player.tsx            # Player screen (this file)
└── (tabs)/
    └── index.tsx         # Home screen (navigation example)

data/
└── data.ts               # Sermon type definitions

constants/
└── Theme.ts              # Theme colors and styles
```

## Testing

### Manual Testing Checklist
- [ ] Play/pause functionality
- [ ] Progress bar seeking
- [ ] Skip forward/backward
- [ ] Volume adjustment
- [ ] Repeat mode toggle
- [ ] Shuffle mode toggle
- [ ] Navigation back
- [ ] Dark mode support
- [ ] Loading states
- [ ] Error handling

### Example Test Data

```typescript
const testSermon: Sermon = {
  id: "test001",
  title: "Vindecarea Orbului",
  category: "Părintele Teofil Părăian",
  audio_url: "https://example.com/audio.mp3",
  type: "movable",
  duration: "35:20",
  description: "Test sermon description",
  gospelReading: "Luca 18:35-43",
  liturgicalDate: "2026-01-18"
};
```

## Performance Considerations

- Audio instance is properly cleaned up on unmount
- Animations use `useNativeDriver` where possible
- Progress updates are throttled to UI refresh rate
- Slider interactions use PanResponder for smooth gestures

## Accessibility

- All buttons have proper touch targets
- Icons have meaningful colors
- Loading states provide feedback
- Error messages are user-friendly
- Time stamps are always visible

---

**Created**: 2026-01-31
**Version**: 1.0
**Converted from**: `design/2.html`
