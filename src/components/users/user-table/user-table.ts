import * as sdk from '@greycat/sdk';
import { runtime } from '@greycat/sdk';
// ensures multi-select-checkbox is with this component
import '../../multi-select-checkbox/index.js';

export class GuiUserTable extends HTMLElement {
  private _greycat: sdk.GreyCat = window.greycat.default;
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

    const table = document.createElement('table');
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

    table.append(thead, this._tbody);
    this.appendChild(table);

    this._initDialog();
    this.appendChild(this._dialog);

    this.render();
  }

  set greycat(greycat: sdk.GreyCat) {
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

  private _handleError(error: unknown) {
    // TODO: replace it with User friendly error notification
    console.error(error);
  }

  private async _fetchAllUsers() {
    try {
      this._users = (await runtime.User.all(this._greycat))
        .sort((a, b) => a.name.localeCompare(b.name))
        // Safe to type cast. runtime.User.all() only returns users
        .map((user) => user as runtime.User);
    } catch (err) {
      this._handleError(err);
    }
  }

  private async _fetchAllRoles(roles?: runtime.UserRole[]) {
    try {
      let fetchedRoles: runtime.UserRole[];
      if (roles) {
        fetchedRoles = roles;
      } else {
        fetchedRoles = await runtime.UserRole.all(this._greycat);
      }
      const roleNames = fetchedRoles.map((role) => role.name).sort((a, b) => a.localeCompare(b));
      const fragment = document.createDocumentFragment();

      roleNames.forEach((roleName) => {
        const option = document.createElement('option');
        option.value = roleName;
        option.textContent = roleName;
        fragment.appendChild(option);
      });

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
        this._groups = await runtime.UserGroup.all(this._greycat);
      }
      this._groupsSelect.options = this._groups.map((group) => group.name);
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
        for (let p = 0; p < user.groups.length; p++) {
          const groupId = user.groups[p].group_id;
          const userGroup = this._groups.find((group) => group.id === groupId);
          const userGroupName = userGroup?.name ?? '';
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

  private _initDialog() {
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

    this._activatedCheckbox.type = 'checkbox';

    const activatedCheckboxWrapper = document.createElement('label');
    activatedCheckboxWrapper.textContent = 'Activated';
    activatedCheckboxWrapper.classList.add('checkbox-label');
    activatedCheckboxWrapper.appendChild(this._activatedCheckbox);

    const submitButton = document.createElement('button');
    submitButton.classList.add('submit-button');
    submitButton.textContent = 'Submit';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.classList.add('inverted');

    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('button-wrapper');
    buttonWrapper.appendChild(submitButton);
    buttonWrapper.appendChild(closeButton);

    this._dialog.appendChild(this._createLabel('Name'));
    this._dialog.appendChild(this._nameInput);
    this._dialog.appendChild(this._createLabel('Full name'));
    this._dialog.appendChild(this._fullNameInput);
    this._dialog.appendChild(this._createLabel('Email'));
    this._dialog.appendChild(this._emailInput);
    this._dialog.appendChild(this._createLabel('Password'));
    this._dialog.appendChild(this._passwordInput);
    this._dialog.appendChild(this._createLabel('Role'));
    this._dialog.appendChild(this._roleSelect);
    this._dialog.appendChild(activatedCheckboxWrapper);
    this._dialog.appendChild(this._createLabel('Groups'));
    this._dialog.appendChild(this._groupsSelect);
    this._dialog.appendChild(buttonWrapper);

    runtime.User.me(this._greycat)
      .then((user) => {
        if (user.role) {
          // Setting current user role
          this._currentUserRole = user.role;
        }
      })
      .catch((e) => {
        this._handleError(e);
      });

    submitButton.addEventListener('click', async () => {
      const name = this._nameInput.value.trim();
      if (name.length === 0) {
        // TODO: show that it is required
        return;
      }

      await this._addOrUpdateUser();
      this._dialog.close();
    });
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
        for (let p = 0; p < user.groups.length; p++) {
          const groupId = user.groups[p].group_id;
          const userGroup = this._groups.find((group) => group.id === groupId);
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
    const selectedGroupsIds: Array<number | bigint> = this._groupsSelect.selected
      .map((groupName) => this._groups.find((group) => group.name === groupName))
      .filter((group) => group !== undefined)
      .map((group) => group!.id)
      .filter((id) => id !== null);

    // Create UserGroupPolicies with read type, associated with each group id
    const selectedGroupPolicies: Array<runtime.UserGroupPolicy> = selectedGroupsIds.map(
      (groupId) => {
        return runtime.UserGroupPolicy.create(
          groupId,
          runtime.UserGroupPolicyType.read(this._greycat),
          this._greycat,
        );
      },
    );

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
}
