import { toast } from '../../toast.js';
import { css } from '../common.js';
import { GuiElement } from '../element.js';
import type { GuiTable } from '../table/table.js';
import style from './roles.css?inline';

export class GuiRoles extends GuiElement {
  static override styles = [css(style)];

  private _table: GuiTable;

  constructor() {
    super();

    this._table = (
      <gui-table
        sortBy={[0, 'asc']}
        globalFilter
        globalFilterPlaceholder="Filter by name or permissions"
        columns={[
          { index: 0, width: 200 },
          { index: 1, cell: 'gui-role-permissions' },
        ]}
      />
    ) as GuiTable;

    this.shadowRoot.appendChild(
      <>
        <gui-card>
          <header slot="header">Roles</header>
          {this._table}
        </gui-card>
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

      // oxlint-disable-next-line no-new-array
      const rows: Array<[string, gc.runtime.Permission[]]> = new Array(roles.length);
      for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        rows[i] = [role.name, role.permissions.map((name) => permissions.find((p) => p.name === name)!)];
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
    /** @see {@link GuiRoles} */
    'gui-roles': GuiRoles;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiRoles} */
        'gui-roles': GreyCat.Element<GuiRoles>;
      }
    }
  }
}
