import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import env from 'vite-plugin-env-compatible';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), env({ prefix: 'VITE', mountedPath: 'process.env' })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // 他の開発プロジェクトのポートと被らないようにポートを変更すると良い
    port: 3100,
  },
  build: {
    rollupOptions: {
      output: {
        // 500KB 以上のファイルを作らないように分割
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          forms: ['react-hook-form', '@hookform/resolvers'],
        },
      },
    },
  },
});
