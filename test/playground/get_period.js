import '@greycat/web/sdk';

await gc.sdk.init();

const tu = new gc.core.Tuple(42, 1337);
await gc.project.getPeriod(tu);

const c = new gc.project.Custom('hello');
await gc.project.consume_custom(c);
