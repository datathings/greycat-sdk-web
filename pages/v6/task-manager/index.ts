import { GreyCat, runtime } from '@greycat/sdk';

// @greycat/ui
import '../../../src';

const greycat = await GreyCat.init({ url: new URL('http://localhost:8080') });

const app = document.getElementById('app') as HTMLDivElement;

const taskInfoComponent = document.createElement('gui-task-info') as GuiTaskInfo;
const taskCreateComponent = document.createElement('gui-task-create') as GuiTaskCreate;
const taskListComponent = document.createElement('gui-task-list') as GuiTaskList;
app.appendChild(taskInfoComponent);
app.appendChild(taskCreateComponent);
app.appendChild(taskListComponent);

const task = await greycat.call('project::task_without_params') as runtime.Task;
const info = await greycat.call('runtime::Task::info', [task.user_id, task.task_id]) as runtime.TaskInfo;

taskInfoComponent.greyCat = greycat;
taskCreateComponent.greyCat = greycat;
taskListComponent.greyCat = greycat;

taskInfoComponent.taskInfo = info;