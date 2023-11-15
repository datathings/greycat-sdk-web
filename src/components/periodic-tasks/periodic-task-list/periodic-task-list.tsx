import { GreyCat, prettyError, runtime } from '@greycat/sdk';
import '../../object/index.js'; // ensures gui-object is loaded
import { TypedInput } from '../../index.js';

export class GuiPeriodicTaskList extends HTMLElement {
  private static NOOP = () => void 0;

  private _tasks: runtime.PeriodicTask[] = [];
  private _tbody = document.createElement('tbody');
  private _dialog: HTMLDialogElement;
  private _dialogContent = document.createElement('div');
  private _dialogUpdateTask = GuiPeriodicTaskList.NOOP;
  private _greycat = greycat.default;

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
      <dialog>
        <article>
          <header>Periodic Task</header>
          {this._dialogContent}
          <footer className="grid">
            <button
              className="outline"
              onclick={() => {
                this._dialogUpdateTask = GuiPeriodicTaskList.NOOP;
                this._dialog.close();
              }}
            >
              Close
            </button>
            <button onclick={() => this._dialogUpdateTask()}>Update</button>
          </footer>
        </article>
      </dialog>
    ) as HTMLDialogElement;
  }

  connectedCallback() {
    this.appendChild(
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

  disconnectedCallback() {
    this.replaceChildren();
  }

  async deleteAll(): Promise<void> {
    // deletes all the tasks
    this._tasks.length = 0;
    // update task list
    await runtime.PeriodicTask.set(this._tasks, this._greycat);
    // re-render
    this.render();
  }

  async deleteTask(index: number): Promise<void> {
    // deletes the task by index
    this._tasks.splice(index, 1);
    // update task list
    await runtime.PeriodicTask.set(this._tasks, this._greycat);
    // re-render
    this.render();
  }

  showTask(index: number): void {
    const task = this._tasks[index];
    if (task) {
      let tmpTask = task;
      const input = new TypedInput(
        `periodic-task-input-${index}`,
        greycat.default.abi.type_by_fqn.get(runtime.PeriodicTask._type)!,
        (newTask) => {
          tmpTask = newTask;
        },
      );
      input.value = task;
      this._dialogUpdateTask = () => {
        if (tmpTask) {
          this._tasks[index] = tmpTask;
          this.updateTasks(this._tasks);
        }
        this._dialogUpdateTask = GuiPeriodicTaskList.NOOP;
        this._dialog.close();
      };
      this._dialogContent.replaceChildren(input.element);
      this._dialog.showModal();
    }
  }

  render() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < this._tasks.length; i++) {
      const task = this._tasks[i];
      const row = (
        <tr onclick={() => this.showTask(i)}>
          <td>{task.user_id}</td>
          <td>{task.function.fqn}</td>
          <td>
            <gui-object value={task.arguments} />
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

  async updateTasks(tasks: runtime.PeriodicTask[]): Promise<void> {
    try {
      await runtime.PeriodicTask.set(tasks, this._greycat);
      this._tasks = tasks;
      this.render();
    } catch (err) {
      console.error(prettyError(err, 'something went wrong while updating tasks'));
    }
  }

  async reloadTasks(): Promise<void> {
    this._tasks = await runtime.PeriodicTask.all(this._greycat);
    this.render();
  }

  set tasks(tasks: runtime.PeriodicTask[]) {
    this._tasks = tasks;
    this.render();
  }

  get tasks() {
    return this._tasks;
  }

  set greycat(greycat: GreyCat) {
    this._greycat = greycat;
    this.reloadTasks();
  }
}

export class GuiPeriodicTaskListClickEvent extends CustomEvent<runtime.PeriodicTask> {
  constructor(task: runtime.PeriodicTask) {
    super('periodic-task-list-click', { detail: task, bubbles: true });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-periodic-task-list': GuiPeriodicTaskList;
  }

  namespace JSX {
    interface GuiTaskListEvents {
      ['onperiodic-task-list-click']?: (ev: GuiPeriodicTaskListClickEvent) => void;
    }

    interface IntrinsicElements {
      'gui-periodic-task-list': GreyCat.Element<GuiPeriodicTaskList> & GuiTaskListEvents;
    }
  }
}

if (!customElements.get('gui-periodic-task-list')) {
  customElements.define('gui-periodic-task-list', GuiPeriodicTaskList);
}
