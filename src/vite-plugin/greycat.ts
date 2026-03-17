import { IncomingMessage, ServerResponse } from 'node:http';
import { resolve, dirname, basename, join, relative } from 'node:path';
import { readdirSync } from 'node:fs';
import type { Connect, PluginOption } from 'vite';
import { type GzipPluginOptions, gzipWriteBundle } from './gzip.js';
import { proxy } from './proxy.js';

const DEFAULT_TARGET = 'http://127.0.0.1:8080';

export interface GreyCatPluginOptions {
  /**
   * GreyCat endpoint url, defaults to `'http://127.0.0.1:8080'`
   */
  greycat?: string;
  /**
   * Enables debug logs, defaults to `false`
   */
  debug?: boolean;
  /**
   * Disables the default configuration that this plugins sets by default
   */
  noDefaultConfig?: boolean;
  /**
   * Assets compression options.
   *
   * If `true` is given, the default gzip options are used.
   * If `false` is given, the compression is disabled entirely.
   */
  gzip?: boolean | GzipPluginOptions;
}

/**
 * This plugins does 3 things:
 * - Ensures HTTP GET/PUT requests to `/files` and HTTP POST requests are proxied to GreyCat rather
 * than to the vitejs's dev server.
 * - Provides auto-compression of assets into gzip.
 * - Defines sane defaults for the configuration according to DataThings's best-practices:
 * ```js
 * {
 *   base: './', // makes generated urls relative to each file
 *   appType: 'mpa',
 *   root: 'app',
 *   resolve: {
 *     alias: {
 *       // must match the `paths` definitions in `tsconfig.json`
 *       '~': 'app',
 *     },
 *   },
 *   publicDir: 'public',
 *   build: {
 *     outDir: 'webroot',
 *     emptyOutDir: false,
 *     target: 'esnext',
 *     rollupOptions: {
 *       // input: adds one page per .html found in app dir,
 *       // output: puts assets in OUTDIR/assets,
 *     },
 *   },
 * }
 * ```
 */
export function greycat(options: GreyCatPluginOptions = {}): PluginOption {
  const { greycat = DEFAULT_TARGET, gzip, debug = false } = options;
  let skip_compression = false;
  let gzip_options: GzipPluginOptions | undefined;
  if (typeof gzip === 'boolean') {
    skip_compression = !gzip;
  } else if (typeof gzip === 'object') {
    gzip_options = gzip;
  }

  return {
    name: 'greycat',

    config(config) {
      if (options.noDefaultConfig) {
        return config;
      }

      const project_dir = process.cwd();
      const app_root = config.root || 'app';
      const app_root_absolute = resolve(project_dir, app_root);

      if (debug) {
        console.log(`[greycat] project_dir: ${project_dir}`);
        console.log(`[greycat] app_root: ${app_root}`);
        console.log(`[greycat] app_root_absolute: ${app_root_absolute}`);
      }
      const htmlInputs = listHtmlFiles(app_root);
      if (debug) {
        if (htmlInputs.length > 0) {
          console.log(`[greycat] ${htmlInputs.length} pages:`);
        }
        for (const page of htmlInputs) {
          console.log(`  - ${page}`);
        }
      }

      return {
        base: './', // makes generated urls relative to each file
        appType: 'mpa',
        root: app_root,
        resolve: {
          alias: {
            // matches the `paths` definitions in `tsconfig.json`
            '~': app_root,
          },
        },
        publicDir: config.root === undefined ? relative(app_root_absolute, 'public') : 'public',
        build: {
          outDir: config.root === undefined ? relative(app_root_absolute, 'webroot') : 'webroot',
          emptyOutDir: true,
          target: 'esnext',
          rollupOptions: {
            input: htmlInputs,
            output: {
              entryFileNames: (chunk) => {
                // get relative path from app_root_absolute
                const relative_path = relative(app_root_absolute, chunk.facadeModuleId!);
                let dir = dirname(relative_path);
                let name;
                if (dir === '.') {
                  name = 'index';
                } else {
                  name = basename(dir);
                }
                return join(dir, `${name}.js`);
              },
              chunkFileNames: 'assets/[name].js',
              assetFileNames: 'assets/[name].[ext]',
              advancedChunks: {
                groups: [{ name: 'greycat', test: '@greycat/web' }],
              },
            },
          },
        },
      };
    },

    configResolved(config) {
      if (debug) {
        console.log('[greycat] resolved partial config');
        console.dir({
          base: config.base,
          root: config.root,
          publicDir: config.publicDir,
          outDir: config.build.outDir,
          input: config.build.rollupOptions.input,
          output: config.build.rollupOptions.output,
        });
      }
    },

    configureServer(server) {
      server.middlewares.use(function greycatMiddleware(
        req: Connect.IncomingMessage,
        res: ServerResponse<IncomingMessage>,
        next: Connect.NextFunction,
      ): void {
        if (!req.originalUrl || req.headers.upgrade === 'websocket') {
          next();
          return;
        }

        const isFileApi =
          (req.method === 'GET' || req.method === 'PUT' || req.method === 'DELETE') &&
          req.originalUrl.match(/^\/files\//);
        const isRpc = !isFileApi && req.method === 'POST';

        if (isFileApi || isRpc) {
          if (debug) {
            console.log(`[greycat] Proxy ${req.originalUrl} → ${greycat}${req.originalUrl}`);
          }
          proxy(req, res, greycat);
          return;
        }

        next();
      });
    },

    writeBundle(options, bundle) {
      if (skip_compression) {
        return;
      }
      return gzipWriteBundle(gzip_options, options, bundle);
    },
  };
}

function listHtmlFiles(dir: string): string[] {
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    return entries.flatMap((entry) => {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        return listHtmlFiles(fullPath);
      }
      if (entry.name.endsWith('.html')) {
        return [fullPath];
      }
      return [];
    });
  } catch {
    console.warn(`[greycat] Looks like ${dir} is empty. Did you provide the right 'root' property?`);
    return [];
  }
}

/*
  // Try to intercept GET 404 to proxy them to GreyCat
  let vite404MiddlewareIndex = -1;
  let viteErrorMiddlewareIndex = -1;
  for (let i = 0; i < server.middlewares.stack.length; i++) {
    switch ((server.middlewares.stack[i].handle as { name?: string }).name) {
      case 'vite404Middleware':
        vite404MiddlewareIndex = i;
        break;
      case 'viteErrorMiddleware':
        viteErrorMiddlewareIndex = i;
        break;
    }
  }
  if (vite404MiddlewareIndex !== -1) {
    // remove existing 404 middleware
    server.middlewares.stack.splice(vite404MiddlewareIndex, 1);
  }
  if (viteErrorMiddlewareIndex !== -1) {
    // add proxy middleware before error middleware
    server.middlewares.stack.splice(vite404MiddlewareIndex, 0, {
      route: '',
      handle: function greycat404ProxyMiddleware(
        req: Connect.IncomingMessage,
        res: ServerResponse<IncomingMessage>,
      ) {
        // undo the url change made by htmlFallbackMiddleware
        req.url = req.originalUrl;
        console.log(`Proxy ${req.originalUrl} → ${greycat}${req.originalUrl}`);
        proxy(req, res, greycat);
      },
    });
  }
*/
