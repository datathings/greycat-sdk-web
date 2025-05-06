import '@greycat/web/sdk';

const greycat = await gc.sdk.init();

const arr = await gc.project.get_nodes();
const generic_node_type = greycat.findType('core::node<project::Point>');
const map = new gc.project.MapParams(
  new gc.project.FooMap(
    gc.project.SomeName.bbbbbbb,
    arr.map((n) => {
      const clone = new gc.core.node(n.value);
      Object.assign(clone, { $type: generic_node_type });
      return clone;
    }),
  ),
);

await gc.project.load_within_stub(map);
