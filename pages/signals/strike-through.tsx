import { signal } from '../../src';

export class StrikeThrough extends HTMLElement {
  done = signal(false);

  connectedCallback() {
    this.appendChild(
      <div>
        <h4 style={{ marginBottom: 'var(--spacing)' }}>Classname:</h4>
        <span className={{ done: this.done }} onclick={() => this.done.update((d) => !d)}>
          Click me to toggle
        </span>
      </div>,
    );
  }

  disconnectedCallback() {
    this.replaceChildren();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'strike-through': StrikeThrough;
  }

  namespace JSX {
    interface IntrinsicElements {
      'strike-through': GreyCat.Element<StrikeThrough>;
    }
  }
}

if (!customElements.get('strike-through')) {
  customElements.define('strike-through', StrikeThrough);
}
