import {
  toast,
  GuiElement,
  type GuiTable,
  GuiDialog,
  css,
  GuiTableChangeEvent,
  createElement,
  CellData,
  CellValueData,
} from '../../exports.js';
import '../table/table.js'; // ensure gui-table is defined
import '../user-form/user-form.js'; // ensure gui-user-form is defined
import './user-group-policy.js';
import type { GuiUserForm } from '../user-form/user-form.js';
import style from './users.css?inline';

export class GuiUsers extends GuiElement {
  static override styles = [css(style)];

  private _table: GuiTable;
  private _dialog: GuiDialog;
  private _userForm: GuiUserForm;
  private _users: gc.runtime.User[] = [];
  private _groups: gc.runtime.UserGroup[] = [];
  private _disableNotifications = false;

  constructor() {
    super();

    this._table = document.createElement('gui-table');
    this._table.setAttrs({
      sortBy: [0, 'asc'],
      globalFilter: true,
      globalFilterPlaceholder: 'Filter the users',
      columns: [
        {
          index: gc.runtime.User.$fields.activated,
          header: '',
          filterable: false,
          width: 30,
          cell: ({ value }: CellData<boolean>) => (
            <gui-input-bool
              size="small"
              value={value}
              style={{ paddingLeft: 'var(--spacing)' }}
              onclick={(ev) => ev.stopPropagation()}
            />
          ),
        },
        {
          index: gc.runtime.User.$fields.id,
          header: 'Id',
          width: 65,
        },
        {
          index: gc.runtime.User.$fields.name,
          header: 'Name',
        },
        {
          index: gc.runtime.User.$fields.email,
          header: 'E-mail',
          value: ({ value }: CellValueData<string | null>) => value ?? '',
        },
        {
          index: gc.runtime.User.$fields.full_name,
          header: 'Full Name',
          value: ({ value }: CellValueData<string | null>) => value ?? '',
        },
        {
          index: gc.runtime.User.$fields.role,
          header: 'Role',
        },
        {
          index: gc.runtime.User.$fields.external,
          header: 'External',
          width: 120,
        },
        {
          index: gc.runtime.User.$fields.groups,
          cell: ({ value, row }: CellData<gc.runtime.UserGroupPolicy[] | null>) => {
            const groups: string[] = [];
            if (value) {
              for (const policy of value) {
                const group = this._groups.find((g) => g.id === policy.group_id);
                if (group) {
                  groups.push(group.name);
                }
              }
            }

            const select = createElement('sl-select', {
              multiple: true,
              value: groups,
              size: 'small',
              placeholder: 'Modify user groups',
              hoist: true,
              onclick: (ev) => ev.stopPropagation(),
              'onsl-change': () => {
                const selected = select.value as string[];
                const value: gc.runtime.UserGroupPolicy[] = [];
                for (const group_name of selected) {
                  const group = this._groups.find((g) => g.name === group_name);
                  if (group) {
                    value.push(
                      new gc.runtime.UserGroupPolicy(
                        group.id,
                        gc.runtime.UserGroupPolicyType.execute,
                      ),
                    );
                  }
                }
                select.dispatchEvent(
                  new GuiTableChangeEvent({
                    rowIdx: row,
                    colIdx: gc.runtime.User.$fields.groups,
                    value,
                  }),
                );
              },
              children: this._groups.map((group) => (
                <sl-option value={group.name}>{group.name}</sl-option>
              )),
            });
            return select;
          },
        },
      ],
    });

    this._userForm = document.createElement('gui-user-form');

    this._table.addEventListener('gui-table-click', (ev) => {
      this._onEdit(this._users[ev.detail.rowIdx]);
    });
    this._table.addEventListener('gui-table-change', async (ev) => {
      const user = this._users[ev.detail.rowIdx];
      if (user.$fields) {
        user.$fields[ev.detail.colIdx] = ev.detail.value;
      }
      try {
        await gc.runtime.SecurityEntity.set(user);
        if (!this._disableNotifications) {
          toast.notify(`User '${user.name}' updated`);
        }
      } catch (err) {
        if (!this._disableNotifications) {
          toast.error(`Unable to update user '${user.name}' (${err})`);
        }
      }
    });

    this._dialog = document.createElement('gui-dialog');

    this.shadowRoot.append(
      <gui-card>
        <header slot="header">
          Users
          <div className="header-actions">
            <sl-button variant="text" onclick={this._onCreate}>
              Create
            </sl-button>
          </div>
        </header>
        {this._table}
      </gui-card>,
      this._dialog,
    );
  }

  connectedCallback() {
    this.update();
  }

  /**
   * When `disableNotifications` is `true` no toast will be displayed when updating a user
   */
  get disableNotifications() {
    return this._disableNotifications;
  }

  set disableNotifications(disable: boolean) {
    this._disableNotifications = disable;
  }

  async update(): Promise<void> {
    try {
      const entities = await gc.runtime.SecurityEntity.all();
      // Yes I'm not re-using the previous arrays, I want brand new each time
      const users: gc.runtime.User[] = [];
      const groups: gc.runtime.UserGroup[] = [];
      for (const entity of entities) {
        if (entity instanceof gc.runtime.User) {
          users.push(entity);
        } else if (entity instanceof gc.runtime.UserGroup) {
          groups.push(entity);
        }
      }
      this._users = users;
      this._groups = groups;

      // update the user form with the new roles
      await this._userForm.update();
      // set it the new groups
      this._userForm.groups = this._groups;
      // update the table with the fresh data
      this._table.value = this._users;
    } catch (err) {
      console.warn(`Unable to fetch 'runtime::SecurityEntity::all'`, err);
    }
  }

  private _onEdit = (user: gc.runtime.User) => {
    // update the form value
    this._userForm.value = user;
    // update the dialog
    this._dialog.replaceChildren(
      <>
        <header slot="label">User edit</header>
        {this._userForm}
        <sl-button
          slot="footer"
          onclick={async () => {
            try {
              await this._userForm.updateUser();
              this.update();
              this._dialog.hide();
            } catch (err) {
              toast.error(err);
            }
          }}
        >
          Update
        </sl-button>
      </>,
    );
    // open the dialog
    this._dialog.show();
  };

  private _onCreate = () => {
    // update the form value
    this._userForm.value = new gc.runtime.User(-1, '', false, null, null, null, null, null, false);
    // update the dialog
    this._dialog.replaceChildren(
      <>
        <header slot="label">User creation</header>
        {this._userForm}
        <sl-button
          slot="footer"
          onclick={async () => {
            try {
              await this._userForm.createUser();
              this.update();
              this._dialog.hide();
            } catch (err) {
              toast.error(err);
            }
          }}
        >
          Create
        </sl-button>
      </>,
    );
    // open the dialog
    this._dialog.show();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-users': GuiUsers;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-users': GreyCat.Element<GuiUsers>;
      }
    }
  }
}
