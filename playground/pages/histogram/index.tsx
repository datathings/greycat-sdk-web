import { $, GreyCat, IndexedDbCache, util } from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const a = (await $.default.call('project::histo_example', [])) as util.Histogram;
document.body.appendChild(
  <app-layout title="Hello">
    <gui-histogram value={a}></gui-histogram>
  </app-layout>,
);
