import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

document.body.appendChild(
  appLayout({ title: 'Roles', mainStyle: { display: 'flex', flexDirection: 'column' } },
    <gui-roles />,
  ),
);
