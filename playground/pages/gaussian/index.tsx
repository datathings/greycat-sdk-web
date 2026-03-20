import '@greycat/web';
import { appLayout } from '~/common';
import './style.css';

await gc.sdk.init({ debug: true });

const value = new gc.util.Gaussian(4400000, 10080000000000, 4, 200000, 3000000);

document.body.appendChild(
  appLayout('Gaussian',
    <gui-gaussian value={value} />,
  ),
);
