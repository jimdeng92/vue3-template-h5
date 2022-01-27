import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport, { VantResolve } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return {
    base: mode === 'production' ? '/vue3-template-h5/' : '/',
    plugins: [
      vue(),
      styleImport({
        resolves: [VantResolve()],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
