import { css, GuiElement, sl, toast } from '../../exports.js';
import style from './nav.css?inline';

export type NavTree = NavItem[];

export type NavItem = {
  label: string;
  route?: string;
  link?: boolean;
  expanded?: boolean;
  children?: NavItem[];
};

type Ok<T> = { ok: true; value: T };
type Err<E> = { ok: false; err: E };
type Result<T, E> = Ok<T> | Err<E>;

export class GuiNav extends GuiElement {
  static override styles = [css(style)];

  constructor() {
    super();

    this.shadowRoot.appendChild(<em>Loading nav.json...</em>);
  }

  async connectedCallback(): Promise<void> {
    try {
      const [path, tree] = await this._loadConfig();
      const treeEl = (
        <sl-tree
          selection="leaf"
          onsl-selection-change={(ev) => {
            if (ev.detail.selection.length === 1) {
              const selected = ev.detail.selection[0];
              if (selected.children[0] instanceof HTMLAnchorElement) {
                selected.children[0].click();
              }
            }
          }}
        >
          {this._createNavChildren(tree, path)}
        </sl-tree>
      ) as sl.SlTree;
      this.shadowRoot.replaceChildren(treeEl);
      await treeEl.updateComplete;
      treeEl.querySelectorAll('a').forEach((link) => {
        try {
          const url = new URL(link.href);
          if (url.pathname === location.pathname) {
            const item = link.parentElement;
            if (item instanceof sl.SlTreeItem) {
              item.selected = true;
              let parent = item.parentElement;
              while (parent instanceof sl.SlTreeItem) {
                parent.expanded = true;
                parent = parent.parentElement;
              }
            }
          }
        } catch {
          // ignore
        }
      });
    } catch (err) {
      this.shadowRoot.replaceChildren(<em>Missing nav.json...</em>);
      toast.error(err);
    }
  }

  private _createNavChildren(children: NavItem[] | undefined, parentRoute = ''): Node {
    const items = document.createDocumentFragment();
    if (children) {
      for (const item of children) {
        const node = this._createNavItem(item, parentRoute);
        items.appendChild(node);
      }
    }
    return items;
  }

  private _createNavItem(item: NavItem, parentRoute: string): Node {
    const hasChildren = item.children !== undefined;
    let expanded = false;
    if (hasChildren) {
      const route = item.route ? join(parentRoute, item.route) : parentRoute;
      expanded = item.expanded || location.pathname === route;
    }
    return (
      <sl-tree-item className={{ section: hasChildren }} expanded={expanded}>
        {this._createNavItemLabel(item, parentRoute)}
        {this._createNavChildren(
          item.children,
          item.route ? join(parentRoute, item.route) : undefined,
        )}
      </sl-tree-item>
    );
  }

  private _createNavItemLabel(item: NavItem, parentRoute: string): Node {
    if (item.route !== undefined) {
      if (item.children) {
        if (item.link) {
          return <a href={join(parentRoute, item.route)}>{item.label}</a>;
        }
        return <a>{item.label}</a>;
      }
      return <a href={join(parentRoute, item.route)}>{item.label}</a>;
    }
    return <a>{item.label}</a>;
  }

  private async _loadConfig(): Promise<[string, NavTree]> {
    const filename = 'nav.json';
    let path = join(location.pathname, filename);

    for (let i = 0; i < 15; i++) {
      const res = await this._fetchConfig(path);
      if (res.ok) {
        return [path.slice(0, -filename.length), res.value];
      }
      if (res.err === 'data') {
        throw new Error('invalid nav.json format');
      }

      // Find the second-to-last slash to move up one directory level
      const lastSlashIndex = path.lastIndexOf('/');
      const secondLastSlashIndex = path.lastIndexOf('/', lastSlashIndex - 1);

      if (lastSlashIndex === 0) {
        break; // We've reached the root
      }

      path = path.slice(0, secondLastSlashIndex) + '/nav.json'; // Move one directory up
    }

    throw new Error(`unable to locate nav.json`);
  }

  private async _fetchConfig(path: string): Promise<Result<NavTree, 'fetch' | 'data'>> {
    try {
      const res = await fetch(path);
      if (res.ok && res.headers.get('content-type')?.startsWith('application/json')) {
        const data = await res.json();
        if (!this._validateNavTree(data)) {
          return { ok: false, err: 'data' };
        }
        return { ok: true, value: data };
      }
      return { ok: false, err: 'fetch' };
    } catch (err) {
      return { ok: false, err: 'fetch' };
    }
  }

  private _validateNavTree = (data: unknown): data is NavTree => {
    return Array.isArray(data) && data.every(this._validateNavItem);
  };

  private _validateNavItem = (item: unknown): item is NavItem => {
    if (item === null || typeof item !== 'object') {
      return false;
    }
    if (!('label' in item) || typeof item.label !== 'string') {
      return false;
    }
    if ('link' in item && typeof item.link !== 'boolean') {
      return false;
    }
    if ('expanded' in item && typeof item.expanded !== 'boolean') {
      return false;
    }
    if ('route' in item && typeof item.route !== 'string') {
      return false;
    }
    if ('children' in item) {
      if (!Array.isArray(item.children)) {
        return false;
      }
      if (!item.children.every(this._validateNavItem)) {
        return false;
      }
    }
    return true;
  };
}

function join(a: string, b: string): string {
  return a.endsWith('/') ? `${a}${b}` : `${a}/${b}`;
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-nav': GuiNav;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-nav': GreyCat.Element<GuiNav>;
      }
    }
  }
}
