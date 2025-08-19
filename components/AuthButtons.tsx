'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';

export default function AuthButtons() {
  const t = useTranslations('Auth');
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <button onClick={() => setLoggedIn(!loggedIn)}>
      {loggedIn ? t('logout') : t('login')}
    </button>
  );
}
