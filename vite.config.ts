import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  optimizeDeps: {
    exclude: [
      'aws-sdk',
      'mock-aws-s3',
      'nock',
      '@mapbox/node-pre-gyp',
      '@mswjs/interceptors',
      'lucide-react',
    ],
  },
});
