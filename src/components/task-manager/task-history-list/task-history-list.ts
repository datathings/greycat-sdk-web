import { GreyCat, runtime, Value, core } from '@greycat/sdk';
import { TaskStatusEnum, parseTaskParams, timeToDate } from '../utils';

export class GuiTaskHistoryList extends HTMLElement {
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
  private _currentPage: number = 1;
  private _tasksPerPage: number = 10;
  private _totalPages: number = 1;
  
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

    const paginationControls = document.createElement('div');
    paginationControls.classList.add('pagination-controls');
    paginationControls.style.marginBottom = '10px';

    const pageSelector = document.createElement('div');
    pageSelector.classList.add('page-selector');

    const pageInput = document.createElement('input');
    pageInput.type = 'number';
    pageInput.min = '1';
    pageInput.value = this._currentPage.toString();

    const jumpButton = document.createElement('button');
    jumpButton.textContent = 'Jump';
    jumpButton.addEventListener('click', () => this._jumpToPage(pageInput.value)); 

    pageSelector.appendChild(pageInput);
    pageSelector.appendChild(jumpButton);

    componentDiv.appendChild(this._table);
    componentDiv.appendChild(paginationControls);
    componentDiv.appendChild(pageSelector);

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
  }

  private async render() {
    if (!this._greycat) {
      return;
    }

    if (!this._timeZone) {
      this._timeZone = core.TimeZone.Europe_Luxembourg(this._greycat);
    }
    
    const startIndex = (this._currentPage - 1) * this._tasksPerPage;
    this._tasks = await this._greycat?.call('runtime::Task::history', [startIndex, this._tasksPerPage]) as runtime.Task[];
    await this._updateTotalPagesNumber();

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
            // Time zone is set at the beginning of this function
            return task.creation ? timeToDate(task.creation, this._timeZone!) : "undefined";
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
    const paginationControls = this.querySelector('.pagination-controls')!;
  
    paginationControls.innerHTML = '';

    for (let i = 1; i <= this._totalPages; i++) {
      if (i === 1 || i === this._totalPages || Math.abs(i - this._currentPage) <= 2) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i.toString();
        pageButton.addEventListener('click', () => this._changePage(i - this._currentPage));
        paginationControls.appendChild(pageButton);
      } else if (
        (i === 2 && this._currentPage > 4) ||
        (i === this._totalPages - 1 && this._currentPage < this._totalPages - 3)
      ) {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '...';
        paginationControls.appendChild(ellipsis);
      }
    }

    const pageInput = this.querySelector('.page-selector input') as HTMLInputElement;
    pageInput.max = this._totalPages.toString();
    if (pageInput) {
      pageInput.value = this._currentPage.toString();
    }
  }

  private async _updateTotalPagesNumber() {
    const lastTask = await this._greycat?.call('runtime::Task::history', [0, 1]) as runtime.Task[];
    const lastTaskId = lastTask ? (lastTask[0] as runtime.Task).task_id : 0;
    this._totalPages = Math.ceil(lastTaskId as number / this._tasksPerPage);
  }

  private async _jumpToPage(pageNumber: string) {
    const parsedPageNumber = parseInt(pageNumber);
    await this._updateTotalPagesNumber();
  
    if (parsedPageNumber >= 1 && parsedPageNumber <= this._totalPages) {
      this._currentPage = parsedPageNumber;
      this.render();
    } else {
      console.error('Invalid page number.');
    }
  }

  private _changePage(change: number) {
    const newPage = this._currentPage + change;
    if (newPage >= 1) {
      this._currentPage = newPage;
      this.render();
    }
  }

  private _taskIsBeingExecuted(taskStatus: runtime.TaskStatus): boolean {
    if (this._greycat && 
      (taskStatus === runtime.TaskStatus.running(this._greycat)
      || taskStatus === runtime.TaskStatus.waiting(this._greycat))) {
        return true;
    }
    return false;
  }

  private async _taskReRunButtonHandler(task: runtime.Task) {
    const taskStatus = task.status;
    if (!this._greycat)
      return;
    if (this._taskIsBeingExecuted(taskStatus)) {
      console.error('Cannot run the task. It is being executed.');
      return;
    }
    const params = await parseTaskParams(this._greycat, task) as Value[];
    await this._greycat?.call(`${task.mod}::${task.fun}`, params);
    this.render();
  }
}

if (!customElements.get('gui-task-history-list')) {
  customElements.define('gui-task-history-list', GuiTaskHistoryList);
}

declare global {
  interface Window {
    GuiTaskHistoryList: typeof GuiTaskHistoryList;
  }
  interface HTMLElementTagNameMap {
    'gui-task-history-list': GuiTaskHistoryList;
  }
}