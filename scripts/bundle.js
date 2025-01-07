import dts from 'dts-bundle';

dts.bundle({
  name: 'greycat', // Name of your global namespace
  main: 'dist/types/index.d.ts',
  out: 'dist/global.d.ts',
  referenceExternals: true,
});
