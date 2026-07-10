/**
 * Client-side API helpers.
 * All requests include credentials so the HTTP-only session cookie is sent.
 * Admin credentials are never stored or checked here — that happens server-side.
 */

async function request(method, path, body) {
  const res = await fetch(path, {
    method,
    credentials: 'include', // send the HTTP-only session cookie
    headers: body !== undefined ? { 'Content-Type': 'application/json' } : {},
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let message = 'Request failed';
    try {
      const data = await res.json();
      message = data.error || message;
    } catch {
      // ignore parse error
    }
    throw new Error(message);
  }

  return res.json();
}

// ── Admin auth ──────────────────────────────────────────────────────────────

export const adminApi = {
  /** Check whether the current session is an admin session. Never throws. */
  session: async () => {
    try {
      return await request('GET', '/api/admin/session');
    } catch {
      return { isAdmin: false };
    }
  },

  /** Send credentials to the server for validation. Throws on bad credentials. */
  login: (username, password) =>
    request('POST', '/api/admin/login', { username, password }),

  /** Destroy the server-side session and clear the cookie. */
  logout: () => request('POST', '/api/admin/logout'),
};

// ── Comments ────────────────────────────────────────────────────────────────

export const commentsApi = {
  /**
   * Fetch comments from the server.
   * • Admin session  → all comments (pending + approved)
   * • Public         → approved comments only
   */
  getAll: () => request('GET', '/api/comments'),

  /** Submit a new guest comment (always starts as unapproved). */
  create: ({ name, comment, rating }) =>
    request('POST', '/api/comments', { name, comment, rating }),

  /** Approve or revoke a comment (admin only). */
  setApproval: (id, approved) =>
    request('PATCH', `/api/comments/${id}`, { approved }),

};
