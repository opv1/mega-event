import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: '/src/assets',
      components: '/src/components',
      helpers: '/src/helpers',
      pages: '/src/pages',
      state: '/src/redux',
      types: '/src/types',
    },
  },
})
