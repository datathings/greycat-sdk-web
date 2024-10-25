import { core, std } from '../../exports.js';
import { registerCustomElement } from '../common.js';
import '../table/table.js'; // ensure gui-table is defined
import type { GuiTable } from '../table/table.js';
import '../user-form/user-form.js'; // ensure gui-user-form is defined
import './user-group-policy.js';
import type { GuiUserForm } from '../user-form/user-form.js';
import type { SlDialog } from '@shoelace-style/shoelace';

type GroupItem = {
  id: number | bigint;
  name: string;
  policy: std.runtime.UserGroupPolicy;
};

export class GuiUsers extends HTMLElement {
  private _table: GuiTable;
  private _dialog: SlDialog;
  private _userForm: GuiUserForm;

  constructor() {
    super();

    this._table = document.createElement('gui-table');
    this._table.setAttrs({
      headers: ['Id', 'Name', 'Full Name', 'Email', 'Role', 'Activated', 'External', 'Groups'],
      sortBy: [0, 'asc'],
      columnsWidths: [80, undefined, undefined, undefined, 150, 130, 120],
      globalFilter: true,
      globalFilterPlaceholder: 'Filter the users',
      columnFactories: {
        7: 'gui-user-group-policy',
      },
    });

    this._userForm = document.createElement('gui-user-form');

    this._table.addEventListener('gui-click', (ev) => {
      const user_id = this._table.table.cols[0][ev.detail.rowIdx] as number | bigint;
      const name = this._table.table.cols[1][ev.detail.rowIdx] as string;
      const full_name = this._table.table.cols[2][ev.detail.rowIdx] as string;
      const email = this._table.table.cols[3][ev.detail.rowIdx] as string;
      const user_role = this._table.table.cols[4][ev.detail.rowIdx] as string;
      const activated = this._table.table.cols[5][ev.detail.rowIdx] as boolean;
      const external = this._table.table.cols[6][ev.detail.rowIdx] as boolean;
      const groups = this._table.table.cols[7][ev.detail.rowIdx] as GroupItem[];

      const user = std.runtime.User.create(
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
      const entities = await std.runtime.SecurityEntity.all();
      const groups: std.runtime.UserGroup[] = [];
      const users: std.runtime.User[] = [];
      for (const entity of entities) {
        if (entity instanceof std.runtime.User) {
          users.push(entity);
        } else {
          groups.push(entity);
        }
      }

      await this._userForm.updateRoles();
      this._userForm.groups = groups;

      const rows: Array<Array<unknown>> = new Array(users.length);

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

        rows[i] = [
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

      this._table.value = core.Table.fromRows(rows);
    } catch (err) {
      console.warn(`Unable to fetch 'runtime::SecurityEntity::all'`, err);
    }
  }

  private _onEdit = (user: std.runtime.User) => {
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
    this._userForm.value = std.runtime.User.create(
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

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-users': GreyCat.Element<GuiUsers, GuiUsersEventMap>;
      }
    }
  }
}

registerCustomElement('gui-users', GuiUsers);
