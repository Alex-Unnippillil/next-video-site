// Design Token System for Starlight Stream
export const theme = {
  colors: {
    // Primary brand colors
    primary: {
      50: 'hsl(214, 100%, 97%)',
      100: 'hsl(214, 95%, 93%)',
      200: 'hsl(213, 97%, 87%)',
      300: 'hsl(212, 96%, 78%)',
      400: 'hsl(213, 94%, 68%)',
      500: 'hsl(217, 91%, 60%)', // Main brand color
      600: 'hsl(221, 83%, 53%)',
      700: 'hsl(224, 76%, 48%)',
      800: 'hsl(226, 71%, 40%)',
      900: 'hsl(224, 64%, 33%)',
      950: 'hsl(226, 55%, 21%)',
    },

    // Semantic colors
    success: {
      50: 'hsl(138, 76%, 97%)',
      100: 'hsl(141, 84%, 93%)',
      200: 'hsl(141, 79%, 85%)',
      300: 'hsl(142, 77%, 73%)',
      400: 'hsl(142, 69%, 58%)',
      500: 'hsl(142, 71%, 45%)',
      600: 'hsl(142, 76%, 36%)',
      700: 'hsl(142, 72%, 29%)',
      800: 'hsl(143, 64%, 24%)',
      900: 'hsl(144, 61%, 20%)',
      950: 'hsl(145, 80%, 10%)',
    },

    warning: {
      50: 'hsl(54, 92%, 95%)',
      100: 'hsl(54, 97%, 88%)',
      200: 'hsl(53, 98%, 77%)',
      300: 'hsl(50, 98%, 64%)',
      400: 'hsl(48, 96%, 53%)',
      500: 'hsl(45, 93%, 47%)',
      600: 'hsl(41, 96%, 40%)',
      700: 'hsl(35, 91%, 33%)',
      800: 'hsl(32, 81%, 29%)',
      900: 'hsl(28, 73%, 26%)',
      950: 'hsl(23, 83%, 14%)',
    },

    error: {
      50: 'hsl(0, 86%, 97%)',
      100: 'hsl(0, 93%, 94%)',
      200: 'hsl(0, 96%, 89%)',
      300: 'hsl(0, 94%, 82%)',
      400: 'hsl(0, 91%, 71%)',
      500: 'hsl(0, 84%, 60%)',
      600: 'hsl(0, 72%, 51%)',
      700: 'hsl(0, 74%, 42%)',
      800: 'hsl(0, 70%, 35%)',
      900: 'hsl(0, 63%, 31%)',
      950: 'hsl(0, 75%, 15%)',
    },

    // Neutral grays
    neutral: {
      50: 'hsl(210, 40%, 98%)',
      100: 'hsl(210, 40%, 96%)',
      200: 'hsl(214, 32%, 91%)',
      300: 'hsl(213, 27%, 84%)',
      400: 'hsl(215, 20%, 65%)',
      500: 'hsl(215, 16%, 47%)',
      600: 'hsl(215, 19%, 35%)',
      700: 'hsl(215, 25%, 27%)',
      800: 'hsl(217, 33%, 17%)',
      900: 'hsl(222, 84%, 5%)',
      950: 'hsl(229, 84%, 5%)',
    },

    // Background colors
    background: {
      light: 'hsl(0, 0%, 100%)',
      dark: 'hsl(222, 84%, 5%)',
    },

    // Foreground/text colors
    foreground: {
      light: 'hsl(222, 84%, 5%)',
      dark: 'hsl(210, 40%, 98%)',
    },
  },

  spacing: {
    px: '1px',
    0: '0px',
    0.5: '0.125rem', // 2px
    1: '0.25rem', // 4px
    1.5: '0.375rem', // 6px
    2: '0.5rem', // 8px
    2.5: '0.625rem', // 10px
    3: '0.75rem', // 12px
    3.5: '0.875rem', // 14px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    7: '1.75rem', // 28px
    8: '2rem', // 32px
    9: '2.25rem', // 36px
    10: '2.5rem', // 40px
    11: '2.75rem', // 44px
    12: '3rem', // 48px
    14: '3.5rem', // 56px
    16: '4rem', // 64px
    20: '5rem', // 80px
    24: '6rem', // 96px
    28: '7rem', // 112px
    32: '8rem', // 128px
    36: '9rem', // 144px
    40: '10rem', // 160px
    44: '11rem', // 176px
    48: '12rem', // 192px
    52: '13rem', // 208px
    56: '14rem', // 224px
    60: '15rem', // 240px
    64: '16rem', // 256px
    72: '18rem', // 288px
    80: '20rem', // 320px
    96: '24rem', // 384px
  },

  radius: {
    none: '0px',
    sm: '0.125rem', // 2px
    default: '0.25rem', // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem', // 8px
    xl: '0.75rem', // 12px
    '2xl': '1rem', // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px',
  },

  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
      display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
    },

    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }], // 12px
      sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
      base: ['1rem', { lineHeight: '1.5rem' }], // 16px
      lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
      xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
      '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
      '5xl': ['3rem', { lineHeight: '1' }], // 48px
      '6xl': ['3.75rem', { lineHeight: '1' }], // 60px
      '7xl': ['4.5rem', { lineHeight: '1' }], // 72px
      '8xl': ['6rem', { lineHeight: '1' }], // 96px
      '9xl': ['8rem', { lineHeight: '1' }], // 128px
    },

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

    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },

    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
  },

  // Animation & Transition tokens
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },

    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: '0 0 #0000',
  },
} as const;

// Helper functions for theme token access
export const getThemeToken = (path: string) => {
  return path.split('.').reduce((obj, key) => obj?.[key], theme);
};

// CSS custom properties generator
export const generateCSSCustomProperties = () => {
  const cssVars: Record<string, string> = {};

  // Convert theme tokens to CSS custom properties
  const flatten = (obj: any, prefix = '') => {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      const newKey = prefix ? `${prefix}-${key}` : key;

      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        flatten(value, newKey);
      } else {
        cssVars[`--${newKey}`] = Array.isArray(value) ? value[0] : value;
      }
    });
  };

  flatten(theme);
  return cssVars;
};

export type Theme = typeof theme;
