import { core } from '@greycat/sdk';

import '../common';
import { mount } from '../common';

mount(async (app, greycat) => {
  const donut = document.createElement('gui-donut');
  donut.style.width = `1024px`;
  donut.style.height = `768px`;
  donut.style.margin = 'auto';
  app.appendChild(donut);

  const table = await greycat.call<core.Table>('project::donut');
  console.log({ table });
  donut.setAttrs({
    table,
    dataColumn: 1,
    labelColumn: 0,
    withInfo: true,
    withLabelInfo: true,
    withLabels: true,
  });
});

