import { GreyCat, runtime } from '@greycat/sdk';
import { TaskStatusEnum } from './utils';

export class GuiTaskList extends HTMLElement {
  private _greyCat: GreyCat;
  private _tasks: Array<runtime.Task> = [];
  private _table: HTMLTableElement;
  private _headers: Array<String> = [
    'Task Id',
    'User Id',
    '\"module\".\"fn\"',
    'Created / Started',
    'Status',
  ];
  
  connectedCallback() {
    const componentDiv = document.createElement('div');
    componentDiv.classList.add('component');
    componentDiv.style.border = '1px solid #ccc';
    componentDiv.style.padding = '10px';
    componentDiv.style.overflow = 'auto';
    
    this._table = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    this._headers.forEach((headerName) => {
      headerRow.innerHTML += `<th>${headerName}</th>`;
    });
    thead.appendChild(headerRow);
    this._table.appendChild(thead);

    componentDiv.appendChild(this._table);

    this.appendChild(componentDiv);
  }

  set greyCat(greyCat: GreyCat) {
    this._greyCat = greyCat;
    this.render();
  }

  set tasks(infos: Array<runtime.Task>) {
    this._tasks = infos;
    this.render();
  }

  get tasks(): Array<runtime.Task> {
    return this._tasks;
  }

  private async render() {
    if (!this._greyCat)
      return;
    
    this._tasks = await this._greyCat?.call('runtime::Task::history', [0, 10]) as runtime.Task[];

    const tbody = this._table.querySelector('tbody');
    if (tbody) {
      tbody.remove();
    }

    const newTbody = document.createElement('tbody');

    this._tasks.forEach((task) => {
      const row = document.createElement('tr');
      const selectedUserAttirbutes = this._headers.map((headerName) => {
        switch (headerName) {
          case 'Task Id':
            return task.task_id;
          case 'User Id':
            return task.user_id;
          case '\"module\".\"fn\"':
            return `${task.mod}::${task.fun}`;
          case 'Created / Started':
            return task.creation.value;
          case 'Status':
            return TaskStatusEnum[task.status.value as number] ?? "";
          default:
            return;
        }
      });
      selectedUserAttirbutes.forEach((taskDetail) => {
        row.innerHTML += `<td>${taskDetail}</td>`;
      });
      row.innerHTML += `<td><button class="re-run-button">re-run</button></td>`;
      const reRunButton = row.querySelector('.re-run-button')!;
      reRunButton.addEventListener('click', () => {
        this._taskReRunButtonHandler(task);
      });
      newTbody.appendChild(row);
    });

    this._table.appendChild(newTbody);
    this._table.style.width = '100%';
  }

  private _taskIsBeingExecuted(taskStatus: runtime.TaskStatus): boolean {
    if (this._greyCat && 
      (taskStatus === runtime.TaskStatus.running(this._greyCat)
      || taskStatus === runtime.TaskStatus.waiting(this._greyCat))) {
        return true;
    }
    return false;
  }

  private async _taskReRunButtonHandler(task: runtime.Task) {
    const taskStatus = task.status;
    if (!this._greyCat)
      return;
    if (this._taskIsBeingExecuted(taskStatus)) {
      console.error('Cannot run the task. It is being executed.');
      return;
    }
    // TODO: re-run the task with parameters 
  }
}

if (!customElements.get('gui-task-list')) {
  customElements.define('gui-task-list', GuiTaskList);
}


declare global {
  interface Window {
    GuiTaskList: typeof GuiTaskList;
  }
  interface HTMLElementTagNameMap {
    'gui-task-list': GuiTaskList;
  }
}