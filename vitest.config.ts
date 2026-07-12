import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vitest/config';

// Dedicated Vitest config (jsdom + React Testing Library). Kept separate from
// vite.config.ts so the app build pipeline (Tailwind, AI Studio HMR flags) is
// untouched. See src/test/setup.ts for the jsdom polyfills the animation-heavy
// components rely on.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
