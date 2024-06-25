import type { SlCheckbox, SlInput, SlSelect } from '@shoelace-style/shoelace';
import { runtime, sha256hex } from '@greycat/sdk';

export class GuiUserForm extends HTMLElement {
  private readonly _user_id: SlInput;
  private readonly _username: SlInput;
  private readonly _password: SlInput;
  private readonly _full_name: SlInput;
  private readonly _email: SlInput;
  private readonly _activated: SlCheckbox;
  private readonly _external: SlCheckbox;
  private readonly _role: SlSelect;
  private readonly _groups: SlSelect;

  constructor() {
    super();

    this._user_id = (<sl-input name="id" label="Id" disabled />) as SlInput;
    this._username = (<sl-input name="username" label="Username" required />) as SlInput;
    this._password = (<sl-input name="password" type="password" label="Password" />) as SlInput;
    this._full_name = (<sl-input name="full_name" label="Full Name" />) as SlInput;
    this._email = (<sl-input name="email" label="E-mail" />) as SlInput;
    this._activated = (<sl-checkbox name="activated">Activated</sl-checkbox>) as SlCheckbox;
    this._external = (<sl-checkbox name="external">External</sl-checkbox>) as SlCheckbox;
    this._role = (<sl-select name="role" label="Role" placeholder="Select a role" />) as SlSelect;
    this._groups = (
      <sl-select name="groups" label="Groups" placeholder="Define the user groups" multiple />
    ) as SlSelect;
  }

  connectedCallback() {
    this.replaceChildren(
      this._user_id,
      this._username,
      this._password,
      this._full_name,
      this._email,
      this._role,
      this._groups,
      this._activated,
      this._external,
      <sl-divider />,
      <small>(*) Mandatory fields</small>,
    );
  }

  set roles(roles: string[]) {
    const options = document.createDocumentFragment();
    for (const name of roles) {
      options.appendChild(<sl-option value={name}>{name}</sl-option>);
    }
    this._role.replaceChildren(options);
    this._role.value = [];
  }

  set groups(groups: runtime.UserGroup[]) {
    const options = document.createDocumentFragment();
    for (const group of groups) {
      options.appendChild(<sl-option value={`${group.id}`}>{group.name}</sl-option>);
    }
    this._groups.replaceChildren(options);
    this._groups.value = [];
  }

  get user_id() {
    return +this._user_id.value;
  }

  set user_id(id: number | bigint) {
    this._user_id.value = `${id}`;
  }

  get username() {
    return this._username.value;
  }

  set username(name: string) {
    this._username.value = name;
    this._username.helpText = '';
  }

  get password() {
    return this._password.value;
  }

  set password(password: string) {
    this._password.value = password;
    this._password.helpText = '';
  }

  get full_name() {
    return this._full_name.value.length === 0 ? null : this._full_name.value;
  }

  set full_name(full_name: string | null) {
    this._full_name.value = full_name ?? '';
  }

  get email() {
    return this._email.value.length === 0 ? null : this._email.value;
  }

  set email(email: string | null) {
    this._email.value = email ?? '';
  }

  get user_role() {
    if (Array.isArray(this._role.value)) {
      return null;
    }
    return this._role.value;
  }

  set user_role(role: string | null) {
    this._role.value = role ? [role] : [];
  }

  get user_groups() {
    if (Array.isArray(this._groups.value)) {
      return this._groups.value.map((id) =>
        runtime.UserGroupPolicy.create(+id, runtime.UserGroupPolicyType.execute()),
      );
    }
    return null;
  }

  set user_groups(groups: runtime.UserGroupPolicy[] | null) {
    if (groups === null) {
      this._groups.value = [];
    } else {
      this._groups.value = groups.map((p) => `${p.group_id}`);
    }
  }

  get activated() {
    return this._activated.checked;
  }

  set activated(activated: boolean) {
    this._activated.checked = activated;
  }

  get external() {
    return this._external.checked;
  }

  set external(external: boolean) {
    this._external.checked = external;
  }

  set value(user: runtime.User) {
    this.user_id = user.id;
    this.username = user.name;
    this._username.helpText = '';
    this.password = '';
    this._password.helpText = '';
    this.full_name = user.full_name;
    this.email = user.email;
    this.activated = user.activated;
    this.external = user.external;
    this.user_role = user.role;
    this.user_groups = user.groups;
  }

  get value() {
    return runtime.User.create(
      this.user_id,
      this.username,
      this.activated,
      this.full_name,
      this.email,
      this.user_role,
      null,
      this.user_groups,
      null,
      this.external,
    );
  }

  /**
   * Will use the current form values to update the user.
   *
   * *Note that this will only succeed if the currently signed-in users as the relevant permissions.*
   *
   * The password is updated **only if its length > 0**, otherwise, the previous password is kept.
   */
  async updateUser(): Promise<void> {
    const user = this.value;
    console.log('update user', structuredClone(user));
    const password = this._password.value;
    let errors = false;

    if (user.name.length === 0) {
      this._username.helpText = 'Empty username is not allowed';
      errors = true;
    }

    if (errors) {
      throw '';
    }

    await runtime.SecurityEntity.set(user);
    if (password.length > 0) {
      await runtime.User.setPassword(user.name, sha256hex(password));
    }
  }

  /**
   * Will use the current form values to create a new the user.
   *
   * *Note that this will only succeed if the currently signed-in users as the relevant permissions.*
   *
   * **This will actually call `runtime::SecurityEntity.set(...)` and `runtime.User.setPassword(...)`, and cannot be undone**
   */
  async createUser(): Promise<void> {
    const user = this.value;
    const password = this._password.value;

    let errors = false;

    if (user.name.length === 0) {
      this._username.helpText = 'Empty username is not allowed';
      errors = true;
    }

    if (password.length === 0) {
      this._password.helpText = 'Empty password is not allowed';
      errors = true;
    }

    if (errors) {
      throw '';
    }

    await runtime.SecurityEntity.set(user);
    await runtime.User.setPassword(user.name, sha256hex(password));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-user-form': GuiUserForm;
  }

  namespace JSX {
    interface IntrinsicElements {
      'gui-user-form': GreyCat.Element<GuiUserForm>;
    }
  }
}

if (!customElements.get('gui-user-form')) {
  customElements.define('gui-user-form', GuiUserForm);
}
