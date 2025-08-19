import { useState } from 'react';

export default function Purchase() {
  const [loading, setLoading] = useState(false);
  const handlePurchase = async () => {
    setLoading(true);
    await fetch('/api/purchase', { method: 'POST' });
    window.location.href = '/watch';
  };

  return (
    <main>
      <h1>Purchase Ticket</h1>
      <button onClick={handlePurchase} disabled={loading}>
        {loading ? 'Processing...' : 'Buy Ticket'}
      </button>
    </main>
  );
}
