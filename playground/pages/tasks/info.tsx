import '@greycat/web';
import '~/common';
import actions from './actions';

await gc.sdk.init();

const task = await gc.project.task_long_running.spawn();

document.body.appendChild(
  <app-layout title="Tasks - Info">
    {actions}
    <gui-object value={task} />
  </app-layout>,
);
