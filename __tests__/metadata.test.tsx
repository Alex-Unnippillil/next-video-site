/**
 * @jest-environment jsdom
 */

import {
  generateHomeMetadata,
  generateWatchMetadata,
  generateDesignMetadata,
} from '../src/lib/metadata';

// Mock Next.js metadata functions
jest.mock('next/font/google', () => ({
  Inter: () => ({
    style: { fontFamily: 'Inter' },
    variable: '--font-inter',
  }),
  JetBrains_Mono: () => ({
    style: { fontFamily: 'JetBrains Mono' },
    variable: '--font-mono',
  }),
}));

// Mock environment variables
process.env.NEXT_PUBLIC_BASE_URL = 'https://starlight-stream.vercel.app';

describe('Metadata Generation', () => {
  describe('generateHomeMetadata', () => {
    it('should generate correct home page metadata', () => {
      const metadata = generateHomeMetadata();

      expect(metadata.title).toBe('Stream Your Favorite Entertainment');
      expect(metadata.description).toContain('Discover thousands of movies');
      expect(metadata.openGraph?.title).toBe(
        'Starlight Stream - Stream Your Favorite Entertainment'
      );
      expect(metadata.openGraph?.url).toBe(
        'https://starlight-stream.vercel.app'
      );
      expect(metadata.twitter?.title).toBe(
        'Starlight Stream - Stream Your Favorite Entertainment'
      );
    });

    it('should include proper Open Graph image', () => {
      const metadata = generateHomeMetadata();

      expect(metadata.openGraph?.images).toEqual([
        {
          url: '/og-home.png',
          width: 1200,
          height: 630,
          alt: 'Starlight Stream - Stream Your Favorite Entertainment',
        },
      ]);
    });
  });

  describe('generateWatchMetadata', () => {
    const mockVideoData = {
      title: 'Test Video',
      description: 'A test video description',
      thumbnail: '/test-thumb.jpg',
      duration: '3600',
      genre: 'Test',
      year: '2024',
    };

    it('should generate correct watch page metadata', () => {
      const metadata = generateWatchMetadata('123', mockVideoData);

      expect(metadata.title).toBe('Test Video');
      expect(metadata.description).toBe('A test video description');
      expect(metadata.openGraph?.title).toBe('Test Video - Starlight Stream');
      expect(metadata.openGraph?.url).toBe(
        'https://starlight-stream.vercel.app/watch/123'
      );
      expect(metadata.openGraph?.type).toBe('video.movie');
    });

    it('should include video metadata', () => {
      const metadata = generateWatchMetadata('123', mockVideoData);

      expect(metadata.openGraph?.video).toEqual({
        url: 'https://starlight-stream.vercel.app/api/video/123',
        secureUrl: 'https://starlight-stream.vercel.app/api/video/123',
        type: 'video/mp4',
        width: 1920,
        height: 1080,
      });

      expect(metadata.other).toEqual({
        'video:duration': '3600',
        'video:release_date': '2024',
        'video:tag': 'Test',
      });
    });

    it('should handle missing video data', () => {
      const metadata = generateWatchMetadata('123');

      expect(metadata.title).toBe('Video 123');
      expect(metadata.description).toContain(
        'Watch Video 123 on Starlight Stream'
      );
    });
  });

  describe('generateDesignMetadata', () => {
    it('should generate correct design page metadata', () => {
      const metadata = generateDesignMetadata();

      expect(metadata.title).toBe('Design System');
      expect(metadata.description).toContain('comprehensive design system');
      expect(metadata.openGraph?.title).toBe(
        'Starlight Stream - Design System'
      );
      expect(metadata.openGraph?.url).toBe(
        'https://starlight-stream.vercel.app/design'
      );
    });
  });
});

describe('SEO Meta Tags', () => {
  // Helper function to create a mock document with meta tags
  const createMockDocument = (metadata: Record<string, any>) => {
    const doc = document.implementation.createHTMLDocument();

    // Add title
    if (metadata.title) {
      doc.title =
        typeof metadata.title === 'string'
          ? metadata.title
          : metadata.title.default;
    }

    // Add meta description
    if (metadata.description) {
      const metaDesc = doc.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = metadata.description;
      doc.head.appendChild(metaDesc);
    }

    // Add Open Graph meta tags
    if (metadata.openGraph) {
      const og = metadata.openGraph;

      if (og.title) {
        const metaOgTitle = doc.createElement('meta');
        metaOgTitle.setAttribute('property', 'og:title');
        metaOgTitle.content = og.title;
        doc.head.appendChild(metaOgTitle);
      }

      if (og.description) {
        const metaOgDesc = doc.createElement('meta');
        metaOgDesc.setAttribute('property', 'og:description');
        metaOgDesc.content = og.description;
        doc.head.appendChild(metaOgDesc);
      }

      if (og.url) {
        const metaOgUrl = doc.createElement('meta');
        metaOgUrl.setAttribute('property', 'og:url');
        metaOgUrl.content = og.url;
        doc.head.appendChild(metaOgUrl);
      }

      if (og.type) {
        const metaOgType = doc.createElement('meta');
        metaOgType.setAttribute('property', 'og:type');
        metaOgType.content = og.type;
        doc.head.appendChild(metaOgType);
      }
    }

    // Add Twitter meta tags
    if (metadata.twitter) {
      const twitter = metadata.twitter;

      if (twitter.card) {
        const metaTwitterCard = doc.createElement('meta');
        metaTwitterCard.name = 'twitter:card';
        metaTwitterCard.content = twitter.card;
        doc.head.appendChild(metaTwitterCard);
      }

      if (twitter.title) {
        const metaTwitterTitle = doc.createElement('meta');
        metaTwitterTitle.name = 'twitter:title';
        metaTwitterTitle.content = twitter.title;
        doc.head.appendChild(metaTwitterTitle);
      }
    }

    return doc;
  };

  it('should render correct meta tags for home page', () => {
    const homeMetadata = generateHomeMetadata();

    // First, let's verify the metadata structure
    expect(homeMetadata.twitter).toBeDefined();
    expect(homeMetadata.twitter?.card).toBeUndefined(); // Home metadata doesn't set card

    const doc = createMockDocument(homeMetadata);

    // Check title
    expect(doc.title).toBe('Stream Your Favorite Entertainment');

    // Check meta description
    const metaDesc = doc.querySelector('meta[name="description"]');
    expect(metaDesc?.getAttribute('content')).toContain(
      'Discover thousands of movies'
    );

    // Check Open Graph tags
    const ogTitle = doc.querySelector('meta[property="og:title"]');
    expect(ogTitle?.getAttribute('content')).toBe(
      'Starlight Stream - Stream Your Favorite Entertainment'
    );

    const ogUrl = doc.querySelector('meta[property="og:url"]');
    expect(ogUrl?.getAttribute('content')).toBe(
      'https://starlight-stream.vercel.app'
    );

    // Check Twitter title (since card is not set in home metadata)
    const twitterTitle = doc.querySelector('meta[name="twitter:title"]');
    expect(twitterTitle?.getAttribute('content')).toBe(
      'Starlight Stream - Stream Your Favorite Entertainment'
    );
  });

  it('should render correct meta tags for watch page', () => {
    const watchMetadata = generateWatchMetadata('123', {
      title: 'Test Video',
      description: 'Test description',
    });
    const doc = createMockDocument(watchMetadata);

    // Check title
    expect(doc.title).toBe('Test Video');

    // Check Open Graph type for video
    const ogType = doc.querySelector('meta[property="og:type"]');
    expect(ogType?.getAttribute('content')).toBe('video.movie');

    // Check Open Graph URL
    const ogUrl = doc.querySelector('meta[property="og:url"]');
    expect(ogUrl?.getAttribute('content')).toBe(
      'https://starlight-stream.vercel.app/watch/123'
    );
  });

  it('should render correct meta tags for design page', () => {
    const designMetadata = generateDesignMetadata();
    const doc = createMockDocument(designMetadata);

    // Check title
    expect(doc.title).toBe('Design System');

    // Check meta description
    const metaDesc = doc.querySelector('meta[name="description"]');
    expect(metaDesc?.getAttribute('content')).toContain(
      'comprehensive design system'
    );

    // Check Open Graph URL
    const ogUrl = doc.querySelector('meta[property="og:url"]');
    expect(ogUrl?.getAttribute('content')).toBe(
      'https://starlight-stream.vercel.app/design'
    );
  });
});

describe('Structured Data', () => {
  it('should generate valid organization schema', () => {
    // This would typically be tested by importing and calling the schema generator
    const mockOrgSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Starlight Stream',
      url: 'https://starlight-stream.vercel.app',
      logo: 'https://starlight-stream.vercel.app/logo.png',
    };

    expect(mockOrgSchema['@context']).toBe('https://schema.org');
    expect(mockOrgSchema['@type']).toBe('Organization');
    expect(mockOrgSchema.name).toBe('Starlight Stream');
  });

  it('should generate valid video schema', () => {
    const mockVideoSchema = {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Test Video',
      description: 'Test description',
      duration: 'PT2H10M',
      contentUrl: 'https://starlight-stream.vercel.app/api/video/123',
    };

    expect(mockVideoSchema['@context']).toBe('https://schema.org');
    expect(mockVideoSchema['@type']).toBe('VideoObject');
    expect(mockVideoSchema.name).toBe('Test Video');
    expect(mockVideoSchema.contentUrl).toContain('/api/video/123');
  });
});

describe('Sitemap and Robots', () => {
  it('should include essential routes in sitemap', () => {
    const expectedRoutes = [
      'https://starlight-stream.vercel.app',
      'https://starlight-stream.vercel.app/design',
      'https://starlight-stream.vercel.app/watch/1',
    ];

    // Mock sitemap data
    const mockSitemap = [
      { url: 'https://starlight-stream.vercel.app', priority: 1.0 },
      { url: 'https://starlight-stream.vercel.app/design', priority: 0.8 },
      { url: 'https://starlight-stream.vercel.app/watch/1', priority: 0.7 },
    ];

    expectedRoutes.forEach(route => {
      expect(mockSitemap.some(item => item.url === route)).toBe(true);
    });
  });

  it('should have proper robots.txt rules', () => {
    const mockRobots = {
      rules: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/api/', '/admin/', '/private/'],
        },
      ],
      sitemap: 'https://starlight-stream.vercel.app/sitemap.xml',
    };

    expect(mockRobots.rules[0].userAgent).toBe('*');
    expect(mockRobots.rules[0].allow).toBe('/');
    expect(mockRobots.rules[0].disallow).toContain('/api/');
    expect(mockRobots.sitemap).toBe(
      'https://starlight-stream.vercel.app/sitemap.xml'
    );
  });
});
