import type { SlDialog } from '@shoelace-style/shoelace';
import { std } from '../../exports.js';
import type { TableLikeRowBased } from '../common.js';
import '../table/index.js'; // makes sure gui-table is available
import type { GuiTable } from '../table/table.js';
import './role-permissions.js';
import type { GuiRoleForm } from './role-form.js';
import './role-form.js';

export class GuiRoles extends HTMLElement {
  private _rows: TableLikeRowBased;
  private _table: GuiTable;
  private _dialog: SlDialog;
  private _form: GuiRoleForm;

  constructor() {
    super();

    this._rows = {
      rows: [],
      meta: ['Name', 'Permissions'],
    };

    this._table = document.createElement('gui-table');
    this._table.setAttrs({
      value: this._rows,
      sortBy: [0, 'asc'],
      columnsWidths: [200],
      globalFilter: true,
      globalFilterPlaceholder: 'Filter by name or permissions',
      columnFactories: {
        1: 'gui-role-permissions',
      },
    });

    this._table.addEventListener('table-click', (ev) => {
      const name = ev.detail.row[0].value as string;
      const permissions = ev.detail.row[1].value as string[];

      const role = std.runtime.UserRole.create(name, permissions);
      this._onEdit(role);
    });

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

      if (this._rows.rows) {
        this._rows.rows.length = 0;
      } else {
        this._rows.rows = [];
      }

      for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        this._rows.rows[i] = [role.name, role.permissions];
      }

      this._table.computeTable();
      this._table.update();
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

  namespace JSX {
    interface IntrinsicElements {
      'gui-roles': GreyCat.Element<GuiRoles>;
    }
  }
}

if (!customElements.get('gui-roles')) {
  customElements.define('gui-roles', GuiRoles);
}
