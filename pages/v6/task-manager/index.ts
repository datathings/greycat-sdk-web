import { GreyCat, runtime, Abi, AbiReader, stdlib, Value } from '@greycat/sdk';

// @greycat/ui
import '../../../src';

const greycat = await GreyCat.init({ url: new URL('http://localhost:8080') });

const app = document.getElementById('app') as HTMLDivElement;

const taskInfoComponent = document.createElement('gui-task-info') as GuiTaskInfo;
const taskCreateComponent = document.createElement('gui-task-create') as GuiTaskCreate;
const taskHistoryListComponent = document.createElement('gui-task-history-list') as GuiTaskHistoryList;
app.appendChild(taskInfoComponent);
app.appendChild(taskCreateComponent);
app.appendChild(taskHistoryListComponent);

const task = await greycat.call('project::task_with_params', ['Beket', 24]) as runtime.Task;
const info = await runtime.Task.info(greycat, task.user_id, task.task_id);

taskInfoComponent.greyCat = greycat;
taskCreateComponent.greyCat = greycat;

taskHistoryListComponent.greyCat = greycat;
taskInfoComponent.taskInfo = info;