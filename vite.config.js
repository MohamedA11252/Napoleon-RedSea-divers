import 'dotenv/config'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import { createApiApp } from './server/index.js'

// Mount the Express API directly inside the Vite dev server so there's only
// one process to run — no separate `node server/index.js` needed in dev.
function apiPlugin() {
  const apiApp = createApiApp()
  return {
    name: 'express-api',
    configureServer(server) {
      // Don't use a path prefix — it would strip /api before Express sees it.
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/api')) return next()
        apiApp(req, res, next)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), apiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
})
