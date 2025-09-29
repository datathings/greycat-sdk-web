import type { Connect, PluginOption } from 'vite';
import { type GzipPluginOptions, gzipWriteBundle } from './gzip.js';
import { proxy } from './proxy.js';
import { IncomingMessage, ServerResponse } from 'node:http';

const DEFAULT_TARGET = 'http://127.0.0.1:8080';

export interface GreyCatPluginOptions {
  /**
   * GreyCat endpoint url, defaults to `'http://127.0.0.1:8080'`
   */
  greycat?: string;
  /* Enables debug logs, defaults to `false` */
  debug?: boolean;
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
            console.log(`Proxy ${req.originalUrl} → ${greycat}${req.originalUrl}`);
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
