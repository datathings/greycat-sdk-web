import { GreyCat, runtime } from '@greycat/sdk';

// @greycat/ui
import '../../../src';

const greycat = await GreyCat.init({ url: new URL('http://localhost:8080') });

const app = document.getElementById('app') as HTMLDivElement;

const taskInfoComponent = document.createElement('gui-task-info') as GuiTaskInfo;
app.appendChild(taskInfoComponent);

taskInfoComponent.greyCat = greycat;

const task = await greycat.call('project::whatever') as runtime.Task;
const info = await greycat.call('runtime::Task::info', [task.user_id, task.task_id]);

taskInfoComponent.taskInfo = info;