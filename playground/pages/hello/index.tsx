import '@greycat/web';
import '@/common';

await gc.sdk.init();

document.body.appendChild(
  <app-layout title="Hello">
    <gui-value value="Hello, world!" />
  </app-layout>,
);
