import { GreyCat } from '@greycat/sdk';

export class GuiTaskCreate extends HTMLElement {
  private _greycat: GreyCat | null;  
  private _taskModuleAndFunctionInput: HTMLInputElement;
  private _paramsJsonInput: HTMLTextAreaElement;
  private _createTaskButton: HTMLButtonElement;
  

  constructor() {
    super();
    this._greycat = null;
    this._taskModuleAndFunctionInput = document.createElement('input');
    this._paramsJsonInput = document.createElement('textarea');
    this._createTaskButton = document.createElement('button');
  }

  connectedCallback() {
    const container = document.createElement('div');
    container.classList.add('task-create-container');

    const topLine = document.createElement('div');
    topLine.classList.add('top-line');

    this._taskModuleAndFunctionInput.setAttribute('type', 'text');
    this._taskModuleAndFunctionInput.setAttribute('placeholder', 'Module and function name. Ex: project::get_sum');
    this._taskModuleAndFunctionInput.classList.add('module-input');

    this._createTaskButton.textContent = 'Create Task';
    this._createTaskButton.addEventListener('click', this._handleCreateTaskButtonClick.bind(this));
    this._createTaskButton.classList.add('create-button');

    this._paramsJsonInput.setAttribute('placeholder', 'Enter JSON for parameters. Ex: [42, \'Hello\', true]');
    this._paramsJsonInput.classList.add('params-input');

    topLine.appendChild(this._taskModuleAndFunctionInput);
    topLine.appendChild(this._createTaskButton);

    container.appendChild(topLine);
    container.appendChild(this._paramsJsonInput);

    this.appendChild(container);
  }

  set greycat(g: GreyCat) {
    this._greycat = g;
  }

  private _handleCreateTaskButtonClick() {
    if (!this._greycat) {
      return
    }
    const moduleName = this._taskModuleAndFunctionInput.value;
    const params = this._paramsJsonInput.value;
    const url = `${this._greycat.api}/${moduleName}`;
  
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    if (params.length) {
      requestOptions.body = params;
    } else {
      requestOptions.body = '[]';
    }
  
    this._performFetch(url, requestOptions);
  }
  
  private async _performFetch(url: String, requestOptions: RequestInit) {
    try {
      const response = await fetch(url as RequestInfo, requestOptions);
      await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

if (!customElements.get('gui-task-create')) {
  customElements.define('gui-task-create', GuiTaskCreate);
}

declare global {
  interface Window {
    GuiTaskCreate: typeof GuiTaskCreate;
  }
  interface HTMLElementTagNameMap {
    'gui-task-create': GuiTaskCreate;
  }
}