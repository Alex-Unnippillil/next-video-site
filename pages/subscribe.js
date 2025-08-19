import { useState } from 'react';

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (product) => {
    setLoading(true);
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, product }),
    });
    const data = await res.json();
    if (data.url) {
      window.location = data.url;
    } else {
      alert(data.error || 'Error');
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Choose a plan</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div>
        <button onClick={() => handleSubscribe('free')} disabled={loading}>
          Free
        </button>
        <button onClick={() => handleSubscribe('pro')} disabled={loading}>
          Pro
        </button>
        <button onClick={() => handleSubscribe('enterprise')} disabled={loading}>
          Enterprise
        </button>
      </div>
    </div>
  );
}
