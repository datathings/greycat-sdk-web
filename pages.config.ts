import { readdirSync, statSync } from 'fs';
import { extname, relative, resolve } from 'path';
import { PluginOption, defineConfig } from 'vite';
import httpProxy from 'http-proxy';

export default defineConfig(({ mode }) => ({
  base: '',
  appType: 'mpa',
  plugins: [proxy()],
  root: resolve(__dirname, 'pages'),
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      cssModules: {
        // This is to get better CSS class names when developping as it preprends the name of the file
        pattern: mode === 'development' ? '[name]_[local]' : '[hash]_[local]',
      },
    },
  },
  resolve: {
    alias: {
      '@greycat/web': resolve(__dirname, 'src'),
    }
  },
  build: {
    outDir: resolve(__dirname, 'dist', 'pages'),
    emptyOutDir: true,
    target: 'esnext',
    rollupOptions: {
      input: computeInputs(),
    },
  },
}));

function computeInputs() {
  const PAGES_DIR = resolve(__dirname, 'pages');
  const input = {};

  function readdir(path: string) {
    readdirSync(path)
      .filter((entry) => !entry.startsWith('_'))
      .forEach((entry) => handleEntry(resolve(__dirname, path, entry)));
  }

  function handleEntry(path: string) {
    if (path.endsWith('.html')) {
      const relativePath = relative(PAGES_DIR, path);
      const entryName = relativePath.slice(0, -extname(relativePath).length);
      input[entryName] = path;
    } else if (isDir(path) && !path.endsWith('gcdata')) {
      readdir(path);
    }
  }

  function isDir(path: string) {
    return statSync(path).isDirectory();
  }

  readdir(PAGES_DIR);

  return input;
}


function proxy(): PluginOption {
  const proxy = httpProxy.createProxyServer({ target: 'http://127.0.0.1:8080' });

  return {
    name: 'greycat-proxy',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.originalUrl && req.headers.upgrade !== 'websocket') {
          const isFileApi = req.originalUrl.match(/^\/files\//) && (req.method === 'GET' || req.method === 'PUT' || req.method === 'DELETE');
          const isRpc = (!isFileApi && (req.method === 'POST')) || (req.method === 'HEAD' && req.originalUrl === '/runtime::Runtime::abi');
          if (isFileApi || isRpc) {
            // proxy to GreyCat
            proxy.web(req, res, {}, (err) => {
              console.error(`${err.code}: make sure GreyCat is started and listening at ${proxy.options.target}`);
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