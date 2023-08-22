import { GreyCat, runtime, core } from '@greycat/sdk';

// @greycat/ui
import '../../../src';

const greycat = await GreyCat.init({ url: new URL('http://localhost:8080') });

const app = document.getElementById('app') as HTMLDivElement;

const taskInfoComponent = document.createElement('gui-task-info') as GuiTaskInfo;
const taskCreateComponent = document.createElement('gui-task-create') as GuiTaskCreate;
const taskHistoryListComponent = document.createElement('gui-task-history-list') as GuiTaskHistoryList;
const taskRunningListComponent = document.createElement('gui-task-running-list') as GuiTaskRunningList;
app.appendChild(taskInfoComponent);
app.appendChild(taskCreateComponent);
app.appendChild(taskHistoryListComponent);
app.appendChild(taskRunningListComponent);

taskInfoComponent.greycat = greycat;
taskCreateComponent.greycat = greycat;
taskHistoryListComponent.greycat = greycat;
taskRunningListComponent.greycat = greycat;


const task = await greycat.call('project::task_with_params', ['Beket', 24]) as runtime.Task;
const info = await runtime.Task.info(greycat, task.user_id, task.task_id);

//const task_long = await greycat.call('project::task_long_running') as runtime.Task;

taskInfoComponent.taskInfo = info;
taskInfoComponent.timeZone = 'Europe/Luxembourg';