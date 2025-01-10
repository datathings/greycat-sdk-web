import dts from 'dts-bundle';

// dts.bundle({
//   name: 'foo',
//   main: 'dist/foo.d.ts',
//   out: './dist/foo.d.ts',
//   baseDir: process.cwd(),
// });

dts.bundle({
  name: 'greycat',
  main: 'dist/types/index.d.ts',
  out: './dist/greycat.d.ts',
  referenceExternals: true,
  baseDir: process.cwd(),
});

dts.bundle({
  name: 'lit-html',
  main: './node_modules/lit-html/lit-html.d.ts',
  out: './dist/lit-html.d.ts',
  referenceExternals: true,
  baseDir: process.cwd(),
});

dts.bundle({
  name: '@shoelace-style/shoelace',
  main: './node_modules/@shoelace-style/shoelace/dist/shoelace.d.ts',
  out: './dist/shoelace-style__shoelace.d.ts',
  referenceExternals: true,
  baseDir: process.cwd(),
});

dts.bundle({
  name: 'd3',
  main: './node_modules/@types/d3/index.d.ts',
  out: './dist/d3.d.ts',
  referenceExternals: true,
  baseDir: process.cwd(),
});

dts.bundle({
  name: 'dockview-core',
  main: './node_modules/dockview-core/dist/esm/index.d.ts',
  out: './dist/dockview-core.d.ts',
  referenceExternals: true,
  baseDir: process.cwd(),
});