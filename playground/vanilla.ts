import '@greycat/web';
import '@greycat/web/components/all.js';
import '@greycat/web/greycat.css';

await gc.sdk.init({ auth: { username: 'demo', password: 'demo' } });

const task0 = await gc.project.controlled_task.spawn(gc.core.duration.from_secs(60));

task0.on('update', (task) => {
  console.log(`received updated status for ${task.task_id} [${task.status.key}]`);
});
