import react from '@vitejs/plugin-react'
import { defineConfig, UserConfig } from 'vite'
import { InlineConfig } from 'vitest'

interface DefineConfig extends UserConfig {
  test: InlineConfig
}

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
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
} as DefineConfig)
