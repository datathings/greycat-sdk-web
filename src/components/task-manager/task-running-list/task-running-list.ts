import { GreyCat, runtime } from '@greycat/sdk';
import { TaskStatusEnum, timeToDate } from '../utils';

export class GuiTaskRunningList extends HTMLElement {
  private _greyCat: GreyCat | null = null;
  private _tasks: Array<runtime.Task> = [];
  private _table: HTMLTableElement = document.createElement('table');
  private _headers: Array<String> = [
    'Task Id',
    'User Id',
    '\"module\".\"fn\"',
    'Created',
    'Status',
  ];
  private _timeZone: string = 'Europe/Luxembourg';
  
  connectedCallback() {
    const componentDiv = document.createElement('div');
    componentDiv.classList.add('component');
    componentDiv.style.border = '1px solid #ccc';
    componentDiv.style.padding = '10px';
    componentDiv.style.overflow = 'auto';
    

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    this._headers.forEach((headerName) => {
      headerRow.innerHTML += `<th>${headerName}</th>`;
    });
    thead.appendChild(headerRow);
    this._table.appendChild(thead);
    this._table.style.marginBottom = '10px';

    componentDiv.appendChild(this._table);
    this.appendChild(componentDiv);
  }

  set greyCat(greyCat: GreyCat) {
    this._greyCat = greyCat;
    this.render();
  }

  set timeZone(timeZone: string) {
    this._timeZone = timeZone;
    this.render();
  }

  private async render() {
    if (!this._greyCat)
      return;
    
    this._tasks = await this._greyCat?.call('runtime::Task::running') as runtime.Task[];

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
          case 'Created':
            return timeToDate(task.creation!, this._timeZone);
          case 'Status':
            return TaskStatusEnum[task.status.value as number] ?? "";
          default:
            return;
        }
      });
      selectedUserAttirbutes.forEach((taskDetail) => {
        row.innerHTML += `<td>${taskDetail}</td>`;
      });
      row.innerHTML += `<td><button class="cancel-task-button">cancel</button></td>`;
      const reRunButton = row.querySelector('.cancel-task-button')!;
      reRunButton.addEventListener('click', () => {
        this._taskCancelTaskButtonHandler(task);
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

  private async _taskCancelTaskButtonHandler(task: runtime.Task) {
    const taskStatus = task.status;
    if (!this._greyCat)
      return;
    if (!this._taskIsBeingExecuted(taskStatus)) {
      console.error('Cannot cancel task. It is not being executed.');
      return;
    }
    await runtime.Task.cancel(this._greyCat, task.task_id);
    this.render();
  }
}

if (!customElements.get('gui-task-running-list')) {
  customElements.define('gui-task-running-list', GuiTaskRunningList);
}

declare global {
  interface Window {
    GuiTaskRunningList: typeof GuiTaskRunningList;
  }
  interface HTMLElementTagNameMap {
    'gui-task-running-list': GuiTaskRunningList;
  }
}