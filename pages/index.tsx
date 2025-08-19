import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Welcome to Next Video Site</h1>
      <p>
        <Link href="/purchase">Buy ticket</Link> to watch our video.
      </p>
    </main>
  );
}
