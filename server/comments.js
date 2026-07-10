import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { randomUUID } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, 'data');
const DATA_FILE = join(DATA_DIR, 'comments.json');

const SEED_COMMENTS = [
  {
    id: 'seed-1',
    name: 'Elena M.',
    comment: 'An extraordinary week aboard the vessel — every dive was meticulously planned and the crew anticipated our every need.',
    rating: 5,
    approved: true,
    created_date: '2025-11-15T10:00:00.000Z',
  },
  {
    id: 'seed-2',
    name: 'James R.',
    comment: 'The Thistlegorm wreck dive was the highlight of my diving career. Professional, safe, and utterly unforgettable.',
    rating: 5,
    approved: true,
    created_date: '2025-10-02T10:00:00.000Z',
  },
  {
    id: 'seed-3',
    name: 'Sophie L.',
    comment: 'From the first briefing to the final surface interval, the attention to detail was remarkable. True luxury diving.',
    rating: 5,
    approved: true,
    created_date: '2025-09-18T10:00:00.000Z',
  },
];

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function readAll() {
  ensureDataDir();
  if (!existsSync(DATA_FILE)) {
    writeFileSync(DATA_FILE, JSON.stringify(SEED_COMMENTS, null, 2), 'utf8');
    return [...SEED_COMMENTS];
  }
  try {
    return JSON.parse(readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return [...SEED_COMMENTS];
  }
}

function writeAll(comments) {
  ensureDataDir();
  writeFileSync(DATA_FILE, JSON.stringify(comments, null, 2), 'utf8');
}

export function createComment({ name, comment, rating }) {
  const entry = {
    id: randomUUID(),
    name,
    comment,
    rating: Number(rating) || 5,
    approved: false, // always starts unapproved
    created_date: new Date().toISOString(),
  };
  const comments = readAll();
  comments.unshift(entry);
  writeAll(comments);
  return entry;
}

export function updateCommentApproval(id, approved) {
  const comments = readAll();
  const index = comments.findIndex((c) => c.id === id);
  if (index === -1) return null;
  comments[index] = { ...comments[index], approved: Boolean(approved) };
  writeAll(comments);
  return comments[index];
}
