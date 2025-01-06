import {
  core,
  std,
  toast,
  type GuiTable,
  TaskInfoLike,
  GuiClickEvent,
  sl,
  modal,
  css,
  GuiElement,
} from '../../../exports.js';
import style from './tasks.css?inline';

export class GuiTasks extends GuiElement {
  static override styles = [css(style)];

  /** The table used to display the task list */
  readonly table: GuiTable;
  private _updateId: number;
  private _updateDelay: number;
  private _tasks: TaskInfoLike[];

  constructor() {
    super();

    this.table = document.createElement('gui-table');
    this.table.setAttrs({
      globalFilter: true,
      globalFilterPlaceholder: 'Filter the tasks',
      sortBy: [0, 'desc'],
      columnFactory: {
        8: (_value, rowIdx, _el) => {
          const [task_id] = this.table.table.getRowArray(rowIdx) as [number];
          const task = this._tasks.find((t) => t.task_id === task_id)!;
          const cancellable =
            task.status === std.runtime.TaskStatus.waiting() ||
            task.status === std.runtime.TaskStatus.running();

          return cancellable ? (
            <sl-button
              variant="text"
              size="small"
              onclick={async (ev) => {
                const self = ev.target as sl.SlButton;
                self.textContent = 'Cancelling...';
                self.disabled = true;
                await std.runtime.Task.cancel(task.task_id);
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
    });

    this._updateId = -1;
    this._updateDelay = 5000;

    this._tasks = [];

    this.shadowRoot.appendChild(this.table);
  }

  connectedCallback() {
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

      const rows = this._tasks.map((task) => {
        const user_id = Number(task.user_id);
        let name_or_id: string | number = users[user_id];
        if (!name_or_id) {
          name_or_id = user_id;
        }
        // const cancellable =
        //   task.status === std.runtime.TaskStatus.waiting() ||
        //   task.status === std.runtime.TaskStatus.running();

        return {
          Task: task.task_id,
          User: name_or_id,
          Name: task.type ? `${task.mod}::${task.type}::${task.fun}` : `${task.mod}::${task.fun}`,
          Created: task.creation,
          Started: task.start ?? '',
          Duration: task.duration ?? '',
          Status: task.status.key,
          Progress: task.progress ? `${(task.progress * 100).toFixed(1)}%` : '',
          Action: undefined,
          // Action: cancellable ? (
          //   <sl-button
          //     variant="text"
          //     size="small"
          //     onclick={(ev) => {
          //       std.runtime.Task.cancel(task.task_id);
          //       (ev.target as sl.SlButton).textContent = 'Cancelling...';
          //     }}
          //   >
          //     Cancel
          //   </sl-button>
          // ) : undefined,
        };
      });

      // update table
      const table = core.Table.fromObjects(rows);
      this.table.value = table;
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
