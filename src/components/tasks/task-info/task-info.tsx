import { GreyCat, runtime, Value, core } from '@greycat/sdk';
import { parseTaskParams } from '../utils.js';

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
  private _taskInfo: TaskInfoLike | null = null;
  private _params: Value[] = [];
  private _taskNameDiv: HTMLDivElement = document.createElement('div');
  private _taskCancelBtn: HTMLButtonElement = document.createElement('button');
  private _taskDetailsDiv: HTMLDivElement = document.createElement('tbody');
  private _lastUpdate = document.createElement('small');
  private _timeZone: core.TimeZone | null = null;
  timeFmtOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  constructor() {
    super();

    // this._taskDetailsDiv.classList.add('task-details');

    this._lastUpdate.textContent = new Date().toISOString();
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
            <button onclick={() => this._taskReRunButtonHandler()}>Re-run</button>
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

  set greycat(g: GreyCat) {
    this._greycat = g;
  }

  set taskInfo(t: TaskInfoLike | null) {
    this._taskInfo = t;
    if (this._taskInfo) {
      this._updateTaskInfo(this._taskInfo);
    }
  }

  set timeZone(t: core.TimeZone) {
    this._timeZone = t;
    if (this._taskInfo) {
      this._updateTaskInfo(this._taskInfo);
    }
  }

  async updateInfo(): Promise<void> {
    if (!this._taskInfo) {
      return;
    }
    try {
      this.taskInfo = await runtime.Task.info(this._taskInfo.user_id, this._taskInfo.task_id);
      this._lastUpdate.textContent = new Date().toISOString();
    } catch (err) {
      this._handleError(err);
    }
  }

  private _updateTaskInfo(t: TaskInfoLike) {
    if (!this._timeZone) {
      this._timeZone = core.TimeZone.Europe_Luxembourg(this._greycat);
    }
    this._taskInfo = t;
    if (t.type) {
      this._taskNameDiv.textContent = `${t.mod}::${t.type}::${t.fun}`;
    } else {
      this._taskNameDiv.textContent = `${t.mod}::${t.fun}`;
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
        <td>{t.creation.format(this._timeZone, this.timeFmtOptions)}</td>
      </tr>,
      <tr>
        <td>Start</td>
        <td>{t.start?.format(this._timeZone, this.timeFmtOptions)}</td>
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
        <td>{t.duration ?? '<none>'}</td>
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
          <a href={prefixURI}>{new URL(prefixURI).pathname}</a>
        </td>
      </tr>,
    );

    if (
      this._taskInfo.status === runtime.TaskStatus.running(this._greycat) ||
      this._taskInfo.status === runtime.TaskStatus.waiting(this._greycat)
    ) {
      this._taskCancelBtn.disabled = false;
    } else {
      this._taskCancelBtn.disabled = true;
    }
  }

  private async _getTaskStatus(): Promise<runtime.TaskStatus | null> {
    if (!this._taskInfo) {
      return null;
    }
    try {
      const updatedTaskInfo = await runtime.Task.info(
        this._taskInfo.user_id,
        this._taskInfo.task_id,
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
      if (!this._taskInfo || !taskStatus) {
        return;
      }
      if (this._taskIsBeingExecuted(taskStatus)) {
        throw new Error("Cannot re-run the task since it's being already executed");
      }
      this._params = (await parseTaskParams(this._greycat, this._taskInfo)) as Value[];
      const newTask = await this._greycat.call<runtime.Task>(
        `${this._taskInfo.mod}::${this._taskInfo.fun}`,
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
      if (!this._taskInfo || !taskStatus) {
        return;
      }
      if (!this._taskIsBeingExecuted(taskStatus)) {
        throw new Error("Cannot re-run the task since it's not being executed");
      }
      const isCancelled = await runtime.Task.cancel(this._taskInfo.task_id, this._greycat);
      if (isCancelled) {
        const cancelledTaskInfo = await runtime.Task.info(
          this._taskInfo.user_id,
          this._taskInfo.task_id,
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
      'gui-task-info': Partial<Omit<GuiTaskInfo, 'children'>>;
    }
  }
}

if (!globalThis.customElements.get('gui-task-info')) {
  globalThis.customElements.define('gui-task-info', GuiTaskInfo);
}
