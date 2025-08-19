# Next Video Site

This project provides a reusable video `Player` component built on top of **hls.js** and **dash.js**. The player offers:

- Automatic switching between HLS and DASH sources
- Quality selector
- Subtitle tracks
- Audio track selection
- Keyboard shortcuts (space: play/pause, arrow keys: seek/volume, `f`: fullscreen)
- SSR-safe dynamic import for Next.js

## Usage

```tsx
import Player from './components';

<Player
  src="/path/to/manifest.m3u8"
  type="hls"
  subtitles={[{ src: '/subs/en.vtt', label: 'English', lang: 'en', default: true }]}
/>
```
