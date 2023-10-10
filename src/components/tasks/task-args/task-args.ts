import { GreyCat, AbiParam, core } from '@greycat/sdk';
import { DurationInput, TextInput, IntInput, FloatInput, TimeInput } from './argument-inputs.js';

type ConvertedValues = number | string | core.duration;

export class GuiTaskArgs extends HTMLElement {
  private _greycat: GreyCat = window.greycat.default;
  private _inputContainer: HTMLDivElement = document.createElement('div');
  private _outputText: HTMLDivElement = document.createElement('div');
  private _convertedValues: Map<string, ConvertedValues> = new Map();
  private _timeZone: core.TimeZone = core.TimeZone.Europe_Luxembourg(this._greycat);

  constructor() {
    super();
  }

  get arguments(): Array<ConvertedValues> {
    return Array.from(this._convertedValues.values());
  }

  connectedCallback() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this._inputContainer);
    fragment.appendChild(this._outputText);
    this.appendChild(fragment);
  }

  set greycat(g: GreyCat) {
    this._greycat = g;
  }

  set timeZone(t: core.TimeZone) {
    this._timeZone = t;
  }

  set taskName(name: string) {
    this._outputText.innerHTML = '';
    this._inputContainer.innerHTML = '';

    if (this._greycat.abi.fn_by_fqn.has(name)) {
      const task = this._greycat.abi.fn_by_fqn.get(name);
      if (!task || !task.is_task) {
        this._handleTaskNotFound();
      } else {
        task.params.forEach((param) => {
          const paramElement = this._createParamElement(param);
          this._inputContainer.appendChild(paramElement);
        });
      }
    } else {
      this._handleTaskNotFound();
    }
  }

  private _handleTaskNotFound() {
    this._outputText.textContent = 'Task not found';
    this._inputContainer.innerHTML = '';
  }

  private _handleError(error: unknown) {
    // TODO: replace with User friendly error notification
    console.error(error);
  }

  private _createParamElement(param: AbiParam) {
    const paramElement = document.createElement('div');
    paramElement.appendChild(document.createTextNode(`${param.name}: ${param.type.name}`));
    const defaultInput = document.createElement('input');
    defaultInput.type = 'text';

    let i: DurationInput | TextInput | IntInput | FloatInput | TimeInput;

    try {
      switch (param.type.name) {
        case 'core::String':
        case 'core::char':
        case 'core::node':
        case 'core::nodeList':
        case 'core::nodeIndex':
        case 'core::nodeTime':
        case 'core::nodeGeo':
        case 'core::Array':
        case 'core::stringlit':
          i = new TextInput('');
          i.addEventListener('change', (value) => {
            this._convertedValues.set(param.name, value);
          });
          paramElement.appendChild(i.inputElement);
          return paramElement;
        case 'core::int':
          i = new IntInput(0);
          i.addEventListener('change', (value) => {
            this._convertedValues.set(param.name, value);
          });
          paramElement.appendChild(i.inputElement);
          return paramElement;
        case 'core::float':
          i = new FloatInput(0);
          i.addEventListener('change', (value) => {
            this._convertedValues.set(param.name, value);
          });
          paramElement.appendChild(i.inputElement);
          return paramElement;
        case 'core::duration':
          i = new DurationInput(0, 'minutes');
          i.addEventListener('change', (value) => {
            this._convertedValues.set(param.name, value);
          });
          paramElement.appendChild(i.inputElement);
          return paramElement;
        case 'core::time':
          i = new TimeInput(this._timeZone);
          i.addEventListener('change', (value) => {
            this._convertedValues.set(param.name, value);
          });
          paramElement.appendChild(i.inputElement);
          return paramElement;
        case 'core::geo':
          return defaultInput;
        case 'core::null':
          return defaultInput;
        case 'core::enum':
          return defaultInput;
        case 'core::object':
          return defaultInput;
        case 'core::tu2d':
          return defaultInput;
        case 'core::tu3d':
          return defaultInput;
        case 'core::tu4d':
          return defaultInput;
        case 'core::tu5d':
          return defaultInput;
        case 'core::tu6d':
          return defaultInput;
        case 'core::tu10d':
          return defaultInput;
        case 'core::tuf2d':
          return defaultInput;
        case 'core::tuf3d':
          return defaultInput;
        case 'core::tuf4d':
          return defaultInput;
        case 'core::undefined':
          return defaultInput;
        case 'core::bool':
          return defaultInput;
        case 'core::cubic':
          return defaultInput;
        case 'core::function':
          return defaultInput;
        case 'core::block_ref':
          return defaultInput;
        default:
          return defaultInput;
      }
    } catch (error: unknown) {
      this._handleError(error);
      return defaultInput;
    }
  }
}

if (!customElements.get('gui-task-args')) {
  customElements.define('gui-task-args', GuiTaskArgs);
}

declare global {
  interface Window {
    GuiTaskArgs: typeof GuiTaskArgs;
  }
  interface HTMLElementTagNameMap {
    'gui-task-args': GuiTaskArgs;
  }
}