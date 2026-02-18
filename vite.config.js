import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'AsciiFX',
      fileName: 'ascii-script',
      formats: ['es']
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Dynamic imports for effects
          if (id.includes('effects/ascii-art')) return 'ascii-art';
          if (id.includes('effects/text')) return 'text';
          if (id.includes('effects/procedural')) return 'procedural';
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  }
});
