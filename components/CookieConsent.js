import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cookieConsent');
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const handleChoice = (accepted) => {
    fetch('/api/consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consent: accepted })
    });
    localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <span>We use cookies for analytics. See our <a href="/privacy" style={{color:'#0af'}}>Privacy Policy</a>.</span>
      <span>
        <button onClick={() => handleChoice(true)}>Accept</button>
        <button onClick={() => handleChoice(false)}>Decline</button>
      </span>
    </div>
  );
}
