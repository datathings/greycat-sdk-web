import '@greycat/web';
import { appLayout } from '~/common';
import actions from './actions';

await gc.sdk.init({ debug: true });

const task = await gc.project.task_long_running.spawn();

document.body.appendChild(
  appLayout('Tasks - Info', actions, <gui-object value={task} />),
);
