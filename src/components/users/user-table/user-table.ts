import { GreyCat, runtime } from '@greycat/sdk';
// ensures multi-select-checkbox is with this component
import '../../multi-select-checkbox/index.js';

export class GuiUserTable extends HTMLElement {
  private _greycat: GreyCat = window.greycat.default;
  private _table = document.createElement('table');
  private _tbody = document.createElement('tbody');
  private _dialog = document.createElement('dialog');
  private _nameInput = document.createElement('input');
  private _fullNameInput = document.createElement('input');
  private _emailInput = document.createElement('input');
  private _passwordInput = document.createElement('input');
  private _roleSelect = document.createElement('select');
  private _groupsSelect = document.createElement('gui-multi-select-checkbox');
  private _activatedCheckbox = document.createElement('input');
  private _currentUserRole = '';
  private _users: Array<runtime.User> = [];
  private _groups: Array<runtime.UserGroup> = [];

  connectedCallback() {
    const createBtn = document.createElement('button');
    createBtn.textContent = 'Create';
    createBtn.classList.add('create-user-button');
    createBtn.addEventListener('click', () => this._showDialog());

    const thead = document.createElement('thead');
    const headers = document.createElement('tr');

    const hName = document.createElement('th');
    hName.textContent = 'Name';

    const hFullName = document.createElement('th');
    hFullName.textContent = 'Full name';

    const hEmail = document.createElement('th');
    hEmail.textContent = 'Email';

    const hRole = document.createElement('th');
    hRole.textContent = 'Role';

    const hActivated = document.createElement('th');
    hActivated.textContent = 'Activated';

    const hGroups = document.createElement('th');
    hGroups.textContent = 'Groups';

    const hCreate = document.createElement('th');
    hCreate.appendChild(createBtn);

    headers.append(hName, hFullName, hEmail, hRole, hActivated, hGroups, hCreate);
    thead.appendChild(headers);

    this._table.append(thead, this._tbody);
    const container = document.createElement('figure');
    container.appendChild(this._table);
    this.appendChild(container);

    this._initDialog();
    this.appendChild(this._dialog);

    this.render();
  }

  set greycat(greycat: GreyCat) {
    this._greycat = greycat;
    this._fetchAllUsers();
    this._fetchAllRoles();
    this._fetchAllGroups();
    this.render();
  }

  set users(users: Array<runtime.User>) {
    this._users = users;
    this.render();
  }

  set roles(roles: Array<runtime.UserRole>) {
    this._fetchAllRoles(roles);
  }

  set groups(groups: Array<runtime.UserGroup>) {
    this._fetchAllGroups(groups);
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

  private async _fetchAllUsers() {
    try {
      const entities = await runtime.SecurityEntity.all(this._greycat);
      this._users = [];
      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        if (entity instanceof runtime.User) {
          this._users.push(entity);
        }
      }
      this._users.sort((a, b) => a.name.localeCompare(b.name));
    } catch (err) {
      this._handleError(err);
    }
  }

  private async _fetchAllRoles(roles?: runtime.UserRole[]) {
    try {
      let fetchedRoles: runtime.UserRole[] = [];
      if (roles) {
        fetchedRoles = roles;
      } else {
        const entities = await runtime.SecurityEntity.all(this._greycat);
        for (let i = 0; i < entities.length; i++) {
          const entity = entities[i];
          if (entity instanceof runtime.UserRole) {
            fetchedRoles.push(entity);
          }
        }
      }

      const roleNames: string[] = [];
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < fetchedRoles.length; i++) {
        roleNames.push(fetchedRoles[i].name);
      }
      roleNames.sort((a, b) => a.localeCompare(b));

      for (let i = 0; i < roleNames.length; i++) {
        const option = document.createElement('option');
        option.value = roleNames[i];
        option.textContent = roleNames[i];
        fragment.appendChild(option);
      }

      this._roleSelect.innerHTML = '';
      this._roleSelect.appendChild(fragment);
    } catch (err) {
      this._handleError(err);
    }
  }

  private async _fetchAllGroups(groups?: runtime.UserGroup[]) {
    try {
      if (groups) {
        this._groups = groups;
      } else {
        this._groups = [];
        const entities = await runtime.SecurityEntity.all(this._greycat);
        for (let i = 0; i < entities.length; i++) {
          const entity = entities[i];
          if (entity instanceof runtime.UserGroup) {
            this._groups.push(entity);
          }
        }
      }
      const groupNames: string[] = [];
      for (const group of this._groups) {
        groupNames.push(group.name);
      }
      this._groupsSelect.options = groupNames;
    } catch (err) {
      this._handleError(err);
    }
  }

  private _showDialog(user?: runtime.User) {
    if (user) {
      this._nameInput.value = user.name;
      // Existing User's name is not editable
      this._nameInput.disabled = true;
      this._fullNameInput.value = user.full_name ?? '';
      this._emailInput.value = user.email ?? '';
      this._passwordInput.value = '';
      this._roleSelect.value = user.role ?? this._currentUserRole;
      const groupNames: string[] = [];
      if (user.groups) {
        for (const groupPolicy of user.groups) {
          const groupId = groupPolicy.group_id;
          let userGroupName = '';

          for (const group of this._groups) {
            if (group.id === groupId) {
              userGroupName = group.name;
              break;
            }
          }

          groupNames.push(userGroupName);
        }
      }
      this._groupsSelect.selected = groupNames;
      this._activatedCheckbox.checked = user.activated ?? false;
    } else {
      this._nameInput.value = '';
      this._nameInput.disabled = false;
      this._fullNameInput.value = '';
      this._emailInput.value = '';
      this._passwordInput.value = '';
      this._roleSelect.value = this._currentUserRole;
      this._groupsSelect.selected = [];
      this._activatedCheckbox.checked = false;
    }

    this._dialog.showModal();
  }

  private async _initDialog(): Promise<void> {
    this._nameInput.type = 'text';
    this._nameInput.placeholder = 'Name';
    this._nameInput.required = true;

    this._fullNameInput.type = 'text';
    this._fullNameInput.placeholder = 'Full name';

    this._emailInput.type = 'text';
    this._emailInput.placeholder = 'Email';

    this._passwordInput.type = 'password';
    this._passwordInput.placeholder = 'Password';
    this._passwordInput.classList.add('password-input');

    this._roleSelect.classList.add('select-element');

    this._groupsSelect.classList.add('groups-select');

    const activatedInput = document.createElement('label');
    activatedInput.htmlFor = 'activated';
    this._activatedCheckbox.type = 'checkbox';
    this._activatedCheckbox.name = 'activated';
    activatedInput.appendChild(this._activatedCheckbox);
    activatedInput.appendChild(document.createTextNode('Activated'));

    const submitButton = document.createElement('button');
    submitButton.classList.add('submit-button');
    submitButton.textContent = 'Submit';

    const closeButton = document.createElement('button');
    closeButton.addEventListener('click', () => this._dialog.close());
    closeButton.textContent = 'Close';
    closeButton.classList.add('inverted');

    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('button-wrapper');
    buttonWrapper.appendChild(submitButton);
    buttonWrapper.appendChild(closeButton);

    const container = document.createElement('article');
    container.appendChild(this._createLabel('Name'));
    container.appendChild(this._nameInput);
    container.appendChild(this._createLabel('Full name'));
    container.appendChild(this._fullNameInput);
    container.appendChild(this._createLabel('Email'));
    container.appendChild(this._emailInput);
    container.appendChild(this._createLabel('Password'));
    container.appendChild(this._passwordInput);
    container.appendChild(activatedInput);
    container.appendChild(this._createLabel('Role'));
    container.appendChild(this._roleSelect);
    container.appendChild(this._createLabel('Groups'));
    container.appendChild(this._groupsSelect);
    container.appendChild(buttonWrapper);
    this._dialog.appendChild(container);

    submitButton.addEventListener('click', async () => {
      const name = this._nameInput.value.trim();
      if (name.length === 0) {
        // TODO: show that it is required
        return;
      }

      await this._addOrUpdateUser();
      this._dialog.close();
    });

    try {
      const user = await runtime.User.me(this._greycat);
      if (user.role) {
        this._currentUserRole = user.role;
      }
    } catch (err) {
      this._handleError(err);
    }
  }

  private render() {
    const rows = document.createDocumentFragment();

    for (let i = 0; i < this._users.length; i++) {
      const user = this._users[i];
      const row = document.createElement('tr');

      // name cell
      const cName = document.createElement('td');
      cName.textContent = user.name;

      // full name cell
      const cFullName = document.createElement('td');
      cFullName.textContent = user.full_name;

      // email cell
      const cEmail = document.createElement('td');
      cEmail.textContent = user.email;

      // role cell
      const cRole = document.createElement('td');
      cRole.textContent = user.role;

      const cActivated = document.createElement('td');
      cActivated.textContent = user.activated ? 'true' : 'false';

      // groups cell
      const cGroups = document.createElement('td');
      if (user.groups) {
        for (const groupPolicy of user.groups) {
          const groupId = groupPolicy.group_id;
          let userGroup: runtime.UserGroup | undefined = undefined;
          for (const group of this._groups) {
            if (group.id === groupId) {
              userGroup = group;
              break;
            }
          }
          const userGroupName = userGroup?.name ?? '';
          cGroups.appendChild(this._createBadge(userGroupName));
        }
      }

      // edit cell
      const cEdit = document.createElement('td');
      cEdit.appendChild(this._createEditBtn(user));

      row.append(cName, cFullName, cEmail, cRole, cActivated, cGroups, cEdit);
      rows.appendChild(row);
    }

    this._tbody.replaceChildren(rows);
  }

  private async _addOrUpdateUser() {
    // Find group ids by selected group names
    const groupNames: Array<string> = this._groupsSelect.selected;
    const selectedGroupsIds: Array<number | bigint> = [];

    for (let i = 0; i < groupNames.length; i++) {
      const groupName = groupNames[i];
      for (let j = 0; j < this._groups.length; j++) {
        const group = this._groups[j];
        if (group && groupName === group.name && group.id !== null) {
          selectedGroupsIds.push(group.id);
        }
      }
    }

    // Create UserGroupPolicies with read type, associated with each group id
    const selectedGroupPolicies: Array<runtime.UserGroupPolicy> = [];
    for (const id of selectedGroupsIds) {
      selectedGroupPolicies.push(
        runtime.UserGroupPolicy.create(
          id,
          runtime.UserGroupPolicyType.read(this._greycat),
          this._greycat,
        ),
      );
    }

    const userIndex = this._users.findIndex((user) => user.name === this._nameInput.value);
    let updatedUser: runtime.User;

    // If user already exists, we update the necessary fields.
    if (userIndex !== -1) {
      this._users[userIndex].full_name = this._fullNameInput.value;
      this._users[userIndex].activated = this._activatedCheckbox.checked;
      this._users[userIndex].email = this._emailInput.value;
      this._users[userIndex].role = this._roleSelect.value;
      this._users[userIndex].groups = selectedGroupPolicies;
      updatedUser = this._users[userIndex];
    } else {
      const newUser = runtime.User.create(
        this._users.length + 1,
        this._nameInput.value,
        this._activatedCheckbox.checked,
        this._fullNameInput.value,
        this._emailInput.value,
        this._roleSelect.value,
        null,
        selectedGroupPolicies,
        null,
        false,
        this._greycat,
      );
      this._users.push(newUser);
      updatedUser = newUser;
    }

    try {
      await runtime.User.setPassword(updatedUser.name, this._passwordInput.value, this._greycat);
      await runtime.User.set(updatedUser, this._greycat);
      await this._fetchAllUsers();
      this.render();
    } catch (error) {
      this._handleError(error);
    }
  }

  private _createEditBtn(user: runtime.User): HTMLButtonElement {
    const editButton = document.createElement('button');

    editButton.className = 'edit-button';
    editButton.textContent = '✎';
    editButton.addEventListener('click', () => this._showDialog(user));

    return editButton;
  }

  private _createBadge(text: string): HTMLElement {
    const el = document.createElement('code');
    el.textContent = text;
    return el;
  }

  private _createLabel(label: string): HTMLLabelElement {
    const el = document.createElement('label');
    el.htmlFor = label;
    el.textContent = label;
    return el;
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
      'gui-user-table': Partial<Omit<GuiUserTable, 'children'>>;
    }
  }
}
