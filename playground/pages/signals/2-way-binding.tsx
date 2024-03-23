import { signal } from '@greycat/web';

export class TwoWayDataBinding extends HTMLElement {
  search = signal('default value');

  connectedCallback() {

    this.appendChild(
      <div>
        <h4 style={{ marginBottom: 'var(--spacing)' }}>2-way data binding:</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing)' }}>
          <input
            type="text"
            $:value={this.search}
            placeholder="First input"
            style={{ marginBottom: '0', width: '200px' }}
          />
          <input
            type="text"
            $:value={this.search}
            placeholder="Search…"
            style={{ marginBottom: '0', width: '200px' }}
          />
          <span>Value: {this.search}</span>
        </div>
      </div>,
    );
  }

  disconnectedCallback() {
    this.replaceChildren();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'two-way-databinding': TwoWayDataBinding;
  }

  namespace JSX {
    interface IntrinsicElements {
      'two-way-databinding': GreyCat.Element<TwoWayDataBinding>;
    }
  }
}

if (!customElements.get('two-way-databinding')) {
  customElements.define('two-way-databinding', TwoWayDataBinding);
}
