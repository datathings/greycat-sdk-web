import { type GreyCat, std, sha256hex, $ } from '../../../exports.js';
// ensures multi-select-checkbox is with this component
import '../../multi-select-checkbox/index.js';
import type { SlButton, SlCheckbox, SlInput, SlSelect } from '@shoelace-style/shoelace';

export class GuiUserTable extends HTMLElement {
  private _greycat: GreyCat = $.default;
  private _table = document.createElement('table');
  private _tbody = document.createElement('tbody');
  private _dialog = document.createElement('sl-dialog');
  private _roleSelect: SlSelect;
  private _groupsSelect = document.createElement('gui-multi-select-checkbox');
  private _users: Array<std.runtime.User> = [];
  private _groups: Array<std.runtime.UserGroup> = [];
  private _roles: Array<std.runtime.UserRole> = [];
  private _currentState: 'create' | std.runtime.User = 'create';
  private _dialogHeader = document.createElement('header');
  private _dialogSubmitBtn: SlButton;

  private _nameInput: SlInput;
  private _fullnameInput: SlInput;
  private _passwordInput: SlInput;
  private _emailInput: SlInput;
  private _activatedInput: SlCheckbox;

  private _reset = (ev: Event) => {
    if (ev.target instanceof HTMLInputElement) {
      ev.target.removeAttribute('aria-invalid');
    }
  };

  constructor() {
    super();

    this._dialogHeader.slot = 'label';

    this._nameInput = (
      <sl-input label="Name" placeholder="eg. jdoe" oninput={this._reset} required />
    ) as SlInput;

    (<sl-input label="Username*" placeholder="" />) as SlInput;

    this._fullnameInput = (<sl-input label="Full Name" placeholder="eg. John Doe" />) as SlInput;
    this._passwordInput = (
      <sl-input
        type="password"
        label="Password*"
        oninput={this._reset}
        autocomplete="current-password"
      />
    ) as SlInput;
    this._emailInput = (
      <sl-input type="email" label="E-mail" placeholder="eg. jdoe@example.com" />
    ) as SlInput;
    this._activatedInput = (<sl-checkbox>Activated</sl-checkbox>) as SlCheckbox;

    this._roleSelect = (<sl-select label="Role" />) as SlSelect;

    this._dialogSubmitBtn = (
      <sl-button slot="footer" type="button" onclick={() => this._handleSubmit()}>
        Create
      </sl-button>
    ) as SlButton;
  }

  connectedCallback() {
    const createBtn = document.createElement('button');
    createBtn.textContent = 'Create';
    createBtn.classList.add('create-user-button');
    createBtn.addEventListener('click', () => this._createUser());

    this._table.appendChild(
      <thead>
        <tr>
          <th>Name</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Activated</th>
          <th>Groups</th>
          <th>
            <a
              href="#"
              onclick={(ev) => {
                ev.preventDefault();
                this._createUser();
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
    Promise.all([this.updateUsersAndGroups(), this.updateRoles()]).catch(this._handleError);
  }

  get value() {
    return this._users;
  }

  set value(value: std.runtime.User[]) {
    this._users = value;
    this.render();
  }

  set roles(roles: Array<std.runtime.UserRole>) {
    this._roles = roles.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }),
    );
    this._roleSelect.replaceChildren(
      ...this._roles.map((role) => <option value={role.name}>{role.name}</option>),
    );
    this.render();
  }

  set groups(groups: Array<std.runtime.UserGroup>) {
    this._groups = groups.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }),
    );
    this._groupsSelect.options = this._groups.map((group) => group.name);
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
    // TODO: replace it with User friendly error notification
    console.error(error);
  }

  async updateUsersAndGroups() {
    try {
      const entities = await std.runtime.SecurityEntity.all(this._greycat);
      const users: std.runtime.User[] = [];
      const groups: std.runtime.UserGroup[] = [];

      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        if (entity instanceof std.runtime.User) {
          users.push(entity);
        } else if (entity instanceof std.runtime.UserGroup) {
          groups.push(entity);
        }
      }
      this.value = users;
      this.groups = groups;
    } catch (err) {
      this._handleError(err);
    }
  }

  async updateRoles() {
    try {
      this.roles = await std.runtime.UserRole.all();
    } catch (err) {
      this._handleError(err);
    }
  }

  private async _initDialog(): Promise<void> {
    this._dialog.appendChild(
      <>
        {this._dialogHeader}

        <div className="list">
          {this._nameInput}
          {this._passwordInput}
          {this._fullnameInput}
          {this._emailInput}
          {this._activatedInput}
          {this._roleSelect}

          <label htmlFor="group">Group</label>
          {this._groupsSelect}

          <sl-divider />
          <small>(*) Mandatory fields</small>
        </div>

        {this._dialogSubmitBtn}
      </>,
    );
  }

  private _editUser(user: std.runtime.User): void {
    this._currentState = user;

    this._nameInput.value = user.name;
    this._nameInput.removeAttribute('aria-invalid');
    this._passwordInput.removeAttribute('aria-invalid');
    this._activatedInput.checked = user.activated;
    this._fullnameInput.value = user.full_name ?? '';
    this._emailInput.value = user.email ?? '';
    if (user.role) {
      const userRole = user.role;
      this._roleSelect.value = '' + this._roles.findIndex((role) => role.name === userRole);
    }
    if (user.groups) {
      this._groupsSelect.selected = user.groups.map((g) => {
        const group = this._groups.find((group) => group.id === g.group_id)!;
        return group.name;
      });
    }

    this._dialogHeader.textContent = 'Edit a user';
    this._dialogSubmitBtn.textContent = 'Update';

    this._dialog.show();
  }

  private _createUser(): void {
    this._currentState = 'create';

    this._nameInput.value = '';
    this._passwordInput.value = '';
    this._fullnameInput.value = '';
    this._activatedInput.checked = false;

    this._nameInput.removeAttribute('aria-invalid');
    this._passwordInput.removeAttribute('aria-invalid');

    this._dialogHeader.textContent = 'Create a new user';
    this._dialogSubmitBtn.textContent = 'Create';

    this._dialog.show();
  }

  private async _handleSubmit() {
    const name = this._nameInput.value.trim();
    if (name.length === 0) {
      this._nameInput.setAttribute('aria-invalid', 'true');
      return;
    }

    let full_name: string | null = this._fullnameInput.value.trim();
    if (full_name.length === 0) {
      full_name = null;
    }
    let email: string | null = this._emailInput.value.trim();
    if (email.length === 0) {
      email = null;
    }

    const groups = this._groupsSelect.selected.map((groupName) => {
      const group = this._groups.find((g) => g.name === groupName)!;
      return std.runtime.UserGroupPolicy.create(
        group.id,
        std.runtime.UserGroupPolicyType.read(this._greycat),
      );
    });

    const newOrUpdatedUser = std.runtime.User.create(
      0,
      name,
      this._activatedInput.checked,
      full_name,
      email,
      this._roles[parseInt(this._roleSelect.value as string)]?.name ?? null,
      null,
      groups,
      null,
      false,
      this._greycat,
    );

    if (this._currentState === 'create') {
      // create user
      const password = this._passwordInput.value;
      if (password.length === 0) {
        this._passwordInput.setAttribute('aria-invalid', 'true');
        return;
      }

      try {
        await std.runtime.SecurityEntity.set(newOrUpdatedUser, this._greycat);
        await std.runtime.User.setPassword(name, sha256hex(password));
      } catch (err) {
        this._handleError(err);
      }
    } else {
      // edit user
      try {
        // we are editing a user, let's keep the previous id to notify greycat of the intention
        newOrUpdatedUser.id = this._currentState.id;

        await std.runtime.SecurityEntity.set(newOrUpdatedUser, this._greycat);
        const password = this._passwordInput.value;
        if (password.length !== 0) {
          await std.runtime.User.setPassword(name, sha256hex(password));
        }
      } catch (err) {
        this._handleError(err);
      }
    }

    this.updateUsersAndGroups();

    this._dialog.hide();
  }

  render() {
    const rows = document.createDocumentFragment();

    for (let i = 0; i < this._users.length; i++) {
      const user = this._users[i];
      const groups: string[] = [];
      if (user.groups) {
        for (let i = 0; i < user.groups.length; i++) {
          const policy = user.groups[i];
          const group = this._groups.find((g) => g.id === policy.group_id);
          if (group) {
            groups.push(group.name);
          }
        }
      }

      rows.appendChild(
        <tr>
          <td>{user.name}</td>
          <td>{user.full_name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>{user.activated ? 'true' : 'false'}</td>
          <td>
            {groups.map((groupName) => (
              <code>{groupName}</code>
            ))}
          </td>
          <td>
            <a
              href="#"
              onclick={(ev) => {
                ev.preventDefault();
                this._editUser(user);
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

if (!customElements.get('gui-user-table')) {
  customElements.define('gui-user-table', GuiUserTable);
}

declare global {
  interface Window {
    GuiUserTable: typeof GuiUserTable;
  }
  interface HTMLElementTagNameMap {
    'gui-user-table': GuiUserTable;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /**
         * Please, don't use this in a React context. Use `WCWrapper`.
         */
        'gui-user-table': GreyCat.Element<GuiUserTable>;
      }
    }
  }
}
