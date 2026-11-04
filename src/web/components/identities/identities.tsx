import type * as sl from '@shoelace-style/shoelace';
import { toast } from '../../toast.js';
import { css } from '../common.js';
import type { GuiDialog } from '../dialog/dialog.js';
import { GuiElement } from '../element.js';
import type { GuiSelect, GuiOption } from '../select/select.js';
import type { GuiTable } from '../table/table.js';
import style from './identities.css?inline';

/** How many grants or tokens one paged call reads. */
const PAGE = 100;

export class GuiIdentities extends GuiElement {
  static override styles = [css(style)];

  greycat: gc.sdk.GreyCat = gc.$.default;
  readonly table: GuiTable;
  private _identities: gc.runtime.Identity[] = [];
  private _roles: gc.runtime.Role[] = [];
  private _permissions: gc.runtime.Permission[] = [];

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
      const g = this.greycat;
      const [identities, roles, permissions] = await Promise.all([
        gc.runtime.Identity.all(g),
        gc.runtime.Role.all(g),
        gc.runtime.Permission.all(g),
      ]);
      this._identities = identities;
      this._roles = roles;
      this._permissions = permissions;
      this.table.value = this._identities;
    } catch (err) {
      toast.error(err);
    }
  }

  private async _edit(rowIdx: number): Promise<void> {
    const identity = this._identities[rowIdx];
    if (!identity) {
      return;
    }

    let grants: gc.runtime.IdentityGrant[];
    try {
      grants = await allGrants(identity.name, this.greycat);
    } catch (err) {
      toast.error(err);
      return;
    }

    const { form, getValue } = buildIdentityForm(
      identity,
      grants,
      this._identities,
      this._roles,
      this._permissions,
    );

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
            const g = this.greycat;
            try {
              const next = getValue();
              if (next.password) {
                await gc.runtime.Identity.set_password(identity.name, next.password, g);
              }
              if (next.role !== identity.role) {
                await gc.runtime.Identity.set_role(identity.name, next.role, g);
              }
              await gc.runtime.Identity.set_grants(identity.name, next.grants, g);
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

/** Every grant `name` extends, read a page at a time. */
export async function allGrants(name: string, g: gc.sdk.GreyCat = gc.$.default): Promise<gc.runtime.IdentityGrant[]> {
  const grants: gc.runtime.IdentityGrant[] = [];
  for (;;) {
    const page = await gc.runtime.Identity.grants(name, grants.length, PAGE, g);
    grants.push(...page);
    if (page.length < PAGE) {
      return grants;
    }
  }
}

/** The text naming the grantee of `grant`: an identity, or the holders of a permission. */
export function granteeText(grant: { name: string; holders: boolean | null }): string {
  return grant.holders ? `holders of ${grant.name}` : grant.name;
}

const INLINE_GRANTS_LIMIT = 3;

/**
 * Renders `grants` as tags reading `<grantee>: <permissions>`, or as one tag counting them past
 * three.
 */
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
        <sl-tag style={style} size="small" variant={g.holders ? 'success' : 'primary'}>
          {granteeText(g)}: {g.permissions.join(', ')}
        </sl-tag>,
      );
    }
    return frag;
  }

  return (
    <sl-tag size="small" variant="neutral">
      {grants.length} grants
    </sl-tag>
  );
}

export interface IdentityFormOptions {
  passwordPlaceholder?: string;
}

/** The key of a grantee in the form: `u:<identity>` or `p:<permission>` for its holders. */
type GranteeKey = `u:${string}` | `p:${string}`;

type GrantRow = { name: string; holders: boolean; permissions: string[] };

function granteeKey(name: string, holders: boolean): GranteeKey {
  return holders ? `p:${name}` : `u:${name}`;
}

/**
 * Builds an editor for an identity's password, role, and the permissions it grants on what it
 * owns, to other identities or to every caller whose role holds a given permission. The grants
 * section is O(grants), not O(identities): only existing grants are listed, plus a typeahead
 * picker for adding new grantees, so it scales to thousands of identities.
 *
 * `getValue()` returns `{ password, role, grants }` where `password` is `null` when left blank
 * (the caller should treat it as "keep current" in edit mode). A grant left with no permission
 * is dropped, as `Identity::set_grants` would skip it.
 *
 * @param grants the grants `owner` extends, as `Identity::grants` lists them (see {@link allGrants})
 * @param allPermissions the permissions the program declares, which are the ones that can be granted
 */
export function buildIdentityForm(
  owner: { name: string; role: string },
  grants: gc.runtime.IdentityGrant[],
  allIdentities: gc.runtime.Identity[],
  allRoles: gc.runtime.Role[],
  allPermissions: gc.runtime.Permission[],
  options?: IdentityFormOptions,
): {
  form: Node;
  getValue(): {
    password: string | null;
    role: string;
    grants: gc.runtime.IdentityGrant[];
  };
} {
  const state = new Map<GranteeKey, GrantRow>();
  for (let i = 0; i < grants.length; i++) {
    const { name, holders, permissions } = grants[i];
    state.set(granteeKey(name, holders === true), { name, holders: holders === true, permissions: [...permissions] });
  }

  const declared = allPermissions.map((p) => p.name).sort((a, b) => a.localeCompare(b));
  const descriptions = new Map(allPermissions.map((p) => [p.name, p.description]));

  const eligible: GuiOption<GranteeKey>[] = [
    ...allIdentities
      .map((u) => u.name)
      .filter((n) => n !== owner.name)
      .sort((a, b) => a.localeCompare(b))
      .map((n) => ({ value: granteeKey(n, false), text: n })),
    ...declared.map((p) => ({ value: granteeKey(p, true), text: granteeText({ name: p, holders: true }) })),
  ];

  const root = document.createElement('div');
  root.style.display = 'flex';
  root.style.flexDirection = 'column';
  root.style.gap = '0.5rem';

  // The form lives inside a `gui-dialog` whose body clips overflow. Every
  // gui-select dropdown needs its inner sl-popup hoisted out of that overflow
  // context, which is what sl-select's `hoist` does.
  const hoist = (host: Element): void => {
    const popup = host.shadowRoot?.querySelector<sl.SlPopup>('sl-popup');
    if (popup) {
      popup.strategy = 'fixed';
    }
  };

  /**
   * A multiple select of permissions. `extra` are permissions the grant holds that the program
   * no longer declares, kept as options so that saving does not drop them silently.
   */
  const permissionSelect = (selected: string[], extra: string[] = []): sl.SlSelect => {
    const select = document.createElement('sl-select') as sl.SlSelect;
    select.multiple = true;
    select.hoist = true;
    select.size = 'small';
    select.maxOptionsVisible = 0;
    select.placeholder = 'No permission';
    for (const name of [...declared, ...extra.filter((p) => !descriptions.has(p))]) {
      const option = document.createElement('sl-option') as sl.SlOption;
      option.value = name;
      option.textContent = name;
      option.title = descriptions.get(name) ?? 'not declared by the program';
      select.appendChild(option);
    }
    select.value = selected;
    return select;
  };

  // Password field. Leaving it empty on save means "keep the current one".
  const passwordInput = document.createElement('sl-input') as sl.SlInput;
  passwordInput.type = 'password';
  passwordInput.passwordToggle = true;
  passwordInput.placeholder = options?.passwordPlaceholder ?? 'Leave empty to keep current';
  passwordInput.autocomplete = 'new-password';

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
  // Capped so the dialog stays a sensible size when an identity has many
  // grants. The role picker and the add-row stay pinned outside.
  list.style.maxHeight = '40vh';
  list.style.overflowY = 'auto';

  // the permissions a grantee picked below is granted
  const newPermissions = permissionSelect(declared.includes('files:read') ? ['files:read'] : []);
  newPermissions.style.flex = '1 1 50%';

  const picker = document.createElement('gui-select') as GuiSelect<GranteeKey>;
  picker.placeholder = 'Grant to...';
  picker.nullable = true;
  picker.style.flex = '1 1 50%';
  hoist(picker);

  const addRow = document.createElement('div');
  addRow.style.display = 'flex';
  addRow.style.gap = '0.5rem';
  addRow.style.alignItems = 'center';
  addRow.style.borderTop = '1px solid var(--sl-color-neutral-200)';
  addRow.style.paddingTop = '0.5rem';
  addRow.append(picker, newPermissions);

  function refreshPickerOptions(): void {
    picker.options = eligible.filter((o) => !state.has(o.value));
  }

  function renderList(): void {
    list.replaceChildren();
    if (state.size === 0) {
      const empty = document.createElement('small');
      empty.style.gridColumn = '1 / -1';
      empty.style.color = 'var(--sl-color-neutral-500)';
      empty.appendChild(<i>No grants. Pick an identity, or the holders of a permission, below to add one.</i>);
      list.appendChild(empty);
      return;
    }
    // the grants to identities first, then those to the holders of a permission, as the server lists them
    const keys = Array.from(state.keys()).sort((a, b) => b[0].localeCompare(a[0]) || a.localeCompare(b));
    for (const key of keys) {
      const row = state.get(key)!;
      const select = permissionSelect(row.permissions, row.permissions);
      select.name = `grant_${key}`;
      select.addEventListener('sl-change', () => {
        row.permissions = [...(select.value as string[])];
      });

      const remove = (
        <sl-icon-button
          name="x-lg"
          label={`Remove grant for ${granteeText(row)}`}
          onclick={() => {
            state.delete(key);
            renderList();
            refreshPickerOptions();
          }}
        />
      );

      list.append(
        <label htmlFor={select.name}>{row.holders ? <i>{granteeText(row)}</i> : row.name}</label>,
        select,
        remove,
      );
    }
  }

  picker.addEventListener('gui-change', () => {
    const key = picker.value;
    if (!key) {
      // the picker was cleared, or update() reset it after a row was added
      return;
    }
    const holders = key.startsWith('p:');
    state.set(key, { name: key.slice(2), holders, permissions: [...(newPermissions.value as string[])] });
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
      for (const row of state.values()) {
        if (row.permissions.length > 0) {
          grants.push(new gc.runtime.IdentityGrant(row.name, row.holders, row.permissions));
        }
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
