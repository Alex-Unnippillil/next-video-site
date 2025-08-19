import sqlite3 from 'sqlite3';

sqlite3.verbose();
const db = new sqlite3.Database('data.db');

// Initialize tables if they do not exist
const initSql = () => {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS channels (
        channelArn TEXT PRIMARY KEY,
        playbackUrl TEXT NOT NULL
      )`
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        channelArn TEXT NOT NULL,
        startedAt TEXT NOT NULL,
        endedAt TEXT
      )`
    );
  });
};

initSql();

export function saveChannel({ channelArn, playbackUrl }) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT OR REPLACE INTO channels (channelArn, playbackUrl) VALUES (?, ?)`,
      [channelArn, playbackUrl],
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

export function getPlaybackUrl(channelArn) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT playbackUrl FROM channels WHERE channelArn = ?`,
      [channelArn],
      (err, row) => {
        if (err) reject(err);
        else resolve(row ? row.playbackUrl : null);
      }
    );
  });
}

export function createSession({ channelArn, startedAt }) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO sessions (channelArn, startedAt) VALUES (?, ?)`,
      [channelArn, startedAt],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
}

export default db;
