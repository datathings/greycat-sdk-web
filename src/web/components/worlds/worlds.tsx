import type * as sl from '@shoelace-style/shoelace';
import { toast } from '../../toast.js';
import { css } from '../common.js';
import type { GuiDialog } from '../dialog/dialog.js';
import { GuiElement } from '../element.js';
import type { GuiInputEnum } from '../inputs/inputs.js';
import type { GuiSelect } from '../select/select.js';
import type { GuiTable } from '../table/table.js';
import { createWorld, listWorlds, removeWorld } from './utils.js';
import style from './worlds.css?inline';

/**
 * The worlds `greycat` may use. With the `world` permission it creates worlds, and a click on
 * a row removes that world, which the server allows its creator and an admin only.
 */
export class GuiWorlds extends GuiElement {
  static override styles = [css(style)];

  /** The instance the worlds are read and changed through. Defaults to `gc.$.default`. */
  greycat: gc.sdk.GreyCat = gc.$.default;

  readonly table: GuiTable;
  private _worlds: gc.runtime.WorldInfo[] = [];
  private _create: HTMLElement;

  constructor() {
    super();

    this.table = document.createElement('gui-table');
    this.table.setAttrs({
      value: this._worlds,
      globalFilter: true,
      globalFilterPlaceholder: 'Filter worlds',
      sortBy: [0, 'asc'],
      rowHeight: 24,
      columns: [
        { index: gc.runtime.WorldInfo.$fields.id, header: 'ID', width: 80 },
        { index: gc.runtime.WorldInfo.$fields.name, header: 'Name', width: 250 },
        {
          index: gc.runtime.WorldInfo.$fields.mode,
          header: 'Mode',
          width: 120,
          value: ({ value }) => (value as gc.runtime.WorldMode).key,
        },
        {
          index: gc.runtime.WorldInfo.$fields.base,
          header: 'Base',
          width: 200,
          // a standalone world has none
          value: ({ value }) => value ?? '',
        },
        { index: gc.runtime.WorldInfo.$fields.created, header: 'Created', width: 250 },
        { index: gc.runtime.WorldInfo.$fields.user_id, header: 'Creator', width: 100 },
      ],
    });
    this.table.addEventListener('gui-table-click', (ev) => {
      this._remove(ev.detail.rowIdx);
    });

    this._create = (
      <sl-button size="small" variant="primary" onclick={() => this._createDialog()}>
        New world
      </sl-button>
    ) as HTMLElement;

    this.shadowRoot.appendChild(
      <gui-card>
        <header slot="header">
          Worlds
          {this._create}
        </header>
        {this.table}
      </gui-card>,
    );
  }

  connectedCallback() {
    this.reload();
  }

  async reload(): Promise<void> {
    if (!this.isConnected) {
      return;
    }
    this._create.hidden = !this._canChange();
    try {
      this._worlds = await listWorlds(this.greycat);
      this.table.value = this._worlds;
    } catch (err) {
      toast.error(err);
    }
  }

  private _canChange(): boolean {
    return this.greycat.permissions.includes('world');
  }

  private _createDialog(): void {
    const name = document.createElement('sl-input') as sl.SlInput;
    name.label = 'Name';
    name.required = true;
    name.pattern = '[A-Za-z0-9_.\\-]{1,128}';
    name.helpText = 'Letters, digits, _ . and -, but not main';

    const mode = document.createElement('gui-input-enum') as GuiInputEnum;
    mode.label = 'Mode';
    mode.type = gc.runtime.WorldMode._type;
    mode.value = gc.runtime.WorldMode.overlay;

    const base = document.createElement('gui-select') as GuiSelect<string>;
    base.label = 'Base';
    base.options = ['main', ...this._worlds.map((w) => w.name)];
    base.value = 'main';

    // the dropdowns live in a dialog whose body clips overflow
    for (const host of [mode.input, base]) {
      const popup = host.shadowRoot?.querySelector<sl.SlPopup>('sl-popup');
      if (popup) {
        popup.strategy = 'fixed';
      }
    }
    mode.addEventListener('gui-change', () => {
      // a standalone world has no base
      base.disabled = mode.value === gc.runtime.WorldMode.standalone;
    });

    const dialog = (
      <gui-dialog label="New world">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing)' }}>
          {name}
          {mode}
          {base}
        </div>
        <sl-button slot="footer" onclick={() => dialog.hide()}>
          Cancel
        </sl-button>
        <sl-button
          slot="footer"
          variant="primary"
          onclick={async () => {
            if (!name.reportValidity()) {
              return;
            }
            const m = (mode.value as gc.runtime.WorldMode | null) ?? gc.runtime.WorldMode.overlay;
            const b = m === gc.runtime.WorldMode.standalone || base.value === 'main' ? null : (base.value ?? null);
            try {
              await createWorld(this.greycat, name.value, m, b);
              toast.notify(`Created ${name.value}`);
              await dialog.hide();
              this.reload();
            } catch (err) {
              toast.error(err);
            }
          }}
        >
          Create
        </sl-button>
      </gui-dialog>
    ) as GuiDialog;
    this._show(dialog);
  }

  private _remove(rowIdx: number): void {
    const world = this._worlds[rowIdx];
    if (!world || !this._canChange()) {
      return;
    }
    const dialog = (
      <gui-dialog label={`Remove ${world.name}`}>
        <p>
          Everything written in <b>{world.name}</b> is lost. A world fails to be removed while a task still reads it, or
          while another world is based on it.
        </p>
        <sl-button slot="footer" onclick={() => dialog.hide()}>
          Cancel
        </sl-button>
        <sl-button
          slot="footer"
          variant="danger"
          onclick={async () => {
            try {
              await removeWorld(this.greycat, world.name);
              toast.notify(`Removed ${world.name}`);
              await dialog.hide();
              this.reload();
            } catch (err) {
              toast.error(err);
            }
          }}
        >
          Remove
        </sl-button>
      </gui-dialog>
    ) as GuiDialog;
    this._show(dialog);
  }

  private _show(dialog: GuiDialog): void {
    document.body.appendChild(dialog);
    dialog.updateComplete.then(() => dialog.show());
    dialog.addEventListener('sl-after-hide', (ev) => {
      if (ev.target === dialog) {
        dialog.remove();
      }
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiWorlds} */
    'gui-worlds': GuiWorlds;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiWorlds} */
        'gui-worlds': GreyCat.Element<GuiWorlds>;
      }
    }
  }
}
