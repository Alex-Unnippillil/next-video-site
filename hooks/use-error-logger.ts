'use client';

import { useCallback } from 'react';

function serializeError(error: unknown) {
  if (error instanceof Error) {
    const { name, message, stack } = error;
    return { name, message, stack };
  }
  return { message: String(error) };
}

export function useErrorLogger() {
  return useCallback(async (error: unknown) => {
    try {
      await fetch(process.env.NEXT_PUBLIC_ERROR_LOG_URL ?? '/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: serializeError(error) }),
      });
    } catch {
      // Ignore logging failures
    }
  }, []);
}
