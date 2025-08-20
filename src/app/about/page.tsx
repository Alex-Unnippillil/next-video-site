export default function AboutPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-foreground mb-6'>
        About Starlight Stream
      </h1>
      <div className='prose prose-lg max-w-4xl'>
        <p className='text-foreground/70 mb-4'>
          Starlight Stream is a modern video streaming platform built with
          Next.js 14, featuring AWS Cognito authentication,
          internationalization, and a comprehensive development toolchain.
        </p>
        <p className='text-foreground/70 mb-4'>
          We provide a seamless streaming experience with high-quality content,
          personalized recommendations, and multi-device support.
        </p>
        <p className='text-foreground/70'>
          Join millions of users who trust Starlight Stream for their
          entertainment needs.
        </p>
      </div>
    </div>
  );
}
