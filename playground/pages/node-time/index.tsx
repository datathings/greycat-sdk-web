import '@greycat/web';
import { appLayout } from '~/common';

/* const greycat = */ await gc.sdk.init({ debug: true });

// const root = await greycat.root();
// const nt_a = root['node_time::nt_small_a'];
// const nt_b = root['node_time::nt_small_b'];

document.body.appendChild(
  appLayout(
    'nodeTime',
    <div>WIP</div>
    // <gui-node-time maxRows={50} value={[nt_a, nt_b]} names={['a', 'b']} activeTab="Chart" />,
  ),
);
