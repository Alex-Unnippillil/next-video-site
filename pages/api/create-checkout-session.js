import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method not allowed');
  }

  const { email, product } = req.body;
  const priceIds = {
    free: process.env.FREE_PRICE_ID,
    pro: process.env.PRO_PRICE_ID,
    enterprise: process.env.ENTERPRISE_PRICE_ID,
  };

  const priceId = priceIds[product];
  if (!email || !priceId) {
    return res.status(400).json({ error: 'Invalid email or product' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      metadata: { product },
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${req.headers.origin}/video?email=${encodeURIComponent(email)}`,
      cancel_url: `${req.headers.origin}/subscribe?canceled=1`,
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
