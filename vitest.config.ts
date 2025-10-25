import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      all: true,
      reportsDirectory: './coverage/scrap',

      include: ['src/**/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/__tests__/**',
        'src/background/service-worker.ts',
        'src/background/SidePanel/SidePanel.ts',
        'src/Popup/PopupApp.tsx',
        'src/Popup/popupMain.tsx',
        'src/SidePanel/SidePanelApp.tsx',
        'src/SidePanel/sidePanelMain.tsx',
        'src/@types/**',
        'src/*.d.ts',
      ],
    },

    globals: true,
    environment: 'happy-dom',
    setupFiles: 'vitest.setup.ts',

    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },

  plugins: [react()],
});
