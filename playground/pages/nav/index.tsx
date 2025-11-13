import '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

document.body.appendChild(
  <app-layout title="Nav">
    <sl-alert slot="main-header" variant="warning" open>
      The links in the below tree are placeholders, there are not linking to anything
    </sl-alert>
    <gui-nav />
  </app-layout>,
);
