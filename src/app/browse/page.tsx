export default function BrowsePage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-foreground mb-6'>
        Browse Content
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className='bg-background border border-border rounded-lg p-6'>
          <h3 className='text-xl font-semibold text-foreground mb-2'>Movies</h3>
          <p className='text-foreground/70'>
            Discover the latest blockbusters and classic films.
          </p>
        </div>
        <div className='bg-background border border-border rounded-lg p-6'>
          <h3 className='text-xl font-semibold text-foreground mb-2'>
            TV Series
          </h3>
          <p className='text-foreground/70'>
            Binge-watch your favorite shows and discover new series.
          </p>
        </div>
        <div className='bg-background border border-border rounded-lg p-6'>
          <h3 className='text-xl font-semibold text-foreground mb-2'>
            Documentaries
          </h3>
          <p className='text-foreground/70'>
            Explore fascinating documentaries and educational content.
          </p>
        </div>
      </div>
    </div>
  );
}
