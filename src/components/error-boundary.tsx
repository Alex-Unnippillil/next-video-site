'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);

    // You can also log the error to an error reporting service here
    if (process.env.NODE_ENV === 'production') {
      // Log to external service (e.g., Sentry, LogRocket, etc.)
      console.error('Production error:', { error, errorInfo });
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={this.state.error}
            resetError={this.resetError}
          />
        );
      }

      return (
        <div className='flex min-h-screen items-center justify-center bg-background px-4'>
          <div className='w-full max-w-md text-center'>
            <div className='mb-6'>
              <div className='mx-auto h-16 w-16 rounded-full bg-red-100 p-4'>
                <svg
                  className='h-8 w-8 text-red-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                  />
                </svg>
              </div>
            </div>
            <h1 className='mb-2 text-2xl font-bold text-foreground'>
              Something went wrong
            </h1>
            <p className='mb-6 text-foreground/70'>
              We apologize for the inconvenience. Please try refreshing the page
              or contact support if the problem persists.
            </p>
            <div className='space-y-3'>
              <button
                onClick={this.resetError}
                className='w-full rounded-lg bg-primary-600 px-4 py-2 font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
              >
                Try again
              </button>
              <button
                onClick={() => window.location.reload()}
                className='w-full rounded-lg border border-secondary-300 px-4 py-2 font-medium text-foreground transition-colors hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2'
              >
                Refresh page
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className='mt-6 text-left'>
                <summary className='cursor-pointer text-sm font-medium text-red-600'>
                  Error details (development only)
                </summary>
                <pre className='mt-2 whitespace-pre-wrap rounded bg-red-50 p-3 text-xs text-red-800'>
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
