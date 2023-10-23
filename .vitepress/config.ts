import { lstatSync, readdirSync } from 'fs';
import { join, relative, resolve } from 'path';
import { DefaultTheme, defineConfig } from 'vitepress';
import greycat from '@greycat/lang';

const COMPONENTS_DIR = resolve('src', 'components');

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'GreyCat Web',
  description: '@greycat/web documentation',
  base: '/greycat-sdk-web/',
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
      { text: 'Getting Started', link: '/getting-started' },
      {
        text: 'Components',
        items: findComponents('src', COMPONENTS_DIR) as any,
      },
    ],

    sidebar: [
      { text: 'Introduction', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'JSX/TSX Runtime', link: '/jsx-runtime' },
      { text: 'Using React.js', link: '/using-react' },
      {
        text: 'Customization',
        items: [
          { text: 'CSS', link: '/customization/css' },
          { text: 'Theme', link: '/customization/theme' }
        ],
      },
      {
        text: 'Web Components',
        link: '/components/index.md',
        items: findComponents('src', COMPONENTS_DIR),
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/datathings/greycat-sdk-web' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/datathings/' },
    ],
  },

  markdown: {
    html: true,
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
