import '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

const tensor = await gc.project.tensor_3_5();

document.body.appendChild(
  <app-layout title="Tensor" mainStyle={{ display: 'grid' }}>
    <gui-tensor value={tensor} />
  </app-layout>,
);
