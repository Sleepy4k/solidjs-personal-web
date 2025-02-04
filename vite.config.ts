import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: '',
  plugins: [solidPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@config': resolve(__dirname, './src/config'),
      '@pages': resolve(__dirname, './src/pages'),
      '@components': resolve(__dirname, './src/components'),
      '@interfaces': resolve(__dirname, './src/interfaces'),
      '@contexts': resolve(__dirname, './src/contexts'),
      '@constants': resolve(__dirname, './src/constants'),
      '@services': resolve(__dirname, './src/services'),
      '@utils': resolve(__dirname, './src/utils'),
    }
  },
  server: {
    host: true,
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  optimizeDeps: {
    include: ['solid-markdown > micromark', 'solid-markdown > unified'],
  },
});
