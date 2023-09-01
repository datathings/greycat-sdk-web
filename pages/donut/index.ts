import { GreyCat, core } from '@greycat/sdk';

// @greycat/ui

import '../../src/css/full.css';
import '../../src/bundle';

try {
  const greycat = window.greycat.default = await GreyCat.init({ url: new URL('http://localhost:8080') });

  const donut = document.querySelector('gui-donut')!;

  const table = await greycat.call<core.Table>('project::table');
  console.log({ table });
  donut.setAttrs({
    table,
    dataColumn: 1,
    labelColumn: 0,
    withInfo: true,
    withLabelInfo: true,
    withLabels: true,
  });
} catch (err) {
  console.error(err);
  document.body.textContent = `Is GreyCat started?`;
}

