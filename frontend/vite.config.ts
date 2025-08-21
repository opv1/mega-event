import { inspectorServer } from '@react-dev-inspector/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), inspectorServer()],
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@constants': '/src/constants.ts',
      '@helpers': '/src/helpers',
      '@pages': '/src/pages',
      '@state': '/src/redux',
      '@types': '/src/types.ts',
    },
  },
})
