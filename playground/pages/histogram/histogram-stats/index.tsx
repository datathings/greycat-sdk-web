import '@greycat/web';
import '~/common';

await gc.sdk.init();

const stats = await gc.project.histogram_stats();
document.body.appendChild(
  <app-layout title="Histogram Stats">
    <gui-histogram stats={stats ?? undefined}> </gui-histogram>
  </app-layout>,
);
