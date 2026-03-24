import '@greycat/web';
import { appLayout } from '~/common';

const greycat = await gc.sdk.init({ debug: true });

const root = await greycat.root();
const nt_temp = root['node_time::nt_temperature'];
const nt_multi = root['node_time::nt_multi'];

document.body.appendChild(
  appLayout(
    'nodeTime',
    <gui-node-time maxRows={1000} value={[nt_multi, nt_temp]} names={['sensor', 'temp']} />,
  ),
);
