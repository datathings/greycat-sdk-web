import '@greycat/web';
import { css, GuiElement } from '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

type Item = { title: string; content: string };
const items = [
  { title: 'One', content: 'Here is the content of the first item' },
  { title: 'Two', content: 'And this is the content of the second item' },
];

type RenderFn<T> = (item: T, index: number, list: GuiList<T>) => Node;
type StateChangeFn<T> = (newState: boolean[], oldState: boolean[], list: GuiList<T>) => void;

class GuiList<T = unknown> extends GuiElement {
  static override styles = [
    css(`
      :host {
        display: contents;
      }

      .container {
        display: flex;
        flex-direction: column;
        gap: var(--spacing);
      }

      .container > gui-details > summary {
        font-weight: bold;
      }

      .container > gui-details[open]::part(header) {
        border-bottom: 1px solid var(--border-color);
      }
      `),
  ];

  private _items: T[];
  private _state: boolean[];
  private _title: string | undefined;
  private _container: HTMLElement;
  private _collapsible: boolean;
  private _renderItem: RenderFn<T>;
  private _onStateChange: StateChangeFn<T>;

  constructor() {
    super();

    this._items = [];
    this._state = [];
    this._collapsible = false;
    this._renderItem = (item) => document.createTextNode(`${item}`);
    this._onStateChange = () => void 0; // noop state handler

    this._container = document.createElement('div');
    this._container.className = 'container';

    this.shadowRoot.appendChild(this._container);
  }

  static create<T>(items: T[]): GuiList<T> {
    const list = document.createElement('gui-list') as GuiList<T>;
    list.value = items;
    return list;
  }

  get value() {
    return this._items;
  }

  set value(value: T[]) {
    this._items = value;
    this._state = new Array(value.length).fill(false);
    this.update();
  }

  get renderItem() {
    return this._renderItem;
  }

  set renderItem(fn: RenderFn<T>) {
    this._renderItem = fn;
    this.update();
  }

  get collapsible() {
    return this._collapsible;
  }

  set collapsible(collapsible: boolean) {
    this._collapsible = collapsible;
    this.update();
  }

  set onStateChange(fn: StateChangeFn<T>) {
    this._onStateChange = fn;
  }

  getSelectHandler(index: number, middleware?: (ev: Event) => false | void): (ev: Event) => void {
    return (ev) => {
      if (middleware && middleware(ev) === false) {
        return;
      }
      const newState = Array.from(this._state);
      const prev = newState[index];
      newState[index] = !prev;
      const oldState = this._state;
      this._state = newState;
      this._onStateChange(newState, oldState, this);
    };
  }

  connectedCallback(): void {
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < this._items.length; i++) {
      const item = this._items[i];
      fragment.appendChild(this._renderItem(item, i, this));
    }
    if (this._collapsible) {
      this._container.replaceChildren(
        <gui-details open>
          <summary slot="summary">{this._title === undefined ? `${this._items.length} items` : this._title}</summary>
          <div className="gui-list">{fragment}</div>
        </gui-details>,
      );
    } else {
      this._container.replaceChildren(
        <gui-card>
          <div slot="header">{this._title === undefined ? `${this._items.length} items` : this._title}</div>
          <div className="gui-list">{fragment}</div>
        </gui-card>,
      );
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-list': GuiList;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        'gui-list': GreyCat.Element<GuiList<any>>;
      }
    }
  }
}

customElements.define('gui-list', GuiList);

document.body.appendChild(
  <app-layout title="List">
    <gui-list
      collapsible
      value={items}
      renderItem={(item: Item, i, list) => (
        <gui-details>
          <summary slot="summary" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto' }}>
            <sl-checkbox onsl-input={list.getSelectHandler(i)} onclick={(ev) => ev.stopPropagation()} />
            <span>{item.title}</span>
          </summary>
          <div>{item.content}</div>
        </gui-details>
      )}
      onStateChange={(newState, oldState, _list) => {
        console.log('state change', newState, oldState);
      }}
    >
      <sl-button variant="text" size="small" slot="add-item">
        Add
      </sl-button>
      <sl-button variant="text" size="small" slot="delete-selected">
        Del selection
      </sl-button>
    </gui-list>
  </app-layout>,
);
