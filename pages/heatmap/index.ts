import './index.css';
import { GreyCat, core } from '@greycat/sdk';

// @greycat/ui
import '../../src/bundle';
import '../../src/css/full.css';

try {
  const greycat = window.greycat.default = await GreyCat.init({ url: new URL('http://localhost:8080') });

  const table = await greycat.call<core.Table>('project::table');
  console.log({ table });

  const heatmap = document.querySelector('gui-heatmap')!;
  heatmap.table = table;

} catch (err) {
  console.error(err);
  if (err instanceof Error) {
    document.body.innerHTML = `<pre style="color: red"><code>${err.stack}</code></pre>`;
  } else {
    document.body.textContent = `Is GreyCat started?`;
  }
}