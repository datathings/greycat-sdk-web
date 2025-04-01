import type { Plugin } from 'vite';
import httpProxy, { type ServerOptions } from 'http-proxy';
import { type GzipPluginOptions, gzipWriteBundle } from './gzip.js';

const DEFAULT_TARGET = 'http://127.0.0.1:8080';

export interface GreyCatPluginOptions {
  /**
   * Proxy server options.
   */
  proxy?: ServerOptions;
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
export function greycat(options: GreyCatPluginOptions = {}): Plugin {
  const { proxy = {}, gzip } = options;
  if (proxy.target === undefined) {
    proxy.target = DEFAULT_TARGET;
  }
  let skip_compression = false;
  let gzip_options: GzipPluginOptions | undefined;
  if (typeof gzip === 'boolean') {
    skip_compression = !gzip;
  } else if (typeof gzip === 'object') {
    gzip_options = gzip;
  }

  const proxy_server = httpProxy.createProxyServer(proxy);

  return {
    name: 'greycat',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.originalUrl && req.headers.upgrade !== 'websocket') {
          const isFileApi =
            (req.method === 'GET' || req.method === 'PUT' || req.method === 'DELETE') &&
            req.originalUrl.match(/^\/files\//);
          const isRpc = !isFileApi && req.method === 'POST';
          if (isFileApi || isRpc) {
            // proxy to GreyCat
            proxy_server.web(req, res, {}, (err) => {
              console.error(
                `${err.message}: make sure GreyCat is started and listening at ${proxy.target}`,
              );
              return;
            });
            return;
          }
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

// function discover_pages(root_dir: string) {
//   const inputs: Record<string, string> = {};
//   const base_dir = basename(root_dir);

//   function walkDir(dirpath: string, prefix = '') {
//     for (const entry of readdirSync(dirpath)) {
//       const dirname = basename(dirpath);
//       const filepath = resolve(dirpath, entry);
//       if (statSync(filepath).isDirectory()) {
//         if (entry.startsWith('_')) {
//           // skip dirs starting with an underscore for convenience in disabling pages
//           continue;
//         }
//         // recursive descent
//         walkDir(filepath, dirname === base_dir ? '' : `${prefix}${dirname}/`);
//       } else if (entry.endsWith('.html')) {
//         console.log(join(dirpath, entry));
//         let entryname: string;
//         if (root_dir === dirpath) {
//           entryname = entry.slice(0, -extname(entry).length);
//         } else {
//           entryname = dirname;
//         }
//         inputs[`${prefix}${entryname}`] = filepath;
//       }
//     }
//   }

//   walkDir(root_dir);
//   console.dir(inputs);

//   return inputs;
// }
