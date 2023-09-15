import { lstatSync, readdirSync, writeFileSync } from 'fs';
import { basename, join, relative, resolve } from 'path';
import { DefaultTheme, defineConfig } from 'vitepress';

const COMPONENTS_DIR = resolve('src', 'components');

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '@greycat/ui',
  description: '@greycat/ui documentation',
  base: '',
  rewrites: {
    'src/components/:sub/:name/(.*)': 'components/:sub/:name/index.md',
    'src/components/:name/(.*)': 'components/:name/index.md',
  },
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
        text: 'Introduction',
        items: [
          { text: 'Get Started', link: '/get-started' },
        ],
      },
      {
        text: 'Components',
        items: findComponents(COMPONENTS_DIR),
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://hub.datathings.com/greycat/ui' }],
  },
});

/**
 * Tries to find pages in:
 *  - `<dir>/index.md`
 *  - `<div>/<sub>/index.md`
 * 
 * Only 2 levels deep. No more.
 */
function findComponents(dir: string): DefaultTheme.SidebarItem[] {
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
            link: `/components/${relative(COMPONENTS_DIR, dirPath)}/`,
          })
        }
      } catch {
        // ignore this directory
      }

      // check sub directories
      const subs = findComponents(dirPath);
      if (subs.length > 0) {
        items.push({
          text: `${dirName.slice(0, 1).toUpperCase()}${dirName.slice(1)}`,
          collapsed: true,
          items: subs,

        });
      }
    }
  }

  writeFileSync('sidebar.json', JSON.stringify(items, null, 2), 'utf-8');

  return items;
}