import React from 'react';

const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN || '';
const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '';
const redirectUri = process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI || '';

function buildAuthUrl(provider: string): string {
  const base = `${cognitoDomain}/oauth2/authorize`;
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    identity_provider: provider,
  });
  return `${base}?${params.toString()}`;
}

export default function Login() {
  return (
    <main>
      <h1>Sign in</h1>
      <button onClick={() => (window.location.href = buildAuthUrl('Google'))}>
        Sign in with Google
      </button>
      <button onClick={() => (window.location.href = buildAuthUrl('Apple'))}>
        Sign in with Apple
      </button>
    </main>
  );
}
