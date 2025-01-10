import {
  type sl,
  GuiInput,
  GuiElement,
  css,
} from '../../../exports.js';
import style from './periodic-task-list.css?inline';

export class GuiPeriodicTaskList extends GuiElement {
  static override styles = [css(style)];

  private static NOOP = () => void 0;

  private _tasks: greycat.runtime.PeriodicTask[] = [];
  private _tbody = document.createElement('tbody');
  private _dialog: sl.SlDialog;
  private _dialogContent = document.createElement('div');
  private _dialogUpdateTask = GuiPeriodicTaskList.NOOP;
  private _greycat = greycat.$.default;

  constructor() {
    super();

    this._tbody.addEventListener('click', (ev) => {
      ev.preventDefault();
      ev.stopPropagation();

      if (ev.target instanceof HTMLTableCellElement) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const task = (ev.target.parentElement as any).task;
        this.dispatchEvent(new GuiPeriodicTaskListClickEvent(task));
        return;
      }
      if (ev.target instanceof HTMLTableRowElement) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const task = (ev.target as any).task;
        this.dispatchEvent(new GuiPeriodicTaskListClickEvent(task));
      }
    });

    this._dialog = (
      <sl-dialog label="Periodic Task" className="gui-periodic-task-dialog">
        {this._dialogContent}
        <sl-button
          slot="footer"
          className="outline"
          onclick={() => {
            this._dialogUpdateTask = GuiPeriodicTaskList.NOOP;
            this._dialog.hide();
          }}
        >
          Close
        </sl-button>
        <sl-button slot="footer" onclick={() => this._dialogUpdateTask()}>
          Update
        </sl-button>
      </sl-dialog>
    ) as sl.SlDialog;

    this.shadowRoot.appendChild(
      <>
        <table role="grid">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Arguments</th>
              <th>Start</th>
              <th>Every</th>
              <th>
                <a
                  href="#"
                  onclick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    this.deleteAll();
                  }}
                >
                  Delete all
                </a>
              </th>
            </tr>
          </thead>
          {this._tbody}
        </table>
        {this._dialog}
      </>,
    );
  }

  connectedCallback() {
    this.update();
  }

  async deleteAll(): Promise<void> {
    // deletes all the tasks
    this._tasks.length = 0;
    // update task list
    await greycat.runtime.PeriodicTask.set(this._tasks, this._greycat);
    // re-render
    this.update();
  }

  async deleteTask(index: number): Promise<void> {
    // deletes the task by index
    this._tasks.splice(index, 1);
    // update task list
    await greycat.runtime.PeriodicTask.set(this._tasks, this._greycat);
    // re-render
    this.update();
  }

  showTask(index: number): void {
    const task = this._tasks[index];
    if (task) {
      let tmpTask = task;
      const input = new GuiInput();
      input.id = `periodic-task-input-${index}`;
      // input.type = $.default.abi.type_by_fqn.get(std.runtime.PeriodicTask._type);
      input.addEventListener('gui-change', () => {
        tmpTask = input.value as greycat.runtime.PeriodicTask;
      });
      input.value = task;
      this._dialogUpdateTask = () => {
        if (tmpTask) {
          this._tasks[index] = tmpTask;
          this.updateTasks(this._tasks);
        }
        this._dialogUpdateTask = GuiPeriodicTaskList.NOOP;
        this._dialog.hide();
      };
      this._dialogContent.replaceChildren(input);
      this._dialog.show();
    }
  }

  update() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < this._tasks.length; i++) {
      const task = this._tasks[i];
      const row = (
        <tr onclick={() => this.showTask(i)}>
          <td>{task.user_id}</td>
          <td>{task.function?.fqn}</td>
          <td>
            <gui-value value={task.arguments} />
          </td>
          <td>{task.start}</td>
          <td>{task.every}</td>
          <td>
            <a
              href="#"
              onclick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                this.deleteTask(i);
              }}
            >
              Delete
            </a>
          </td>
        </tr>
      ) as HTMLTableRowElement;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (row as any).task = task;
      fragment.appendChild(row);
    }
    this._tbody.replaceChildren(fragment);

    if (this._tasks.length === 0) {
      // colSpan equals the number of header cells (<th />)
      this._tbody.replaceChildren(
        <tr>
          <td colSpan={6}>
            <center>
              <em className="text-muted">Empty list</em>
            </center>
          </td>
        </tr>,
      );
    }
  }

  async updateTasks(tasks: greycat.runtime.PeriodicTask[]): Promise<void> {
    try {
      await greycat.runtime.PeriodicTask.set(tasks, this._greycat);
      this._tasks = tasks;
      this.update();
    } catch (err) {
      console.error(greycat.utils.prettyError(err, 'something went wrong while updating tasks'));
    }
  }

  async reloadTasks(): Promise<void> {
    this._tasks = await greycat.runtime.PeriodicTask.all(this._greycat);
    this.update();
  }

  get value() {
    return this._tasks;
  }

  set value(value: greycat.runtime.PeriodicTask[]) {
    this._tasks = value;
    this.update();
  }

  set greycat(greycat: greycat.GreyCat) {
    this._greycat = greycat;
    this.reloadTasks();
  }
}

export class GuiPeriodicTaskListClickEvent extends CustomEvent<greycat.runtime.PeriodicTask> {
  static readonly NAME = 'periodic-task-list-click'; // TODO use 'gui-click' in v7

  constructor(task: greycat.runtime.PeriodicTask) {
    super(GuiPeriodicTaskListClickEvent.NAME, { detail: task, bubbles: true });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-periodic-task-list': GuiPeriodicTaskList;
  }

  interface GuiPeriodicTaskListEventMap {
    [GuiPeriodicTaskListClickEvent.NAME]: GuiPeriodicTaskListClickEvent;
  }

  interface HTMLElementEventMap extends GuiPeriodicTaskListEventMap {}

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-periodic-task-list': GreyCat.Element<GuiPeriodicTaskList, GuiPeriodicTaskListEventMap>;
      }
    }
  }
}

if (!customElements.get('gui-periodic-task-list')) {
  customElements.define('gui-periodic-task-list', GuiPeriodicTaskList);
}
