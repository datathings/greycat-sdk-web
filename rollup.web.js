import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { transform } from 'esbuild';

const require = createRequire(import.meta.url);

/** Maps `./x.ts` sources referenced as `./x.js`, plus directory indexes. */
const resolveTs = {
  name: 'resolve-ts',
  resolveId(spec, importer) {
    if (!importer || !spec.startsWith('.') || spec.includes('?')) {
      return null;
    }
    const base = path.resolve(path.dirname(importer), spec);
    const candidates = [
      base,
      base.replace(/\.js$/, '.ts'),
      base.replace(/\.js$/, '.tsx'),
      `${base}.ts`,
      `${base}.tsx`,
      path.join(base, 'index.ts'),
      path.join(base, 'index.tsx'),
    ];
    for (const c of candidates) {
      if (existsSync(c) && statSync(c).isFile()) {
        return c;
      }
    }
    return null;
  },
};

/**
 * Compiles `x.css?inline` and `x.svg?raw` imports into emitted JS modules
 * (default-exporting the file content) so the published output has no
 * bundler-specific import specifiers.
 */
const assetModules = () => {
  const sources = new Map();
  return {
    name: 'asset-modules',
    resolveId(spec, importer) {
      const m = spec.match(/^(.*)\?(inline|raw)$/);
      if (!m || !importer) {
        return null;
      }
      const real = m[1].startsWith('.') ? path.resolve(path.dirname(importer), m[1]) : require.resolve(m[1]);
      // bare package assets get a local, root-relative id so preserveModules
      // emits them next to their importer
      const id = m[1].startsWith('.')
        ? `${real}.js`
        : path.join(path.dirname(importer), `${path.basename(real)}.js`);
      sources.set(id, real);
      return id;
    },
    load(id) {
      const real = sources.get(id);
      if (real === undefined) {
        return null;
      }
      return `export default ${JSON.stringify(readFileSync(real, 'utf8'))};\n`;
    },
  };
};

const esbuildTransform = {
  name: 'esbuild-transform',
  async transform(code, id) {
    if (!/\.tsx?$/.test(id)) {
      return null;
    }
    return transform(code, {
      loader: id.endsWith('.tsx') ? 'tsx' : 'ts',
      jsx: 'automatic',
      jsxImportSource: '@greycat/web',
      target: 'esnext',
      sourcemap: true,
      tsconfigRaw: { compilerOptions: { useDefineForClassFields: false } },
    });
  },
};

// every self-registering component module is its own entry point
const registerInputs = readdirSync('src/web/components', { withFileTypes: true })
  .filter((e) => e.isDirectory() && existsSync(`src/web/components/${e.name}/register.ts`))
  .map((e) => `src/web/components/${e.name}/register.ts`);

export default {
  input: ['src/web/index.ts', 'src/web/shoelace.ts', 'src/web/components/all.ts', ...registerInputs],
  // bare imports (lit, d3, echarts, shoelace, dockview-core, maplibre-gl,
  // @greycat/web self-references) stay external and resolve in the consumer
  external: (id) => !id.startsWith('.') && !path.isAbsolute(id) && !id.includes('?'),
  plugins: [resolveTs, assetModules(), esbuildTransform],
  output: {
    dir: 'dist/web',
    format: 'es',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src/web',
  },
};
