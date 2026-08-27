import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://<user>.github.io/n8n-website/
  base: '/n8n-website/',
  plugins: [react()],
  server: { port: 5180, strictPort: true },
})
