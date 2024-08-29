import { $, core, GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const a = (await $.default.call('project::geo_table')) as core.Table;

console.log(a);

document.body.appendChild(
  <app-layout title="Hello">
    <gui-geomap value={a} />
  </app-layout>,
);
