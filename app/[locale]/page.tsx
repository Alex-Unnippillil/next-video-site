import {useTranslations} from 'next-intl';
import PlayerControls from '../../components/PlayerControls';

export default function HomePage() {
  const t = useTranslations('Navigation');
  return (
    <main>
      <h1>{t('home')}</h1>
      <PlayerControls />
    </main>
  );
}
