'use client';

import { useEffect } from 'react';
import { getUserMessage } from '../lib/errors';
import { useErrorLogger } from '../hooks/use-error-logger';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const logError = useErrorLogger();

  useEffect(() => {
    logError(error);
  }, [error, logError]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Something went wrong</h1>
      <p>{getUserMessage(error)}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
