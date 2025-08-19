import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ErrorBoundary } from '@/components/error-boundary';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Starlight Stream',
  description: 'A modern video streaming platform built with Next.js 14',
  keywords: ['video', 'streaming', 'entertainment', 'movies', 'tv shows'],
  authors: [{ name: 'Starlight Stream Team' }],
  openGraph: {
    title: 'Starlight Stream',
    description: 'A modern video streaming platform built with Next.js 14',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Starlight Stream',
    description: 'A modern video streaming platform built with Next.js 14',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={inter.variable}>
      <body className='min-h-screen bg-background text-foreground antialiased'>
        <ErrorBoundary>
          <main className='relative flex min-h-screen flex-col'>
            {children}
          </main>
        </ErrorBoundary>
      </body>
    </html>
  );
}
