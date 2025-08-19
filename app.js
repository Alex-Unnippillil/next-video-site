const roleSelect = document.getElementById('role');
const enterBtn = document.getElementById('enter');
const broadcastSection = document.getElementById('broadcast');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const videoSelect = document.getElementById('videoDevices');
const audioSelect = document.getElementById('audioDevices');
const previewEl = document.getElementById('preview');
const statsEl = document.getElementById('stats');
const ingestInput = document.getElementById('ingest');
const streamKeyInput = document.getElementById('streamKey');

let client;
let statInterval;
let currentRole;

async function listDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  videoSelect.innerHTML = '';
  audioSelect.innerHTML = '';
  devices.forEach(d => {
    const option = document.createElement('option');
    option.value = d.deviceId;
    option.text = d.label || d.kind;
    if (d.kind === 'videoinput') videoSelect.appendChild(option);
    if (d.kind === 'audioinput') audioSelect.appendChild(option);
  });
}

enterBtn.addEventListener('click', async () => {
  currentRole = roleSelect.value;
  if (currentRole !== 'Creator') {
    alert('Creator role required to broadcast.');
    return;
  }
  await listDevices();
  broadcastSection.style.display = 'block';
});

startBtn.addEventListener('click', async () => {
  if (currentRole !== 'Creator') {
    alert('Creator role required to broadcast.');
    return;
  }

  client = IVSBroadcastClient.create({
    ingestEndpoint: ingestInput.value,
    streamConfig: IVSBroadcastClient.BASIC_LANDSCAPE,
  });

  const audioStream = await navigator.mediaDevices.getUserMedia({
    audio: {deviceId: audioSelect.value ? {exact: audioSelect.value} : undefined},
    video: false,
  });
  await client.addAudioInputDevice(audioStream, 'mic1');

  const videoStream = await navigator.mediaDevices.getUserMedia({
    video: {deviceId: videoSelect.value ? {exact: videoSelect.value} : undefined},
    audio: false,
  });
  await client.addVideoInputDevice(videoStream, 'camera1', {index: 0});

  client.attachPreview(previewEl);

  await client.startBroadcast(streamKeyInput.value);

  startBtn.disabled = true;
  stopBtn.disabled = false;

  statInterval = setInterval(async () => {
    const stats = await client.getStats();
    if (!stats) return;
    const out = [];
    stats.forEach(report => {
      if (report.type === 'outbound-rtp') {
        out.push({
          kind: report.kind,
          packetsSent: report.packetsSent,
          packetsLost: report.packetsLost,
          bytesSent: report.bytesSent,
        });
      }
    });
    statsEl.textContent = JSON.stringify(out, null, 2);
  }, 1000);
});

stopBtn.addEventListener('click', async () => {
  if (client) {
    await client.stopBroadcast();
    client = null;
  }
  startBtn.disabled = false;
  stopBtn.disabled = true;
  statsEl.textContent = '';
  clearInterval(statInterval);
});
