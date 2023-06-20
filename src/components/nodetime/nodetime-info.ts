import { core } from '@greycat/lib-std';
import { GuiValue } from '../value';

export class GuiNodeTimeInfo extends HTMLElement {
  private _name: string | undefined;
  private _node: core.nodeTime<unknown> | undefined;
  private _info: core.NodeTimeInfo | undefined;

  // UI elements
  private _titleEl = document.createElement('div');
  private _sizeEl = new InfoLine('Size');
  private _fromEl = new InfoLine('From');
  private _toEl = new InfoLine('To');

  set node(node: core.nodeTime<unknown> | undefined) {
    this._node = node;
    this._update();
  }

  get node() {
    return this._node;
  }

  set name(name: string) {
    this._name = name;
    this._titleEl.textContent = name;
  }

  get info() {
    return this._info;
  }

  async connectedCallback() {
    this._titleEl.textContent = this._name ?? 'nodeTime';
    this._titleEl.classList.add('gui-nodetime-info-title');

    this.append(this._titleEl, this._sizeEl.root, this._fromEl.root, this._toEl.root);
  }

  private async _update() {
    if (!this._node) {
      return;
    }

    const [info] = await core.nodeTime.info([this._node]);
    this._info = info;
    this._sizeEl.value = this._info.size;
    this._fromEl.value = this._info.from;
    this._toEl.value = this._info.to;
  }
}

class InfoLine {
  readonly root = document.createElement('div');

  constructor(name: string, value?: unknown) {
    this.root.classList.add('gui-nodetime-info-line');

    const nameEl = document.createElement('div');
    nameEl.textContent = name;

    const valueEl = document.createElement('gui-value');
    valueEl.value = value;

    this.root.append(nameEl, valueEl);
  }

  set name(name: string) {
    this.root.children[0].textContent = name;
  }

  set value(value: unknown) {
    (this.root.children[1] as GuiValue).value = value;
  }
}

if (!window.customElements.get('gui-nodetime-info')) {
  window.GuiNodeTimeInfo = GuiNodeTimeInfo;
  window.customElements.define('gui-nodetime-info', GuiNodeTimeInfo);
}

declare global {
  interface Window {
    GuiNodeTimeInfo: typeof GuiNodeTimeInfo;
  }
  interface HTMLElementTagNameMap {
    'gui-nodetime-info': GuiNodeTimeInfo;
  }

  // interface HTMLElementEventMap {
  //   'table-sort': TableSortEvent;
  //   'table-resize-col': TableResizeColEvent;
  //   render: TableRenderEvent;
  // }
}
