import '@greycat/web';
import '@greycat/web/components/all.js';
import '@greycat/web/greycat.css';

await gc.sdk.init({ auth: { username: 'demo', password: 'demo' } });

gc.project.controlled_task.spawn(gc.core.duration.from_secs(60));
gc.project.controlled_task.spawn(gc.core.duration.from_secs(15));
gc.project.controlled_task.spawn(gc.core.duration.from_secs(30));
gc.project.controlled_task.spawn(gc.core.duration.from_secs(5));

const tasks = document.createElement('gui-tasks');
tasks.updateDelay = 500;
tasks.style.height = '100vh';

document.body.appendChild(tasks);
