import '@greycat/web';
import '~/common';

const greycat = await gc.sdk.init({ debug: true });

document.body.appendChild(
  <app-layout title="Root">
    <gui-object header value={await greycat.root()} style={{ display: 'inline-block' }} />
  </app-layout>,
);
