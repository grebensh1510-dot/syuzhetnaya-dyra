import { defineConfig } from 'astro/config';

export default defineConfig({
  server: { port: 4321 },
  devToolbar: { enabled: false },
  vite: {
    build: {
      // three.js весит своё; предупреждение о размере чанка тут не новость.
      chunkSizeWarningLimit: 900,
    },
  },
});
