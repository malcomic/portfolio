import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,  // Helps with OneDrive sync issues
    },
    fs: {
      strict: false,
    },
  },
  css: {
    devSourcemap: false,  // Reduce file system operations
  },
})
