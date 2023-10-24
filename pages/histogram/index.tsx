import { core } from '../../src';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Histogram';
await app.init();

document.body.prepend(app);

const histogramEl = document.createElement('gui-histogram-chart');
const table = await await greycat.default.call<core.Table>('project::histogram_table');
histogramEl.columns = [2, 3];
histogramEl.table = table;

app.main.appendChild(
  <article>
    <header>Histogram</header>
    <gui-histogram-chart columns={[2, 3]} table={table} />
  </article>
);