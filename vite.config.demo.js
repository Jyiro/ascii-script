import { defineConfig } from 'vite';

export default defineConfig({
  // Build normal de sitio, no de librería
  root: './',
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
        enhanced: './examples/enhanced.html'
      }
    }
  }
});
