import '@greycat/web';
import { appLayout } from '~/common';

const greycat = await gc.sdk.init({ debug: true });

document.body.appendChild(
  appLayout('Root',
    <gui-object header value={await greycat.root()} style={{ display: 'inline-block' }} />,
  ),
);
