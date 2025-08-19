class UploadClient {
  constructor(file, options = {}) {
    this.file = file;
    this.chunkSize = options.chunkSize || 5 * 1024 * 1024; // 5MB
    this.sessionId = null;
    this.partNumber = 1;
    this.parts = [];
    this.paused = false;
    this.controller = null;
  }

  async start(onProgress) {
    const res = await fetch('/upload/initiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: this.file.name,
        fileType: this.file.type,
        fileSize: this.file.size
      })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    this.sessionId = data.sessionId;
    await this.uploadParts(onProgress);
  }

  async uploadParts(onProgress) {
    while ((this.partNumber - 1) * this.chunkSize < this.file.size) {
      if (this.paused) return;
      const start = (this.partNumber - 1) * this.chunkSize;
      const end = Math.min(start + this.chunkSize, this.file.size);
      const blob = this.file.slice(start, end);
      const urlRes = await fetch(`/upload/url?sessionId=${this.sessionId}&partNumber=${this.partNumber}`);
      const { url } = await urlRes.json();
      this.controller = new AbortController();
      const uploadRes = await fetch(url, {
        method: 'PUT',
        body: blob,
        signal: this.controller.signal
      });
      const etag = uploadRes.headers.get('etag');
      this.parts.push({ ETag: etag && etag.replace(/"/g, ''), PartNumber: this.partNumber });
      if (onProgress) {
        onProgress(end / this.file.size);
      }
      this.partNumber++;
    }
    await fetch('/upload/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: this.sessionId, parts: this.parts })
    });
  }

  pause() {
    this.paused = true;
    if (this.controller) {
      this.controller.abort();
    }
  }

  resume(onProgress) {
    if (!this.paused) return;
    this.paused = false;
    return this.uploadParts(onProgress);
  }

  async abort() {
    this.paused = true;
    if (this.controller) {
      this.controller.abort();
    }
    if (this.sessionId) {
      await fetch('/upload/abort', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: this.sessionId })
      });
    }
  }
}

module.exports = UploadClient;
