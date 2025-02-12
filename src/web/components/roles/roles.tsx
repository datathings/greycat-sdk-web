import { type GuiDialog, GuiElement, css, toast } from '../../exports.js';
import '../table/table.js'; // makes sure gui-table is available
import type { GuiTable } from '../table/table.js';
import './role-permissions.js';
import style from './roles.css?inline';

export class GuiRoles extends GuiElement {
  static override styles = [css(style)];

  private _table: GuiTable;
  private _dialog: GuiDialog;

  constructor() {
    super();

    this._table = (
      <gui-table
        sortBy={[0, 'asc']}
        columnWidths={[200]}
        globalFilter
        globalFilterPlaceholder="Filter by name or permissions"
        columnFactory={{
          1: 'gui-role-permissions',
        }}
      />
    ) as GuiTable;

    this._dialog = document.createElement('sl-dialog');

    this.shadowRoot.appendChild(
      <>
        <gui-card>
          <header slot="header">Roles</header>
          {this._table}
        </gui-card>
        {this._dialog}
      </>,
    );
  }

  connectedCallback() {
    this.update();
  }

  async update(): Promise<void> {
    try {
      const roles = await gc.runtime.Role.all();
      const permissions = await gc.runtime.Permission.all();

      const rows: Array<[string, gc.runtime.Permission[]]> = Array.from({ length: roles.length });

      for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        rows[i] = [
          role.name,
          role.permissions.map((name) => permissions.find((p) => p.name === name)!),
        ];
      }

      const table = gc.core.Table.fromRows(rows);
      table.headers = ['Name', 'Permissions'];
      this._table.value = table;
    } catch (err) {
      toast.error(err);
    }
  }
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
