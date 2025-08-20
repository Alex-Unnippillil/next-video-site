import Link from 'next/link';

export function Hero() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-100 py-20 sm:py-32'>
      <div className='absolute inset-0 bg-[url("/grid.svg")] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]' />

      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h1 className='text-4xl font-bold tracking-tight text-foreground sm:text-6xl'>
            Stream Your Favorite{' '}
            <span className='text-primary-600'>Entertainment</span>
          </h1>
          <p className='mt-6 text-lg leading-8 text-foreground/70'>
            Discover thousands of movies, TV shows, and documentaries. Watch
            anytime, anywhere on any device. Start your entertainment journey
            with Starlight Stream today.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Link
              href='/signup'
              className='rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors'
            >
              Start Free Trial
            </Link>
            <Link
              href='/browse'
              className='text-sm font-semibold leading-6 text-foreground hover:text-primary-600 transition-colors'
            >
              Browse Content <span aria-hidden='true'>→</span>
            </Link>
          </div>
        </div>

        {/* Hero Image/Video Placeholder */}
        <div className='mt-16 flow-root sm:mt-24'>
          <div className='relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4'>
            <div className='aspect-video rounded-md bg-gradient-to-r from-primary-400 to-secondary-600 shadow-2xl ring-1 ring-gray-900/10 flex items-center justify-center'>
              <div className='text-center text-white'>
                <svg
                  className='mx-auto h-24 w-24 opacity-50'
                  fill='currentColor'
                  viewBox='0 0 84 84'
                >
                  <circle opacity='0.9' cx={42} cy={42} r={42} fill='white' />
                  <path d='M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z' />
                </svg>
                <p className='mt-4 text-sm font-medium'>
                  Your favorite content awaits
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
