import { $, GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const a = await $.default.call('project::gaussian_example');

console.log(a);

document.body.appendChild(
  <app-layout title="Hello">
    <gui-value value={await $.default.call('project::hello', ['world!'])} />
  </app-layout>,
);
