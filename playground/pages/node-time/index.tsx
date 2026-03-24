import '@greycat/web';
import { appLayout } from '~/common';

const greycat = await gc.sdk.init({ debug: true });

const root = await greycat.root();
const nt = root['node_time::nt_multi'];

document.body.appendChild(appLayout('nodeTime', <gui-node-time value={nt} />));
