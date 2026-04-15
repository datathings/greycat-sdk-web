import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

document.body.appendChild(
  appLayout('Logs', <gui-logs />),
);
