import '@greycat/web';
import '~/common';

await gc.sdk.init();

document.body.appendChild(
  <app-layout title="Files">
    <gui-files
      ongui-click={async (e) => {
        if (e.detail.path === '..' || e.detail.path.endsWith('/')) {
          // ignore directories
          return;
        }
        console.log(e.detail);
        window.alert(`You've clicked on file: "${e.detail.path}"`);
        // Uncomment the following line to download the file
        // const content = await greycat.getFile(e.detail.path);
        // ... do something with the content ...
      }}
    />
  </app-layout>,
);
