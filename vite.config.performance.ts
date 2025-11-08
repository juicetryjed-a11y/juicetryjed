import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Performance optimized Vite config
export default defineConfig({
  plugins: [react()],
  
  // Path resolution
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Development server optimization
  server: {
    port: 3000,
    host: true,
    hmr: {
      overlay: false
    }
  },

  // Build optimizations
  build: {
    // Reduce bundle size
    minify: 'terser',
    
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react'],
          
          // Feature chunks
          auth: ['./src/contexts/NewAuthContext.tsx'],
          dashboard: ['./src/components/dashboard/SimpleDashboard.tsx'],
        }
      }
    },
    
    // Asset optimization
    assetsInlineLimit: 4096,
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },

  // CSS optimization
  css: {
    devSourcemap: false,
    preprocessorOptions: {
      css: {
        charset: false
      }
    }
  },

  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react'
    ],
    exclude: []
  },

  // Performance settings
  esbuild: {
    // Remove console logs in production
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },

  // Preview settings
  preview: {
    port: 4173,
    host: true
  }
})
