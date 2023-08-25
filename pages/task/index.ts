import { GreyCat, runtime } from '@greycat/sdk';

// @greycat/ui
import '../../src/bundle';

const greycat = window.greycat.default = await GreyCat.init({ url: new URL('http://localhost:8080') });

const app = document.getElementById('app') as HTMLDivElement;

const taskComponent = document.createElement('gui-task')!;
const taskInfoComponent = document.createElement('gui-task-info')!;
const taskCreateComponent = document.createElement('gui-task-create')!;
const taskHistoryListComponent = document.createElement('gui-task-history-list')!;
const taskRunningListComponent = document.createElement('gui-task-running-list')!;

taskComponent.greycat = greycat;
taskInfoComponent.greycat = greycat;
taskCreateComponent.greycat = greycat;
taskHistoryListComponent.greycat = greycat;
taskRunningListComponent.greycat = greycat;

app.appendChild(taskComponent);
app.appendChild(taskInfoComponent);
app.appendChild(taskCreateComponent);
app.appendChild(taskHistoryListComponent);
app.appendChild(taskRunningListComponent);

const task = await greycat.call<runtime.Task>('project::task_with_params', ['Beket', 24]);
console.log({ task });
taskComponent.task = task;

const info = await runtime.Task.info(task.user_id, task.task_id);
if (info !== null) {
  taskInfoComponent.taskInfo = info;
}

await greycat.call<runtime.Task>('project::task_long_running');
