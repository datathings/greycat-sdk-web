import { runtime } from '../../exports.js';
import type { SlInput, SlSelect } from '@shoelace-style/shoelace';

export class GuiRoleForm extends HTMLElement {
  private _name: SlInput;
  private _permissions: SlSelect;

  constructor() {
    super();

    const root = this.attachShadow({ mode: 'open' });

    this._name = (<sl-input label="Name" required />) as SlInput;
    this._permissions = (
      <sl-select
        label="Permissions"
        placement="bottom"
        maxOptionsVisible={0}
        multiple
        hoist
        clearable
      />
    ) as SlSelect;

    root.append(this._name, this._permissions);
  }

  set permissions(permissions: string[]) {
    this._permissions.replaceChildren();
    permissions.sort();
    for (let i = 0; i < permissions.length; i++) {
      const permission = permissions[i];
      this._permissions.appendChild(<sl-option value={permission}>{permission}</sl-option>);
    }
  }

  set value(role: runtime.UserRole) {
    this._name.value = role.name;
    this._permissions.value = role.permissions;
  }

  clear(): void {
    this._name.value = '';
    this._permissions.value = [];
  }

  async delete(): Promise<void> {
    await runtime.UserRole.remove(this._name.value);
  }

  async update(): Promise<void> {
    const role = runtime.UserRole.create(this._name.value, this._permissions.value as string[]);
    await runtime.UserRole.set(role);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-role-form': GuiRoleForm;
  }

  namespace JSX {
    interface IntrinsicElements {
      'gui-role-form': GreyCat.Element<GuiRoleForm>;
    }
  }
}

if (!customElements.get('gui-role-form')) {
  customElements.define('gui-role-form', GuiRoleForm);
}
