// Internationalization configuration for Starlight Stream
export const defaultLocale = 'en' as const;
export const locales = ['en', 'fr'] as const;

export type Locale = (typeof locales)[number];

// Language-specific metadata content
export const translations = {
  en: {
    site: {
      name: 'Starlight Stream',
      description:
        'A modern video streaming platform built with Next.js 14, featuring a comprehensive design system and beautiful UI components.',
      tagline: 'Stream Your Favorite Entertainment',
    },
    home: {
      title: 'Stream Your Favorite Entertainment',
      description:
        'Discover thousands of movies, TV shows, and documentaries. Watch anytime, anywhere on any device. Start your entertainment journey with Starlight Stream today.',
      hero: {
        title: 'Welcome to the Future of Streaming',
        description:
          'Experience entertainment like never before with our cutting-edge platform.',
      },
    },
    design: {
      title: 'Design System',
      description:
        'Explore our comprehensive design system built with shadcn/ui, Tailwind CSS, and custom theme tokens. See all components, colors, typography, and interactive elements.',
    },
    watch: {
      title: (videoTitle: string) => videoTitle,
      description: (videoTitle: string) =>
        `Watch ${videoTitle} on Starlight Stream. Enjoy high-quality streaming with subtitles and multiple quality options.`,
    },
    navigation: {
      home: 'Home',
      movies: 'Movies',
      series: 'Series',
      design: 'Design',
      about: 'About',
    },
    common: {
      loading: 'Loading...',
      error: 'Something went wrong',
      notFound: 'Page not found',
    },
  },
  fr: {
    site: {
      name: 'Starlight Stream',
      description:
        'Une plateforme de streaming vidéo moderne construite avec Next.js 14, avec un système de design complet et de beaux composants UI.',
      tagline: 'Diffusez Vos Divertissements Préférés',
    },
    home: {
      title: 'Diffusez Vos Divertissements Préférés',
      description:
        "Découvrez des milliers de films, séries TV et documentaires. Regardez à tout moment, n'importe où, sur n'importe quel appareil. Commencez votre voyage de divertissement avec Starlight Stream aujourd'hui.",
      hero: {
        title: 'Bienvenue dans le Futur du Streaming',
        description:
          'Vivez le divertissement comme jamais auparavant avec notre plateforme de pointe.',
      },
    },
    design: {
      title: 'Système de Design',
      description:
        'Explorez notre système de design complet construit avec shadcn/ui, Tailwind CSS et des tokens de thème personnalisés. Voir tous les composants, couleurs, typographie et éléments interactifs.',
    },
    watch: {
      title: (videoTitle: string) => videoTitle,
      description: (videoTitle: string) =>
        `Regardez ${videoTitle} sur Starlight Stream. Profitez du streaming haute qualité avec sous-titres et options de qualité multiples.`,
    },
    navigation: {
      home: 'Accueil',
      movies: 'Films',
      series: 'Séries',
      design: 'Design',
      about: 'À Propos',
    },
    common: {
      loading: 'Chargement...',
      error: "Quelque chose s'est mal passé",
      notFound: 'Page non trouvée',
    },
  },
} as const;

// Helper function to get translation
export function getTranslation(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}

// Helper function to get localized URL
export function getLocalizedUrl(path: string, locale: Locale): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://starlight-stream.vercel.app';

  if (locale === defaultLocale) {
    return `${baseUrl}${path}`;
  }

  return `${baseUrl}/${locale}${path}`;
}

// Helper function to generate hreflang alternates
export function generateHreflangAlternates(path: string) {
  const alternates: Record<string, string> = {};

  locales.forEach(locale => {
    alternates[locale] = getLocalizedUrl(path, locale);
  });

  return alternates;
}

// Generate localized metadata
export function generateLocalizedMetadata(
  locale: Locale,
  page: 'home' | 'design' | 'watch',
  params?: { videoTitle?: string }
) {
  const t = getTranslation(locale);

  let title: string;
  let description: string;
  let url: string;

  switch (page) {
    case 'home':
      title = t.home.title;
      description = t.home.description;
      url = getLocalizedUrl('/', locale);
      break;
    case 'design':
      title = t.design.title;
      description = t.design.description;
      url = getLocalizedUrl('/design', locale);
      break;
    case 'watch':
      const videoTitle = params?.videoTitle || 'Video';
      title = t.watch.title(videoTitle);
      description = t.watch.description(videoTitle);
      url = getLocalizedUrl('/watch', locale);
      break;
    default:
      title = t.site.name;
      description = t.site.description;
      url = getLocalizedUrl('/', locale);
  }

  return {
    title,
    description,
    openGraph: {
      title: `${title} - ${t.site.name}`,
      description,
      url,
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
    },
    twitter: {
      title: `${title} - ${t.site.name}`,
      description,
    },
    alternates: {
      canonical: url,
      languages: generateHreflangAlternates(page === 'home' ? '/' : `/${page}`),
    },
  };
}
