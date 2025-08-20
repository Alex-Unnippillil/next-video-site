import { useEffect, useState } from 'react';

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('/api/recommendations');
        if (res.ok) {
          const data = await res.json();
          setVideos(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchVideos();
  }, []);

  return (
    <div className="container">
      <h1>Recommended Videos</h1>
      <div className="video-player">Video player coming soon...</div>
      <ul className="video-list">
        {Array.isArray(videos) && videos.map((video, idx) => (
          <li key={idx}>
            {typeof video === 'string' ? video : video.title}
          </li>
        ))}
      </ul>
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          font-family: sans-serif;
        }
        .video-player {
          width: 100%;
          height: 360px;
          background: #000;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .video-list {
          list-style: none;
          padding: 0;
        }
        .video-list li {
          padding: 0.5rem 0;
          border-bottom: 1px solid #ddd;
        }
      `}</style>
    </div>
  );
}

