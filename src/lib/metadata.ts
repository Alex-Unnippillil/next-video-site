import { Metadata } from 'next';

// Base configuration
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://starlight-stream.vercel.app';
const siteName = 'Starlight Stream';
const defaultDescription =
  'A modern video streaming platform built with Next.js 14, featuring a comprehensive design system and beautiful UI components.';

// Default metadata configuration
export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    'video streaming',
    'entertainment',
    'movies',
    'tv shows',
    'next.js',
    'react',
    'tailwind css',
    'streaming platform',
    'video content',
    'media player',
  ],
  authors: [{ name: 'Starlight Stream Team' }],
  creator: 'Starlight Stream Team',
  publisher: 'Starlight Stream',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: siteName,
    description: defaultDescription,
    siteName,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${siteName} - Modern Video Streaming Platform`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: defaultDescription,
    creator: '@starlightstream',
    images: ['/twitter-image.png'],
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
  alternates: {
    canonical: baseUrl,
    languages: {
      'en-US': '/en',
      'fr-FR': '/fr',
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
    yandex: process.env.YANDEX_VERIFICATION_CODE,
    yahoo: process.env.YAHOO_VERIFICATION_CODE,
  },
};

// Generate metadata for home page
export function generateHomeMetadata(): Metadata {
  return {
    title: 'Stream Your Favorite Entertainment',
    description:
      'Discover thousands of movies, TV shows, and documentaries. Watch anytime, anywhere on any device. Start your entertainment journey with Starlight Stream today.',
    openGraph: {
      title: 'Starlight Stream - Stream Your Favorite Entertainment',
      description:
        'Discover thousands of movies, TV shows, and documentaries. Watch anytime, anywhere on any device.',
      url: baseUrl,
      images: [
        {
          url: '/og-home.png',
          width: 1200,
          height: 630,
          alt: 'Starlight Stream - Stream Your Favorite Entertainment',
        },
      ],
    },
    twitter: {
      title: 'Starlight Stream - Stream Your Favorite Entertainment',
      description:
        'Discover thousands of movies, TV shows, and documentaries. Watch anytime, anywhere on any device.',
      images: ['/twitter-home.png'],
    },
  };
}

// Generate metadata for watch pages
export function generateWatchMetadata(
  videoId: string,
  videoData?: {
    title?: string;
    description?: string;
    thumbnail?: string;
    duration?: string;
    genre?: string;
    year?: string;
  }
): Metadata {
  const title = videoData?.title || `Video ${videoId}`;
  const description =
    videoData?.description ||
    `Watch ${title} on Starlight Stream. Enjoy high-quality streaming with subtitles and multiple quality options.`;
  const ogImage = videoData?.thumbnail || '/og-watch.png';

  return {
    title,
    description,
    openGraph: {
      title: `${title} - Starlight Stream`,
      description,
      url: `${baseUrl}/watch/${videoId}`,
      type: 'video.movie',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      video: {
        url: `${baseUrl}/api/video/${videoId}`,
        secureUrl: `${baseUrl}/api/video/${videoId}`,
        type: 'video/mp4',
        width: 1920,
        height: 1080,
      },
    },
    twitter: {
      title: `${title} - Starlight Stream`,
      description,
      images: [ogImage],
      player: {
        url: `${baseUrl}/embed/${videoId}`,
        width: 1920,
        height: 1080,
      },
    },
    other: {
      'video:duration': videoData?.duration || '120',
      'video:release_date':
        videoData?.year || new Date().getFullYear().toString(),
      'video:tag': videoData?.genre || 'Entertainment',
    },
  };
}

// Generate metadata for design system page
export function generateDesignMetadata(): Metadata {
  return {
    title: 'Design System',
    description:
      'Explore our comprehensive design system built with shadcn/ui, Tailwind CSS, and custom theme tokens. See all components, colors, typography, and interactive elements.',
    openGraph: {
      title: 'Starlight Stream - Design System',
      description:
        'Explore our comprehensive design system built with shadcn/ui and Tailwind CSS.',
      url: `${baseUrl}/design`,
      images: [
        {
          url: '/og-design.png',
          width: 1200,
          height: 630,
          alt: 'Starlight Stream Design System',
        },
      ],
    },
    twitter: {
      title: 'Starlight Stream - Design System',
      description:
        'Explore our comprehensive design system built with shadcn/ui and Tailwind CSS.',
      images: ['/twitter-design.png'],
    },
  };
}

// Utility to merge metadata
export function mergeMetadata(
  base: Metadata,
  override: Partial<Metadata>
): Metadata {
  return {
    ...base,
    ...override,
    openGraph: {
      ...base.openGraph,
      ...override.openGraph,
    },
    twitter: {
      ...base.twitter,
      ...override.twitter,
    },
  };
}

// JSON-LD structured data generators
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: defaultDescription,
    sameAs: [
      'https://twitter.com/starlightstream',
      'https://facebook.com/starlightstream',
      'https://instagram.com/starlightstream',
    ],
  };
}

export function generateVideoSchema(
  videoId: string,
  videoData?: {
    title?: string;
    description?: string;
    thumbnail?: string;
    duration?: string;
    uploadDate?: string;
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: videoData?.title || `Video ${videoId}`,
    description: videoData?.description || 'High-quality video content',
    thumbnailUrl: videoData?.thumbnail || '/default-thumbnail.png',
    uploadDate: videoData?.uploadDate || new Date().toISOString(),
    duration: videoData?.duration || 'PT2M',
    contentUrl: `${baseUrl}/api/video/${videoId}`,
    embedUrl: `${baseUrl}/embed/${videoId}`,
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
  };
}
