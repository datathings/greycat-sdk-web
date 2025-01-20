import { basename, resolve } from 'node:path';
import { Plugin, defineConfig } from 'vite';
import httpProxy from 'http-proxy';
import { readdirSync, statSync } from 'node:fs';

export default defineConfig(({ mode }) => ({
  root: resolve(__dirname),
  base: '',
  plugins: [greycatProxy()],
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
      '@': resolve(__dirname),
      '@greycat/web/jsx-dev-runtime': resolve(__dirname, '../src/jsx/jsx-runtime.ts'),
      '@greycat/web/jsx-runtime': resolve(__dirname, '../src/jsx/jsx-runtime.ts'),
      '@greycat/web/sdk': resolve(__dirname, '../dist/greycat.js'),
      '@greycat/web/greycat.css': resolve(__dirname, '../css/greycat.css'),
      '@greycat/web': resolve(__dirname, '../src/web'),
    },
  },
  build: {
    outDir: resolve(__dirname, '../dist/playground'),
    emptyOutDir: true,
    target: 'esnext',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        ...inputsFromDirectories(resolve(__dirname, 'pages'), 'pages/'),
      },
    },
  },
}));

function inputsFromDirectories(rootDir: string, prefix = '') {
  const inputs: Record<string, string> = {};

  function walkDir(path: string) {
    for (const filename of readdirSync(path)) {
      const filepath = resolve(path, filename);
      if (statSync(filepath).isDirectory()) {
        if (filename.startsWith('_')) {
          // skip dirs starting with an underscore for convenience in disabling pages
          continue;
        }
        // recursive descent
        walkDir(filepath);
      } else if (filename.endsWith('.html')) {
        const entryName = `${prefix}${basename(path)}`;
        inputs[entryName] = filepath;
      }
    }
  }

  walkDir(rootDir);

  return inputs;
}

function greycatProxy(): Plugin {
  const proxy = httpProxy.createProxyServer({ target: 'http://127.0.0.1:8080' });

  return {
    name: 'vite-plugin-greycat-proxy',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.originalUrl && req.headers.upgrade !== 'websocket') {
          const isFileApi =
            req.originalUrl.match(/^\/files\//) &&
            (req.method === 'GET' || req.method === 'PUT' || req.method === 'DELETE');
          const isRpc =
            (!isFileApi && req.method === 'POST') ||
            (req.method === 'HEAD' && req.originalUrl === '/runtime::Runtime::abi');
          if (isFileApi || isRpc) {
            // proxy to GreyCat
            proxy.web(req, res, {}, (err) => {
              console.error(
                `${err.code}: make sure GreyCat is started and listening at ${proxy.options.target}`,
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
