'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='border-b border-secondary-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link href='/' className='flex items-center space-x-2'>
              <div className='h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center'>
                <svg
                  className='h-5 w-5 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5.291A7.962 7.962 0 0112 21a7.962 7.962 0 01-5-1.709m10 0V15a2 2 0 00-2-2H9a2 2 0 00-2 2v4.291'
                  />
                </svg>
              </div>
              <span className='text-xl font-bold text-foreground'>
                Starlight Stream
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            <Link
              href='/'
              className='text-foreground hover:text-primary-600 transition-colors'
            >
              Home
            </Link>
            <Link
              href='/movies'
              className='text-foreground hover:text-primary-600 transition-colors'
            >
              Movies
            </Link>
            <Link
              href='/series'
              className='text-foreground hover:text-primary-600 transition-colors'
            >
              Series
            </Link>
            <Link
              href='/design'
              className='text-foreground hover:text-primary-600 transition-colors'
            >
              Design
            </Link>
            <Link
              href='/about'
              className='text-foreground hover:text-primary-600 transition-colors'
            >
              About
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className='hidden md:flex items-center space-x-4'>
            <button className='px-4 py-2 text-foreground hover:text-primary-600 transition-colors'>
              Sign In
            </button>
            <button className='px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors'>
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className='block h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              ) : (
                <svg
                  className='block h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className='md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-secondary-200'>
            <Link
              href='/'
              className='block px-3 py-2 text-foreground hover:text-primary-600 transition-colors'
            >
              Home
            </Link>
            <Link
              href='/movies'
              className='block px-3 py-2 text-foreground hover:text-primary-600 transition-colors'
            >
              Movies
            </Link>
            <Link
              href='/series'
              className='block px-3 py-2 text-foreground hover:text-primary-600 transition-colors'
            >
              Series
            </Link>
            <Link
              href='/design'
              className='block px-3 py-2 text-foreground hover:text-primary-600 transition-colors'
            >
              Design
            </Link>
            <Link
              href='/about'
              className='block px-3 py-2 text-foreground hover:text-primary-600 transition-colors'
            >
              About
            </Link>
            <div className='border-t border-secondary-200 pt-4 pb-3'>
              <div className='flex items-center px-3 space-y-2 flex-col'>
                <button className='w-full px-4 py-2 text-foreground hover:text-primary-600 transition-colors'>
                  Sign In
                </button>
                <button className='w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors'>
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
