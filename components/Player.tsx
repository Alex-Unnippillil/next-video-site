import React, { useEffect, useRef, useState } from 'react';

type SourceType = 'hls' | 'dash';

export interface SubtitleTrack {
  src: string;
  label: string;
  lang: string;
  default?: boolean;
}

export interface PlayerProps {
  src: string;
  type: SourceType;
  poster?: string;
  subtitles?: SubtitleTrack[];
  className?: string;
}

interface QualityOption {
  label: string;
  value: number; // -1 for auto
}

interface AudioOption {
  label: string;
  index: number;
}

const Player: React.FC<PlayerProps> = ({
  src,
  type,
  poster,
  subtitles = [],
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [qualities, setQualities] = useState<QualityOption[]>([]);
  const [quality, setQuality] = useState<number>(-1);
  const [audioTracks, setAudioTracks] = useState<AudioOption[]>([]);
  const [audioTrack, setAudioTrack] = useState<number>(0);
  const [hls, setHls] = useState<any>(null);
  const [dash, setDash] = useState<any>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hlsInstance: any;
    let dashPlayer: any;

    if (type === 'hls') {
      import('hls.js').then((Hls) => {
        if (Hls.default.isSupported()) {
          hlsInstance = new Hls.default();
          hlsInstance.loadSource(src);
          hlsInstance.attachMedia(video);
          hlsInstance.on(Hls.default.Events.MANIFEST_PARSED, () => {
            const options = hlsInstance.levels.map((l: any, i: number) => ({
              label: `${l.height}p`,
              value: i,
            }));
            setQualities([{ label: 'Auto', value: -1 }, ...options]);
          });
          hlsInstance.on(Hls.default.Events.LEVEL_SWITCHED, (_: any, data: any) => {
            setQuality(data.level);
          });
          setHls(hlsInstance);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = src;
        }
      });
    } else if (type === 'dash') {
      import('dashjs').then((dashjs) => {
        dashPlayer = dashjs.MediaPlayer().create();
        dashPlayer.initialize(video, src, true);
        dashPlayer.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
          const levels = dashPlayer.getBitrateInfoListFor('video');
          const options = levels.map((l: any) => ({
            label: `${l.height}p`,
            value: l.qualityIndex,
          }));
          setQualities([{ label: 'Auto', value: -1 }, ...options]);
        });
        setDash(dashPlayer);
      });
    }

    const handleLoadedMetadata = () => {
      if (video.audioTracks) {
        const tracks = Array.from(video.audioTracks).map((t: any, i: number) => ({
          label: t.label || t.language || `Track ${i + 1}`,
          index: i,
        }));
        setAudioTracks(tracks);
        setAudioTrack(video.audioTracks.selectedIndex ?? 0);
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      if (hlsInstance) hlsInstance.destroy();
      if (dashPlayer) dashPlayer.destroy();
    };
  }, [src, type]);

  const handleQualityChange = (val: number) => {
    setQuality(val);
    if (type === 'hls' && hls) {
      hls.currentLevel = val;
    } else if (type === 'dash' && dash) {
      if (val === -1) {
        dash.setAutoSwitchQualityFor('video', true);
      } else {
        dash.setAutoSwitchQualityFor('video', false);
        dash.setQualityFor('video', val);
      }
    }
  };

  const handleAudioChange = (val: number) => {
    const video = videoRef.current;
    if (video && video.audioTracks) {
      video.audioTracks.selectedIndex = val;
      setAudioTrack(val);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLVideoElement>) => {
    const video = videoRef.current;
    if (!video) return;
    switch (e.key) {
      case ' ': // space
        e.preventDefault();
        video.paused ? video.play() : video.pause();
        break;
      case 'ArrowRight':
        video.currentTime += 5;
        break;
      case 'ArrowLeft':
        video.currentTime -= 5;
        break;
      case 'ArrowUp':
        video.volume = Math.min(1, video.volume + 0.1);
        break;
      case 'ArrowDown':
        video.volume = Math.max(0, video.volume - 0.1);
        break;
      case 'f':
        if (video.requestFullscreen) video.requestFullscreen();
        break;
    }
  };

  return (
    <div className={className}>
      <video
        ref={videoRef}
        poster={poster}
        controls
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {subtitles.map((s, i) => (
          <track
            key={i}
            src={s.src}
            kind="subtitles"
            label={s.label}
            srcLang={s.lang}
            default={s.default}
          />
        ))}
      </video>
      {qualities.length > 0 && (
        <select value={quality} onChange={(e) => handleQualityChange(parseInt(e.target.value))}>
          {qualities.map((q) => (
            <option key={q.value} value={q.value}>
              {q.label}
            </option>
          ))}
        </select>
      )}
      {audioTracks.length > 0 && (
        <select value={audioTrack} onChange={(e) => handleAudioChange(parseInt(e.target.value))}>
          {audioTracks.map((a) => (
            <option key={a.index} value={a.index}>
              {a.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Player;
