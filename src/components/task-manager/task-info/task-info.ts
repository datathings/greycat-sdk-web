import { GreyCat, runtime, Value } from '@greycat/sdk';
import * as sdk from '@greycat/sdk';
import { timeToDate, parseTaskParams, createTimezoneSelect } from '../utils';

export class GuiTaskInfo extends HTMLElement {
  private _greyCat: GreyCat | null;
  private _taskInfo: runtime.TaskInfo | null;
  private _params: Value[];
  private _taskNameDiv: HTMLDivElement;
  private _taskReRunButton: HTMLButtonElement;
  private _taskCancelButton: HTMLButtonElement;
  private _taskDetailsDiv: HTMLDivElement;
  private _timeZone: string;

  constructor() {
    super();
    this._greyCat = null;
    this._taskInfo = null;
    this._params = [];
    this._taskNameDiv = document.createElement('div');
    this._taskReRunButton = document.createElement('button');
    this._taskCancelButton = document.createElement('button');
    this._taskDetailsDiv = document.createElement('div');
    this._timeZone = 'Europe/Luxembourg';
  }

  connectedCallback() {
    const componentDiv = document.createElement('div');
    componentDiv.classList.add('component');
    componentDiv.style.flexDirection = 'column';
    componentDiv.style.border = '1px solid #ccc';
    componentDiv.style.padding = '10px';

    const headerDiv = document.createElement('div');
    headerDiv.classList.add('header');
    headerDiv.style.display = 'flex';
    headerDiv.style.justifyContent = 'space-between';
    headerDiv.style.alignItems = 'center';
    headerDiv.style.marginBottom = '10px';

    this._taskNameDiv .setAttribute('id', 'task-name');
    this._taskNameDiv .textContent = 'Task name';

    const timezoneSelect = createTimezoneSelect(this._timeZone);
    timezoneSelect.addEventListener('change', this._timezoneSelectHandler.bind(this));

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');

    this._taskReRunButton.classList.add('button');
    this._taskReRunButton.setAttribute('id', 're-run-button');
    this._taskReRunButton.textContent = 'Re-run';
    this._taskReRunButton.style.marginRight = '10px';
    this._taskReRunButton.addEventListener('click', this._taskReRunButtonHandler.bind(this));

    this._taskCancelButton.classList.add('button');
    this._taskCancelButton.setAttribute('id', 'cancel-button');
    this._taskCancelButton.textContent = 'Cancel';
    this._taskCancelButton.style.marginRight = '10px';
    this._taskCancelButton.addEventListener('click', this._taskCancelButtonHandler.bind(this));

    
    buttonsDiv.appendChild(this._taskReRunButton);
    buttonsDiv.appendChild(this._taskCancelButton);

    headerDiv.appendChild(this._taskNameDiv);
    headerDiv.appendChild(timezoneSelect);
    headerDiv.appendChild(buttonsDiv);

    this._taskDetailsDiv.classList.add('task-details');
    this._taskDetailsDiv.setAttribute('id', 'task-details');
    this._taskDetailsDiv.style.fontSize = '14px';

    componentDiv.appendChild(headerDiv);
    componentDiv.appendChild(this._taskDetailsDiv);

    this.appendChild(componentDiv);
  }

  set greyCat(g: GreyCat) {
    this._greyCat = g;
  }

  set taskInfo(t: runtime.TaskInfo) {
    this._updateTaskInfo(t);
  }

  private _timezoneSelectHandler(event: Event) {
    if (!this._taskInfo)
      return;
    const selectedTimezone = (event.target as HTMLSelectElement).value;
    this._timeZone = selectedTimezone;
    this._updateTaskInfo(this._taskInfo);
  }

  private _updateTaskInfo(t: runtime.TaskInfo) {
    if (!this._greyCat)
      return;
    this._taskInfo = t;
    this._taskNameDiv.textContent = (t.mod ?? "") + "::" + (t.fun ?? "");
    const durationMicroseconds = sdk.utils.toDuration(this._greyCat, t.duration?.us ?? 0, sdk.core.DurationUnit.microseconds(this._greyCat));
    const durationMicrosecondsString = sdk.utils.durationToStr(durationMicroseconds);
    const properties: { name: string, description: string | number | bigint}[] = [
      { name: 'User ID', description: t.user_id },
      { name: 'Creation', description: timeToDate(t.creation!, this._timeZone) },
      { name: 'Start', description: timeToDate(t.start!, this._timeZone) },
      { name: 'Duration', description: durationMicrosecondsString, },
    ];
    this._updateTaskDetails(properties);
  }

  private async _getTaskStatus(): Promise<runtime.TaskStatus | null> {
    const updatedTaskInfo = (await this._greyCat?.call("runtime::Task::info", [this._taskInfo?.user_id, this._taskInfo?.task_id])) as runtime.TaskInfo ?? null;
    return updatedTaskInfo?.status ?? null;
  }

  private _taskIsBeingExecuted(taskStatus: runtime.TaskStatus): boolean {
    if (this._greyCat && 
      (taskStatus === runtime.TaskStatus.running(this._greyCat)
      || taskStatus === runtime.TaskStatus.waiting(this._greyCat))) {
        return true;
    }
    return false;
  }

  private async _taskReRunButtonHandler() {
    const taskStatus = (await this._getTaskStatus()) as runtime.TaskStatus | null;
    if (!this._taskInfo || !this._greyCat || !taskStatus)
      return;
    if (this._taskIsBeingExecuted(taskStatus)) {
      console.error('Cannot run the task. It is being executed.');
      return;
    }
    this._params = await parseTaskParams(this._greyCat, this._taskInfo) as Value[];
    const newTask = await this._greyCat?.call(`${this._taskInfo.mod}::${this._taskInfo.fun}`, this._params) as runtime.Task;
    const newTaskInfo = await this._greyCat?.call('runtime::Task::info', [newTask.user_id, newTask.task_id]) as runtime.TaskInfo;
    this._updateTaskInfo(newTaskInfo);
  }

  private async _taskCancelButtonHandler() {
    const taskStatus = (await this._getTaskStatus()) as runtime.TaskStatus | null;
    if (!this._taskInfo || !this._greyCat || !taskStatus)
      return;
    if (!this._taskIsBeingExecuted(taskStatus)) {
      console.error('Task is not being executed.');
      return;
    }
    const isCancelled = await runtime.Task.cancel(this._greyCat, this._taskInfo.task_id);
    if (isCancelled) {
      const cancelledTaskInfo = await this._greyCat?.call('runtime::Task::info', [this._taskInfo.user_id, this._taskInfo.task_id]) as runtime.TaskInfo;
      this._updateTaskInfo(cancelledTaskInfo);
    }
  }

  private _createTaskDetailDiv(name: string, description: string | number | bigint) {
    const propertyDiv = document.createElement('div');
    propertyDiv.classList.add('property');
    propertyDiv.style.display = 'flex';

    const propertyName = document.createElement('strong');
    propertyName.textContent = name;
    propertyName.style.flex = '1';

    const propertyDescription = document.createElement('div');
    propertyDescription.textContent = description.toString();

    propertyDiv.appendChild(propertyName);
    propertyDiv.appendChild(propertyDescription);

    return propertyDiv;
  }

  private _updateTaskDetails(properties: { name: string, description: string | number | bigint }[]) {
    while (this._taskDetailsDiv.firstChild) {
      this._taskDetailsDiv.removeChild(this._taskDetailsDiv.firstChild);
    }

    properties.forEach(property => {
      const propertyDiv = this._createTaskDetailDiv(property.name, property.description);
      this._taskDetailsDiv.appendChild(propertyDiv);
    });
  }
}

if (!customElements.get('gui-task-info')) {
  customElements.define('gui-task-info', GuiTaskInfo);
}

declare global {
  interface Window {
    GuiTaskInfo: typeof GuiTaskInfo;
  }
  interface HTMLElementTagNameMap {
    'gui-task-info': GuiTaskInfo;
  }
}