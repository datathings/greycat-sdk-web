import { runtime } from '@greycat/sdk';
import { TableLikeRowBased, registerCustomElement } from '../common.js';
import '../table/table.js'; // ensure gui-table is defined
import type { GuiTable } from '../table/table.js';
import type { SlDialog } from '@shoelace-style/shoelace';

export class GuiUsers extends HTMLElement {
  private _rows: TableLikeRowBased;
  private _table: GuiTable;
  private _dialog: SlDialog;

  constructor() {
    super();

    this._rows = {
      rows: [],
      meta: ['Id', 'Name', 'Full Name', 'Email', 'Role', 'Activated', 'Groups'],
    };

    this._table = document.createElement('gui-table');
    this._table.setAttrs({
      value: this._rows,
      sortBy: [0, 'asc'],
    });

    this._table.addEventListener('table-click', (ev) => {
      console.log('edit user', ev.detail);
      this._dialog.replaceChildren(
        <>
          <header slot="label">User edit</header>
          <div className="list">
            <sl-input name="id" label="Id" value={`${ev.detail.row[0].value}`} disabled />
            <sl-input name="name" label="Name" value={`${ev.detail.row[1].value}`} />
            <sl-input name="password" type="password" label="Password" />
            <sl-input name="full_name" label="Full Name" value={`${ev.detail.row[2].value}`} />
            <sl-input name="email" label="E-mail" value={`${ev.detail.row[3].value}`} />
          </div>
          <sl-button
            slot="footer"
            onclick={() => {
              // TODO
            }}
          >
            Update
          </sl-button>
        </>,
      );
      this._dialog.show();
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
              <sl-button variant="text" size="small" onclick={this._onCreate}>
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
      const users = entities.filter(
        (entity): entity is runtime.User => entity instanceof runtime.User,
      );

      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        this._rows.rows![i] = [
          user.id,
          user.name,
          user.full_name ?? '',
          user.email ?? '',
          user.role,
          user.activated,
          user.groups?.map((g) => g.group_id),
        ];
      }

      this._table.computeTable();
      this._table.update();
    } catch (err) {
      console.warn(`Unable to fetch 'runtime::SecurityEntity::all'`, err);
    }
  }

  private _onCreate = () => {
    // TODO create
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
