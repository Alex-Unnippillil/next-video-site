import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <div className='flex-1'>
        <Hero />
        <Features />
      </div>
      <Footer />
    </>
  );
}
