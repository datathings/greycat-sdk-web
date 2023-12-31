import { isNode, type ObjectProps } from '../../src';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Object';
await app.init();

document.body.prepend(app);

const anonymousObj = await greycat.default.call('project::complex_object');
const table = await greycat.default.call('project::table');

const sharedProps: Omit<ObjectProps, 'value'> = {
  linkify: isNode,
  onClick: (...args) => {
    console.log(args);
  },
};

app.main.appendChild(
  <div className="grid">
    <gui-object value={anonymousObj} {...sharedProps} />
    <article style={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <header>Tables are displayed using &lt;gui-table /&gt;</header>
      <gui-object value={table} {...sharedProps} />
    </article>
  </div>,
);
