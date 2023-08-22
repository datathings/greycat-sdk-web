import { GreyCat, runtime, core } from '@greycat/sdk';
import { TaskStatusEnum, timeToDate } from '../utils';

export class GuiTaskRunningList extends HTMLElement {
  private _greycat: GreyCat | null = null;
  private _tasks: Array<runtime.Task> = [];
  private _table: HTMLTableElement = document.createElement('table');
  private _headers: Array<String> = [
    'Task Id',
    'User Id',
    '\"module\".\"fn\"',
    'Created',
    'Status',
  ];
  private _timeZone: core.TimeZone | null = null;
  
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

  set greycat(greycat: GreyCat) {
    this._greycat = greycat;
    this.render();
  }

  set timeZone(t: core.TimeZone) {
    if (!this._greycat) {
      return;
    }
    this._timeZone = t;
    this.render();
  }

  private async render() {
    if (!this._greycat) {
      return;
    }

    if (!this._timeZone) {
      this._timeZone = core.TimeZone.Europe_Luxembourg(this._greycat);
    }
    
    this._tasks = await this._greycat?.call('runtime::Task::running') as runtime.Task[];

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
            // timezone is set at the beginning of this function
            return timeToDate(task.creation!, this._timeZone!);
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
    if (this._greycat && 
      (taskStatus === runtime.TaskStatus.running(this._greycat)
      || taskStatus === runtime.TaskStatus.waiting(this._greycat))) {
        return true;
    }
    return false;
  }

  private async _taskCancelTaskButtonHandler(task: runtime.Task) {
    const taskStatus = task.status;
    if (!this._greycat)
      return;
    if (!this._taskIsBeingExecuted(taskStatus)) {
      console.error('Cannot cancel task. It is not being executed.');
      return;
    }
    await runtime.Task.cancel(this._greycat, task.task_id);
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