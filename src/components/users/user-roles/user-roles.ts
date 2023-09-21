import * as sdk from '@greycat/sdk';
import { runtime } from '@greycat/sdk';
// ensures multi-select-checkbox is with this component
import '../../multi-select-checkbox/index.js';

export class GuiUserRoles extends HTMLElement {
  private _greycat: sdk.GreyCat = window.greycat.default;
  private _roles: runtime.UserRole[] = [];
  private _table = document.createElement('table');
  private _tbody = document.createElement('tbody');
  private _dialog = document.createElement('dialog');
  private _permissionsSelect = document.createElement('gui-multi-select-checkbox');
  private _nameInput = document.createElement('input');

  connectedCallback() {
    const createBtn = document.createElement('button');
    createBtn.textContent = 'Create';
    createBtn.classList.add('create-role-button');
    createBtn.addEventListener('click', () => this._showDialog());

    const thead = document.createElement('thead');
    const headers = document.createElement('tr');

    const hName = document.createElement('th');
    hName.textContent = 'Name';

    const hPerm = document.createElement('th');
    hPerm.textContent = 'Permissions';

    const hCreate = document.createElement('th');
    hCreate.appendChild(createBtn);

    headers.append(hName, hPerm, hCreate);
    thead.appendChild(headers);

    this._table.append(thead, this._tbody);
    this.appendChild(this._table);

    this._initDialog();
    this.appendChild(this._dialog);

    this.render();
  }

  set greycat(greycat: sdk.GreyCat) {
    this._greycat = greycat;
    this._fetchAllRoles();
    this._fetchAllPermissions();
    this.render();
  }

  set roles(roles: runtime.UserRole[]) {
    this._roles = roles;
    this.render();
  }

  set permissions(permissions: string[]) {
    this._permissionsSelect.options = permissions;
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

  private async _fetchAllRoles() {
    try {
      this._roles = (await runtime.UserRole.all(this._greycat)).sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    } catch (err) {
      this._handleError(err);
    }
  }

  private async _fetchAllPermissions() {
    try {
      this._permissionsSelect.options = await runtime.SecurityPolicy.permissions(this._greycat);
    } catch (err) {
      this._handleError(err);
    }
  }

  private _showDialog(role?: runtime.UserRole) {
    if (role) {
      this._nameInput.value = role.name;
      this._permissionsSelect.selected = role.permissions;
    } else {
      this._nameInput.value = '';
      this._permissionsSelect.selected = [];
    }
    this._dialog.showModal();
  }

  private render() {
    const rows = document.createDocumentFragment();

    for (let i = 0; i < this._roles.length; i++) {
      const role = this._roles[i];
      role.permissions.sort();
      const row = document.createElement('tr');

      // name cell
      const cName = document.createElement('td');
      cName.textContent = role.name;

      // permissions cell
      const cPerm = document.createElement('td');
      for (let p = 0; p < role.permissions.length; p++) {
        const perm = role.permissions[p];
        cPerm.appendChild(this._createBadge(perm));
      }

      // edit cell
      const cEdit = document.createElement('td');
      cEdit.appendChild(this._createEditBtn(role));

      row.append(cName, cPerm, cEdit);
      rows.appendChild(row);
    }

    this._tbody.replaceChildren(rows);
  }

  private _initDialog(): void {
    this._nameInput.type = 'text';
    this._nameInput.placeholder = 'Name';
    this._nameInput.required = true;

    this._permissionsSelect.classList.add('permissions-select');

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('submit-button');
    submitBtn.textContent = 'Submit';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.classList.add('inverted');

    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('button-wrapper');
    buttonWrapper.appendChild(submitBtn);
    buttonWrapper.appendChild(closeBtn);

    const container = document.createElement('article');
    container.appendChild(this._createLabel('Name'));
    container.appendChild(this._nameInput);
    container.appendChild(this._createLabel('Permissions'));
    container.appendChild(this._permissionsSelect);
    container.appendChild(buttonWrapper);
    this._dialog.appendChild(container);

    submitBtn.addEventListener('click', async () => {
      const name = this._nameInput.value.trim();
      if (name.length === 0) {
        // TODO show that it is required
        return;
      }
      const role = runtime.UserRole.create(name, this._permissionsSelect.selected);

      try {
        await runtime.UserRole.set(role, this._greycat);
      } catch (err) {
        this._handleError(err);
      }

      this._dialog.close();

      await this._fetchAllRoles();
      this.render();
    });
    closeBtn.addEventListener('click', () => this._dialog.close());
  }

  private _createEditBtn(role: runtime.UserRole): HTMLButtonElement {
    const editButton = document.createElement('button');

    editButton.className = 'edit-button';
    editButton.textContent = '✎';
    editButton.addEventListener('click', () => this._showDialog(role));

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

declare global {
  interface HTMLElementTagNameMap {
    'gui-user-roles': GuiUserRoles;
  }


  namespace JSX {
    interface IntrinsicElements {
      /**
      * Please, don't use this in a React context. Use `WCWrapper`.
      */
      'gui-user-roles': Partial<Omit<GuiUserRoles, 'children'>>;
    }
  }
}

if (!globalThis.customElements.get('gui-user-roles')) {
  globalThis.customElements.define('gui-user-roles', GuiUserRoles);
}
