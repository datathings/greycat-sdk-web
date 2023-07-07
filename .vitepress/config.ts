import { lstatSync, readdirSync } from 'fs';
import { basename } from 'path';
import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '@greycat/ui',
  description: '@greycat/ui documentation',
  rewrites: {
    'src/components/:name/(.*)': 'components/:name/index.md',
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/get-started' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Get Started', link: '/get-started' },
          // { text: 'Examples', link: '/examples' },
        ],
      },
      {
        text: 'Components',
        items: readdirSync('src/components')
          .filter((entry) => lstatSync(`src/components/${entry}`).isDirectory())
          .filter((entry) => {
            try {
              return lstatSync(`src/components/${entry}/index.md`).isFile();
            } catch {
              return false;
            }
          })
          .map((entry) => {
            const name = basename(entry);
            return { text: `gui-${name}`, link: `/components/${name}/index.md` };
          }),
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://hub.datathings.com/greycat/ui' }],
  },
});
