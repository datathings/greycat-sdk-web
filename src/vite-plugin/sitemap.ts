export interface SitemapOptions {
  /** Extra routes to list beyond the built HTML pages, e.g. `['/docs']`. */
  extraRoutes?: string[];
}

/** Map emitted HTML bundle paths to site routes (MPA: path == URL). */
export function htmlFilesToRoutes(files: string[]): string[] {
  const routes = new Set<string>();
  for (const file of files) {
    const p = file.replace(/\\/g, '/');
    if (!p.endsWith('.html')) {
      continue;
    }
    if (p === 'index.html') {
      routes.add('/');
    } else if (p.endsWith('/index.html')) {
      routes.add('/' + p.slice(0, -'index.html'.length)); // dashboard/index.html -> /dashboard/
    } else {
      routes.add('/' + p.slice(0, -'.html'.length)); // about.html -> /about
    }
  }
  return [...routes].sort();
}

export function buildSitemap(routes: string[], hostname: string): string {
  const base = hostname.replace(/\/+$/, '');
  const urls = routes
    .map((route) => `  <url>\n    <loc>${base}${route}</loc>\n  </url>`)
    .join('\n');
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    `${urls}\n` +
    '</urlset>\n'
  );
}
