import { lstatSync, readdirSync } from 'fs';
import { join, relative, resolve } from 'path';
import { DefaultTheme, defineConfig } from 'vitepress';
import greycat from '@greycat/lang';

const COMPONENTS_DIR = resolve('src', 'components');

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'GreyCat',
  description: 'Official GreyCat Documentation',
  base: '',
  outDir: resolve('dist', 'docs'),
  rewrites: {
    'src/components/:sub/:name/(.*)': 'components/:sub/:name/index.md',
    'src/components/:name/(.*)': 'components/:name/index.md',
  },
  mpa: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local',
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/get-started' },
    ],

    sidebar: [
      {
        text: 'Libraries',
        items: [
          {
            text: 'std',
            collapsed: true,
            items: [
              { text: 'core', 'link': '/docs/std/core/' },
              { text: 'io', 'link': '/docs/std/io/' },
              { text: 'math', 'link': '/docs/std/math/' },
              { text: 'runtime', 'link': '/docs/std/runtime/' },
              { text: 'util', 'link': '/docs/std/util/' },
            ],
          }
        ],
      },
      {
        text: 'Introduction',
        items: [{ text: 'Get Started', link: '/get-started' }],
      },
      {
        text: 'Web Components',
        collapsed: true,
        items: findComponents('src', COMPONENTS_DIR),
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://hub.datathings.com/greycat/ui' }],
  },

  markdown: {
    config(md) {
      const h = md.options.highlight!;
      md.options.highlight = (str, lang, attrs) => {
        if (lang === 'gcl' || lang === 'greycat') {
          return greycat.highlighter(str, md.utils.escapeHtml);
        }
        return h(str, lang, attrs);
      };
    }
  },
});

/**
 * Tries to find pages in:
 *  - `<dir>/index.md`
 *  - `<div>/<sub>/index.md`
 *
 * Only 2 levels deep. No more.
 */
function findComponents(root: string, dir: string): DefaultTheme.SidebarItem[] {
  const items: DefaultTheme.SidebarItem[] = [];

  const entries = readdirSync(dir);
  for (let i = 0; i < entries.length; i++) {
    const dirName = entries[i];
    const dirPath = join(dir, dirName);
    if (lstatSync(dirPath).isDirectory()) {
      const index = join(dirPath, 'index.md');
      try {
        if (lstatSync(index).isFile()) {
          // has index.md
          items.push({
            text: `gui-${dirName}`,
            link: `/${relative(root, index)}`,
          });
        }
      } catch {
        // ignore this directory
      }

      // check sub directories
      const subs = findComponents(root, dirPath);
      if (subs.length > 0) {
        items.push({
          text: `${dirName.slice(0, 1).toUpperCase()}${dirName.slice(1)}`,
          collapsed: true,
          items: subs,
        });
      }
    }
  }

  // writeFileSync('sidenav.json', JSON.stringify(items, null, 2), 'utf-8');

  return items;
}
