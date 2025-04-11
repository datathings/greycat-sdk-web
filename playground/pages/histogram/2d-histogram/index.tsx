import '@greycat/web';
import '~/common';

await gc.sdk.init();

const oneDHisto = await gc.project.twod_histogram_bins();
document.body.appendChild(
  <app-layout title="Hello">
    <gui-histogram value={oneDHisto}> </gui-histogram>
  </app-layout>,
);
