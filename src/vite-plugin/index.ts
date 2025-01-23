import httpProxy, { ServerOptions } from 'http-proxy';

const DEFAULT_TARGET = 'http://127.0.0.1:8080';

/**
 * This plugin ensures '^/files' and POST requests are proxied to GreyCat rather
 * than trying to be answered by vitejs's dev server.
 */
export default function greycat(options: ServerOptions = {}): import('vite').Plugin {
  options = Object.assign(options, { target: DEFAULT_TARGET });
  const proxy = httpProxy.createProxyServer(options);

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
            proxy.web(req, res, {}, (err) => {
              console.error(
                `${err.message}: make sure GreyCat is started and listening at ${options.target}`,
              );
              return;
            });
            return;
          }
        }
        next();
      });
    },
  };
}
