import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'fr'] as const;

export const { Link, usePathname, useRouter } = createNavigation({ locales });
