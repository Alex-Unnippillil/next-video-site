import { useEffect, useState } from 'react';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [shareLink, setShareLink] = useState('');

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

  async function handleShare() {
    if (!selectedVideo) return;
    try {
      const res = await fetch(`/api/share?id=${selectedVideo.id}`);
      if (res.ok) {
        const data = await res.json();
        setShareLink(data.link);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container">
      <h1>Recommended Videos</h1>
      <div className="video-player">Video player coming soon...</div>
      {selectedVideo && (
        <div className="video-meta">
          <h2>{selectedVideo.title}</h2>
          <img
            src={selectedVideo.thumbnail}
            alt={`${selectedVideo.title} thumbnail`}
          />
          <p>ID: {selectedVideo.id}</p>
          <button onClick={handleShare}>Generate Share Link</button>
          {shareLink && (
            <p>
              <a href={shareLink}>{shareLink}</a>
            </p>
          )}
        </div>
      )}
      <ul className="video-list">
        {Array.isArray(videos) &&
          videos.map((video, idx) => (
            <li
              key={idx}
              onClick={() => {
                setSelectedVideo(video);
                setShareLink('');
              }}
            >
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
          cursor: pointer;
        }
        .video-meta {
          margin: 1rem 0;
        }
        .video-meta img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
}
