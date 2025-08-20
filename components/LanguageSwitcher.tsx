'use client';

import { Link, usePathname } from '../navigation';
import { useLocale, useTranslations } from 'next-intl';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('Language');

  const otherLocale = locale === 'en' ? 'fr' : 'en';

  return (
    <Link href={pathname} locale={otherLocale} prefetch={false}>
      {otherLocale === 'en' ? t('switchToEnglish') : t('switchToFrench')}
    </Link>
  );
}
