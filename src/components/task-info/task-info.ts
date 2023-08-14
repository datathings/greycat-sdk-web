import { GreyCat, runtime } from '@greycat/sdk';
import * as sdk from '@greycat/sdk';

export class GuiTaskInfo extends HTMLElement {
  private _greyCat: GreyCat | null;
  private _taskInfo: runtime.TaskInfo | null;
  private _taskNameDiv: HTMLDivElement;
  private _taskReRunButton: HTMLButtonElement;
  private _taskCancelButton: HTMLButtonElement;
  private _taskDetailsDiv: HTMLDivElement;

  constructor() {
    super();
    this._greyCat = null;
    this._taskInfo = null;
    this._taskNameDiv = document.createElement('div');
    this._taskReRunButton = document.createElement('button');
    this._taskCancelButton = document.createElement('button');
    this._taskDetailsDiv = document.createElement('div');
  }

  connectedCallback() {
    const componentDiv = document.createElement('div');
    componentDiv.classList.add('component');
    componentDiv.style.border = '1px solid #ccc';
    componentDiv.style.padding = '10px';
    componentDiv.style.width = '500px';

    const headerDiv = document.createElement('div');
    headerDiv.classList.add('header');
    headerDiv.style.display = 'flex';
    headerDiv.style.justifyContent = 'space-between';
    headerDiv.style.alignItems = 'center';
    headerDiv.style.marginBottom = '10px';

    this._taskNameDiv .setAttribute('id', 'task-name');
    this._taskNameDiv .textContent = 'Task name';

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');

    this._taskReRunButton.classList.add('button');
    this._taskReRunButton.setAttribute('id', 're-run-button');
    this._taskReRunButton.textContent = 'Re-run';
    this._taskReRunButton.style.marginRight = '10px';

    this._taskCancelButton.classList.add('button');
    this._taskCancelButton.setAttribute('id', 'cancel-button');
    this._taskCancelButton.textContent = 'Cancel';
    this._taskCancelButton.style.marginRight = '10px';

    buttonsDiv.appendChild(this._taskReRunButton);
    buttonsDiv.appendChild(this._taskCancelButton);

    headerDiv.appendChild(this._taskNameDiv);
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
    if (!this._greyCat)
      return;
    this._taskInfo = t;
    this._taskNameDiv.textContent = (t.mod ?? "") + "::" + (t.fun ?? "");
    const durationMicroseconds = sdk.utils.toDuration(this._greyCat, t.duration?.us, sdk.core.DurationUnit.microseconds(this._greyCat));
    const durationMicrosecondsString = sdk.utils.durationToStr(durationMicroseconds);

    const properties: { name: string, description: string}[] = [
      { name: 'User ID', description: t.user_id },
      { name: 'Creation epochs', description: t.creation?.epoch },
      { name: 'Start epochs', description: t.start?.epoch },
      { name: 'Duration', description: durationMicrosecondsString, },
    ];
    this.updateTaskDetails(properties);
  }

  createTaskDetailDiv(name: string, description: any) {
    const propertyDiv = document.createElement('div');
    propertyDiv.classList.add('property');
    propertyDiv.style.display = 'flex';

    const propertyName = document.createElement('strong');
    propertyName.textContent = name;
    propertyName.style.flex = '1';

    const propertyDescription = document.createElement('div');
    propertyDescription.textContent = description;

    propertyDiv.appendChild(propertyName);
    propertyDiv.appendChild(propertyDescription);

    return propertyDiv;
  }

  updateTaskDetails(properties: { name: string, description: string }[]) {
    while (this._taskDetailsDiv.firstChild) {
      this._taskDetailsDiv.removeChild(this._taskDetailsDiv.firstChild);
    }

    properties.forEach(property => {
      const propertyDiv = this.createTaskDetailDiv(property.name, property.description);
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