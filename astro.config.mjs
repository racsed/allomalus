import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://allomalus.fr',
  trailingSlash: 'always',
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/admin'),
      changefreq: 'weekly',
      lastmod: new Date(),
      priority: 0.7,
      serialize(item) {
        if (item.url === 'https://allomalus.fr/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (item.url.includes('/blog/') && item.url !== 'https://allomalus.fr/blog/') {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
  output: 'static',
});
