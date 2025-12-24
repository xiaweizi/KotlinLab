import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5175,
    strictPort: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // 将 monaco-editor 相关模块打包到单独的 chunk
          if (id.includes('monaco-editor')) {
            return 'monaco-editor'
          }
        }
      }
    }
  }
})
