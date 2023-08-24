import { GreyCat, runtime, core } from '@greycat/sdk';
import { TaskStatusEnum, timeToDate } from '../utils';

export class GuiTaskHistoryList extends HTMLElement {
  private _greycat: GreyCat | null = null;
  private _tasks: Array<runtime.Task> = [];
  private _table: HTMLTableElement = document.createElement('table');
  private _headers: Array<string> = ['Task Id', 'User Id', '"module"."fn"', 'Created', 'Status'];
  private _paginationControls: HTMLDivElement = document.createElement('div');
  private _timeZone: core.TimeZone | null = null;
  private _currentPage: number = 1;
  private _tasksPerPage: number = 10;
  private _totalPages: number = 0;

  connectedCallback() {
    const fragment = document.createDocumentFragment();

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

    this._paginationControls.classList.add('pagination-controls');

    const pageSelector = document.createElement('div');
    pageSelector.classList.add('page-selector');

    const jumpPageContainer = document.createElement('div');
    jumpPageContainer.classList.add('input-container');

    const jumpPageInput = document.createElement('input');
    jumpPageInput.type = 'number';
    jumpPageInput.min = '1';
    jumpPageInput.value = this._currentPage.toString();
    jumpPageInput.classList.add('page-input');

    const jumpButton = document.createElement('button');
    jumpButton.textContent = 'Jump to page';
    jumpButton.classList.add('jump-button');
    jumpButton.addEventListener('click', () => this._jumpToPage(jumpPageInput.value));

    const tasksPerPageContainer = document.createElement('div');
    tasksPerPageContainer.classList.add('tasks-per-page-container');

    const tasksPerPageLabel = document.createElement('label');
    tasksPerPageLabel.textContent = 'Tasks Per Page';
    tasksPerPageLabel.classList.add('tasks-per-page-label');

    const tasksPerPageInput = document.createElement('input');
    tasksPerPageInput.type = 'number';
    tasksPerPageInput.min = '1';
    tasksPerPageInput.max = '1000';
    tasksPerPageInput.value = this._tasksPerPage.toString();
    tasksPerPageInput.addEventListener('input', (event) => this._handleTasksPerPageChange(event));
    tasksPerPageInput.classList.add('tasks-per-page-input');

    tasksPerPageContainer.appendChild(tasksPerPageInput);
    tasksPerPageContainer.appendChild(tasksPerPageLabel);

    jumpPageContainer.appendChild(jumpPageInput);
    jumpPageContainer.appendChild(jumpButton);

    pageSelector.appendChild(jumpPageContainer);
    pageSelector.appendChild(this._paginationControls);
    pageSelector.appendChild(tasksPerPageContainer);

    fragment.appendChild(this._table);
    fragment.appendChild(pageSelector);

    this.appendChild(fragment);
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

  private _handleTasksPerPageChange(event: Event) {
    try {
      const tasksPerPageInput = event.target as HTMLInputElement;
      const newTasksPerPage = parseInt(tasksPerPageInput.value);
      if (!isNaN(newTasksPerPage) && newTasksPerPage >= 1) {
        this._tasksPerPage = newTasksPerPage;
        this.render();
      } else {
        throw new Error('Couldn\'t parse the number of tasks per page');
      }
    } catch (error) {
      this._handleError(error as Error);
    }
  }

  private async render() {
    if (!this._greycat) {
      return;
    }

    if (!this._timeZone) {
      this._timeZone = core.TimeZone.Europe_Luxembourg(this._greycat);
    }

    const startIndex = (this._currentPage - 1) * this._tasksPerPage;

    try {
      if (startIndex >= 0)
        this._tasks = await runtime.Task.history(startIndex, this._tasksPerPage, this._greycat);
      await this._updateTotalPagesNumber();
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
            return task.creation ? timeToDate(task.creation, this._timeZone!) : 'undefined';
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

      newTbody.appendChild(row);
    });

    this._table.appendChild(newTbody);
    this._updatePagination();
  }

  private async _updateTotalPagesNumber() {
    if (!this._greycat) {
      return;
    }
    try {
      const lastTask = await runtime.Task.history(0, 1, this._greycat);
      const lastTaskId = lastTask && lastTask[0] ? (lastTask[0] as runtime.Task).task_id : 0;
      this._totalPages = Math.ceil((lastTaskId as number) / this._tasksPerPage);
    } catch (error) {
      this._handleError(error as Error);
    }
  }

  private _updatePagination() {
    this._paginationControls.textContent = '';

    const buttonsToShow: Array<number | string> = [1];

    if (this._totalPages > 5) {
      if (this._currentPage > 4) {
        buttonsToShow.push('...');
      }
      for (let i = Math.max(2, this._currentPage - 2); i <= Math.min(this._totalPages - 1, this._currentPage + 2); i++) {
        buttonsToShow.push(i);
      }
      if (this._currentPage < this._totalPages - 3) {
        buttonsToShow.push('...');
      }
    } else {
      for (let i = 2; i <= this._totalPages - 1; i++) {
        buttonsToShow.push(i);
      }
    }

    buttonsToShow.push(this._totalPages);

    buttonsToShow.forEach((buttonValue) => {
      const pageButton = document.createElement('button');
      pageButton.textContent = typeof buttonValue === 'number' ? buttonValue.toString() : '...';

      if (typeof buttonValue === 'number') {
        pageButton.addEventListener('click', () =>
          this._changePage(buttonValue - this._currentPage),
        );
      }

      this._paginationControls.appendChild(pageButton);
    });

    const pageInput = this.querySelector('.page-selector input') as HTMLInputElement;
    pageInput.max = this._totalPages.toString();
    if (pageInput) {
      pageInput.value = this._currentPage.toString();
    }
  }

  private async _jumpToPage(pageNumber: string) {
    try {
      const parsedPageNumber = parseInt(pageNumber);
      await this._updateTotalPagesNumber();

      if (parsedPageNumber >= 1 && parsedPageNumber <= this._totalPages) {
        this._currentPage = parsedPageNumber;
        this.render();
      } else {
        throw new Error("Invalid page number.");
      }
    } catch (error) {
      this._handleError(error as Error);
    }
  }

  private _handleError(error: Error) {
    // TODO: Change to user friendly error notification
    console.error(error);
  }

  private _changePage(change: number) {
    const newPage = this._currentPage + change;
    if (newPage >= 1) {
      this._currentPage = newPage;
      this.render();
    }
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
