import { GreyCat, runtime, Value, core } from '@greycat/sdk';
import { parseTaskArgs } from '../utils.js';

export interface TaskInfoLike extends runtime.Task {
  start?: core.time | null;
  progress?: number | null;
  remaining?: core.duration | null;
  duration?: core.duration | null;
  sub_waiting?: bigint | number | null;
  sub_tasks_all?: bigint | number | null;
}

export class GuiTaskInfo extends HTMLElement {
  private _greycat: GreyCat = window.greycat.default;
  private _task: TaskInfoLike | null = null;
  private _params: Value[] = [];
  private _taskNameDiv = document.createElement('div');
  private _taskRerunBtn = document.createElement('button');
  private _taskCancelBtn = document.createElement('button');
  private _taskDetailsDiv = document.createElement('tbody');
  private _lastUpdate = document.createElement('small');

  constructor() {
    super();

    this._lastUpdate.textContent = new Date().toISOString();

    this._taskRerunBtn = document.createElement('button');
    this._taskRerunBtn.textContent = 'Re-run';
    this._taskRerunBtn.addEventListener('click', () => this._taskReRunButtonHandler());

    this._taskCancelBtn.classList.add('outline');
    this._taskCancelBtn.addEventListener('click', () => this._taskCancelButtonHandler());
    this._taskCancelBtn.textContent = 'Cancel';
  }

  connectedCallback() {
    const content = (
      <article>
        <header>
          {this._taskNameDiv}
          <div className="grid">
            {this._taskRerunBtn}
            {this._taskCancelBtn}
          </div>
        </header>
        <table role="grid">{this._taskDetailsDiv}</table>
        <footer>
          <a
            href="#"
            onclick={(ev) => {
              (ev.target as HTMLElement).blur();
              this.updateInfo();
            }}
          >
            Reload info
          </a>
          {this._lastUpdate}
        </footer>
      </article>
    );

    this.appendChild(content);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set greycat(g: GreyCat) {
    this._greycat = g;
  }

  set task(t: TaskInfoLike | null) {
    this._task = t;
    if (this._task) {
      this._updateTaskInfo(this._task);
    }
  }

  get task() {
    return this._task;
  }

  async updateInfo(): Promise<void> {
    if (!this._task) {
      return;
    }
    try {
      this.task = await runtime.Task.info(this._task.user_id, this._task.task_id);
      this._lastUpdate.textContent = new Date().toISOString();
    } catch (err) {
      this._handleError(err);
    }
  }

  private _updateTaskInfo(t: TaskInfoLike) {
    this._task = t;
    if (t.type) {
      this._taskNameDiv.textContent = `${t.mod}::${t.type}::${t.fun}`;
    } else {
      this._taskNameDiv.textContent = `${t.mod}::${t.fun}`;
    }

    if (this._taskIsBeingExecuted(t.status)) {
      this._taskRerunBtn.disabled = true;
      this._taskCancelBtn.disabled = false;
    } else {
      this._taskRerunBtn.disabled = false;
      this._taskCancelBtn.disabled = true;
    }

    const prefixURI = `${this._greycat.api}/files/${t.user_id}/tasks/${t.task_id}/`;

    this._taskDetailsDiv.replaceChildren(
      <tr>
        <td>Status</td>
        <td>{t.status.key}</td>
      </tr>,
      <tr>
        <td>User ID</td>
        <td>{t.user_id}</td>
      </tr>,
      <tr>
        <td>Task ID</td>
        <td>{t.task_id}</td>
      </tr>,
      <tr>
        <td>Creation</td>
        <td>{t.creation}</td>
      </tr>,
      <tr>
        <td>Start</td>
        <td>{t.start}</td>
      </tr>,
      <tr>
        <td>Progress</td>
        <td>{t.progress ?? '<none>'}</td>
      </tr>,
      <tr>
        <td>Remaining</td>
        <td>{t.remaining ?? '<none>'}</td>
      </tr>,
      <tr>
        <td>Duration</td>
        <td title={t.duration?.s.toString() ?? undefined}>{t.duration ?? '<none>'}</td>
      </tr>,
      <tr>
        <td>Sub waiting</td>
        <td>{t.sub_waiting ?? '<none>'}</td>
      </tr>,
      <tr>
        <td>Sub waiting</td>
        <td>{t.sub_tasks_all ?? '<none>'}</td>
      </tr>,
      <tr>
        <td>Files</td>
        <td>
          {/* TODO: Beket make it so that users can override that by providing there own callback 'onclick' */}
          <a href={prefixURI}>{new URL(prefixURI).pathname}</a>
        </td>
      </tr>,
    );

    if (
      this._task.status === runtime.TaskStatus.running(this._greycat) ||
      this._task.status === runtime.TaskStatus.waiting(this._greycat)
    ) {
      this._taskCancelBtn.disabled = false;
    } else {
      this._taskCancelBtn.disabled = true;
    }
  }

  private async _getTaskStatus(): Promise<runtime.TaskStatus | null> {
    if (!this._task) {
      return null;
    }
    try {
      const updatedTaskInfo = await runtime.Task.info(
        this._task.user_id,
        this._task.task_id,
        this._greycat,
      );
      if (updatedTaskInfo) {
        return updatedTaskInfo.status;
      }
    } catch (error) {
      this._handleError(error as Error);
    }

    return null;
  }

  private _taskIsBeingExecuted(taskStatus: runtime.TaskStatus): boolean {
    if (
      taskStatus === runtime.TaskStatus.running(this._greycat) ||
      taskStatus === runtime.TaskStatus.waiting(this._greycat)
    ) {
      return true;
    }
    return false;
  }

  private async _taskReRunButtonHandler() {
    try {
      const taskStatus = await this._getTaskStatus();
      if (!this._task || !taskStatus || this._taskIsBeingExecuted(taskStatus)) {
        return;
      }
      this._params = (await parseTaskArgs(this._greycat, this._task)) as Value[];
      const newTask = await this._greycat.call<runtime.Task>(
        `${this._task.mod}::${this._task.fun}`,
        this._params,
      );
      const newTaskInfo = await runtime.Task.info(newTask.user_id, newTask.task_id, this._greycat);
      if (newTaskInfo) {
        this._updateTaskInfo(newTaskInfo);
      }
    } catch (error) {
      this._handleError(error as Error);
    }
  }

  private async _taskCancelButtonHandler() {
    try {
      const taskStatus = await this._getTaskStatus();
      if (!this._task || !taskStatus || !this._taskIsBeingExecuted(taskStatus)) {
        return;
      }
      const isCancelled = await runtime.Task.cancel(this._task.task_id, this._greycat);
      if (isCancelled) {
        const cancelledTaskInfo = await runtime.Task.info(
          this._task.user_id,
          this._task.task_id,
          this._greycat,
        );
        if (cancelledTaskInfo) {
          this._updateTaskInfo(cancelledTaskInfo);
        }
      }
    } catch (error) {
      this._handleError(error as Error);
    }
  }

  private _handleError(error: unknown) {
    // TODO: Replace with user notification for any specific error
    console.error('An error occured: ', error);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-task-info': GuiTaskInfo;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-task-info': GreyCat.Element<GuiTaskInfo>;
    }
  }
}

if (!globalThis.customElements.get('gui-task-info')) {
  globalThis.customElements.define('gui-task-info', GuiTaskInfo);
}
