import { GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

document.body.appendChild(
  <app-layout title="Files">
    <gui-files
      ongui-click={async (e) => {
        window.alert(`You've clicked on file: "${e.detail.path}"`);
        // Uncomment the following line to download the file
        // const content = await greycat.getFile(e.detail.path);
        // ... do something with the content ...
      }}
    />
  </app-layout>,
);
