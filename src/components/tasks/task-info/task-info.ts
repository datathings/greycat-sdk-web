import { GreyCat, runtime, Value, core } from '@greycat/sdk';
import { timeToDate, parseTaskParams } from '../utils.js';

export class GuiTaskInfo extends HTMLElement {
  private _greycat: GreyCat = window.greycat.default;
  private _taskInfo: runtime.TaskInfo | null = null;
  private _params: Value[] = [];
  private _taskNameDiv: HTMLDivElement = document.createElement('div');
  private _taskReRunButton: HTMLButtonElement = document.createElement('button');
  private _taskCancelButton: HTMLButtonElement = document.createElement('button');
  private _taskDetailsDiv: HTMLDivElement = document.createElement('div');
  private _timeZone: core.TimeZone | null = null;

  connectedCallback() {
    const fragment = document.createDocumentFragment();

    const headerDiv = document.createElement('div');
    headerDiv.classList.add('header');

    this._taskNameDiv.setAttribute('id', 'task-name');
    this._taskNameDiv.textContent = 'Task name';

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');

    this._taskReRunButton.classList.add('button');
    this._taskReRunButton.setAttribute('id', 're-run-button');
    this._taskReRunButton.textContent = 'Re-run';
    this._taskReRunButton.addEventListener('click', this._taskReRunButtonHandler.bind(this));

    this._taskCancelButton.classList.add('button');
    this._taskCancelButton.setAttribute('id', 'cancel-button');
    this._taskCancelButton.textContent = 'Cancel';
    this._taskCancelButton.addEventListener('click', this._taskCancelButtonHandler.bind(this));


    buttonsDiv.appendChild(this._taskReRunButton);
    buttonsDiv.appendChild(this._taskCancelButton);

    headerDiv.appendChild(this._taskNameDiv);
    headerDiv.appendChild(buttonsDiv);

    this._taskDetailsDiv.classList.add('task-details');
    this._taskDetailsDiv.setAttribute('id', 'task-details');

    fragment.appendChild(headerDiv);
    fragment.appendChild(this._taskDetailsDiv);

    this.appendChild(fragment);
  }

  set greycat(g: GreyCat) {
    this._greycat = g;
  }

  set taskInfo(t: runtime.TaskInfo) {
    this._taskInfo = t;
    this._updateTaskInfo(t);
  }

  set timeZone(t: core.TimeZone) {
    this._timeZone = t;
    if (this._taskInfo) {
      this._updateTaskInfo(this._taskInfo);
    }
  }

  private _updateTaskInfo(t: runtime.TaskInfo) {
    if (!this._timeZone) {
      this._timeZone = core.TimeZone.Europe_Luxembourg(this._greycat);
    }
    this._taskInfo = t;
    if (t.type) {
      this._taskNameDiv.textContent = `${t.mod}::${t.type}::${t.fun}`;
    } else {
      this._taskNameDiv.textContent = `${t.mod}::${t.fun}`;
    }
    const prefixURI = `${this._greycat.api}/files/${t.user_id}/tasks/${t.task_id}`;
    const undefinedProperty = 'undefined';

    const properties: { name: string, description: string }[] = [
      { name: 'User ID', description: t.user_id.toString() },
      { name: 'Task ID', description: t.task_id.toString() },
      { name: 'Creation', description: t.creation ? timeToDate(t.creation, this._timeZone) : undefinedProperty },
      { name: 'Start', description: t.start ? timeToDate(t.start, this._timeZone) : undefinedProperty },
      { name: 'Progress', description: t.progress ? t.progress.toString() : undefinedProperty },
      { name: 'Remaining', description: t.duration ? t.duration.toString() : undefinedProperty },
      { name: 'Duration', description: t.duration ? t.duration.toString() : undefinedProperty },
      { name: 'Sub waiting', description: t.sub_waiting ? t.sub_waiting.toString() : "0" },
      { name: 'Sub tasks', description: t.sub_tasks_all ? t.sub_tasks_all.toString() : "0" },
      { name: 'Files', description: `${prefixURI}/` },
    ];

    while (this._taskDetailsDiv.firstChild) {
      this._taskDetailsDiv.removeChild(this._taskDetailsDiv.firstChild);
    }

    properties.forEach(property => {
      const propertyDiv = this._createTaskDetailDiv(property.name, property.description);
      this._taskDetailsDiv.appendChild(propertyDiv);
    });
  }

  private async _getTaskStatus(): Promise<runtime.TaskStatus | null> {
    if (!this._taskInfo) {
      return null;
    }
    try {
      const updatedTaskInfo = await runtime.Task.info(this._taskInfo.user_id, this._taskInfo.task_id, this._greycat);
      if (updatedTaskInfo) {
        return updatedTaskInfo.status;
      }
    } catch (error) {
      this._handleError(error as Error);
    }

    return null;
  }

  private _taskIsBeingExecuted(taskStatus: runtime.TaskStatus): boolean {
    if (taskStatus === runtime.TaskStatus.running(this._greycat)
        || taskStatus === runtime.TaskStatus.waiting(this._greycat)) {
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
        throw new Error('Cannot re-run the task since it\'s being already executed');
      }
      this._params = await parseTaskParams(this._greycat, this._taskInfo) as Value[];
      const newTask = await this._greycat.call<runtime.Task>(`${this._taskInfo.mod}::${this._taskInfo.fun}`, this._params);
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
        throw new Error('Cannot re-run the task since it\'s not being executed');
      }
      const isCancelled = await runtime.Task.cancel(this._taskInfo.task_id, this._greycat);
      if (isCancelled) {
        const cancelledTaskInfo = await runtime.Task.info(this._taskInfo.user_id, this._taskInfo.task_id, this._greycat);
        if (cancelledTaskInfo) {
          this._updateTaskInfo(cancelledTaskInfo);
        }
      }
    } catch (error) {
      this._handleError(error as Error);
    }
  }

  private _handleError(error: Error) {
    // TODO: Replace with user notification for any specific error
    console.error('An error occured: ', error);
  }

  private _createTaskDetailDiv(name: string, description: string) {
    const propertyDiv = document.createElement('div');
    propertyDiv.classList.add('property');

    const propertyName = document.createElement('strong');
    propertyName.classList.add('property-name');
    propertyName.textContent = name;
    propertyDiv.appendChild(propertyName);

    if (name === 'Files') {
      const link = document.createElement('a');
      link.textContent = new URL(description).pathname;
      link.href = description;
      link.classList.add('file-link');
      propertyDiv.appendChild(link);
    } else {
      const propertyDescription = document.createElement('div');
      propertyDescription.textContent = description;
      propertyDiv.appendChild(propertyDescription);
    }

    return propertyDiv;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-task-info': GuiTaskInfo;
  }
}


if (!globalThis.customElements.get('gui-task-info')) {
  globalThis.customElements.define('gui-task-info', GuiTaskInfo);
}