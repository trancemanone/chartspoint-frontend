import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://chartspoint.com',
  integrations: [tailwind()],
  output: 'static',
  build: {
    assets: 'assets'
  },
  vite: {
    ssr: {
      noExternal: ['graphql-request']
    }
  },
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar']
  }
});
