import type * as sl from '@shoelace-style/shoelace';
import { toast } from '../../toast.js';
import { css } from '../common.js';
import type { GuiDialog } from '../dialog/dialog.js';
import { GuiElement } from '../element.js';
import type { GuiInputEnum } from '../inputs/inputs.js';
import type { GuiSelect } from '../select/select.js';
import { CellData, type GuiTable } from '../table/table.js';
import style from './identities.css?inline';

export class GuiIdentities extends GuiElement {
  static override styles = [css(style)];

  readonly table: GuiTable;
  private _identities: gc.runtime.Identity[] = [];
  private _roles: gc.runtime.Role[] = [];

  constructor() {
    super();

    this.table = document.createElement('gui-table');
    this.table.setAttrs({
      value: this._identities,
      globalFilter: true,
      globalFilterPlaceholder: 'Filter identities',
      sortBy: [0, 'asc'],
      rowHeight: 24,
      columns: [
        { index: gc.runtime.Identity.$fields.id, header: 'ID', width: 100 },
        { index: gc.runtime.Identity.$fields.name, header: 'Name', width: 350 },
        { index: gc.runtime.Identity.$fields.role, header: 'Role', width: 250 },
        {
          index: gc.runtime.Identity.$fields.grants,
          header: 'Grants',
          cell: ({ value }: CellData<gc.runtime.IdentityGrant[]>) => {
            return renderGrants(value);
          },
        },
      ],
    });
    this.table.addEventListener('gui-table-click', (ev) => {
      this._edit(ev.detail.rowIdx);
    });

    this.shadowRoot.appendChild(this.table);
  }

  connectedCallback() {
    this.reload();
  }

  async reload(): Promise<void> {
    if (!this.isConnected) {
      return;
    }
    try {
      const [identities, roles] = await Promise.all([gc.runtime.Identity.all(), gc.runtime.Role.all()]);
      this._identities = identities;
      this._roles = roles;
      this.table.value = this._identities;
    } catch (err) {
      toast.error(err);
    }
  }

  private _edit(rowIdx: number): void {
    const identity = this._identities[rowIdx];
    if (!identity) {
      return;
    }

    const { form, getValue } = buildIdentityForm(identity, this._identities, this._roles);

    const dialog = (
      <gui-dialog label={`Edit ${identity.name}`}>
        {form}
        <sl-button slot="footer" onclick={() => dialog.hide()}>
          Cancel
        </sl-button>
        <sl-button
          slot="footer"
          variant="primary"
          onclick={async () => {
            try {
              const next = getValue();
              if (next.password) {
                await gc.runtime.Identity.set_password(identity.name, next.password);
              }
              if (next.role !== identity.role) {
                // Identity::create is upsert — same call updates the role
                // when the name already exists.
                await gc.runtime.Identity.create(identity.name, next.role);
              }
              await gc.runtime.Identity.set_grants(identity.name, next.grants);
              toast.notify(`Updated ${identity.name}`);
              await dialog.hide();
              this.reload();
            } catch (err) {
              toast.error(err);
            }
          }}
        >
          Save
        </sl-button>
      </gui-dialog>
    ) as GuiDialog;

    document.body.appendChild(dialog);
    dialog.updateComplete.then(() => dialog.show());
    dialog.addEventListener('sl-after-hide', (ev) => {
      if (ev.target === dialog) {
        dialog.remove();
      }
    });
  }
}

const INLINE_GRANTS_LIMIT = 3;

export function renderGrants(grants: gc.runtime.IdentityGrant[]): Node {
  if (grants.length === 0) {
    return document.createTextNode('');
  }

  if (grants.length <= INLINE_GRANTS_LIMIT) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < grants.length; i++) {
      const g = grants[i];
      const style = i < grants.length - 1 ? 'margin-right: var(--spacing); margin-bottom: 2px' : 'margin-bottom: 2px';
      frag.appendChild(
        <sl-tag style={style} size="small" variant={variantFor(g.grant)}>
          {g.name}: {g.grant.key}
        </sl-tag>,
      );
    }
    return frag;
  }

  // Many grants — collapse into a single non-interactive pill. Click the row
  // to open the editor and inspect/modify the full list.
  return (
    <sl-tag size="small" variant="neutral">
      {grants.length} grants
    </sl-tag>
  );
}

function variantFor(t: gc.runtime.IdentityGrantType): 'primary' | 'success' | 'warning' | 'neutral' {
  if (t === gc.runtime.IdentityGrantType.read_write) {
    return 'success';
  }
  if (t === gc.runtime.IdentityGrantType.write) {
    return 'warning';
  }
  if (t === gc.runtime.IdentityGrantType.read) {
    return 'primary';
  }
  return 'neutral';
}

export interface IdentityFormOptions {
  passwordPlaceholder?: string;
}

/**
 * Builds an editor for an identity's password, role, and the access it grants
 * to other identities' file spaces. The grants section is O(grants), not
 * O(identities): only existing grants are listed, plus a typeahead picker for
 * adding new targets — scales to thousands of identities.
 *
 * `getValue()` returns `{ password, role, grants }` where `password` is `null`
 * when left blank (caller should treat as "keep current" in edit mode).
 *
 * Exported so a future `GuiIdentityCreate` form can reuse the same editor.
 */
export function buildIdentityForm(
  owner: gc.runtime.Identity | { name: string; role: string; grants: gc.runtime.IdentityGrant[] | null },
  allIdentities: gc.runtime.Identity[],
  allRoles: gc.runtime.Role[],
  options?: IdentityFormOptions,
): {
  form: Node;
  getValue(): {
    password: string | null;
    role: string;
    grants: gc.runtime.IdentityGrant[];
  };
} {
  const state = new Map<string, gc.runtime.IdentityGrantType>();
  if (owner.grants) {
    for (let i = 0; i < owner.grants.length; i++) {
      state.set(owner.grants[i].name, owner.grants[i].grant);
    }
  }

  const eligible = allIdentities
    .map((u) => u.name)
    .filter((n) => n !== owner.name)
    .sort((a, b) => a.localeCompare(b));

  const root = document.createElement('div');
  root.style.display = 'flex';
  root.style.flexDirection = 'column';
  root.style.gap = '0.5rem';

  // The form lives inside a `gui-dialog` whose body clips overflow. Every
  // dropdown (gui-select, gui-input-enum) needs its inner sl-popup hoisted out
  // of that overflow context — equivalent to sl-select's `hoist`.
  const hoist = (host: Element): void => {
    const popup = host.shadowRoot?.querySelector<sl.SlPopup>('sl-popup');
    if (popup) {
      popup.strategy = 'fixed';
    }
  };

  // Password field — leaving it empty on save means "keep the current one".
  // For the future create-user form, the caller is expected to enforce a
  // non-empty value before submit.
  const passwordInput = document.createElement('sl-input') as sl.SlInput;
  passwordInput.type = 'password';
  passwordInput.passwordToggle = true;
  passwordInput.placeholder = options?.passwordPlaceholder ?? 'Leave empty to keep current';
  passwordInput.autocomplete = 'new-password';

  // Role picker
  const roleInput = document.createElement('gui-select') as GuiSelect<string>;
  roleInput.options = allRoles.map((r) => r.name).sort((a, b) => a.localeCompare(b));
  roleInput.value = owner.role;
  hoist(roleInput);

  const topSection = document.createElement('div');
  topSection.style.display = 'grid';
  topSection.style.gridTemplateColumns = 'minmax(120px, auto) 1fr';
  topSection.style.gap = '0.5rem';
  topSection.style.alignItems = 'center';
  topSection.style.borderBottom = '1px solid var(--sl-color-neutral-200)';
  topSection.style.paddingBottom = '0.5rem';
  topSection.append(
    <label htmlFor={passwordInput.name}>Password</label>,
    passwordInput,
    <label htmlFor={roleInput.name}>Role</label>,
    roleInput,
  );

  const list = document.createElement('div');
  list.style.display = 'grid';
  list.style.gridTemplateColumns = 'minmax(120px, auto) 1fr auto';
  list.style.gap = '0.25rem 0.5rem';
  list.style.alignItems = 'center';
  // Cap the list so the dialog stays a sensible size when an identity has
  // many grants. The role picker and the add-row stay pinned outside.
  list.style.maxHeight = '40vh';
  list.style.overflowY = 'auto';

  // Typeahead picker: gui-select gives us Shoelace-styled type-to-filter,
  // keyboard navigation, and exact-match selection. Scales to thousands of
  // options because the dropdown only renders matches as the user types.
  const levelInput = document.createElement('gui-input-enum') as GuiInputEnum;
  levelInput.type = 'runtime::IdentityGrantType';
  levelInput.value = gc.runtime.IdentityGrantType.read;
  hoist(levelInput.input);

  const picker = document.createElement('gui-select') as GuiSelect<string>;
  picker.placeholder = 'Grant access to…';
  picker.nullable = true;
  picker.style.flex = '1 1 auto';
  hoist(picker);

  const addRow = document.createElement('div');
  addRow.style.display = 'flex';
  addRow.style.gap = '0.5rem';
  addRow.style.alignItems = 'center';
  addRow.style.borderTop = '1px solid var(--sl-color-neutral-200)';
  addRow.style.paddingTop = '0.5rem';
  addRow.append(picker, levelInput);

  function refreshPickerOptions(): void {
    picker.options = eligible.filter((n) => !state.has(n));
  }

  function renderList(): void {
    list.replaceChildren();
    if (state.size === 0) {
      const empty = document.createElement('small');
      empty.style.gridColumn = '1 / -1';
      empty.style.color = 'var(--sl-color-neutral-500)';
      empty.appendChild(<i>No grants. Pick an identity below to add one.</i>);
      list.appendChild(empty);
      return;
    }
    const names = Array.from(state.keys()).sort((a, b) => a.localeCompare(b));
    for (const name of names) {
      const input = document.createElement('gui-input-enum') as GuiInputEnum;
      input.name = `grant_${name}`;
      input.type = gc.runtime.IdentityGrantType._type;
      input.value = state.get(name)!;
      hoist(input.input);
      input.addEventListener('gui-change', () => {
        const v = input.value as gc.runtime.IdentityGrantType | null;
        if (v) state.set(name, v);
      });

      const remove = (
        <sl-icon-button
          name="x-lg"
          label={`Remove grant for ${name}`}
          onclick={() => {
            state.delete(name);
            renderList();
            refreshPickerOptions();
          }}
        />
      );

      list.append(<label htmlFor={input.name}>{name}</label>, input, remove);
    }
  }

  picker.addEventListener('gui-change', () => {
    const name = picker.value;
    if (!name) {
      // user cleared the picker, or update() reset us after we added a row
      return;
    }
    const level = (levelInput.value as gc.runtime.IdentityGrantType | null) ?? gc.runtime.IdentityGrantType.read;
    state.set(name, level);
    renderList();
    refreshPickerOptions(); // also resets picker.value to undefined
  });

  renderList();
  refreshPickerOptions();
  root.append(topSection, list, addRow);

  return {
    form: root,
    getValue() {
      const grants: gc.runtime.IdentityGrant[] = [];
      for (const [name, level] of state) {
        grants.push(new gc.runtime.IdentityGrant(name, level));
      }
      const pwd = passwordInput.value.trim();
      return {
        password: pwd.length > 0 ? pwd : null,
        role: roleInput.value ?? owner.role,
        grants,
      };
    },
  };
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiIdentities} */
    'gui-identities': GuiIdentities;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiIdentities} */
        'gui-identities': GreyCat.Element<GuiIdentities>;
      }
    }
  }
}
