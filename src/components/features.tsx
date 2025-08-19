const features = [
  {
    name: 'Unlimited Streaming',
    description:
      'Watch as much as you want, anytime you want. No ads, no interruptions.',
    icon: (
      <svg
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z'
        />
      </svg>
    ),
  },
  {
    name: 'Multiple Devices',
    description:
      'Stream on your TV, laptop, phone, and tablet. Pick up where you left off.',
    icon: (
      <svg
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25'
        />
      </svg>
    ),
  },
  {
    name: '4K Ultra HD',
    description:
      'Enjoy crystal-clear picture quality with 4K Ultra HD and HDR support.',
    icon: (
      <svg
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625a1.125 1.125 0 0 0 1.125-1.125m-1.125 1.125H11.25c-.621 0-1.125-.504-1.125-1.125v-1.5m18.375 0V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m-18.375-2.625V5.625m0 0c0-.621.504-1.125 1.125-1.125m0 0h17.25c.621 0 1.125.504 1.125 1.125M3.375 4.5h7.5c.621 0 1.125.504 1.125 1.125v1.5m-9.75 0V5.625'
        />
      </svg>
    ),
  },
  {
    name: 'Offline Downloads',
    description:
      'Download your favorites to watch offline. Perfect for travel or commuting.',
    icon: (
      <svg
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3'
        />
      </svg>
    ),
  },
  {
    name: 'Family Profiles',
    description:
      'Create up to 5 profiles for your family. Get personalized recommendations.',
    icon: (
      <svg
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z'
        />
      </svg>
    ),
  },
  {
    name: 'Smart Recommendations',
    description:
      'AI-powered suggestions based on your viewing history and preferences.',
    icon: (
      <svg
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z'
        />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section className='py-24 sm:py-32 bg-background'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-base font-semibold leading-7 text-primary-600'>
            Everything you need
          </h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            The ultimate streaming experience
          </p>
          <p className='mt-6 text-lg leading-8 text-foreground/70'>
            From unlimited content to crystal-clear quality, we&apos;ve got
            everything you need for the perfect entertainment experience.
          </p>
        </div>
        <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
          <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
            {features.map(feature => (
              <div key={feature.name} className='flex flex-col'>
                <dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground'>
                  <div className='h-10 w-10 flex items-center justify-center rounded-lg bg-primary-600 text-white'>
                    {feature.icon}
                  </div>
                  {feature.name}
                </dt>
                <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-foreground/70'>
                  <p className='flex-auto'>{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
