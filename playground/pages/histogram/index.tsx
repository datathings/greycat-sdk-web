import { $, GreyCat, IndexedDbCache, util } from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const a = (await $.default.call('project::one_d_histo_example', [])) as util.Histogram;
const b = (await $.default.call('project::two_d_histo_example', [])) as util.Histogram;
document.body.appendChild(
  <app-layout title="Hello">
    <gui-histogram value={b}> </gui-histogram>
    <gui-histogram value={a}></gui-histogram>
  </app-layout>,
);
