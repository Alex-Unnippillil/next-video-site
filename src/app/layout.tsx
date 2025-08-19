import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ErrorBoundary } from '@/components/error-boundary';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toast';
import { defaultMetadata } from '@/lib/metadata';
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

export const metadata: Metadata = defaultMetadata;

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
