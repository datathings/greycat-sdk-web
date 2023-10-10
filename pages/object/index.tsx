import { GuiObjectProps, isNode } from '../../src';
import { mount } from '../common';

mount(async (app) => {
  const anonymousObj = await greycat.default.call('project::complex_object');
  const table = await greycat.default.call('project::table');

  const sharedProps: Omit<GuiObjectProps, 'value'> = {
    linkify: isNode,
    onClick: (_, value) => {
      console.log(value);
      window.alert(`clicked: ${value}`);
    },
  };

  app.appendChild(
    <div className="grid">
      <gui-object value={anonymousObj} {...sharedProps} />
      <gui-object value={table} {...sharedProps} />
    </div>,
  );
});
