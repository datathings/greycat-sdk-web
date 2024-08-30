import { $, GreyCat, IndexedDbCache, util } from '@greycat/web';
import '@/common';
import './index.css';
await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const oneDHisto = (await $.default.call('project::one_d_histo_example', [])) as util.Histogram;
const twoDHisto = (await $.default.call('project::two_d_histo_example', [])) as util.Histogram;
const threeDHisto = (await $.default.call('project::three_d_histo_example', [])) as util.Histogram;
document.body.appendChild(
  <app-layout title="Hello">
    <section>
      <gui-histogram value={threeDHisto}> </gui-histogram>
      <gui-histogram value={oneDHisto}> </gui-histogram>
      <gui-histogram value={twoDHisto}></gui-histogram>
    </section>
  </app-layout>,
);
