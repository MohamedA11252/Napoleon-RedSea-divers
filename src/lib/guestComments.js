const STORAGE_KEY = 'napoleon_guest_comments';

const MOCK_COMMENTS = [
  {
    id: 'mock-1',
    name: 'Elena M.',
    comment: 'An extraordinary week aboard the vessel — every dive was meticulously planned and the crew anticipated our every need.',
    rating: 5,
    approved: true,
    created_date: '2025-11-15T10:00:00.000Z',
  },
  {
    id: 'mock-2',
    name: 'James R.',
    comment: 'The Thistlegorm wreck dive was the highlight of my diving career. Professional, safe, and utterly unforgettable.',
    rating: 5,
    approved: true,
    created_date: '2025-10-02T10:00:00.000Z',
  },
  {
    id: 'mock-3',
    name: 'Sophie L.',
    comment: 'From the first briefing to the final surface interval, the attention to detail was remarkable. True luxury diving.',
    rating: 5,
    approved: true,
    created_date: '2025-09-18T10:00:00.000Z',
  },
];

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...MOCK_COMMENTS];
    const stored = JSON.parse(raw);
    return Array.isArray(stored) ? stored : [...MOCK_COMMENTS];
  } catch {
    return [...MOCK_COMMENTS];
  }
}

function writeAll(comments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}

export function getApprovedComments() {
  return readAll()
    .filter((c) => c.approved !== false)
    .sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
}

export function getAllComments() {
  return readAll().sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
}

export function createComment({ name, comment, rating, approved = false }) {
  const entry = {
    id: `comment-${Date.now()}`,
    name,
    comment,
    rating,
    approved,
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
  comments[index] = { ...comments[index], approved };
  writeAll(comments);
  return comments[index];
}

export function deleteComment(id) {
  const comments = readAll();
  const filtered = comments.filter((c) => c.id !== id);
  writeAll(filtered);
}
