import { GreyCat, runtime } from '@greycat/sdk';

import '../common';

const app = document.getElementById('app') as HTMLDivElement;

try {
  const greycat = window.greycat.default = await GreyCat.init({ url: new URL('http://localhost:8080') });

  const taskInfo = document.createElement('gui-task-info')!;
  const taskHistory = document.createElement('gui-task-history-list')!;
  const runningTasks = document.createElement('gui-task-running-list')!;

  taskHistory.addEventListener('history-tasks-list-click', (ev) => {
    window.alert(`Task_id: ${ev.detail.task_id}\nModule ${ev.detail.mod}::${ev.detail.fun}`);
  });

  runningTasks.addEventListener('running-tasks-list-click', (ev) => {
    window.alert(`Task_id: ${ev.detail.task_id}\nModule ${ev.detail.mod}::${ev.detail.fun}`);
  });

  app.appendChild(taskInfo);
  app.appendChild(taskHistory);
  app.appendChild(runningTasks);

  const task = await greycat.call<runtime.Task>('project::task_with_params', ['Beket', 24]);
  console.log({ task });
  taskInfo.taskInfo = task;

  const info = await runtime.Task.info(task.user_id, task.task_id);
  if (info !== null) {
    taskInfo.taskInfo = info;
  }

  await greycat.call<runtime.Task>('project::task_long_running');
} catch (err) {
  console.error(err);
  app.textContent = `Is GreyCat started?`;
}
