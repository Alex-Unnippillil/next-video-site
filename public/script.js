const track = document.getElementById('caption-track');
const toggleBtn = document.getElementById('toggle-captions');
const fontSizeInput = document.getElementById('font-size');
const fontColorInput = document.getElementById('font-color');
const bgColorInput = document.getElementById('bg-color');

const styleEl = document.createElement('style');
styleEl.id = 'caption-style';
document.head.appendChild(styleEl);

function saveSettings() {
  const settings = {
    enabled: track.mode === 'showing',
    fontSize: fontSizeInput.value,
    fontColor: fontColorInput.value,
    bgColor: bgColorInput.value
  };
  localStorage.setItem('captionSettings', JSON.stringify(settings));
}

function applyStyle() {
  const fontSize = fontSizeInput.value || 16;
  const fontColor = fontColorInput.value || '#fff';
  const bgColor = bgColorInput.value || '#000';
  styleEl.textContent = `::cue { font-size: ${fontSize}px; color: ${fontColor}; background-color: ${bgColor}; }`;
  saveSettings();
}

function applySettings() {
  const settings = JSON.parse(localStorage.getItem('captionSettings') || '{}');
  if (settings.enabled === false) {
    track.mode = 'hidden';
    toggleBtn.textContent = 'Show Captions';
  } else {
    track.mode = 'showing';
    toggleBtn.textContent = 'Hide Captions';
  }
  if (settings.fontSize) fontSizeInput.value = settings.fontSize;
  if (settings.fontColor) fontColorInput.value = settings.fontColor;
  if (settings.bgColor) bgColorInput.value = settings.bgColor;
  applyStyle();
}

toggleBtn.addEventListener('click', () => {
  track.mode = track.mode === 'showing' ? 'hidden' : 'showing';
  toggleBtn.textContent = track.mode === 'showing' ? 'Hide Captions' : 'Show Captions';
  saveSettings();
});

[fontSizeInput, fontColorInput, bgColorInput].forEach(el => el.addEventListener('change', applyStyle));

applySettings();
