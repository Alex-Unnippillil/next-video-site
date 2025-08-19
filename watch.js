(function () {
  const video = document.getElementById('player');
  if (!video) return;

  const videoId = video.dataset.videoId || 'default';
  const userId = video.dataset.userId || 'guest';
  const storageKey = `videoProgress:${userId}:${videoId}`;

  // Detect private browsing or disabled storage
  let storageAvailable = true;
  try {
    localStorage.setItem('__storage_test__', '1');
    localStorage.removeItem('__storage_test__');
  } catch (e) {
    storageAvailable = false;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const optOut = urlParams.get('private') === '1';

  if (!storageAvailable || optOut) {
    console.warn('Watch position tracking disabled.');
    return;
  }

  // Restore last position
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    const time = parseFloat(saved);
    if (!isNaN(time)) {
      video.currentTime = time;
    }
  }

  // Save position every 10 seconds
  const interval = 10000;
  const saveProgress = () => {
    if (video.paused || video.ended) return;
    localStorage.setItem(storageKey, video.currentTime);
  };
  const handle = setInterval(saveProgress, interval);

  // Cleanup when video ends
  video.addEventListener('ended', () => {
    clearInterval(handle);
    localStorage.removeItem(storageKey);
  });
})();
