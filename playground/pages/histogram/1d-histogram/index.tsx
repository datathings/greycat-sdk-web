import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

const bins = await gc.project.one_d_histogram_bins();
document.body.appendChild(
  appLayout('Histogram 1D', <gui-histogram value={bins}> </gui-histogram>),
);
