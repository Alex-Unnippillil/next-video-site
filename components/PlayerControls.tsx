'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function PlayerControls() {
  const t = useTranslations('Player');
  const [playing, setPlaying] = useState(false);

  return (
    <button onClick={() => setPlaying(!playing)}>
      {playing ? t('pause') : t('play')}
    </button>
  );
}
