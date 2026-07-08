import '@greycat/web';
import '@greycat/web/components/all.js';
import '@greycat/web/greycat.css';

await gc.sdk.init({ auth: { username: 'demo', password: 'demo' } });

const task = await gc.project.controlled_task.spawn(gc.core.duration.from_secs(15));

const details = document.createElement('gui-object');
details.value = task;
task.on('update', (t) => {
  details.value = t;
});

document.body.appendChild(details);
