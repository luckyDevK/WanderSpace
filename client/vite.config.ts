/// <reference types="vitest/config" />

import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src', ''),
    },
  },
});
