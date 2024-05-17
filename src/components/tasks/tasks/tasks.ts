import { runtime } from '@greycat/sdk';
import { CellProps, type GuiTable } from '../../table/table.js';
import '../../table/table.js'; // depends on gui-table
import { TaskInfoLike } from '../task-info/task-info.js';
import { GuiClickEvent } from '../../events.js';
import { getGlobalDateTimeFormat } from '../../../globals.js';

export class GuiTasks extends HTMLElement {
  static readonly HEADERS = [
    'Task',
    'User',
    'Name',
    'Created',
    'Started',
    'Duration',
    'Remaining',
    'Status',
    'Progress',
  ] as const;
  /** The input used to filter the task list */
  readonly search: HTMLInputElement;
  /** The table used to display the task list */
  readonly table: GuiTable;
  private _updateId: number;
  private _updateDelay: number;
  private _filterable: boolean;
  private _tasks: TaskInfoLike[];

  constructor() {
    super();

    this.search = document.createElement('input');
    this.search.className = 'gui-tasks-search';
    this.search.type = 'search';
    this.search.placeholder = 'Filter the task list';
    this.search.addEventListener('input', () => {
      this.table.filter = this.search.value;
    });

    this.table = document.createElement('gui-table');
    const tmp: CellProps = { value: null }; // re-use the same object for each cell rendering to ease gc
    this.table.setAttrs({
      value: {
        cols: GuiTasks.HEADERS.map(() => []),
        meta: GuiTasks.HEADERS.map((header) => ({ header })),
      },
      sortBy: [0, 'desc'],
      columnsWidths: [100, 150, 350, NaN, NaN, NaN, NaN, 110, NaN],
      cellProps: (_row, value, _r, c) => {
        tmp.data = undefined;
        tmp.linkify = undefined;
        tmp.name = undefined;
        tmp.numFmt = undefined;
        tmp.onClick = undefined;
        tmp.text = undefined;
        tmp.tiny = undefined;
        tmp.value = value;

        switch (c) {
          case 3: // Created
          case 4: // Started
            tmp.dateFmt = getGlobalDateTimeFormat();
            tmp.className = undefined;
            break;
          case 7: // Status
            tmp.dateFmt = undefined;
            tmp.className = `${value}`;
            break;
          default:
            tmp.dateFmt = undefined;
            tmp.className = undefined;
            break;
        }
        return tmp;
      },
    });
    this.table.addEventListener('table-click', (ev) => {
      ev.stopPropagation();
      this.dispatchEvent(new GuiClickEvent<TaskInfoLike>(this._tasks[ev.detail.row[0].originalIndex]));
    });

    this._updateId = -1;
    this._updateDelay = 5000;

    this._filterable = true;
    this._tasks = [];
  }

  connectedCallback() {
    if (this._filterable) {
      this.appendChild(this.search);
    }
    this.appendChild(this.table);
    this.reload();
    this._updateId = setInterval(() => this.reload(), this._updateDelay);
  }

  disconnectedCallback() {
    this.replaceChildren();
    clearInterval(this._updateId);
  }

  get updateDelay() {
    return this._updateDelay;
  }

  /**
   * Modifies the frequency in milliseconds of the reload of the task list from the server.
   * 
   * *If the `delay` is less than or equal to `0` it deactivates the auto-reload*
   */
  set updateDelay(delay: number) {
    this._updateDelay = delay;
    clearInterval(this._updateId);
    if (delay > 0) {
      setInterval(() => this.reload(), this._updateDelay);
    }
  }

  get filter() {
    return this.search.value;
  }

  set filter(filter: string) {
    this.search.value = filter;
    this.table.filter = filter;
  }

  get filterable() {
    return this._filterable;
  }

  set filterable(activated: boolean) {
    if (activated) {
      if (!this._filterable) {
        this.prepend(this.search);
      }
    } else {
      if (this._filterable) {
        this.search.remove();
        this.filter = ''; // reset filter when remove it
      }
    }
    this._filterable = activated;
  }

  async reload(): Promise<void> {
    const users: Record<number, string> = {};
    try {
      const entities = await runtime.SecurityEntity.all();
      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        users[Number(entity.id)] = entity.name;
      }
    } catch {
      // failing to access SecurityEntity.all() is not a failure point
      // we just cannot know the name of a user by id.
    }

    try {
      const history = await runtime.Task.history(0, 1);
      const maxHistory = history.length > 0 ? Number(history[0].task_id) : 0;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let cols: any[][];
      if (this.table.value!.cols) {
        cols = this.table.value!.cols;
        cols.length = GuiTasks.HEADERS.length;
      } else {
        cols = new Array(GuiTasks.HEADERS.length);
      }

      for (let i = 0; i < cols.length; i++) {
        if (cols[i] === undefined) {
          cols[i] = [];
        }
      }

      this._tasks = await runtime.Task.history(0, maxHistory);
      const running = await runtime.Task.running();
      for (const t of running) {
        this._tasks.push(t);
      }

      for (const col of cols) {
        col.length = this._tasks.length;
      }

      for (let i = 0; i < this._tasks.length; i++) {
        const task = this._tasks[i];
        const user_id = Number(task.user_id);
        let name_or_id: string | number = users[user_id];
        if (!name_or_id) {
          name_or_id = user_id;
        }

        cols[0][i] = task.task_id; // Id
        cols[1][i] = name_or_id; // User
        cols[2][i] = `${task.mod}::${task.fun}`; // Name
        cols[3][i] = task.creation; // Created
        cols[4][i] = task.start ?? ''; // Started
        cols[5][i] = task.duration ?? ''; // Duration
        cols[6][i] = task.remaining ?? ''; // Remaining
        cols[7][i] = task.status.key; // Status
        if (task.progress == null) {
          if (task.status.key === 'running') {
            cols[8][i] = '<unknown>'; // Progress
          } else {
            cols[8][i] = ''; // Progress
          }
        } else if (isNaN(task.progress)) {
          cols[8][i] = ''; // Progress
        } else {
          cols[8][i] = `${(task.progress * 100).toFixed(1)}%`; // Progress
        }
      }

      this.table.computeTable();
      this.table.update();
    } catch {
      // ignore errors (for now?)
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-tasks': GuiTasks;
  }

  interface GuiTasksEventMap {
    [GuiClickEvent.NAME]: GuiClickEvent<TaskInfoLike>;
  }

  namespace JSX {
    interface IntrinsicElements {
      'gui-tasks': GreyCat.Element<GuiTasks, GuiTasksEventMap>;
    }
  }
}

if (!customElements.get('gui-tasks')) {
  customElements.define('gui-tasks', GuiTasks);
}
