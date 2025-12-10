import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    strictPort: false,
    watch: {
      usePolling: true,
      interval: 1000
    },
    hmr: {
      overlay: false
    }
  },
  optimizeDeps: {
    force: true,
    include: ['react', 'react-dom', 'axios']
  }
})
