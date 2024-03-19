import { registerCustomElement } from '@greycat/web';

class CustomComponent extends HTMLElement {
  count: number = 0;
  constructor() {
    super();
  }

  connectedCallback(): void {
    this.style.display = 'contents';

    const counter = document.createTextNode(`${this.count}`);
    this.appendChild(
      <div style={{ padding: 'var(--spacing)' }}>
        <h4>Hello from custom component</h4>
        <span>Count: {counter}</span>
        <button
          onclick={() => {
            this.count++;
            counter.textContent = `${this.count}`;
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