import { GreyCat } from '@greycat/sdk';
import { Disposer } from '../../common.js';

export class GuiTaskCreate extends HTMLElement {
  private _greycat: GreyCat = window.greycat.default;
  private _taskModuleAndFunctionInput = document.createElement('input');
  private _paramsJsonInput = document.createElement('textarea');
  private _createTaskButton = document.createElement('button');
  private _disposer = new Disposer();

  connectedCallback() {
    const fragment = document.createDocumentFragment();

    const topLine = document.createElement('div');
    topLine.classList.add('top-line');

    this._taskModuleAndFunctionInput.setAttribute('type', 'text');
    this._taskModuleAndFunctionInput.setAttribute('placeholder', 'Module and function name. Ex: project::get_sum');
    this._taskModuleAndFunctionInput.classList.add('module-input');

    this._createTaskButton.textContent = 'Create Task';
    this._disposer.addEventListener(this._createTaskButton, 'click', this._handleCreateTaskButtonClick.bind(this));
    this._createTaskButton.classList.add('create-button');

    this._paramsJsonInput.setAttribute('placeholder', 'Enter JSON for parameters. Ex: [42, \'Hello\', true]');
    this._paramsJsonInput.classList.add('params-input');

    topLine.appendChild(this._taskModuleAndFunctionInput);
    topLine.appendChild(this._createTaskButton);

    fragment.appendChild(topLine);
    fragment.appendChild(this._paramsJsonInput);

    this.appendChild(fragment);
  }

  disconnectedCallback() {
    this._disposer.dispose();
    this.replaceChildren(); // cleanup
  }

  set greycat(g: GreyCat) {
    this._greycat = g;
  }

  private _handleCreateTaskButtonClick() {
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

  private async _performFetch(url: string, requestOptions: RequestInit) {
    try {
      const response = await fetch(url as RequestInfo, requestOptions);
      await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-task-create': GuiTaskCreate;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-task-create': Partial<Omit<GuiTaskCreate, 'children'>>;
    }
  }
}

if (!globalThis.customElements.get('gui-task-create')) {
  globalThis.customElements.define('gui-task-create', GuiTaskCreate);
}