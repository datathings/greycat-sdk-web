import { GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

document.body.appendChild(
  <app-layout title="Hello">
    <span>
      {await greycat.default.call('project::hello', ['world!'])}
    </span>
  </app-layout>,
);
