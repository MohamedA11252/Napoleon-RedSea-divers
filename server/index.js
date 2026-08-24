import 'dotenv/config';
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

// ── Auth middleware ─────────────────────────────────────────────────────────

function requireAdmin(req, res, next) {
  if (req.session?.isAdmin !== true) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

/**
 * Build the Express app with all routes. Used both by the standalone server
 * (production) and by the Vite dev plugin (development).
 */
export function createApiApp() {
  const app = express();

  app.use(express.json());

  app.use(
    session({
      secret: process.env.SESSION_SECRET || '',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        maxAge: 8 * 60 * 60 * 1000,
      },
    })
  );

  // ── Admin auth endpoints ────────────────────────────────────────────────────

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

  app.post('/api/admin/logout', (req, res) => {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ ok: true });
    });
  });

  app.get('/api/admin/session', (req, res) => {
    res.json({ isAdmin: req.session?.isAdmin === true });
  });

  // ── Comment endpoints ───────────────────────────────────────────────────────

  app.get('/api/comments', (req, res) => {
    const all = readAll().sort(
      (a, b) => new Date(b.created_date) - new Date(a.created_date)
    );

    if (req.session?.isAdmin === true) {
      return res.json(all);
    }

    res.json(all.filter((c) => c.approved === true));
  });

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

  app.patch('/api/comments/:id', requireAdmin, (req, res) => {
    const { approved } = req.body ?? {};
    if (typeof approved !== 'boolean') {
      return res.status(400).json({ error: '"approved" must be a boolean.' });
    }
    const updated = updateCommentApproval(req.params.id, approved);
    if (!updated) return res.status(404).json({ error: 'Comment not found.' });
    res.json(updated);
  });

  return app;
}

// ── Standalone server (production) ──────────────────────────────────────────
// When run directly (node server/index.js), start listening on a port.
// When imported by the Vite plugin, just export createApiApp and skip listening.

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isMain) {
  const app = createApiApp();
  const PORT = parseInt(process.env.SERVER_PORT || '3001', 10);

  if (isProd) {
    const distPath = join(__dirname, '..', 'dist');
    if (existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get(/^(?!\/api).*$/, (_req, res) => {
        res.sendFile(join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, () => {
    console.log(`[api] Server listening on port ${PORT}`);
  });
}
