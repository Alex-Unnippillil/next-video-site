import { useEffect, useState } from 'react';

export default function Home() {
  const [clips, setClips] = useState([]);

  useEffect(() => {
    async function fetchClips() {
      try {
        const res = await fetch('/api/clips', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setClips(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchClips();
  }, []);

  return (
    <div className="container">
      <h1>Clips</h1>
      <div className="clip-grid">
        {Array.isArray(clips) &&
          clips.map((clip) => (
            <div key={clip.id} className="clip-item">
              <video
                controls
                poster={clip.poster}
                src={clip.src}
              />
            </div>
          ))}
      </div>
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: sans-serif;
        }
        .clip-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
        }
        .clip-item video {
          width: 100%;
          height: auto;
          display: block;
        }
      `}</style>
    </div>
  );
}

