import { core, GuiClickEvent, humanSize, io } from '../../exports.js';
import '../table/table.js';
import type { GuiTable } from '../table/table.js';
import type { GuiValue } from '../value/value.js';

export class GuiFiles extends HTMLElement {
  private _current_dir: string;
  private _table: GuiTable;

  constructor() {
    super();

    this._current_dir = '/';

    this._table = (
      <gui-table
        headers={['Path', 'Size', 'Last Modification']}
        columnsWidths={[]}
        onrowupdate={(el, row) => {
          if (typeof row[1].value === 'number') {
            const size = row[1].value;
            (el.children[1].children[0] as GuiValue).value = humanSize(size);
          } else {
            (el.children[1].children[0] as GuiValue).textContent = '';
          }
        }}
        ontable-click={async (ev) => {
          const path = ev.detail.row[0].value as string;
          if (path !== '..' && !path.endsWith('/')) {
            // clicked on an actual file
            this.dispatchEvent(
              new GuiClickEvent(
                io.File.create(
                  path,
                  ev.detail.row[1].value as number | bigint | null,
                  ev.detail.row[2].value as core.time | null,
                ),
              ),
            );
            return;
          }
          const changed = this.change_dir(path);
          if (changed) {
            this.reload();
          }
        }}
        globalFilter
      />
    ) as GuiTable;
  }

  connectedCallback() {
    this.replaceChildren(this._table);
    this.reload();
  }

  get path() {
    return this._current_dir;
  }

  set path(path: string) {
    this.change_dir(path);
    this.reload();
  }

  change_dir(path: string): boolean {
    if (path === this._current_dir) {
      return false;
    }

    if (path === '..') {
      if (this._current_dir === '/') {
        // noop: already at root
        return false;
      } else {
        const parts = this._current_dir.split('/');
        console.log('parts', ...parts);
        parts.pop();
        parts.pop();
        this._current_dir = parts.join('/');
        if (this._current_dir.length === 0) {
          this._current_dir = '/';
        } else if (!this._current_dir.endsWith('/')) {
          this._current_dir += '/';
        }
        return true;
      }
    } else if (path.endsWith('/')) {
      this._current_dir = `/${path}`;
      return true;
    } else {
      // noop: file
      return false;
    }
  }

  async reload() {
    if (!this.isConnected) {
      return;
    }

    const files = (await io.File.create(this._current_dir).list()) ?? [];
    if (this._current_dir !== '/') {
      files.unshift(io.File.create('..'));
    }
    // update table
    this._table.value = files;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-files': GuiFiles;
  }

  interface GuiFilesEventMap {
    'gui-click': GuiClickEvent<io.File>;
  }

  interface HTMLElementEventMap extends GuiFilesEventMap {}

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-files': GreyCat.Element<GuiFiles, GuiFilesEventMap>;
      }
    }
  }
}

if (!customElements.get('gui-files')) {
  customElements.define('gui-files', GuiFiles);
}
