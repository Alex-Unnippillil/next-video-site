import { useEffect, useRef } from 'react';

export default function VideoPlayer({ src, ...props }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current || !src) return;
    if (!src.includes('.m3u8')) {
      // For non-HLS sources just set src normally
      videoRef.current.src = src;
      return;
    }

    let hls;
    async function initPlayer() {
      // Check for native HLS support first
      if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = src;
        return;
      }
      // Dynamically import hls.js for browsers that need it
      const { default: Hls } = await import('hls.js');
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
      }
    }

    initPlayer();

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return <video ref={videoRef} controls {...props} />;
}
