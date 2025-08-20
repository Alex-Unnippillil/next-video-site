'use client';

import { useEffect } from 'react';
import { getUserMessage } from '../../lib/errors';
import { useErrorLogger } from '../../hooks/use-error-logger';

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
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='max-w-md w-full text-center'>
        <div className='mb-8'>
          <div className='w-16 h-16 mx-auto mb-4 text-red-500'>
            <svg
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              className='w-full h-full'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>

          <h1 className='text-3xl font-bold text-foreground mb-4'>
            Something went wrong
          </h1>

          <p className='text-foreground/70 mb-8'>{getUserMessage(error)}</p>
        </div>

        <div className='space-y-4'>
          <button
            onClick={() => reset()}
            className='inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors w-full'
          >
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = '/')}
            className='inline-flex items-center justify-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-transparent hover:bg-primary-50 transition-colors w-full'
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
