import '@greycat/web';
import '~/common';

await gc.sdk.init();

const bins = await gc.project.one_d_histogram_bins();
document.body.appendChild(
  <app-layout title="Histogram 1D">
    <gui-histogram bins={bins}> </gui-histogram>
  </app-layout>,
);
