import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Plugin, Rollup } from 'vite';
import { type GzipOptions, gzipBundle } from './gzip.js';
import { type SitemapOptions, buildSitemap, htmlFilesToRoutes } from './sitemap.js';
import { type RobotsOptions, buildRobots } from './robots.js';

export interface GreycatPluginOptions {
  /**
   * Absolute site origin, e.g. `'https://app.example.com'`.
   *
   * Required by `robots` and `sitemap`; both are skipped when it is absent.
   */
  hostname?: string;
  /**
   * Pre-gzip the assets GreyCat serves with `Content-Encoding: gzip`.
   *
   * `true` (default) uses the defaults, `false` disables it, an object overrides options.
   */
  gzip?: boolean | GzipOptions;
  /**
   * Emit `sitemap.xml` from the built HTML pages. Requires {@link hostname}.
   *
   * `true` (default) uses the defaults, `false` disables it, an object overrides options.
   */
  sitemap?: boolean | SitemapOptions;
  /**
   * Emit `robots.txt`. Requires {@link hostname}.
   *
   * `true` (default) uses the defaults, `false` disables it, an object overrides options.
   */
  robots?: boolean | RobotsOptions;
}

interface Toggle<T> {
  enabled: boolean;
  options: T | undefined;
}

function toggle<T>(value: boolean | T | undefined): Toggle<T> {
  if (value === false) {
    return { enabled: false, options: undefined };
  }
  if (value === undefined || value === true) {
    return { enabled: true, options: undefined };
  }
  return { enabled: true, options: value };
}

/**
 * GreyCat build plugin. Runs at build time only and, on `writeBundle`:
 * - gzips the assets GreyCat serves pre-compressed (keeping the originals),
 * - emits `sitemap.xml` from the built HTML pages,
 * - emits `robots.txt`.
 *
 * Each step is on by default and opt-out. `sitemap` and `robots` need
 * {@link GreycatPluginOptions.hostname}; without it they are skipped.
 */
export function greycat(options: GreycatPluginOptions = {}): Plugin {
  const { hostname } = options;
  const gzip = toggle(options.gzip);
  const sitemap = toggle(options.sitemap);
  const robots = toggle(options.robots);

  return {
    name: 'greycat',
    apply: 'build',
    async writeBundle(output: Rollup.NormalizedOutputOptions, bundle: Rollup.OutputBundle) {
      const outDir = output.dir ?? '';
      const files = Object.keys(bundle);

      if (sitemap.enabled && hostname) {
        const routes = htmlFilesToRoutes(files);
        if (sitemap.options?.extraRoutes) {
          routes.push(...sitemap.options.extraRoutes);
        }
        await writeFile(join(outDir, 'sitemap.xml'), buildSitemap(routes, hostname));
      }

      if (robots.enabled && hostname) {
        await writeFile(
          join(outDir, 'robots.txt'),
          buildRobots(hostname, sitemap.enabled, robots.options),
        );
      }

      if (gzip.enabled) {
        await gzipBundle(outDir, files, gzip.options);
      }
    },
  };
}

export type { GzipOptions, SitemapOptions, RobotsOptions };
export default greycat;
