import { core } from '@greycat/sdk';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Donut';
await app.init();

document.body.prepend(app);

const donut = document.createElement('gui-donut');
donut.style.width = `1024px`;
donut.style.height = `768px`;
donut.style.margin = 'auto';
app.main.appendChild(donut);

const table = await greycat.default.call<core.Table>('project::donut');
console.log({ table });
donut.setAttrs({
  table,
  dataColumn: 1,
  labelColumn: 0,
  withInfo: true,
  withLabelInfo: true,
  withLabels: true,
});
