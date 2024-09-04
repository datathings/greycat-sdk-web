import { $, GreyCat, IndexedDbCache, util } from '@greycat/web';
import '@/common';
import './index.css';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const gaussian = (await $.default.call('project::one_d_gaussian_example')) as util.GaussianProfile;
const gaussian2 = (await $.default.call('project::two_d_gaussian_example')) as util.GaussianProfile;

document.body.appendChild(
  <app-layout title="Hello">
    <section>
      <gui-gaussian-profile mode="std" value={gaussian}></gui-gaussian-profile>
      <gui-gaussian-profile mode="std" value={gaussian2}></gui-gaussian-profile>
    </section>
  </app-layout>,
);
