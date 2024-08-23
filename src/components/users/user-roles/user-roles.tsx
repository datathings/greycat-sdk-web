import { std, type GreyCat, $ } from '../../../exports.js';
// ensures multi-select-checkbox is with this component
import '../../multi-select-checkbox/index.js';
import type { SlButton } from '@shoelace-style/shoelace';

export class GuiUserRoles extends HTMLElement {
  private _greycat: GreyCat = $.default;
  private _roles: std.runtime.UserRole[] = [];
  private _table = document.createElement('table');
  private _tbody = document.createElement('tbody');
  private _dialog = document.createElement('sl-dialog');
  private _permissionsSelect = document.createElement('gui-multi-select-checkbox');
  private _nameInput = document.createElement('input');
  private _dialogHeader = document.createElement('header');
  private _dialogSubmitBtn: SlButton;
  private _currentState: 'create' | std.runtime.UserRole = 'create';

  constructor() {
    super();

    this._dialogHeader.slot = 'label';
    this._dialogSubmitBtn = (
      <sl-button slot="footer" onclick={() => this._handleSubmit()}>
        Create
      </sl-button>
    ) as SlButton;
  }

  connectedCallback() {
    this._table.appendChild(
      <thead>
        <tr>
          <th>Name</th>
          <th>Permissions</th>
          <th>
            <a
              href="#"
              onclick={(ev) => {
                ev.preventDefault();
                this._createRole();
              }}
            >
              Create
            </a>
          </th>
        </tr>
      </thead>,
    );
    this._table.appendChild(this._tbody);

    this.appendChild(<figure>{this._table}</figure>);

    this._initDialog();
    this.appendChild(this._dialog);

    this.render();
  }

  disconnectedCallback() {
    this.replaceChildren(); // cleanup
  }

  set greycat(greycat: GreyCat) {
    this._greycat = greycat;
    this.updateRoles();
    this.updatePermissions();
    this.render();
  }

  get value() {
    return this._roles;
  }

  set value(value: std.runtime.UserRole[]) {
    this._roles = Array.from(value).sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }),
    );
    this.render();
  }

  set permissions(permissions: string[]) {
    this._permissionsSelect.options = permissions.sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
    );
    this.render();
  }

  set caption(caption: string | null | undefined) {
    if (caption) {
      if (this._table.children[0] instanceof HTMLTableCaptionElement) {
        this._table.children[0].textContent = caption;
      } else {
        const captionEl = document.createElement('caption');
        captionEl.textContent = caption;
        this._table.prepend(captionEl);
      }
    } else {
      if (this._table.children[0] instanceof HTMLTableCaptionElement) {
        this._table.children[0].remove();
      }
    }
  }

  private _handleError(error: unknown) {
    // TODO: replace with User friendly error notification
    console.error(error);
  }

  /**
   * Triggers a call to GreyCat in order to update the role list.
   */
  async updateRoles() {
    try {
      this.value = await std.runtime.UserRole.all(this._greycat);
    } catch (err) {
      this._handleError(err);
    }
  }

  /**
   * Triggers a call to GreyCat in order to update the permissions.
   */
  async updatePermissions() {
    try {
      this.permissions = await std.runtime.SecurityPolicy.permissions(this._greycat);
    } catch (err) {
      this._handleError(err);
    }
  }

  private _initDialog(): void {
    this._dialog.appendChild(
      <>
        {this._dialogHeader}

        <div className="container">
          <label htmlFor="name">
            Name*
            {this._nameInput}
          </label>
          <label htmlFor="permissions">
            Permissions
            {this._permissionsSelect}
          </label>

          <hr />
          <small>(*) Mandatory fields</small>
        </div>

        {this._dialogSubmitBtn}
      </>,
    );
  }

  private _editRole(role: std.runtime.UserRole): void {
    this._currentState = role;

    this._nameInput.value = role.name;
    this._nameInput.disabled = true;
    this._permissionsSelect.selected = role.permissions;

    this._dialogHeader.textContent = 'Edit a role';
    this._dialogSubmitBtn.textContent = 'Update';

    this._dialog.show();
  }

  private _createRole(): void {
    this._currentState = 'create';

    this._nameInput.value = '';
    this._nameInput.disabled = false;
    this._permissionsSelect.selected = [];

    this._dialogHeader.textContent = 'Create a new role';
    this._dialogSubmitBtn.textContent = 'Create';

    this._dialog.show();
  }

  private async _handleSubmit() {
    const name = this._nameInput.value.trim();
    if (name.length === 0) {
      this._nameInput.setAttribute('aria-invalid', 'true');
      return;
    }

    let role: std.runtime.UserRole;
    if (this._currentState === 'create') {
      role = std.runtime.UserRole.create(name, this._permissionsSelect.selected);
    } else {
      role = this._currentState;
      role.permissions = this._permissionsSelect.selected;
    }

    try {
      await std.runtime.UserRole.set(role, this._greycat);
    } catch (err) {
      this._handleError(err);
    }

    this._dialog.hide();

    await this.updateRoles();
    this.render();
  }

  render() {
    const rows = document.createDocumentFragment();

    for (let i = 0; i < this._roles.length; i++) {
      const role = this._roles[i];
      const permissions = role.permissions
        .slice()
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

      rows.appendChild(
        <tr>
          <td>{role.name}</td>
          <td>
            {permissions.map((perm) => (
              <code>{perm}</code>
            ))}
          </td>
          <td>
            <a
              href="#"
              onclick={(ev) => {
                ev.preventDefault();
                this._editRole(role);
              }}
            >
              Edit
            </a>
          </td>
        </tr>,
      );
    }

    this._tbody.replaceChildren(rows);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-user-roles': GuiUserRoles;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-user-roles': GreyCat.Element<GuiUserRoles>;
    }
  }
}

if (!globalThis.customElements.get('gui-user-roles')) {
  globalThis.customElements.define('gui-user-roles', GuiUserRoles);
}
