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

/**
 * A navigation tree that displays links.
 *
 * By default this component does not need any properties to be set for it to work. It just needs a `nav.json` file
 * to be present in the current route.
 *
 * Eg:
 * If we are currently at `/some/path`, this component will try to locate `nav.json` in this order:
 * - `/some/path/nav.json`
 * - `/some/nav.json`
 * - `nav.json`
 *
 * You can also bypass the dynamic resolution by directly providing the tree structure with the `value` property.
 */
export class GuiNav extends GuiElement {
  static override styles = [css(style)];
  private _root: string | undefined;
  private _value: NavTree | undefined;

  constructor() {
    super();

    this.shadowRoot.appendChild(<em>Loading nav.json...</em>);
  }

  get value() {
    return this._value;
  }

  /**
   * The navigation tree to display.
   *
   * If `undefined`, the component will try to find a `nav.json` to resolve
   * starting from `root` (defaults to `location.pathname`) and going upwards
   * until the root of the domain.
   *
   * This means `gui-nav` works without any properties set `<gui-nav></gui-nav>` if
   * a `nav.json` file is found somewhere in the current route.
   */
  set value(tree: NavTree | undefined) {
    this._value = tree;
    this.update();
  }

  /**
   * The root path of resolution of the tree links.
   *
   * Defaults to the pathname of the found `nav.json` if no `value` given
   */
  get root() {
    return this._root;
  }

  set root(root: string | undefined) {
    this._root = root;
    this.update();
  }

  async connectedCallback(): Promise<void> {
    if (this._value !== undefined) {
      this.update();
      return;
    }

    try {
      const [path, tree] = await this._loadConfig(this._root);
      this._root = path;
      this._value = tree;
      this.update();
    } catch (err) {
      this.shadowRoot.replaceChildren(<em>Missing nav.json...</em>);
      toast.error(err);
    }
  }

  async update(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    const root = this._root ?? location.pathname;

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
        {this._createNavChildren(this._value, root)}
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

  private async _loadConfig(
    root = location.pathname,
    filename = 'nav.json',
  ): Promise<[string, NavTree]> {
    let path = join(root, filename);

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
        /**
         * A navigation tree that displays links.
         *
         * By default this component does not need any properties to be set for it to work. It just needs a `nav.json` file
         * to be present in the current route.
         *
         * Eg:
         * If we are currently at `/some/path`, this component will try to locate `nav.json` in this order:
         * - `/some/path/nav.json`
         * - `/some/nav.json`
         * - `nav.json`
         *
         * You can also bypass the dynamic resolution by directly providing the tree structure with the `value` property.
         */
        'gui-nav': GreyCat.Element<GuiNav>;
      }
    }
  }
}
