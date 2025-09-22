import type { PluginOption } from 'vite';
import { type GzipPluginOptions, gzipWriteBundle } from './gzip.js';
import { proxy } from './proxy.js';

const DEFAULT_TARGET = 'http://127.0.0.1:8080';

export interface GreyCatPluginOptions {
  /**
   * GreyCat endpoint url, defaults to `'http://127.0.0.1:8080'`
   */
  greycat?: string;
  /**
   * Assets compression options.
   *
   * If `true` is given, the default gzip options are used.
   * If `false` is given, the compression is disabled entirely.
   */
  gzip?: boolean | GzipPluginOptions;
}

/**
 * This plugin ensures '^/files' and POST requests are proxied to GreyCat rather
 * than trying to be answered by vitejs's dev server.
 *
 * Also provides auto-compression of assets into gzip.
 */
export function greycat(options: GreyCatPluginOptions = {}): PluginOption {
  const { greycat = DEFAULT_TARGET, gzip } = options;
  let skip_compression = false;
  let gzip_options: GzipPluginOptions | undefined;
  if (typeof gzip === 'boolean') {
    skip_compression = !gzip;
  } else if (typeof gzip === 'object') {
    gzip_options = gzip;
  }

  // const proxy_callback = (err: Error) => {
  //   console.error(`${err.message}: make sure GreyCat is started and listening at ${greycat}`);
  // };

  return {
    name: 'greycat',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.originalUrl || req.headers.upgrade === 'websocket') {
          next();
          return;
        }

        const isFileApi =
          (req.method === 'GET' || req.method === 'PUT' || req.method === 'DELETE') &&
          req.originalUrl.match(/^\/files\//);
        const isRpc = !isFileApi && req.method === 'POST';

        if (isFileApi || isRpc) {
          // proxy to GreyCat
          console.log(`Proxy '${req.originalUrl}' to GreyCat at ${greycat}${req.originalUrl}`);
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
