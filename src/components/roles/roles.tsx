import type { SlDialog } from '@shoelace-style/shoelace';
import { core, std } from '../../exports.js';
import '../table/table.js'; // makes sure gui-table is available
import type { GuiTable } from '../table/table.js';
import './role-permissions.js';
import type { GuiRoleForm } from './role-form.js';
import './role-form.js';

export class GuiRoles extends HTMLElement {
  private _table: GuiTable;
  private _dialog: SlDialog;
  private _form: GuiRoleForm;

  constructor() {
    super();

    this._table = (
      <gui-table
        headers={['Name', 'Permissions']}
        sortBy={[0, 'asc']}
        columnWidths={[200]}
        globalFilter
        globalFilterPlaceholder="Filter by name or permissions"
        columnFactories={{
          1: 'gui-role-permissions',
        }}
        ongui-click={(ev) => {
          const name = this._table.table.cols[0][ev.detail.rowIdx] as string;
          const permissions = this._table.table.cols[1][ev.detail.rowIdx] as string[];
          const role = std.runtime.UserRole.create(name, permissions);
          this._onEdit(role);
        }}
      />
    ) as GuiTable;

    this._dialog = document.createElement('sl-dialog');
    this._form = document.createElement('gui-role-form');
  }

  connectedCallback() {
    this.replaceChildren(
      <>
        <sl-card>
          <header slot="header">
            Roles
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
      const roles = await std.runtime.UserRole.all();
      this._form.permissions = await std.runtime.SecurityPolicy.permissions();

      const rows: Array<[string, string[]]> = new Array(roles.length);

      for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        rows[i] = [role.name, role.permissions];
      }

      this._table.value = core.Table.fromRows(rows);
    } catch (err) {
      console.warn(`Unable to fetch 'runtime::UserRole::all'`, err);
    }
  }

  private _onEdit = (role: std.runtime.UserRole) => {
    // update the form value
    this._form.value = role;
    // update the dialog
    this._dialog.replaceChildren(
      <>
        <header slot="label">Role edit</header>
        {this._form}
        <sl-button
          variant="warning"
          slot="footer"
          onclick={async () => {
            try {
              await this._form.delete();
              this.reload();
              this._dialog.hide();
            } catch {
              // handle problems
            }
          }}
        >
          Delete
        </sl-button>
        <sl-button
          slot="footer"
          onclick={async () => {
            try {
              await this._form.update();
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
    this._form.clear();

    this._dialog.replaceChildren(
      <>
        <header slot="label">New role</header>
        {this._form}
        <sl-button
          slot="footer"
          onclick={async () => {
            try {
              await this._form.update();
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
    this._dialog.show();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-roles': GuiRoles;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-roles': GreyCat.Element<GuiRoles>;
      }
    }
  }
}

if (!customElements.get('gui-roles')) {
  customElements.define('gui-roles', GuiRoles);
}
