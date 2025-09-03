import { useEffect, useRef, useState } from 'react';

function usePresignedUrl(videoId) {
  const [url, setUrl] = useState(null);
  const refreshRef = useRef();

  async function fetchUrl() {
    if (!videoId) return;
    try {
      const res = await fetch(`/api/video/${videoId}`);
      if (res.ok) {
        const data = await res.json();
        setUrl(data.url);

        const expiresAt = new Date(data.expiresAt).getTime();
        const refreshIn = expiresAt - Date.now() - 10000; // refresh 10s before
        if (refreshRef.current) clearTimeout(refreshRef.current);
        refreshRef.current = setTimeout(fetchUrl, Math.max(refreshIn, 0));
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUrl();
    return () => {
      if (refreshRef.current) clearTimeout(refreshRef.current);
    };
  }, [videoId]);

  return url;
}

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const videoRef = useRef(null);
  const videoUrl = usePresignedUrl(currentVideo?.id);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('/api/recommendations');
        if (res.ok) {
          const data = await res.json();
          setVideos(data);
          if (data.length > 0) setCurrentVideo(data[0]);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchVideos();
  }, []);

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      const videoEl = videoRef.current;
      const currentTime = videoEl.currentTime;
      const wasPaused = videoEl.paused;
      videoEl.src = videoUrl;
      const handleLoaded = () => {
        videoEl.currentTime = currentTime;
        if (!wasPaused) {
          videoEl.play().catch(() => {});
        }
      };
      videoEl.addEventListener('loadedmetadata', handleLoaded, { once: true });
    }
  }, [videoUrl]);

  return (
    <div className="container">
      <h1>Recommended Videos</h1>
      <div className="video-player">
        {videoUrl ? <video ref={videoRef} controls /> : 'Loading...'}
      </div>
      <ul className="video-list">
        {Array.isArray(videos) &&
          videos.map((video) => (
            <li key={video.id} onClick={() => setCurrentVideo(video)}>
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
      `}</style>
    </div>
  );
}

