import {
  toast,
  type GuiTable,
  GuiClickEvent,
  sl,
  modal,
  css,
  GuiElement,
  CellValueData,
} from '../../../exports.js';
import style from './tasks.css?inline';

export class GuiTasks extends GuiElement {
  static override styles = [css(style)];

  /** The table used to display the task list */
  readonly table: GuiTable;
  private _updateDelay: number;
  private _users: Record<number, string> = {};
  private _tasks: gc.runtime.Task[] = [];

  constructor() {
    super();

    this.table = document.createElement('gui-table');
    this.table.setAttrs({
      value: this._tasks,
      globalFilter: true,
      globalFilterPlaceholder: 'Filter the tasks',
      sortBy: [0, 'desc'],
      columns: [
        {
          index: gc.runtime.Task.$fields.task_id,
          header: 'Task',
          width: 100,
        },
        {
          index: gc.runtime.Task.$fields.user_id,
          header: 'User',
          value: ({ value }) => {
            const user_id = Number(value);
            return this._users[user_id] ?? user_id;
          },
        },
        {
          index: gc.runtime.Task.$fields.fun,
          header: 'Name',
          value: ({ row }) => {
            const task = this._tasks[row];
            if (task.type) {
              return `${task.mod}::${task.type}::${task.fun}`;
            }
            return `${task.mod}::${task.fun}`;
          },
        },
        {
          index: gc.runtime.Task.$fields.creation,
          header: 'Created',
        },
        {
          index: gc.runtime.Task.$fields.start,
          header: 'Started',
          value: ({ value }) => value ?? '',
        },
        {
          index: gc.runtime.Task.$fields.duration,
          header: 'Duration',
          value: ({ value }) => value ?? '',
        },
        {
          index: gc.runtime.Task.$fields.status,
          header: 'Status',
          width: 120,
          value: ({ value }: CellValueData<gc.runtime.TaskStatus>) => value.key,
        },
        {
          index: gc.runtime.Task.$fields.progress,
          header: 'Progress',
          value: ({ row }) =>
            this._tasks[row].progress ? `${(this._tasks[row].progress * 100).toFixed(1)}%` : '',
        },
        {
          index: gc.runtime.Task.$fields.task_id,
          header: 'Action',
          cell: ({ value: task_id }) => {
            const task = gc.$.default.tasks.find((t) => t.task_id === task_id);
            if (!task) {
              return document.createTextNode(`Unknown task ${task_id}`);
            }
            const cancellable =
              task.status === gc.runtime.TaskStatus.waiting ||
              task.status === gc.runtime.TaskStatus.running ||
              task.status === gc.runtime.TaskStatus.await ||
              task.status === gc.runtime.TaskStatus.breakpoint;

            return cancellable ? (
              <sl-button
                variant="text"
                size="small"
                onclick={async (ev) => {
                  const self = ev.target as sl.SlButton;
                  self.textContent = 'Cancelling...';
                  self.disabled = true;
                  await gc.runtime.Task.cancel(task.task_id);
                }}
              >
                Cancel
              </sl-button>
            ) : (
              <sl-button
                variant="text"
                size="small"
                onclick={async (ev) => {
                  const self = ev.target as sl.SlButton;
                  const prev = self.textContent;
                  self.textContent = 'Loading...';
                  self.disabled = true;
                  let value;
                  try {
                    value = await task.result();
                  } catch (err) {
                    value = err;
                  } finally {
                    self.disabled = false;
                    self.textContent = prev;
                    modal.info({
                      title: `Task ${task.task_id}`,
                      message: <gui-object header value={value} />,
                    });
                  }
                }}
              >
                Result
              </sl-button>
            );
          },
        },
      ],
    });

    this._updateDelay = 5000;
    this.shadowRoot.appendChild(this.table);
  }

  connectedCallback() {
    this.addDisposable(gc.$.default.subscribeToTaskPoll(this._updateDelay, () => this.reload()));
    this.reload();
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
    this.dispose();
    this.addDisposable(gc.$.default.subscribeToTaskPoll(this._updateDelay, () => this.reload()));
  }

  get filter() {
    return this.table.filter;
  }

  set filter(filter: string) {
    this.table.filter = filter;
  }

  async reload(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    // reset users
    this._users = {};
    try {
      const entities = await gc.runtime.SecurityEntity.all();
      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        this._users[Number(entity.id)] = entity.name;
      }
    } catch {
      // failing to access SecurityEntity.all() is not a failure point
      // we just cannot know the name of a user by id.
    }

    try {
      // clone the global tasks array
      this._tasks = Array.from(gc.$.default.tasks);
      // update table data
      this.table.value = this._tasks;
    } catch (err) {
      toast.error(err);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-tasks': GuiTasks;
  }

  interface GuiTasksEventMap {
    [GuiClickEvent.NAME]: GuiClickEvent<gc.runtime.Task>;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-tasks': GreyCat.Element<GuiTasks, GuiTasksEventMap>;
      }
    }
  }
}
