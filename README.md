# next-video-site

This project demonstrates a simple video player with WebVTT caption support.

## Features

- Toggle captions on or off.
- Customize caption font size, text color, and background color.
- Settings persist using `localStorage`.
- CLI tool to validate and upload caption files into `public/captions`.

## Usage

### Validate existing caption

```
npm test
```

### Upload a new caption file

```
npm run upload:caption path/to/file.vtt
```
