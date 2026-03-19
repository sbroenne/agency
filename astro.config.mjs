import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sbroenne.github.io',
  base: '/agency',
  vite: {
    plugins: [tailwindcss()],
  },
});
