import { computed, signal } from '@greycat/web';

export class ComputedSignals extends HTMLElement {
  a = signal(40);
  b = signal(2);
  ab = computed(() => this.a() + this.b());

  connectedCallback() {
    this.appendChild(
      <div>
        <h4 style={{ marginBottom: 'var(--spacing)' }}>Computed signals:</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing)' }}>
          <input
            type="number"
            $:valueAsNumber={this.a}
            style={{ marginBottom: '0', width: '200px' }}
          />
          <input
            type="number"
            $:valueAsNumber={this.b}
            style={{ marginBottom: '0', width: '200px' }}
          />
          <span>
            {this.a} + {this.b} = {this.ab}
          </span>
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
    'computed-signals': ComputedSignals;
  }

  namespace JSX {
    interface IntrinsicElements {
      'computed-signals': GreyCat.Element<ComputedSignals>;
    }
  }
}

if (!customElements.get('computed-signals')) {
  customElements.define('computed-signals', ComputedSignals);
}
