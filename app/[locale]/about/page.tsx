import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('Navigation');
  return (
    <main>
      <h1>{t('about')}</h1>
      <p>...</p>
    </main>
  );
}
