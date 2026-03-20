import '@greycat/web';
import { appLayout } from '~/common';
import './index.css';

await gc.sdk.init({ debug: true });

document.body.appendChild(
  appLayout({ title: 'Usage' },
    <gui-card>
      <header slot="header">Monitor</header>
      <gui-runtime-usage />
    </gui-card>,
  ),
);
