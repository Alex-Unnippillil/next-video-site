'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

// Theme configuration
export interface ThemeConfig {
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  storageKey?: string;
  themes?: string[];
}

const defaultConfig: ThemeConfig = {
  defaultTheme: 'system',
  enableSystem: true,
  disableTransitionOnChange: true,
  storageKey: 'starlight-theme',
  themes: ['light', 'dark', 'system'],
};

// Create a context for theme configuration
const ThemeConfigContext = createContext<ThemeConfig>(defaultConfig);

interface CustomThemeProviderProps
  extends Omit<ThemeProviderProps, 'children'> {
  children: React.ReactNode;
  config?: Partial<ThemeConfig>;
}

/**
 * Enhanced Theme Provider with configuration support
 */
export function ThemeProvider({
  children,
  config = {},
  ...props
}: CustomThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const mergedConfig = { ...defaultConfig, ...config };

  // Ensure we're on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeConfigContext.Provider value={mergedConfig}>
      <NextThemesProvider
        attribute='class'
        defaultTheme={mergedConfig.defaultTheme}
        enableSystem={mergedConfig.enableSystem}
        disableTransitionOnChange={mergedConfig.disableTransitionOnChange}
        storageKey={mergedConfig.storageKey}
        themes={mergedConfig.themes}
        {...props}
      >
        {children}
      </NextThemesProvider>
    </ThemeConfigContext.Provider>
  );
}

/**
 * Hook to use theme configuration
 */
export const useThemeConfig = () => {
  const context = useContext(ThemeConfigContext);
  if (!context) {
    throw new Error('useThemeConfig must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Theme Toggle Component
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className={`p-2 rounded-md border border-neutral-200 dark:border-neutral-700 ${className}`}
        disabled
      >
        <div className='w-4 h-4 bg-neutral-300 dark:bg-neutral-600 rounded animate-pulse' />
      </button>
    );
  }

  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        inline-flex items-center justify-center rounded-md text-sm font-medium 
        transition-colors focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 
        disabled:pointer-events-none ring-offset-background
        h-10 px-4 py-2 border border-neutral-200 bg-transparent 
        hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800
        ${className}
      `}
      aria-label='Toggle theme'
    >
      {resolvedTheme === 'dark' ? (
        <SunIcon className='h-4 w-4' />
      ) : (
        <MoonIcon className='h-4 w-4' />
      )}
      <span className='sr-only'>
        Switch to {resolvedTheme === 'dark' ? 'light' : 'dark'} mode
      </span>
    </button>
  );
}

// Re-export useTheme for convenience
export { useTheme } from 'next-themes';

// Simple icons (can be replaced with lucide-react or other icon library)
function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill='none'
      height='24'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 24 24'
      width='24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='12' cy='12' r='5' />
      <path d='M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4' />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill='none'
      height='24'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 24 24'
      width='24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
    </svg>
  );
}
