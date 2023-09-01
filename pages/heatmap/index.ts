import { GreyCat, core } from '@greycat/sdk';

// @greycat/ui
import '../../src/css/full.css';
import '../../src/bundle';

try {
  const greycat = window.greycat.default = await GreyCat.init({ url: new URL('http://localhost:8080') });

  const table = await greycat.call<core.Table>('project::table');
  console.log({ table });

  const heatmap = document.querySelector('gui-heatmap')!;
  heatmap.xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  heatmap.yLabels = ["Paris", "London", "New-York", "Beijing", "Perth", "Oslo"];
  heatmap.table = table;

} catch (err) {
  console.error(err);
  if (err instanceof Error) {
    document.body.innerHTML = `<pre style="color: red"><code>${err.stack}</code></pre>`;
  } else {
    document.body.textContent = `Is GreyCat started?`;
  }
}