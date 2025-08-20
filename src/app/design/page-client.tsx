'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/toast';
import { ThemeToggle } from '@/components/theme-provider';
import { theme } from '@/lib/theme';
import { Mail, Search, Star, Heart, Download, Play } from 'lucide-react';

export default function DesignPageClient() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleToastDemo = (
    variant: 'default' | 'success' | 'error' | 'warning' | 'info'
  ) => {
    const messages = {
      default: 'This is a default notification',
      success: 'Your changes have been saved successfully!',
      error: 'Something went wrong. Please try again.',
      warning: 'This action cannot be undone.',
      info: 'New features are now available!',
    };

    toast[variant](messages[variant], {
      description: `This is a ${variant} toast notification with additional context.`,
      action: {
        label: 'View Details',
        onClick: () => console.log(`${variant} action clicked`),
      },
    });
  };

  const handleLoadingDemo = async () => {
    setLoading(true);

    // Simulate API call
    const loadingToast = toast.loading('Processing your request...');

    setTimeout(() => {
      setLoading(false);
      toast.dismiss(loadingToast);
      toast.success('Request completed successfully!');
    }, 3000);
  };

  return (
    <div className='container mx-auto py-10 space-y-12'>
      {/* Header */}
      <div className='text-center space-y-4'>
        <h1 className='text-4xl font-bold gradient-text'>
          Starlight Stream Design System
        </h1>
        <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
          A comprehensive showcase of our design components, built with
          shadcn/ui, Tailwind CSS, and our custom theme system.
        </p>
        <div className='flex justify-center'>
          <ThemeToggle />
        </div>
      </div>

      {/* Color Palette */}
      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold'>Color Palette</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Primary Colors */}
          <div className='space-y-3'>
            <h3 className='font-medium text-lg'>Primary</h3>
            <div className='grid grid-cols-5 gap-2'>
              {Object.entries(theme.colors.primary).map(([shade, color]) => (
                <div key={shade} className='space-y-1'>
                  <div
                    className='h-12 w-full rounded border'
                    style={{ backgroundColor: color }}
                  />
                  <div className='text-xs text-center'>
                    <div className='font-mono'>{shade}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Colors */}
          <div className='space-y-3'>
            <h3 className='font-medium text-lg'>Neutral</h3>
            <div className='grid grid-cols-5 gap-2'>
              {Object.entries(theme.colors.neutral)
                .slice(0, 10)
                .map(([shade, color]) => (
                  <div key={shade} className='space-y-1'>
                    <div
                      className='h-12 w-full rounded border'
                      style={{ backgroundColor: color }}
                    />
                    <div className='text-xs text-center'>
                      <div className='font-mono'>{shade}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Semantic Colors */}
          <div className='space-y-3'>
            <h3 className='font-medium text-lg'>Semantic</h3>
            <div className='space-y-2'>
              <div className='flex items-center space-x-2'>
                <div
                  className='h-8 w-8 rounded'
                  style={{ backgroundColor: theme.colors.success[500] }}
                />
                <span className='text-sm'>Success</span>
              </div>
              <div className='flex items-center space-x-2'>
                <div
                  className='h-8 w-8 rounded'
                  style={{ backgroundColor: theme.colors.warning[500] }}
                />
                <span className='text-sm'>Warning</span>
              </div>
              <div className='flex items-center space-x-2'>
                <div
                  className='h-8 w-8 rounded'
                  style={{ backgroundColor: theme.colors.error[500] }}
                />
                <span className='text-sm'>Error</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold'>Typography</h2>
        <div className='space-y-4'>
          <div className='text-6xl font-bold'>Heading 1</div>
          <div className='text-4xl font-bold'>Heading 2</div>
          <div className='text-2xl font-semibold'>Heading 3</div>
          <div className='text-xl font-medium'>Heading 4</div>
          <div className='text-lg'>Large text</div>
          <div className='text-base'>
            Body text - The quick brown fox jumps over the lazy dog.
          </div>
          <div className='text-sm text-muted-foreground'>
            Small text - Additional information or metadata.
          </div>
          <div className='text-xs text-muted-foreground'>
            Extra small text - Fine print or captions.
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold'>Buttons</h2>

        {/* Variants */}
        <div className='space-y-4'>
          <h3 className='font-medium'>Variants</h3>
          <div className='flex flex-wrap gap-4'>
            <Button variant='default'>Default</Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='outline'>Outline</Button>
            <Button variant='ghost'>Ghost</Button>
            <Button variant='link'>Link</Button>
            <Button variant='destructive'>Destructive</Button>
            <Button variant='gradient'>Gradient</Button>
          </div>
        </div>

        {/* Sizes */}
        <div className='space-y-4'>
          <h3 className='font-medium'>Sizes</h3>
          <div className='flex flex-wrap items-center gap-4'>
            <Button size='sm'>Small</Button>
            <Button size='default'>Default</Button>
            <Button size='lg'>Large</Button>
            <Button size='xl'>Extra Large</Button>
            <Button size='icon'>
              <Heart className='h-4 w-4' />
            </Button>
          </div>
        </div>

        {/* States */}
        <div className='space-y-4'>
          <h3 className='font-medium'>States</h3>
          <div className='flex flex-wrap gap-4'>
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            <Button loading={loading} onClick={handleLoadingDemo}>
              {loading ? 'Loading...' : 'Loading Demo'}
            </Button>
          </div>
        </div>

        {/* With Icons */}
        <div className='space-y-4'>
          <h3 className='font-medium'>With Icons</h3>
          <div className='flex flex-wrap gap-4'>
            <Button>
              <Mail className='mr-2 h-4 w-4' />
              Send Email
            </Button>
            <Button variant='outline'>
              <Download className='mr-2 h-4 w-4' />
              Download
            </Button>
            <Button variant='gradient'>
              <Play className='mr-2 h-4 w-4' />
              Play Now
            </Button>
          </div>
        </div>
      </section>

      {/* Inputs */}
      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold'>Input Fields</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Input
            label='Basic Input'
            placeholder='Enter your text here...'
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />

          <Input
            label='With Helper Text'
            placeholder='username@example.com'
            helperText="We'll never share your email with anyone else."
            type='email'
          />

          <Input
            label='With Start Icon'
            placeholder='Search...'
            startIcon={<Search className='h-4 w-4' />}
          />

          <Input
            label='With End Icon'
            placeholder='Rate this item'
            endIcon={<Star className='h-4 w-4' />}
          />

          <Input
            label='Error State'
            placeholder='Enter password'
            type='password'
            error='Password must be at least 8 characters long'
          />

          <Input
            label='Disabled Input'
            placeholder='This field is disabled'
            disabled
          />
        </div>
      </section>

      {/* Dialog */}
      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold'>Dialog</h2>
        <div className='flex flex-wrap gap-4'>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='outline'>Basic Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Welcome to Starlight Stream</DialogTitle>
                <DialogDescription>
                  This is a basic dialog example. You can use this to display
                  important information or gather user input.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant='outline'>Cancel</Button>
                <Button>Continue</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Confirmation Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant='outline'>Cancel</Button>
                <Button variant='destructive'>Delete Account</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Toast */}
      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold'>Toast Notifications</h2>
        <div className='flex flex-wrap gap-4'>
          <Button variant='outline' onClick={() => handleToastDemo('default')}>
            Default Toast
          </Button>
          <Button variant='outline' onClick={() => handleToastDemo('success')}>
            Success Toast
          </Button>
          <Button variant='outline' onClick={() => handleToastDemo('error')}>
            Error Toast
          </Button>
          <Button variant='outline' onClick={() => handleToastDemo('warning')}>
            Warning Toast
          </Button>
          <Button variant='outline' onClick={() => handleToastDemo('info')}>
            Info Toast
          </Button>
        </div>
      </section>

      {/* Spacing & Layout */}
      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold'>Spacing & Layout</h2>
        <div className='space-y-4'>
          <h3 className='font-medium'>Container Examples</h3>
          <div className='space-y-4'>
            <div className='card p-6'>
              <h4 className='font-medium mb-2'>Card Container</h4>
              <p className='text-muted-foreground'>
                This is a card component with proper padding and border radius.
              </p>
            </div>

            <div className='glass p-6 rounded-lg'>
              <h4 className='font-medium mb-2'>Glass Effect</h4>
              <p className='text-muted-foreground'>
                This container uses the glass effect with backdrop blur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Information */}
      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold'>Theme Information</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='card p-6'>
            <h3 className='font-medium mb-3'>Design Tokens</h3>
            <ul className='text-sm text-muted-foreground space-y-1'>
              <li>
                • {Object.keys(theme.colors.primary).length} Primary shades
              </li>
              <li>• {Object.keys(theme.spacing).length} Spacing units</li>
              <li>
                • {Object.keys(theme.radius).length} Border radius options
              </li>
              <li>
                • {Object.keys(theme.typography.fontSize).length} Font sizes
              </li>
            </ul>
          </div>

          <div className='card p-6'>
            <h3 className='font-medium mb-3'>Features</h3>
            <ul className='text-sm text-muted-foreground space-y-1'>
              <li>• Dark/Light theme support</li>
              <li>• TypeScript definitions</li>
              <li>• Responsive design</li>
              <li>• Accessibility focused</li>
            </ul>
          </div>

          <div className='card p-6'>
            <h3 className='font-medium mb-3'>Technologies</h3>
            <ul className='text-sm text-muted-foreground space-y-1'>
              <li>• Tailwind CSS</li>
              <li>• Radix UI primitives</li>
              <li>• class-variance-authority</li>
              <li>• next-themes</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
