/**
 * Byzantine Modern Design System
 *
 * A comprehensive theme inspired by Byzantine iconography and Orthodox tradition,
 * combining rich liturgical colors with modern design principles.
 */

// ============================================================================
// COLOR PALETTE
// ============================================================================

export const Colors = {
  primary: {
    main: '#8B1E3F',        // Deep Burgundy/Red (Vestments) - Headers, Main Buttons
    light: '#A64660',       // Lighter variant for hover states
    dark: '#6B1730',        // Darker variant for pressed states
    contrast: '#FFFFFF',    // Text color on primary backgrounds
  },
  accent: {
    main: '#D4AF37',        // Antique Gold (Halo) - Progress bars, Icons, Highlights
    light: '#E0C563',       // Lighter variant for backgrounds
    dark: '#B8941F',        // Darker variant for emphasis
    contrast: '#4B3621',    // Text color on accent backgrounds
  },
  background: {
    main: '#F0F4F8',        // Pale Blue/Cream - App background
    paper: '#FFFFFF',       // Card/Surface background
    elevated: '#FAFBFC',    // Elevated surface background
    subtle: '#E8EDF2',      // Subtle background for sections
  },
  text: {
    primary: '#4B3621',     // Dark Walnut - All primary text
    secondary: '#6B5844',   // Medium walnut for secondary text
    tertiary: '#8B7D6B',    // Light walnut for tertiary text
    disabled: '#B0A89D',    // Disabled text color
    inverse: '#FFFFFF',     // Text on dark backgrounds
  },
  border: {
    light: '#E0DDD8',       // Light border color
    main: '#C4BEB4',        // Main border color
    dark: '#A39A8D',        // Dark border for emphasis
  },
  status: {
    success: '#4A7C59',     // Success state (muted green)
    warning: '#C87941',     // Warning state (warm orange)
    error: '#A63A50',       // Error state (muted red)
    info: '#5B7C9E',        // Info state (muted blue)
  },
  overlay: {
    light: 'rgba(75, 54, 33, 0.1)',   // Light overlay
    medium: 'rgba(75, 54, 33, 0.3)',  // Medium overlay
    dark: 'rgba(75, 54, 33, 0.6)',    // Dark overlay
  },
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const Typography = {
  fontFamily: {
    serif: {
      // For headers - provides liturgical, traditional feel
      // Fallback to system serif fonts for cross-platform compatibility
      ios: 'Georgia',
      android: 'serif',
      web: 'Georgia, "Times New Roman", Times, serif',
    },
    sansSerif: {
      // For body text - clean, modern readability
      ios: 'System',
      android: 'Roboto',
      web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    monospace: {
      // For code or special formatting
      ios: 'Courier',
      android: 'monospace',
      web: '"Courier New", Courier, monospace',
    },
  },
  fontSize: {
    h1: 32,       // Large page titles
    h2: 28,       // Section headers
    h3: 24,       // Subsection headers
    h4: 20,       // Card titles
    h5: 18,       // Small headers
    h6: 16,       // Minimal headers
    body: 16,     // Standard body text
    bodyLarge: 18,  // Emphasized body text
    bodySmall: 14,  // De-emphasized body text
    caption: 12,    // Small labels and captions
    button: 16,     // Button text
    input: 16,      // Input field text
  },
  lineHeight: {
    h1: 40,       // 1.25x
    h2: 36,       // 1.286x
    h3: 32,       // 1.333x
    h4: 28,       // 1.4x
    h5: 26,       // 1.444x
    h6: 24,       // 1.5x
    body: 24,     // 1.5x
    bodyLarge: 28,  // 1.556x
    bodySmall: 20,  // 1.429x
    caption: 16,    // 1.333x
    button: 24,     // 1.5x
    input: 24,      // 1.5x
  },
  fontWeight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
    widest: 2,
  },
} as const;

// ============================================================================
// SPACING
// ============================================================================

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,

  // Semantic spacing
  screenPadding: 16,      // Standard screen padding
  cardPadding: 16,        // Standard card padding
  sectionGap: 24,         // Gap between sections
  itemGap: 12,            // Gap between list items
  buttonPadding: 16,      // Button internal padding
  iconSpacing: 8,         // Space between icon and text
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const BorderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 9999,  // For circular elements

  // Semantic radius
  button: 8,
  card: 12,
  input: 8,
  chip: 16,
  modal: 16,
} as const;

// ============================================================================
// SHADOWS & ELEVATION
// ============================================================================

export const Shadows = {
  // iOS-style shadows
  ios: {
    none: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.20,
      shadowRadius: 3.84,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 5.84,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.30,
      shadowRadius: 8.30,
    },
  },
  // Android-style elevation
  android: {
    none: 0,
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
  },
} as const;

// CSS box-shadow values for web/NativeWind
export const BoxShadow = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
} as const;

// ============================================================================
// COMPONENT STYLES
// ============================================================================

export const Components = {
  button: {
    height: {
      sm: 32,
      md: 44,
      lg: 52,
    },
    paddingHorizontal: {
      sm: 12,
      md: 16,
      lg: 24,
    },
    borderRadius: BorderRadius.button,
  },
  input: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: BorderRadius.input,
    borderWidth: 1,
  },
  card: {
    borderRadius: BorderRadius.card,
    padding: Spacing.cardPadding,
    backgroundColor: Colors.background.paper,
  },
  chip: {
    height: 32,
    paddingHorizontal: 12,
    borderRadius: BorderRadius.chip,
  },
  iconSize: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
  },
} as const;

// ============================================================================
// THEME OBJECT
// ============================================================================

export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  boxShadow: BoxShadow,
  components: Components,
} as const;

// ============================================================================
// TAILWIND/NATIVEWIND CONFIGURATION HELPER
// ============================================================================

/**
 * Configuration object for Tailwind/NativeWind
 * Use this in your tailwind.config.js
 */
export const TailwindTheme = {
  colors: {
    primary: {
      DEFAULT: Colors.primary.main,
      light: Colors.primary.light,
      dark: Colors.primary.dark,
    },
    accent: {
      DEFAULT: Colors.accent.main,
      light: Colors.accent.light,
      dark: Colors.accent.dark,
    },
    background: {
      DEFAULT: Colors.background.main,
      paper: Colors.background.paper,
      elevated: Colors.background.elevated,
      subtle: Colors.background.subtle,
    },
    text: {
      primary: Colors.text.primary,
      secondary: Colors.text.secondary,
      tertiary: Colors.text.tertiary,
      disabled: Colors.text.disabled,
      inverse: Colors.text.inverse,
    },
    border: {
      light: Colors.border.light,
      DEFAULT: Colors.border.main,
      dark: Colors.border.dark,
    },
    success: Colors.status.success,
    warning: Colors.status.warning,
    error: Colors.status.error,
    info: Colors.status.info,
  },
  fontFamily: {
    serif: [Typography.fontFamily.serif.web],
    sans: [Typography.fontFamily.sansSerif.web],
    mono: [Typography.fontFamily.monospace.web],
  },
  fontSize: {
    'h1': [`${Typography.fontSize.h1}px`, { lineHeight: `${Typography.lineHeight.h1}px` }],
    'h2': [`${Typography.fontSize.h2}px`, { lineHeight: `${Typography.lineHeight.h2}px` }],
    'h3': [`${Typography.fontSize.h3}px`, { lineHeight: `${Typography.lineHeight.h3}px` }],
    'h4': [`${Typography.fontSize.h4}px`, { lineHeight: `${Typography.lineHeight.h4}px` }],
    'h5': [`${Typography.fontSize.h5}px`, { lineHeight: `${Typography.lineHeight.h5}px` }],
    'h6': [`${Typography.fontSize.h6}px`, { lineHeight: `${Typography.lineHeight.h6}px` }],
    'body': [`${Typography.fontSize.body}px`, { lineHeight: `${Typography.lineHeight.body}px` }],
    'body-lg': [`${Typography.fontSize.bodyLarge}px`, { lineHeight: `${Typography.lineHeight.bodyLarge}px` }],
    'body-sm': [`${Typography.fontSize.bodySmall}px`, { lineHeight: `${Typography.lineHeight.bodySmall}px` }],
    'caption': [`${Typography.fontSize.caption}px`, { lineHeight: `${Typography.lineHeight.caption}px` }],
  },
  spacing: {
    'xs': `${Spacing.xs}px`,
    'sm': `${Spacing.sm}px`,
    'md': `${Spacing.md}px`,
    'lg': `${Spacing.lg}px`,
    'xl': `${Spacing.xl}px`,
    'xxl': `${Spacing.xxl}px`,
    'xxxl': `${Spacing.xxxl}px`,
  },
  borderRadius: {
    'none': `${BorderRadius.none}px`,
    'xs': `${BorderRadius.xs}px`,
    'sm': `${BorderRadius.sm}px`,
    'md': `${BorderRadius.md}px`,
    'lg': `${BorderRadius.lg}px`,
    'xl': `${BorderRadius.xl}px`,
    'xxl': `${BorderRadius.xxl}px`,
    'full': '9999px',
  },
  boxShadow: BoxShadow,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type ColorPalette = typeof Colors;
export type TypographySystem = typeof Typography;
export type SpacingSystem = typeof Spacing;
export type BorderRadiusSystem = typeof BorderRadius;
export type ShadowSystem = typeof Shadows;
export type ThemeType = typeof Theme;

export default Theme;
