import '@greycat/web';
import '~/common';
import './index.css';

await gc.sdk.init();

const oneDHisto = (await gc.project.one_d_histo_example());
// const twoDHisto = (await gc.project.two_d_histo_example()) as util.Histogram;
document.body.appendChild(
  <app-layout title="Hello">
    <section>
      <gui-histogram value={oneDHisto}> </gui-histogram>
      {/* <gui-histogram value={twoDHisto}></gui-histogram> */}
    </section>
  </app-layout>,
);
