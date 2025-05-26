import '@greycat/web';
import '~/common';
import './style.css';

await gc.sdk.init();

const value = new gc.util.Gaussian(4400000, 10080000000000, 4, 200000, 3000000);

document.body.appendChild(
  <app-layout title="Gaussian">
    <gui-gaussian value={value} />
  </app-layout>,
);
