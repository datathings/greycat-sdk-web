import '~/common';

await gc.sdk.init({ debug: true });

document.body.appendChild(
  <app-layout title="Logs">
    <gui-logs />
  </app-layout>,
);
