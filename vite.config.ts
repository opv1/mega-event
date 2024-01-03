import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: '/src/assets',
      components: '/src/components',
      const: '/src/const',
      helpers: '/src/helpers',
      pages: '/src/pages',
      state: '/src/redux',
      types: '/src/types',
    },
  },
})
