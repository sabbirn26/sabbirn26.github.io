import { cpSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-portfolio-assets',
      closeBundle() {
        cpSync('assets', 'dist/assets', { recursive: true })
      },
    },
  ],
  base: '/',
})
