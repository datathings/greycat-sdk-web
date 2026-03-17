import '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

//const oneDHisto = await gc.project.twod_histogram_bins();
document.body.appendChild(
  <app-layout title="Histogram 2D">{/* <gui-histogram value={oneDHisto}> </gui-histogram> */}</app-layout>,
);
