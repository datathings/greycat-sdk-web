import { GreyCat, runtime, core } from '@greycat/sdk';
import { TaskStatusEnum, timeToDate } from '../utils.js';

export class GuiTaskRunningList extends HTMLElement {
  private _greycat: GreyCat = window.greycat.default;
  private _tasks: Array<runtime.Task> = [];
  private _table: HTMLTableElement = document.createElement('table');
  private _headers: Array<string> = ['Task Id', 'User Id', '"module"."fn"', 'Created', 'Status'];
  private _timeZone: core.TimeZone | null = null;

  connectedCallback() {
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    this._headers.forEach((headerName) => {
      const th = document.createElement('th');
      th.textContent = headerName;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    this._table.appendChild(thead);
    this._table.classList.add('table-style');

    this.appendChild(this._table);
    this.render();
  }

  set greycat(greycat: GreyCat) {
    this._greycat = greycat;
    this.render();
  }

  set timeZone(t: core.TimeZone) {
    this._timeZone = t;
    this.render();
  }

  private async render() {
    if (!this._timeZone) {
      this._timeZone = core.TimeZone.Europe_Luxembourg(this._greycat);
    }

    try {
      this._tasks = await runtime.Task.running(this._greycat);
    } catch (error) {
      this._handleError(error as Error);
    }

    const tbody = this._table.querySelector('tbody');
    if (tbody) {
      tbody.remove();
    }

    const newTbody = document.createElement('tbody');

    this._tasks.forEach((task) => {
      const row = document.createElement('tr');
      const selectedUserAttributes = this._headers.map((headerName) => {
        switch (headerName) {
          case 'Task Id':
            return task.task_id.toString();
          case 'User Id':
            return task.user_id.toString();
          case '"module"."fn"':
            return `${task.mod}::${task.fun}`;
          case 'Created':
            // timezone is set at the beginning of this function
            return timeToDate(task.creation!, this._timeZone!);
          case 'Status':
            return TaskStatusEnum[task.status.value as number] ?? '';
          default:
            return '';
        }
      });
      selectedUserAttributes.forEach((taskDetail) => {
        const cell = document.createElement('td');
        cell.textContent = taskDetail;
        row.appendChild(cell);
      });

      const cancelButtonCell = document.createElement('td');
      const cancelButton = document.createElement('button');
      cancelButton.textContent = 'cancel';
      cancelButton.classList.add('cancel-task-button');
      cancelButton.addEventListener('click', () => {
        this._taskCancelTaskButtonHandler(task);
      });
      cancelButtonCell.appendChild(cancelButton);
      row.appendChild(cancelButtonCell);

      newTbody.appendChild(row);
    });

    this._table.appendChild(newTbody);
  }

  private _taskIsBeingExecuted(taskStatus: runtime.TaskStatus): boolean {
    if (taskStatus === runtime.TaskStatus.running(this._greycat) ||
        taskStatus === runtime.TaskStatus.waiting(this._greycat)) {
      return true;
    }
    return false;
  }

  private async _taskCancelTaskButtonHandler(task: runtime.Task) {
    const taskStatus = task.status;
    try {
      if (!this._taskIsBeingExecuted(taskStatus)) {
        throw new Error('Cannot cancel task. It is not being executed.');
      }
      await runtime.Task.cancel(task.task_id, this._greycat);
      this.render();
    } catch (error) {
      this._handleError(error as Error);
    }
  }

  private _handleError(error: Error) {
    // TODO Replace this with User friendly functionality for error notification
    console.error('An error occured: ', error);
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
