import { signal } from '../../src';

type User = { name: string; age: number };

export class FindUser extends HTMLElement {
  name = signal('');
  user = signal<User | null>(null);

  findUser = async () => {
    const res = await greycat.default.call<User | null>('signals::findUser', [this.name()]);
    this.user.set(res);
    this.name.set('');
  };

  connectedCallback() {
    this.appendChild(
      <div>
        <h4 style={{ marginBottom: 'var(--spacing)' }}>Find user:</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing)' }}>
          <input
            type="text"
            $:value={this.name}
            onkeyup={(ev) => {
              if (ev.key === 'Enter') {
                this.findUser();
              }
            }}
            placeholder="Find a user by name..."
            style={{ width: '200px', marginBottom: '0' }}
          />
          <button style={{ width: 'auto', marginBottom: '0' }} onclick={this.findUser}>
            Find
          </button>
        </div>
        <gui-object value={this.user} />
      </div>,
    );
  }

  disconnectedCallback() {
    this.replaceChildren();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'find-user': FindUser;
  }

  namespace JSX {
    interface IntrinsicElements {
      'find-user': GreyCat.Element<FindUser>;
    }
  }
}

if (!customElements.get('find-user')) {
  customElements.define('find-user', FindUser);
}
