import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        // Split vendor code so the React runtime and the icon set are cached
        // independently of app code, and keep first-load JS lean. Below-the-fold
        // sections are additionally code-split via React.lazy in App.tsx.
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          icons: ['lucide-react'],
        },
      },
    },
  },
})
