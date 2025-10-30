import '@greycat/web/sdk';

const greycat = await gc.sdk.init();

// const shapes = [new gc.project.Rect(3.14), new gc.project.Circle(1024)];

// gc.project.print_shapes(shapes);
await gc.project.string_list(['hello', 'world']);

const node_string_type = greycat.findType('core::node<core::String>');
const ns = new gc.node(42n);
Object.assign(ns, { $type: node_string_type });
await gc.project.node_string_list([ns]);
