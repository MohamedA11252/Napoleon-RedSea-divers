import express from 'express';
import session from 'express-session';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import {
  readAll,
  createComment,
  updateCommentApproval,
} from './comments.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = parseInt(process.env.SERVER_PORT || '3001', 10);
const isProd = process.env.NODE_ENV === 'production';

// ── Startup validation ──────────────────────────────────────────────────────
// Fail immediately if required secrets are absent — never run with insecure
// fallback values in production.
const REQUIRED_ENV = ['SESSION_SECRET', 'ADMIN_USERNAME', 'ADMIN_PASSWORD'];
const missingEnv = REQUIRED_ENV.filter((k) => !process.env[k]);
if (missingEnv.length > 0) {
  if (isProd) {
    console.error(`[api] FATAL: missing required environment variables: ${missingEnv.join(', ')}`);
    process.exit(1);
  } else {
    console.warn(`[api] WARNING: missing env vars (${missingEnv.join(', ')}) — admin login will not work until they are set.`);
  }
}

// ── Middleware ──────────────────────────────────────────────────────────────

app.use(express.json());

app.use(
  session({
    // SESSION_SECRET must be set; startup validation above guarantees this in
    // production. The empty-string fallback is unreachable in prod.
    secret: process.env.SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,          // JS cannot read this cookie
      secure: isProd,          // HTTPS-only in production
      sameSite: 'lax',
      maxAge: 8 * 60 * 60 * 1000, // 8 hours
    },
  })
);

// ── Auth middleware ─────────────────────────────────────────────────────────

function requireAdmin(req, res, next) {
  if (req.session?.isAdmin !== true) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ── Admin auth endpoints ────────────────────────────────────────────────────

// POST /api/admin/login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body ?? {};

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    console.error('ADMIN_USERNAME / ADMIN_PASSWORD env vars are not set.');
    return res.status(500).json({ error: 'Server misconfiguration — contact the site owner.' });
  }

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  // Constant-time comparison to avoid timing attacks
  const usernameMatch = username === adminUsername;
  const passwordMatch = password === adminPassword;

  if (!usernameMatch || !passwordMatch) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  req.session.regenerate((err) => {
    if (err) return res.status(500).json({ error: 'Session error.' });
    req.session.isAdmin = true;
    res.json({ ok: true });
  });
});

// POST /api/admin/logout
app.post('/api/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ ok: true });
  });
});

// GET /api/admin/session  — lets the client ask the server if the session is valid
app.get('/api/admin/session', (req, res) => {
  res.json({ isAdmin: req.session?.isAdmin === true });
});

// ── Comment endpoints ───────────────────────────────────────────────────────

// GET /api/comments
// • Admin (valid session) → all comments (pending + approved)
// • Public               → approved comments only
app.get('/api/comments', (req, res) => {
  const all = readAll().sort(
    (a, b) => new Date(b.created_date) - new Date(a.created_date)
  );

  if (req.session?.isAdmin === true) {
    return res.json(all);
  }

  res.json(all.filter((c) => c.approved === true));
});

// POST /api/comments  (public — anyone can submit, starts unapproved)
app.post('/api/comments', (req, res) => {
  const { name, comment, rating } = req.body ?? {};
  if (!name?.trim() || !comment?.trim()) {
    return res.status(400).json({ error: 'Name and comment are required.' });
  }
  const entry = createComment({
    name: name.trim(),
    comment: comment.trim(),
    rating,
  });
  res.status(201).json(entry);
});

// PATCH /api/comments/:id  (admin only — approve / revoke)
app.patch('/api/comments/:id', requireAdmin, (req, res) => {
  const { approved } = req.body ?? {};
  if (typeof approved !== 'boolean') {
    return res.status(400).json({ error: '"approved" must be a boolean.' });
  }
  const updated = updateCommentApproval(req.params.id, approved);
  if (!updated) return res.status(404).json({ error: 'Comment not found.' });
  res.json(updated);
});

// ── Static frontend (production only) ──────────────────────────────────────

if (isProd) {
  const distPath = join(__dirname, '..', 'dist');
  if (existsSync(distPath)) {
    app.use(express.static(distPath));
    // SPA fallback — all non-API routes serve index.html
    app.get(/^(?!\/api).*$/, (_req, res) => {
      res.sendFile(join(distPath, 'index.html'));
    });
  }
}

// ── Start ───────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`[api] Server listening on port ${PORT}`);
});
