import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

const tensor = await gc.project.tensor_3_5();

document.body.appendChild(
  appLayout({ title: 'Tensor', mainStyle: { display: 'grid' } },
    <gui-tensor value={tensor} />,
  ),
);
