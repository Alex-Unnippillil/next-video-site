import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ErrorBoundary } from '@/components/error-boundary';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toast';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Starlight Stream',
    template: '%s | Starlight Stream',
  },
  description:
    'A modern video streaming platform built with Next.js 14, featuring a comprehensive design system and beautiful UI components.',
  keywords: [
    'video',
    'streaming',
    'entertainment',
    'movies',
    'tv shows',
    'next.js',
    'react',
    'tailwind',
  ],
  authors: [{ name: 'Starlight Stream Team' }],
  creator: 'Starlight Stream Team',
  openGraph: {
    title: 'Starlight Stream',
    description: 'A modern video streaming platform built with Next.js 14',
    type: 'website',
    locale: 'en_US',
    url: 'https://starlight-stream.vercel.app',
    siteName: 'Starlight Stream',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Starlight Stream',
    description: 'A modern video streaming platform built with Next.js 14',
    creator: '@starlightstream',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'hsl(0 0% 100%)' },
    { media: '(prefers-color-scheme: dark)', color: 'hsl(222 84% 5%)' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className='min-h-screen bg-background text-foreground antialiased'>
        <ThemeProvider
          config={{
            defaultTheme: 'system',
            enableSystem: true,
            disableTransitionOnChange: false,
            storageKey: 'starlight-theme',
            themes: ['light', 'dark', 'system'],
          }}
        >
          <ErrorBoundary>
            <div className='relative flex min-h-screen flex-col'>
              {children}
            </div>
            <Toaster position='bottom-right' />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
