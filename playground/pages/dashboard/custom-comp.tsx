import { registerCustomElement } from '@greycat/web';

class CustomComponent extends HTMLElement {
  private _counter: Text;

  constructor() {
    super();

    this._counter = document.createTextNode('0');
  }

  get count() {
    return parseInt(this._counter.textContent as string);
  }

  set count(count: number) {
    this._counter.textContent = `${count}`;
  }

  connectedCallback(): void {
    this.style.display = 'contents';

    this.appendChild(
      <div style={{ padding: 'var(--spacing)' }}>
        <h4>Hello from custom component</h4>
        <span>Count: {this._counter}</span>
        <button
          onclick={() => {
            this.count++;
          }}
        >
          Click me
        </button>
      </div>,
    );
  }

  disconnectedCallback() {
    this.replaceChildren();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-custom-comp': CustomComponent;
  }
}

registerCustomElement('my-custom-comp', CustomComponent);
