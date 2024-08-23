import { GreyCat, std, $ } from '../../../exports.js';
import { TaskInfoLike } from '../task-info/common.js';

export type TaskKind = 'running' | 'history';

export class GuiTaskList extends HTMLElement {
  private _kind: TaskKind = 'history';
  private _currentPageEl = document.createElement('input');
  private _prevPageEl = document.createElement('button');
  private _nextPageEl = document.createElement('button');
  private _tasksPerPageEl = document.createElement('input');
  private _thead = document.createElement('thead');
  private _nbTotal = Infinity;
  private _footer: HTMLElement;
  private _tasks: TaskInfoLike[] = [];
  private _tbody = document.createElement('tbody');
  private _greycat = $.default;
  private _updateDelay = 5000;
  private _updateIntervalId = -1;

  constructor() {
    super();

    this._tbody.addEventListener('click', (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      if (ev.target instanceof HTMLTableCellElement) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const task = (ev.target.parentElement as any).task;
        this.dispatchEvent(new GuiTaskListClickEvent(task));
        return;
      }
      if (ev.target instanceof HTMLTableRowElement) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const task = (ev.target as any).task;
        this.dispatchEvent(new GuiTaskListClickEvent(task));
      }
    });

    this._currentPageEl.type = 'number';
    this._currentPageEl.valueAsNumber = 1;
    this._currentPageEl.title = 'Current page index';
    this._currentPageEl.min = '1';
    this._currentPageEl.addEventListener('change', () => {
      const currPage = this._currentPageEl.valueAsNumber;
      const lastPage = Math.ceil((this._nbTotal - 1) / this._tasksPerPageEl.valueAsNumber);

      // handle bounds
      if (currPage < 1) {
        // prevent erroneous changes
        this._currentPageEl.valueAsNumber = 1;
        this._prevPageEl.disabled = true;
        this._nextPageEl.disabled = false;
        return;
      } else if (currPage > lastPage) {
        this._currentPageEl.valueAsNumber = lastPage;
        this._prevPageEl.disabled = false;
        this._nextPageEl.disabled = true;
        return;
      }

      this._prevPageEl.disabled = this._currentPageEl.valueAsNumber === 1;
      this._nextPageEl.disabled = this._currentPageEl.valueAsNumber === lastPage;

      this.updateTasks();
    });

    this._prevPageEl.textContent = 'Prev';
    this._prevPageEl.disabled = true;
    this._prevPageEl.addEventListener('click', () => {
      if (this._currentPageEl.valueAsNumber > 1) {
        this._currentPageEl.valueAsNumber = this._currentPageEl.valueAsNumber - 1;
        if (this._currentPageEl.valueAsNumber === 1) {
          this._prevPageEl.disabled = true;
        } else {
          this._prevPageEl.disabled = false;
        }
        this._nextPageEl.disabled = false;
        this.updateTasks();
      }
    });

    this._nextPageEl.textContent = 'Next';
    this._nextPageEl.addEventListener('click', () => {
      this._prevPageEl.disabled = false;
      this._currentPageEl.valueAsNumber = this._currentPageEl.valueAsNumber + 1;
      this.updateTasks();
    });

    this._tasksPerPageEl.type = 'number';
    this._tasksPerPageEl.valueAsNumber = 10;
    this._tasksPerPageEl.title = 'Tasks per page';
    this._tasksPerPageEl.min = '1';
    this._tasksPerPageEl.addEventListener('change', () => {
      if (this._tasksPerPageEl.valueAsNumber < 1) {
        // prevent erroneous changes
        this._tasksPerPageEl.valueAsNumber = 1;
      }
      this.updateTasks();
    });

    this._footer = (
      <footer>
        <div>{this._currentPageEl}</div>
        <div>
          {this._prevPageEl}
          {this._nextPageEl}
        </div>
        <div>{this._tasksPerPageEl}</div>
      </footer>
    ) as HTMLElement;
  }

  connectedCallback() {
    this.appendChild(
      <article>
        <table role="grid">
          {this._thead}
          {this._tbody}
        </table>
        {this._footer}
      </article>,
    );

    this._updateIntervalId = setInterval(() => this.updateTasks(), this._updateDelay);
  }

  disconnectedCallback() {
    clearInterval(this._updateIntervalId);
    this.replaceChildren();
  }

  render() {
    switch (this._kind) {
      case 'running':
        this._thead.replaceChildren(
          <tr>
            <th>Task ID</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Started</th>
            <th>Duration</th>
            <th>Remaining</th>
            <th>Progress</th>
          </tr>,
        );
        break;
      default:
      case 'history':
        this._thead.replaceChildren(
          <tr>
            <th>Task ID</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Created</th>
            <th>Status</th>
          </tr>,
        );
        break;
    }

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < this._tasks.length; i++) {
      const task = this._tasks[i];
      const fqn = task.type ? `${task.mod}::${task.type}::${task.fun}` : `${task.mod}::${task.fun}`;

      let row: HTMLTableRowElement;
      switch (this._kind) {
        case 'running':
          row = (
            <tr>
              <td>{task.task_id}</td>
              <td>{task.user_id}</td>
              <td>{fqn}</td>
              <td>{task.start}</td>
              <td>{task.duration}</td>
              <td>{task.remaining}</td>
              <td>{task.progress ? (task.progress * 100).toFixed() + '%' : null}</td>
            </tr>
          ) as HTMLTableRowElement;
          break;

        default:
        case 'history':
          row = (
            <tr>
              <td>{task.task_id}</td>
              <td>{task.user_id}</td>
              <td>{fqn}</td>
              <td>{task.creation}</td>
              <td>{task.status.key}</td>
            </tr>
          ) as HTMLTableRowElement;
          break;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (row as any).task = task;
      fragment.appendChild(row);
    }
    this._tbody.replaceChildren(fragment);

    if (this._tasks.length === 0) {
      // colSpan equals the number of header cells (<th />)
      const colSpan = this._thead.children[0].children.length;
      this._tbody.replaceChildren(
        <tr>
          <td colSpan={colSpan}>
            <center>
              <em className="text-muted">Empty list</em>
            </center>
          </td>
        </tr>,
      );
      this._footer.style.display = 'none';
    } else if (this._nbTotal <= this._tasksPerPageEl.valueAsNumber) {
      this._footer.style.display = 'none';
    } else {
      this._footer.style.display = 'flex';
    }
  }

  async updateTasks(): Promise<void> {
    switch (this._kind) {
      case 'history': {
        // this is just a way to always get an accurate nbTotal even when not on the first page
        // and the users ask to update the tasks
        const tasks = await std.runtime.Task.history(0, 1, this._greycat);
        if (tasks.length > 0) {
          this._nbTotal = tasks[0].task_id as number;
        }

        const offset = (this._currentPageEl.valueAsNumber - 1) * this._tasksPerPageEl.valueAsNumber;
        const max = this._tasksPerPageEl.valueAsNumber;
        this._tasks = await std.runtime.Task.history(offset, max, this._greycat);

        if (offset + max >= this._nbTotal) {
          // we are past the end
          this._nextPageEl.disabled = true;
        }
        break;
      }
      case 'running': {
        this._tasks = await std.runtime.Task.running(this._greycat);
        this._nbTotal = -1; // no pagination for running list
        break;
      }
    }

    this.render();
  }

  get value() {
    return this._tasks;
  }

  set value(value: TaskInfoLike[]) {
    this._tasks = value;
    this.render();
  }

  set kind(kind: TaskKind) {
    this._kind = kind;
    this.updateTasks();
  }

  get kind() {
    return this._kind;
  }

  /**
   * *Only used when `kind === 'history'`.*
   *
   * Defines the starting listing offset for the tasks.
   */
  set page(index: number) {
    this._currentPageEl.valueAsNumber = index < 1 ? 1 : index;
    this.updateTasks();
  }

  get page() {
    return this._currentPageEl.valueAsNumber;
  }

  /**
   * *Only used when `kind === 'history'`.*
   *
   * Defines the maximum number of tasks to retrieve from history.
   */
  set tasksPerPage(max: number) {
    this._tasksPerPageEl.valueAsNumber = max;
    this.updateTasks();
  }

  get tasksPerPage() {
    return this._tasksPerPageEl.valueAsNumber;
  }

  get currentPage() {
    return this._currentPageEl.valueAsNumber;
  }

  set greycat(greycat: GreyCat) {
    this._greycat = greycat;
    this.updateTasks();
  }

  get updateDelay() {
    return this._updateDelay;
  }

  /**
   * Delay in milliseconds between updates.
   *
   * Disable the automatic updates by setting it to `-1`.
   */
  set updateDelay(updateDelay: number) {
    this._updateDelay = updateDelay;
    clearInterval(this._updateIntervalId);
    if (this._updateDelay !== -1) {
      setInterval(() => this.updateTasks(), updateDelay);
    }
  }
}

export class GuiTaskListClickEvent extends CustomEvent<TaskInfoLike> {
  static readonly NAME = 'task-list-click'; // TODO use 'gui-click' in v7

  constructor(task: TaskInfoLike) {
    super(GuiTaskListClickEvent.NAME, { detail: task, bubbles: true });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-task-list': GuiTaskList;
  }

  interface GuiTaskListEventMap {
    [GuiTaskListClickEvent.NAME]: GuiTaskListClickEvent;
  }

  interface HTMLElementEventMap extends GuiTasksEventMap {}

  namespace JSX {
    interface IntrinsicElements {
      'gui-task-list': GreyCat.Element<GuiTaskList, GuiTaskListEventMap>;
    }
  }
}

if (!customElements.get('gui-task-list')) {
  customElements.define('gui-task-list', GuiTaskList);
}
