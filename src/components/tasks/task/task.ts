import { GreyCat, runtime, Value, core } from '@greycat/sdk';
import { timeToDate, parseTaskParams, TaskStatusEnum } from '../utils.js';

type Property = { name: string; description: string };

export class GuiTask extends HTMLElement {
  private _greycat: GreyCat | null;
  private _task: runtime.Task | null;
  private _params: Value[];
  private _taskNameDiv: HTMLDivElement;
  private _taskReRunButton: HTMLButtonElement;
  private _taskCancelButton: HTMLButtonElement;
  private _taskDetailsDiv: HTMLDivElement;
  private _timeZone: core.TimeZone | null;

  constructor() {
    super();
    this._greycat = null;
    this._task = null;
    this._params = [];
    this._taskNameDiv = document.createElement('div');
    this._taskReRunButton = document.createElement('button');
    this._taskCancelButton = document.createElement('button');
    this._taskDetailsDiv = document.createElement('div');
    this._timeZone = null;
  }

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

  set task(t: runtime.Task) {
    this._task = t;
    this._updateTask(t);
  }

  set timeZone(t: core.TimeZone) {
    if (!this._greycat) {
      return;
    }
    this._timeZone = t;
    if (this._task) {
      this._updateTask(this._task);
    }
  }

  private _updateTask(t: runtime.Task) {
    if (!this._greycat) {
      return;
    }
    if (!this._timeZone) {
      this._timeZone = core.TimeZone.Europe_Luxembourg(this._greycat);
    }
    this._task = t;
    if (t.type) {
      this._taskNameDiv.textContent = `${t.mod}::${t.type}::${t.fun}`;
    } else {
      this._taskNameDiv.textContent = `${t.mod}::${t.fun}`;
    }
    const prefixURI = `${this._greycat.api}/files/${t.user_id}/tasks/${t.task_id}`;
    const undefinedProperty = 'undefined';

    const properties: Property[] = [
      { name: 'User ID', description: t.user_id.toString() },
      { name: 'Task ID', description: t.task_id.toString() },
      { name: 'Creation', description: t.creation ? timeToDate(t.creation, this._timeZone) : undefinedProperty },
      { name: 'Status', description: TaskStatusEnum[t.status.value as number] ?? undefinedProperty },
      { name: 'Files', description: `${prefixURI}/` },
    ];

    while (this._taskDetailsDiv.firstChild) {
      this._taskDetailsDiv.removeChild(this._taskDetailsDiv.firstChild);
    }

    properties.forEach((property) => {
      const propertyDiv = this._createTaskDetailDiv(property);
      this._taskDetailsDiv.appendChild(propertyDiv);
    });
  }

  private async _getTaskStatus(): Promise<runtime.TaskStatus | null> {
    if (!this._task || !this._greycat) {
      return null;
    }
    try {
      const updatedTaskInfo = await runtime.Task.info(this._task.user_id, this._task.task_id, this._greycat);
      if (updatedTaskInfo) {
        return updatedTaskInfo.status;
      }
    } catch (error) {
      this._handleError(error);
    }

    return null;
  }

  private _taskIsBeingExecuted(taskStatus: runtime.TaskStatus): boolean {
    if (!this._greycat) {
      return false;
    }
    return (taskStatus === runtime.TaskStatus.running(this._greycat)
      || taskStatus === runtime.TaskStatus.waiting(this._greycat));
  }

  private async _taskReRunButtonHandler() {
    try {
      const taskStatus = await this._getTaskStatus();
      if (!this._task || !this._greycat || !taskStatus) {
        return;
      }
      if (this._taskIsBeingExecuted(taskStatus)) {
        throw new Error(`Cannot re-run the task since it's being already executed`);
      }
      this._params = await parseTaskParams(this._greycat, this._task);
      const newTask = await this._greycat.call<runtime.Task>(`${this._task.mod}::${this._task.fun}`, this._params);
      if (newTask) {
        this._updateTask(newTask);
      }
    } catch (error) {
      this._handleError(error);
    }
  }

  private async _taskCancelButtonHandler() {
    try {
      const taskStatus = await this._getTaskStatus();
      if (!this._task || !this._greycat || !taskStatus) {
        return;
      }
      if (!this._taskIsBeingExecuted(taskStatus)) {
        throw new Error(`Cannot re-run the task since it's not being executed`);
      }
      await runtime.Task.cancel(this._task.task_id, this._greycat);
    } catch (error) {
      this._handleError(error);
    }
  }

  private _handleError(error: unknown) {
    // TODO: Replace with user notification for any specific error
    console.error('An error occured: ', error);
  }

  private _createTaskDetailDiv({ name, description }: Property) {
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

if (!customElements.get('gui-task')) {
  customElements.define('gui-task', GuiTask);
}

declare global {
  interface Window {
    GuiTask: typeof GuiTask;
  }
  interface HTMLElementTagNameMap {
    'gui-task': GuiTask;
  }
}