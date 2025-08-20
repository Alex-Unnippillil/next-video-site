import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateWatchMetadata, generateVideoSchema } from '@/lib/metadata';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import {
  Play,
  Heart,
  Share2,
  Download,
  Volume2,
  Settings,
  Maximize,
} from 'lucide-react';

// Mock video data - in a real app, this would come from a database
const mockVideoData = {
  '1': {
    title: 'The Adventure Begins',
    description:
      'Join our heroes as they embark on an epic journey through mystical lands filled with wonder and danger.',
    thumbnail: '/videos/adventure-begins-thumb.jpg',
    duration: '7800', // 2 hours 10 minutes in seconds
    genre: 'Adventure',
    year: '2024',
    videoUrl: '/videos/adventure-begins.mp4',
    uploadDate: '2024-01-15T10:00:00Z',
    views: 1250000,
    likes: 89500,
  },
  '2': {
    title: 'Cosmic Mysteries',
    description:
      'Explore the deepest secrets of the universe in this mind-bending documentary about space and time.',
    thumbnail: '/videos/cosmic-mysteries-thumb.jpg',
    duration: '5400', // 1.5 hours in seconds
    genre: 'Documentary',
    year: '2024',
    videoUrl: '/videos/cosmic-mysteries.mp4',
    uploadDate: '2024-02-01T14:30:00Z',
    views: 850000,
    likes: 67200,
  },
  '3': {
    title: 'Comedy Gold',
    description:
      'Laugh until your sides hurt with this collection of the funniest moments from our favorite comedians.',
    thumbnail: '/videos/comedy-gold-thumb.jpg',
    duration: '3600', // 1 hour in seconds
    genre: 'Comedy',
    year: '2024',
    videoUrl: '/videos/comedy-gold.mp4',
    uploadDate: '2024-02-15T18:00:00Z',
    views: 2100000,
    likes: 156000,
  },
  '4': {
    title: "Nature's Wonders",
    description:
      "Breathtaking footage of Earth's most beautiful landscapes and the incredible wildlife that calls them home.",
    thumbnail: '/videos/nature-wonders-thumb.jpg',
    duration: '4500', // 1.25 hours in seconds
    genre: 'Nature',
    year: '2024',
    videoUrl: '/videos/nature-wonders.mp4',
    uploadDate: '2024-03-01T12:00:00Z',
    views: 950000,
    likes: 78900,
  },
  '5': {
    title: 'Tech Revolution',
    description:
      'Discover how cutting-edge technology is reshaping our world and what the future holds for humanity.',
    thumbnail: '/videos/tech-revolution-thumb.jpg',
    duration: '6300', // 1.75 hours in seconds
    genre: 'Technology',
    year: '2024',
    videoUrl: '/videos/tech-revolution.mp4',
    uploadDate: '2024-03-15T16:45:00Z',
    views: 1800000,
    likes: 142000,
  },
};

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const videoData = mockVideoData[params.id as keyof typeof mockVideoData];

  if (!videoData) {
    return {
      title: 'Video Not Found',
      description: 'The requested video could not be found.',
    };
  }

  return generateWatchMetadata(params.id, videoData);
}

// Format duration from seconds to readable format
function formatDuration(seconds: string): string {
  const totalSeconds = parseInt(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

// Format number with commas
function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export default function WatchPage({ params }: Props) {
  const videoData = mockVideoData[params.id as keyof typeof mockVideoData];

  if (!videoData) {
    notFound();
  }

  const videoSchema = generateVideoSchema(params.id, videoData);

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoSchema),
        }}
      />

      <Header />

      <main className='flex-1'>
        {/* Video Player Section */}
        <div className='bg-black'>
          <div className='container mx-auto'>
            <div className='relative aspect-video bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden'>
              {/* Video Player Placeholder */}
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='text-center text-white'>
                  <div className='w-24 h-24 mx-auto mb-4 bg-primary-600 rounded-full flex items-center justify-center'>
                    <Play className='w-10 h-10 text-white ml-1' />
                  </div>
                  <h3 className='text-xl font-semibold mb-2'>Video Player</h3>
                  <p className='text-gray-300'>
                    Click to play &ldquo;{videoData.title}&rdquo;
                  </p>
                </div>
              </div>

              {/* Video Controls Overlay */}
              <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <Button
                      size='icon'
                      variant='ghost'
                      className='text-white hover:bg-white/20'
                    >
                      <Play className='w-5 h-5' />
                    </Button>
                    <Button
                      size='icon'
                      variant='ghost'
                      className='text-white hover:bg-white/20'
                    >
                      <Volume2 className='w-5 h-5' />
                    </Button>
                    <span className='text-white text-sm'>
                      0:00 / {formatDuration(videoData.duration)}
                    </span>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Button
                      size='icon'
                      variant='ghost'
                      className='text-white hover:bg-white/20'
                    >
                      <Settings className='w-5 h-5' />
                    </Button>
                    <Button
                      size='icon'
                      variant='ghost'
                      className='text-white hover:bg-white/20'
                    >
                      <Maximize className='w-5 h-5' />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info Section */}
        <div className='container mx-auto py-8'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Main Content */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Video Title and Stats */}
              <div>
                <h1 className='text-3xl font-bold mb-4'>{videoData.title}</h1>

                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center space-x-6 text-sm text-muted-foreground'>
                    <span>{formatNumber(videoData.views)} views</span>
                    <span>{videoData.year}</span>
                    <span className='px-2 py-1 bg-secondary rounded-full text-xs'>
                      {videoData.genre}
                    </span>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <Button variant='outline' size='sm'>
                      <Heart className='w-4 h-4 mr-2' />
                      {formatNumber(videoData.likes)}
                    </Button>
                    <Button variant='outline' size='sm'>
                      <Share2 className='w-4 h-4 mr-2' />
                      Share
                    </Button>
                    <Button variant='outline' size='sm'>
                      <Download className='w-4 h-4 mr-2' />
                      Download
                    </Button>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className='bg-secondary/50 rounded-lg p-6'>
                <h2 className='text-lg font-semibold mb-3'>About this video</h2>
                <p className='text-muted-foreground leading-relaxed'>
                  {videoData.description}
                </p>

                <div className='mt-4 pt-4 border-t border-border'>
                  <div className='grid grid-cols-2 gap-4 text-sm'>
                    <div>
                      <span className='text-muted-foreground'>Duration:</span>
                      <span className='ml-2 font-medium'>
                        {formatDuration(videoData.duration)}
                      </span>
                    </div>
                    <div>
                      <span className='text-muted-foreground'>
                        Release Year:
                      </span>
                      <span className='ml-2 font-medium'>{videoData.year}</span>
                    </div>
                    <div>
                      <span className='text-muted-foreground'>Genre:</span>
                      <span className='ml-2 font-medium'>
                        {videoData.genre}
                      </span>
                    </div>
                    <div>
                      <span className='text-muted-foreground'>Views:</span>
                      <span className='ml-2 font-medium'>
                        {formatNumber(videoData.views)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className='space-y-6'>
              {/* Related Videos */}
              <div>
                <h3 className='text-lg font-semibold mb-4'>Related Videos</h3>
                <div className='space-y-4'>
                  {Object.entries(mockVideoData)
                    .filter(([id]) => id !== params.id)
                    .slice(0, 3)
                    .map(([id, video]) => (
                      <div
                        key={id}
                        className='flex space-x-3 group cursor-pointer'
                      >
                        <div className='w-32 h-20 bg-secondary rounded-lg flex-shrink-0 overflow-hidden'>
                          <div className='w-full h-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center'>
                            <Play className='w-6 h-6 text-primary' />
                          </div>
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h4 className='font-medium text-sm group-hover:text-primary transition-colors line-clamp-2'>
                            {video.title}
                          </h4>
                          <div className='mt-1 text-xs text-muted-foreground'>
                            <div>{formatNumber(video.views)} views</div>
                            <div>{formatDuration(video.duration)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className='bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-6'>
                <h3 className='font-semibold mb-2'>Enjoying our content?</h3>
                <p className='text-sm text-muted-foreground mb-4'>
                  Subscribe to get notified when we upload new videos!
                </p>
                <Button className='w-full'>Subscribe Now</Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
