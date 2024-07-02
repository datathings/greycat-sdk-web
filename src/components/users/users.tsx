import { runtime } from '@greycat/sdk';
import { TableLikeRowBased, registerCustomElement } from '../common.js';
import '../table/table.js'; // ensure gui-table is defined
import type { GuiTable } from '../table/table.js';
import '../user-form/user-form.js'; // ensure gui-user-form is defined
import './user-group-policy.js';
import type { GuiUserForm } from '../user-form/user-form.js';
import type { SlDialog } from '@shoelace-style/shoelace';

type GroupItem = {
  id: number | bigint;
  name: string;
  policy: runtime.UserGroupPolicy;
};

export class GuiUsers extends HTMLElement {
  private _rows: TableLikeRowBased;
  private _table: GuiTable;
  private _dialog: SlDialog;
  private _userForm: GuiUserForm;

  constructor() {
    super();

    this._rows = {
      rows: [],
      meta: ['Id', 'Name', 'Full Name', 'Email', 'Role', 'Activated', 'External', 'Groups'],
    };

    this._table = document.createElement('gui-table');
    this._table.setAttrs({
      value: this._rows,
      sortBy: [0, 'asc'],
      columnsWidths: [80, undefined!, undefined!, undefined!, 150, 130, 120],
      globalFilter: true,
      globalFilterPlaceholder: 'Filter the users',
      cellTagNames: {
        7: 'gui-user-group-policy',
      },
    });

    this._userForm = document.createElement('gui-user-form');

    this._table.addEventListener('table-click', (ev) => {
      const user_id = ev.detail.row[0].value as number | bigint;
      const name = ev.detail.row[1].value as string;
      const full_name = ev.detail.row[2].value as string;
      const email = ev.detail.row[3].value as string;
      const user_role = ev.detail.row[4].value as string;
      const activated = ev.detail.row[5].value as boolean;
      const external = ev.detail.row[6].value as boolean;
      const groups = ev.detail.row[7].value as GroupItem[];

      const user = runtime.User.create(
        user_id,
        name,
        activated,
        full_name,
        email,
        user_role,
        null,
        groups.map((i) => i.policy),
        null,
        external,
      );
      this._onEdit(user);
    });

    this._dialog = document.createElement('sl-dialog');
  }

  connectedCallback() {
    this.replaceChildren(
      <>
        <sl-card>
          <header slot="header">
            Users
            <div className="header-actions">
              <sl-button variant="text" onclick={this._onCreate}>
                Create
              </sl-button>
            </div>
          </header>
          {this._table}
        </sl-card>
        {this._dialog}
      </>,
    );

    this.reload();
  }

  async reload(): Promise<void> {
    try {
      const entities = await runtime.SecurityEntity.all();
      const groups: runtime.UserGroup[] = [];
      const users: runtime.User[] = [];
      for (const entity of entities) {
        if (entity instanceof runtime.User) {
          users.push(entity);
        } else {
          groups.push(entity);
        }
      }

      await this._userForm.updateRoles();
      this._userForm.groups = groups;

      if (this._rows.rows) {
        this._rows.rows.length = 0;
      } else {
        this._rows.rows = [];
      }

      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const user_groups: GroupItem[] = [];
        if (user.groups) {
          for (const policy of user.groups) {
            for (const grp of groups) {
              if (policy.group_id === grp.id) {
                user_groups.push({ id: policy.group_id, name: grp.name, policy });
                break;
              }
            }
          }
        }
        this._rows.rows[i] = [
          user.id,
          user.name,
          user.full_name ?? '',
          user.email ?? '',
          user.role,
          user.activated,
          user.external,
          user_groups,
        ];
      }

      this._table.computeTable();
      this._table.update();
    } catch (err) {
      console.warn(`Unable to fetch 'runtime::SecurityEntity::all'`, err);
    }
  }

  private _onEdit = (user: runtime.User) => {
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
              this.reload();
              this._dialog.hide();
            } catch {
              // handle problems
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
    this._userForm.value = runtime.User.create(
      -1,
      '',
      false,
      null,
      null,
      null,
      null,
      null,
      null,
      false,
    );
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
              this.reload();
              this._dialog.hide();
            } catch {
              // handle problems
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

  interface GuiUsersEventMap {}

  interface HTMLElementEventMap extends GuiUsersEventMap {}

  namespace JSX {
    interface IntrinsicElements {
      'gui-users': GreyCat.Element<GuiUsers, GuiUsersEventMap>;
    }
  }
}

registerCustomElement('gui-users', GuiUsers);
