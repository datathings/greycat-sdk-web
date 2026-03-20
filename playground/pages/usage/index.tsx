import '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

document.body.appendChild(
  <app-layout title="Usage">
    <gui-runtime-usage />
  </app-layout>,
);
