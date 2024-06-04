import { GreyCat, runtime, sha256hex } from '@greycat/sdk';
// ensures multi-select-checkbox is with this component
import '../../multi-select-checkbox/index.js';

export class GuiUserTable extends HTMLElement {
  private _greycat: GreyCat = window.greycat.default;
  private _table = document.createElement('table');
  private _tbody = document.createElement('tbody');
  private _dialog = document.createElement('dialog');
  private _roleSelect = document.createElement('select');
  private _groupsSelect = document.createElement('gui-multi-select-checkbox');
  private _users: Array<runtime.User> = [];
  private _groups: Array<runtime.UserGroup> = [];
  private _roles: Array<runtime.UserRole> = [];
  private _currentState: 'create' | runtime.User = 'create';
  private _dialogHeader = document.createElement('header');
  private _dialogSubmitBtn = (
    <button type="button" onclick={() => this._handleSubmit()}>
      Create
    </button>
  );

  private _reset = (ev: Event) => {
    if (ev.target instanceof HTMLInputElement) {
      ev.target.removeAttribute('aria-invalid');
    }
  };

  // prettier-ignore
  private nameInput = (<input type="text" name="name" placeholder="eg. jdoe" oninput={this._reset} required />) as HTMLInputElement;
  // prettier-ignore
  private passwordInput = (<input type="password" name="password" oninput={this._reset} autocomplete="current-password" />) as HTMLInputElement;
  // prettier-ignore
  private fullnameInput = (<input type="text" name="fullname" placeholder="eg. John Doe" />) as HTMLInputElement;
  // prettier-ignore
  private emailInput = (<input type="email" name="email" placeholder="eg. jdoe@example.com" />) as HTMLInputElement;
  // prettier-ignore
  private activatedInput = (<input type="checkbox" name="activated" id="activated" />) as HTMLInputElement;

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

  set value(value: runtime.User[]) {
    this._users = value;
    this.render();
  }

  set roles(roles: Array<runtime.UserRole>) {
    this._roles = roles.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }),
    );
    this._roleSelect.replaceChildren(
      ...this._roles.map((role) => <option value={role.name}>{role.name}</option>),
    );
    this.render();
  }

  set groups(groups: Array<runtime.UserGroup>) {
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
      const entities = await runtime.SecurityEntity.all(this._greycat);
      const users: runtime.User[] = [];
      const groups: runtime.UserGroup[] = [];

      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        if (entity instanceof runtime.User) {
          users.push(entity);
        } else if (entity instanceof runtime.UserGroup) {
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
      this.roles = await runtime.UserRole.all();
    } catch (err) {
      this._handleError(err);
    }
  }

  private async _initDialog(): Promise<void> {
    this._dialog.appendChild(
      <article>
        {this._dialogHeader}

        <div className="container">
          <label htmlFor="name">
            Username*
            {this.nameInput}
          </label>

          <label htmlFor="password">
            Password*
            {this.passwordInput}
          </label>

          <label htmlFor="fullname">
            Full Name
            {this.fullnameInput}
          </label>

          <label htmlFor="email">
            E-mail
            {this.emailInput}
          </label>

          <label htmlFor="activated">
            {this.activatedInput}
            Activated
          </label>

          <label htmlFor="role">
            Role
            {this._roleSelect}
          </label>

          <label htmlFor="group">Group</label>
          {this._groupsSelect}

          <hr />
          <small>(*) Mandatory fields</small>
        </div>

        <footer>
          <button className="outline" onclick={() => this._dialog.close()}>
            Close
          </button>
          {this._dialogSubmitBtn}
        </footer>
      </article>,
    );
  }

  private _editUser(user: runtime.User): void {
    this._currentState = user;

    this.nameInput.value = user.name;
    this.nameInput.removeAttribute('aria-invalid');
    this.passwordInput.removeAttribute('aria-invalid');
    this.activatedInput.checked = user.activated;
    this.fullnameInput.value = user.full_name ?? '';
    this.emailInput.value = user.email ?? '';
    if (user.role) {
      const userRole = user.role;
      this._roleSelect.selectedIndex = this._roles.findIndex((role) => role.name === userRole);
    }
    if (user.groups) {
      this._groupsSelect.selected = user.groups.map((g) => {
        const group = this._groups.find((group) => group.id === g.group_id)!;
        return group.name;
      });
    }

    this._dialogHeader.textContent = 'Edit a user';
    this._dialogSubmitBtn.textContent = 'Update';

    this._dialog.showModal();
  }

  private _createUser(): void {
    this._currentState = 'create';

    this.nameInput.value = '';
    this.passwordInput.value = '';
    this.fullnameInput.value = '';
    this.activatedInput.checked = false;

    this.nameInput.removeAttribute('aria-invalid');
    this.passwordInput.removeAttribute('aria-invalid');

    this._dialogHeader.textContent = 'Create a new user';
    this._dialogSubmitBtn.textContent = 'Create';

    this._dialog.showModal();
  }

  private async _handleSubmit() {
    const name = this.nameInput.value.trim();
    if (name.length === 0) {
      this.nameInput.setAttribute('aria-invalid', 'true');
      return;
    }

    let full_name: string | null = this.fullnameInput.value.trim();
    if (full_name.length === 0) {
      full_name = null;
    }
    let email: string | null = this.emailInput.value.trim();
    if (email.length === 0) {
      email = null;
    }

    const groups = this._groupsSelect.selected.map((groupName) => {
      const group = this._groups.find((g) => g.name === groupName)!;
      return runtime.UserGroupPolicy.create(
        group.id,
        runtime.UserGroupPolicyType.read(this._greycat),
      );
    });

    const newOrUpdatedUser = runtime.User.create(
      0,
      name,
      this.activatedInput.checked,
      full_name,
      email,
      this._roles[this._roleSelect.selectedIndex]?.name ?? null,
      null,
      groups,
      null,
      false,
      this._greycat,
    );

    if (this._currentState === 'create') {
      // create user
      const password = this.passwordInput.value;
      if (password.length === 0) {
        this.passwordInput.setAttribute('aria-invalid', 'true');
        return;
      }

      try {
        await runtime.SecurityEntity.set(newOrUpdatedUser, this._greycat);
        await runtime.User.setPassword(name, sha256hex(password));
      } catch (err) {
        this._handleError(err);
      }
    } else {
      // edit user
      try {
        // we are editing a user, let's keep the previous id to notify greycat of the intention
        newOrUpdatedUser.id = this._currentState.id;

        await runtime.SecurityEntity.set(newOrUpdatedUser, this._greycat);
        const password = this.passwordInput.value;
        if (password.length !== 0) {
          await runtime.User.setPassword(name, sha256hex(password));
        }
      } catch (err) {
        this._handleError(err);
      }
    }

    this.updateUsersAndGroups();

    this._dialog.close();
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

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-user-table': GreyCat.Element<GuiUserTable>;
    }
  }
}
