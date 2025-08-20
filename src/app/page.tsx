import { Metadata } from 'next';
import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  generateHomeMetadata,
  generateOrganizationSchema,
} from '@/lib/metadata';

export const metadata: Metadata = generateHomeMetadata();

export default function HomePage() {
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Header />
      <div className='flex-1'>
        <Hero />
        <Features />
      </div>
      <Footer />
    </>
  );
}
