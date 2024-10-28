import { GreyCat, IndexedDbCache, io } from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

document.body.appendChild(
  <app-layout title="Hello">
    <gui-input-object type={io.CsvColumn._type} />
  </app-layout>,
);
