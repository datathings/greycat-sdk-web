import { GreyCat, runtime, Abi, AbiReader, stdlib, Value } from '@greycat/sdk';

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

const task = await greycat.call('project::task_with_params', ['Beket', 24]) as runtime.Task;
// TODO Use runtime.Task.info();
const info = await greycat.call('runtime::Task::info', [task.user_id, task.task_id]) as runtime.TaskInfo;

taskInfoComponent.greyCat = greycat;
taskCreateComponent.greyCat = greycat;

taskListComponent.greyCat = greycat;
taskInfoComponent.taskInfo = info;
/*

const data = await fetch(`${greycat.api}/files/${task.user_id}/tasks/${task.task_id}/`)
  .then(response => response.arrayBuffer());

console.log(data);
const reader = new AbiReader(greycat.abi, data);

let res: Value[] = [];

reader.headers();
while (!reader.is_empty) {
  res.push(reader.deserialize());
}

console.log(res);*/