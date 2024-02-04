import { inspectorServer } from '@react-dev-inspector/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import devcert from 'vite-plugin-devcert'

export default defineConfig({
  plugins: [react(), devcert({}), inspectorServer()],
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
