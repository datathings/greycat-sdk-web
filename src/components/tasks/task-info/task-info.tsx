import { GreyCat, runtime, Value, TaskHandler } from '../../../exports.js';
import { parseTaskArgs } from '../utils.js';
import { GuiUpdateEvent } from '../../events.js';
import { GuiFilesClickEvent, TaskInfoLike } from './common.js';

export class GuiTaskInfo extends HTMLElement {
  private _greycat: GreyCat = window.greycat.default;
  private _task: TaskInfoLike | null = null;
  private _params: Value[] = [];
  private _title = document.createTextNode('');
  private _btn = document.createElement('button');
  private _details = document.createElement('tbody');
  private _lastUpdate = document.createElement('small');
  private _handler: TaskHandler | null = null;

  constructor() {
    super();

    this._lastUpdate.textContent = new Date().toISOString();
  }

  connectedCallback() {
    this.appendChild(
      <sl-card>
        <header slot="header">
          {this._title}
          <div className="header-actions">{this._btn}</div>
        </header>
        <table role="grid">{this._details}</table>
        <sl-button
          variant="text"
          size="small"
          slot="footer"
          onclick={(ev) => {
            (ev.target as HTMLElement).blur();
            this.updateInfo();
          }}
        >
          Reload info
        </sl-button>
        {this._lastUpdate}
      </sl-card>,
    );

    if (this._task) {
      this.update();
    }
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set greycat(g: GreyCat) {
    this._greycat = g;
  }

  get value() {
    return this._task;
  }

  set value(value: TaskInfoLike | null) {
    this._task = value;
    this.update();
  }

  setAttrs({
    value = this._task,
    greycat = this._greycat,
  }: Partial<{
    value: TaskInfoLike | null;
    greycat: GreyCat;
  }>) {
    this._task = value;
    this._greycat = greycat;
    this.update();
  }

  getAttrs(): {
    task: TaskInfoLike | null;
    value: TaskInfoLike | null;
    greycat: GreyCat;
  } {
    return {
      task: this._task,
      value: this._task,
      greycat: this._greycat,
    };
  }

  async update(): Promise<void> {
    if (!this._task || this._handler) {
      return;
    }

    if (this._isAlive(this._task.status)) {
      this._handler = new TaskHandler(this._task);
      await this._handler.start(2000, (info) => {
        this._updateTaskInfo(info);
      });
      this._handler = null;
    }
    this._updateTaskInfo(this._task);
  }

  /**
   * Cleans up polling if any
   */
  stopPolling(): void {
    this._handler?.stop();
  }

  async updateInfo(): Promise<void> {
    if (!this._task) {
      return;
    }
    try {
      this.value = await runtime.Task.info(this._task.user_id, this._task.task_id);
      this._lastUpdate.textContent = new Date().toISOString();
    } catch (err) {
      this._handleError(err);
    }
  }

  private _updateTaskInfo(t: TaskInfoLike) {
    this._lastUpdate.textContent = new Date().toISOString();
    this._task = t;
    if (t.type) {
      this._title.textContent = `${t.mod}::${t.type}::${t.fun}`;
    } else {
      this._title.textContent = `${t.mod}::${t.fun}`;
    }

    if (this._isAlive(t.status)) {
      this._btn.textContent = 'Cancel';
      this._btn.classList.add('outline');
      this._btn.onclick = () => {
        this.cancel().then(() => {
          this.dispatchEvent(new GuiUpdateEvent(undefined));
        });
      };
    } else {
      this._btn.textContent = 'Re-run';
      this._btn.classList.remove('outline');
      this._btn.onclick = () => {
        this.run().then(() => {
          this.dispatchEvent(new GuiUpdateEvent(undefined));
        });
      };
    }

    const prefixURI = `${this._greycat.api}/files/${t.user_id}/tasks/${t.task_id}/`;

    this._details.replaceChildren(
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
        <td>{t.progress ? (t.progress * 100).toFixed() + '%' : '<none>'}</td>
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
          <a
            href="#"
            onclick={() => {
              const doDefault = this.dispatchEvent(new GuiFilesClickEvent());
              if (doDefault) {
                window.location.href = prefixURI;
              }
            }}
          >
            {new URL(prefixURI).pathname}
          </a>
        </td>
      </tr>,
    );

    if (
      this._task.status === runtime.TaskStatus.running(this._greycat) ||
      this._task.status === runtime.TaskStatus.waiting(this._greycat)
    ) {
      this._btn.textContent = 'Cancel';
      this._btn.classList.add('outline');
      this._btn.onclick = () =>
        this.cancel().then(() => this.dispatchEvent(new GuiUpdateEvent(undefined)));
    } else {
      this._btn.textContent = 'Re-run';
      this._btn.classList.remove('outline');
      this._btn.onclick = () =>
        this.run().then(() => this.dispatchEvent(new GuiUpdateEvent(undefined)));
    }
  }

  async status(): Promise<runtime.TaskStatus | null> {
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

  async run() {
    try {
      const taskStatus = await this.status();
      if (!this._task || !taskStatus || this._isAlive(taskStatus)) {
        return;
      }
      this._params = (await parseTaskArgs(this._greycat, this._task)) as Value[];
      const newTask = await this._greycat.call<runtime.Task>(
        this._task.type
          ? `${this._task.mod}::${this._task.type}::${this._task.fun}`
          : `${this._task.mod}::${this._task.fun}`,
        this._params,
      );
      this._task = newTask;
      this.update();
    } catch (error) {
      this._handleError(error as Error);
    }
  }

  async cancel() {
    if (!this._task) {
      return;
    }
    if (!this._handler) {
      this._handler = new TaskHandler(this._task);
    }
    try {
      this._btn.ariaBusy = 'true';
      const info = await this._handler.cancel();
      if (info) {
        this._updateTaskInfo(info);
      }
    } catch (err) {
      this._handleError(err);
    } finally {
      this._btn.ariaBusy = null;
    }
  }

  /**
   * If the task is 'running' or 'waiting' it is considered 'alive'
   */
  private _isAlive(status: runtime.TaskStatus): boolean {
    if (
      status === runtime.TaskStatus.running(this._greycat) ||
      status === runtime.TaskStatus.waiting(this._greycat)
    ) {
      return true;
    }
    return false;
  }

  private _handleError(error: unknown) {
    // TODO: Replace with user notification for any specific error
    console.error('An error occured: ', error);
  }
}

if (!globalThis.customElements.get('gui-task-info')) {
  globalThis.customElements.define('gui-task-info', GuiTaskInfo);
}
