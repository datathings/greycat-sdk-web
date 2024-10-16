import { Value, std } from '../../../exports.js';
import { CellProps, type GuiTable } from '../../table/table.js';
import '../../table/table.js'; // depends on gui-table
import { TaskInfoLike } from '../task-info/common.js';
import { GuiClickEvent } from '../../events.js';
import { getGlobalDateTimeFormat } from '../../../globals.js';
import { GuiTaskInfoDialog } from '../task-info/task-info-dialog.js';

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
  /** The table used to display the task list */
  readonly table: GuiTable;
  private _updateId: number;
  private _updateDelay: number;
  private _tasks: TaskInfoLike[];
  private _dialog: GuiTaskInfoDialog;

  constructor() {
    super();

    this.table = document.createElement('gui-table');
    this.table.globalFilter = true;
    this.table.globalFilterPlaceholder = 'Filter the tasks';
    const tmp: CellProps = { value: null }; // re-use the same object for each cell rendering to ease gc
    this.table.setAttrs({
      headers: GuiTasks.HEADERS as unknown as string[],
      value: { rows: [] },
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
      const task_id = ev.detail.row[0].value as number;
      console.log('clicked task', task_id);
      const task = this._tasks.find((t) => t.task_id === task_id);
      if (task) {
        if (this.dispatchEvent(new GuiClickEvent<TaskInfoLike>(task))) {
          this._dialog.value = task;
          this._dialog.show();
        }
      }
    });

    this._updateId = -1;
    this._updateDelay = 5000;

    this._tasks = [];

    this._dialog = document.createElement('gui-task-info-dialog');
    this._dialog.addEventListener('gui-update', () => {
      this.reload();
    });
  }

  connectedCallback() {
    this.append(this.table, this._dialog);
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
    return this.table.filter;
  }

  set filter(filter: string) {
    this.table.filter = filter;
  }

  async reload(): Promise<void> {
    const users: Record<number, string> = {};
    try {
      const entities = await std.runtime.SecurityEntity.all();
      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        users[Number(entity.id)] = entity.name;
      }
    } catch {
      // failing to access SecurityEntity.all() is not a failure point
      // we just cannot know the name of a user by id.
    }

    try {
      const history = await std.runtime.Task.history(0, 1);
      const maxHistory = history.length > 0 ? Number(history[0].task_id) : 0;

      this._tasks = await std.runtime.Task.history(0, maxHistory);
      const running = await std.runtime.Task.running();
      for (const t of running) {
        this._tasks.push(t);
      }

      const rows: Array<Value[]> = new Array(this._tasks.length);

      for (let i = 0; i < this._tasks.length; i++) {
        const task = this._tasks[i];
        const user_id = Number(task.user_id);
        let name_or_id: string | number = users[user_id];
        if (!name_or_id) {
          name_or_id = user_id;
        }

        const row = new Array(GuiTasks.HEADERS.length);

        row[0] = task.task_id; // Id
        row[1] = name_or_id; // User
        row[2] = task.type ? `${task.mod}::${task.type}::${task.fun}` : `${task.mod}::${task.fun}`; // Name
        row[3] = task.creation; // Created
        row[4] = task.start ?? ''; // Started
        row[5] = task.duration ?? ''; // Duration
        row[6] = task.remaining ?? ''; // Remaining
        row[7] = task.status?.key; // Status
        if (task.progress == null) {
          if (task.status?.key === 'running') {
            row[8] = '<unknown>'; // Progress
          } else {
            row[8] = ''; // Progress
          }
        } else if (isNaN(task.progress)) {
          row[8] = ''; // Progress
        } else {
          row[8] = `${(task.progress * 100).toFixed(1)}%`; // Progress
        }

        rows[i] = row;
      }

      // update table
      this.table.value = rows;
    } catch (err) {
      console.error(err);
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

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-tasks': GreyCat.Element<GuiTasks, GuiTasksEventMap>;
      }
    }
  }
}

if (!customElements.get('gui-tasks')) {
  customElements.define('gui-tasks', GuiTasks);
}
