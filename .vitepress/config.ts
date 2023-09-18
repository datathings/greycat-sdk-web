import { lstatSync, readFileSync, readdirSync } from 'fs';
import { join, relative, resolve } from 'path';
import { DefaultTheme, defineConfig } from 'vitepress';
import greycat from '@greycat/lang';

const COMPONENTS_DIR = resolve('src', 'components');
const LIBRARIES_DIR = resolve('libs');

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'GreyCat',
  description: 'Official GreyCat Documentation',
  base: './',
  outDir: resolve('dist', 'docs'),
  rewrites: {
    'src/components/:sub/:name/(.*)': 'components/:sub/:name/index.md',
    'src/components/:name/(.*)': 'components/:name/index.md',
    'src/components/(.*)': 'components/index.md',
  },
  srcExclude: ['README.md'],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // logo: './logo.svg',
    outline: [2, 3],

    search: {
      provider: 'local',
      options: {
        detailedView: true,
      },
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      {
        text: 'Libraries',
        items: [
          { text: 'std', link: '/libs/std/' },
          { text: 'algebra', link: '/libs/algebra/' },
        ],
      },
      {
        text: 'Components',
        items: findComponents('src', COMPONENTS_DIR) as any,
      },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [{ text: 'Getting Started', link: '/getting-started' }],
      },
      {
        text: 'Libraries',
        items: findLibraries(LIBRARIES_DIR),
      },
      {
        text: 'Web Components',
        link: '/components/index.md',
        collapsed: true,
        items: findComponents('src', COMPONENTS_DIR),
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://hub.datathings.com/greycat/ui' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/datathings/' },
    ],
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

function findLibraries(dir: string): DefaultTheme.SidebarItem[] {
  const items: DefaultTheme.SidebarItem[] = [];

  for (const entry of readdirSync(dir)) {
    const entrypath = join(dir, entry);
    if (lstatSync(entrypath).isDirectory()) {
      const sidebar = join(entrypath, 'sidebar.json');
      const item = readFileSync(sidebar, 'utf-8');
      items.push(JSON.parse(item));
    }
  }

  return items;
}

/**
 * Tries to find pages in:
 *  - `<dir>/index.md`
 *  - `<div>/<sub>/index.md`
 *
 * Only 2 levels deep. No more.
 */
function findComponents(root: string, dir: string): DefaultTheme.SidebarItem[] {
  const items: DefaultTheme.SidebarItem[] = [];

  for (const entry of readdirSync(dir)) {
    const entrypath = join(dir, entry);
    if (lstatSync(entrypath).isDirectory()) {
      const index = join(entrypath, 'index.md');
      try {
        if (lstatSync(index).isFile()) {
          // has index.md
          items.push({
            text: `gui-${entry}`,
            link: `/${relative(root, index)}`,
          });
        }
      } catch {
        // ignore this directory
      }

      // check sub directories
      const subs = findComponents(root, entrypath);
      if (subs.length > 0) {
        items.push({
          text: `${entry.slice(0, 1).toUpperCase()}${entry.slice(1)}`,
          collapsed: true,
          items: subs,
        });
      }
    }
  }

  // writeFileSync('sidenav.json', JSON.stringify(items, null, 2), 'utf-8');

  return items.sort((a, b) => a.text!.localeCompare(b.text!));
}
