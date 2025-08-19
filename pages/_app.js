import '../styles.css';
import CookieConsent from '../components/CookieConsent';
import { useEffect } from 'react';
import { track } from '../lib/analytics';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (localStorage.getItem('cookieConsent') === 'accepted') {
      track('page_view');
    }
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <CookieConsent />
    </>
  );
}
