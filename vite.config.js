import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// Mount the Express API directly inside the Vite dev server so there's only
// one process to run — no separate `node server/index.js` needed in dev.
function apiPlugin() {
  let apiApp = null
  return {
    name: 'express-api',
    configureServer(server) {
      // Lazy-load so env vars are read at server start, not at config eval.
      import('./server/index.js').then(({ createApiApp }) => {
        apiApp = createApiApp()
      })

      server.middlewares.use('/api', (req, res, next) => {
        if (!apiApp) return next()
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
