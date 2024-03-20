import { signal } from '../../src';

export class PokeFinder extends HTMLElement {
  ctrl: AbortController = new AbortController();

  name = signal('pikachu');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pokemon = signal<any>(null);

  findPokemon = async () => {
    const name = this.name();
    if (name.length === 0) {
      return;
    }
    this.ctrl.abort();
    this.ctrl = new AbortController();
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
        signal: this.ctrl.signal,
      });
      if (res.ok && res.status === 200) {
        const value = await res.json();
        this.pokemon.set(value);
      } else {
        this.pokemon.set(null);
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          // ignore previous fetch
          return;
        }
      }
    }
  };

  connectedCallback() {
    this.appendChild(
      <div>
        <h4 style={{ marginBottom: 'var(--spacing)' }}>Poké Finder:</h4>
        <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--spacing)' }}>
          <input
            type="text"
            $:value={this.name}
            onkeyup={(ev) => {
              if (ev.key === 'Enter') {
                this.findPokemon();
              }
            }}
            placeholder="Find a Pokémon by name..."
            style={{ width: '200px', marginBottom: '0' }}
          />
          <button style={{ width: 'auto', marginBottom: '0' }} onclick={this.findPokemon}>
            Find
          </button>
          <gui-object value={this.pokemon} style={{ flex: '1' }} />
        </div>
      </div>,
    );

    this.findPokemon();
  }

  disconnectedCallback() {
    this.replaceChildren();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'poke-finder': PokeFinder;
  }

  namespace JSX {
    interface IntrinsicElements {
      'poke-finder': GreyCat.Element<PokeFinder>;
    }
  }
}

if (!customElements.get('poke-finder')) {
  customElements.define('poke-finder', PokeFinder);
}
