import { GuiObjectProps, isNode } from '../../src';
import { mount } from '../common';

mount(async (app) => {
  const anonymousObj = await greycat.default.call('project::complex_object');
  const table = await greycat.default.call('project::table');

  const sharedProps: Omit<GuiObjectProps, 'value'> = {
    linkify: isNode,
    onClick: (...args) => {
      console.log(args);
    },
  };

  app.appendChild(
    <div className="grid">
      <article>
        <header>Look at the console after clicking a link</header>
        <div className="container-fluid">
          <gui-object value={anonymousObj} {...sharedProps} />
        </div>
      </article>
      <article style={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
        <header>Tables are displayed using &lt;gui-table /&gt;</header>
        <gui-object value={table} {...sharedProps} />
      </article>
    </div>,
  );
});
