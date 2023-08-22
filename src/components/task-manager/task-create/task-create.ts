import { GreyCat } from '@greycat/sdk';

export class GuiTaskCreate extends HTMLElement {
  private _greyCat: GreyCat | null;  
  private _taskModuleAndFunctionInput: HTMLInputElement;
  private _paramsJsonInput: HTMLTextAreaElement;
  private _createTaskButton: HTMLButtonElement;
  

  constructor() {
    super();
    this._greyCat = null;
    this._taskModuleAndFunctionInput = document.createElement('input');
    this._paramsJsonInput = document.createElement('textarea');
    this._createTaskButton = document.createElement('button');
  }

  connectedCallback() {
    const container = document.createElement('div');
    container.classList.add('task-create-container');
    container.style.border = '1px solid #ccc';
    container.style.padding = '10px';

    const topLine = document.createElement('div');
    topLine.style.display = 'flex';
    topLine.style.flexDirection = 'row';
    topLine.style.justifyContent = 'space-between';
    topLine.style.alignItems = 'center';
    topLine.style.marginBottom = '10px';

    this._taskModuleAndFunctionInput.setAttribute('type', 'text');
    this._taskModuleAndFunctionInput.setAttribute('placeholder', 'Module and function name. Ex: project::get_sum');
    this._taskModuleAndFunctionInput.style.flex = '1';
    this._taskModuleAndFunctionInput.style.width = '60%';

    this._createTaskButton.textContent = 'Create Task';
    this._createTaskButton.addEventListener('click', this._handleCreateTaskButtonClick.bind(this));

    this._paramsJsonInput.setAttribute('placeholder', 'Enter JSON for of parameters. Ex: [42, \'Hello\', true]');
    this._paramsJsonInput.style.height = '100px';
    this._paramsJsonInput.style.width = '100%';

    topLine.appendChild(this._taskModuleAndFunctionInput);
    topLine.appendChild(this._createTaskButton);

    container.appendChild(topLine);
    container.appendChild(this._paramsJsonInput);

    this.appendChild(container);
  }

  set greyCat(g: GreyCat) {
    this._greyCat = g;
  }

  private _handleCreateTaskButtonClick() {
    if (!this._greyCat)
      return
    const moduleName = this._taskModuleAndFunctionInput.value;
    const params = this._paramsJsonInput.value;
    const url = `${this._greyCat.api}/${moduleName}`;
  
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    if (params.length)
      requestOptions.body = params;
  
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