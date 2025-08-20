import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='max-w-md w-full text-center'>
        <div className='mb-8'>
          <h1 className='text-6xl font-bold text-primary-600 mb-2'>404</h1>
          <h2 className='text-2xl font-semibold text-foreground mb-4'>
            Page Not Found
          </h2>
          <p className='text-foreground/70 mb-8'>
            The page you are looking for could not be found. It might have been
            moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className='space-y-4'>
          <Link
            href='/'
            className='inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors w-full'
          >
            Go Back Home
          </Link>

          <Link
            href='/browse'
            className='inline-flex items-center justify-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-transparent hover:bg-primary-50 transition-colors w-full'
          >
            Browse Content
          </Link>
        </div>
      </div>
    </div>
  );
}
