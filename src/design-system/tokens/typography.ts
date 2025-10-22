/**
 * @fileoverview Design System Typography Tokens
 * Centralized typography system for consistent text styling
 */

export const typography = {
  // Font families
  fontFamily: {
    sans: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'sans-serif',
    ],
    mono: [
      'JetBrains Mono',
      'Monaco',
      'Cascadia Code',
      'Segoe UI Mono',
      'Roboto Mono',
      'Oxygen Mono',
      'Ubuntu Monospace',
      'monospace',
    ],
  },

  // Font sizes
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
    '8xl': '6rem',      // 96px
    '9xl': '8rem',      // 128px
  },

  // Font weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Line heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Text sizes with complete definitions
  textStyles: {
    // Display text
    'display-2xl': {
      fontSize: '4.5rem',
      lineHeight: '1',
      fontWeight: '700',
      letterSpacing: '-0.025em',
    },
    'display-xl': {
      fontSize: '3.75rem',
      lineHeight: '1',
      fontWeight: '700',
      letterSpacing: '-0.025em',
    },
    'display-lg': {
      fontSize: '3rem',
      lineHeight: '1',
      fontWeight: '700',
      letterSpacing: '-0.025em',
    },
    'display-md': {
      fontSize: '2.25rem',
      lineHeight: '1.25',
      fontWeight: '700',
      letterSpacing: '-0.025em',
    },
    'display-sm': {
      fontSize: '1.875rem',
      lineHeight: '1.25',
      fontWeight: '600',
      letterSpacing: '-0.025em',
    },
    'display-xs': {
      fontSize: '1.5rem',
      lineHeight: '1.25',
      fontWeight: '600',
      letterSpacing: '0em',
    },

    // Headings
    'heading-xl': {
      fontSize: '1.25rem',
      lineHeight: '1.375',
      fontWeight: '600',
      letterSpacing: '0em',
    },
    'heading-lg': {
      fontSize: '1.125rem',
      lineHeight: '1.375',
      fontWeight: '600',
      letterSpacing: '0em',
    },
    'heading-md': {
      fontSize: '1rem',
      lineHeight: '1.5',
      fontWeight: '600',
      letterSpacing: '0em',
    },
    'heading-sm': {
      fontSize: '0.875rem',
      lineHeight: '1.5',
      fontWeight: '600',
      letterSpacing: '0em',
    },
    'heading-xs': {
      fontSize: '0.75rem',
      lineHeight: '1.5',
      fontWeight: '600',
      letterSpacing: '0.05em',
    },

    // Body text
    'body-xl': {
      fontSize: '1.25rem',
      lineHeight: '1.625',
      fontWeight: '400',
      letterSpacing: '0em',
    },
    'body-lg': {
      fontSize: '1.125rem',
      lineHeight: '1.625',
      fontWeight: '400',
      letterSpacing: '0em',
    },
    'body-md': {
      fontSize: '1rem',
      lineHeight: '1.5',
      fontWeight: '400',
      letterSpacing: '0em',
    },
    'body-sm': {
      fontSize: '0.875rem',
      lineHeight: '1.5',
      fontWeight: '400',
      letterSpacing: '0em',
    },
    'body-xs': {
      fontSize: '0.75rem',
      lineHeight: '1.5',
      fontWeight: '400',
      letterSpacing: '0em',
    },

    // Labels
    'label-xl': {
      fontSize: '1.125rem',
      lineHeight: '1.375',
      fontWeight: '500',
      letterSpacing: '0em',
    },
    'label-lg': {
      fontSize: '1rem',
      lineHeight: '1.5',
      fontWeight: '500',
      letterSpacing: '0em',
    },
    'label-md': {
      fontSize: '0.875rem',
      lineHeight: '1.5',
      fontWeight: '500',
      letterSpacing: '0em',
    },
    'label-sm': {
      fontSize: '0.75rem',
      lineHeight: '1.5',
      fontWeight: '500',
      letterSpacing: '0.05em',
    },
  },
} as const;

export type FontFamily = keyof typeof typography.fontFamily;
export type FontSize = keyof typeof typography.fontSize;
export type FontWeight = keyof typeof typography.fontWeight;
export type LineHeight = keyof typeof typography.lineHeight;
export type LetterSpacing = keyof typeof typography.letterSpacing;
export type TextStyle = keyof typeof typography.textStyles;