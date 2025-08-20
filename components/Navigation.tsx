import { Link } from '../navigation';
import { useTranslations } from 'next-intl';
import AuthButtons from './AuthButtons';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation() {
  const t = useTranslations('Navigation');
  return (
    <nav>
      <Link href='/'>{t('home')}</Link> |{' '}
      <Link href='/about'>{t('about')}</Link> | <AuthButtons /> |{' '}
      <LanguageSwitcher />
    </nav>
  );
}
