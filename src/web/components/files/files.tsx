import { css, GuiClickEvent, GuiElement, type GuiTable } from '../../exports.js';
import '../table/index.js';
import '../value/index.js';
import style from './files.css?inline';

export class GuiFiles extends GuiElement {
  static override styles = [css(style)];

  private _current_dir: string;
  private _table: GuiTable;

  constructor() {
    super();

    this._current_dir = '/';

    this._table = (
      <gui-table
        columnsWidths={[]}
        columnFactory={{
          0: (value) => {
            if (typeof value === 'string') {
              if (value.endsWith('/')) {
                return <>📁 {value}</>;
              }
              if (value === '..') {
                return <>↩️ ..</>;
              }
              return <>📄 {value}</>;
            }
            return document.createTextNode('');
          },
          1: (value) => {
            if (typeof value === 'number' || typeof value === 'bigint') {
              return document.createTextNode(gc.sdk.humanSize(Number(value)));
            }
            return document.createTextNode('');
          },
          2: (value) => {
            if (value instanceof gc.core.time) {
              return <gui-value value={value} />;
            }
            return document.createTextNode('');
          },
        }}
        ongui-click={async (ev) => {
          ev.stopPropagation();
          const path = this._table.table.cols[0][ev.detail.rowIdx] as string;
          if (path !== '..' && !path.endsWith('/')) {
            // clicked on an actual file
            this.dispatchEvent(
              new GuiClickEvent(
                new gc.io.File(
                  path,
                  this._table.table.cols[1][ev.detail.rowIdx] as number | bigint | null,
                  this._table.table.cols[2][ev.detail.rowIdx] as gc.core.time | null,
                ),
              ),
            );
            return;
          }
          const changed = this.change_dir(path);
          if (changed) {
            this.update();
          }
        }}
        globalFilter
      />
    ) as GuiTable;

    this.shadowRoot.appendChild(this._table);
  }

  connectedCallback() {
    this.update();
  }

  get path() {
    return this._current_dir;
  }

  set path(path: string) {
    this.change_dir(path);
    this.update();
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

  async update() {
    if (!this.isConnected) {
      return;
    }

    const files = (await new gc.io.File(this._current_dir).list()) ?? [];
    if (this._current_dir !== '/') {
      files.unshift(new gc.io.File('..'));
    }
    // update table
    const table = gc.core.Table.fromObjects(files);
    table.headers = ['Filepath', 'Size', 'Last Modification'];
    this._table.value = table;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-files': GuiFiles;
  }

  interface GuiFilesEventMap {
    'gui-click': GuiClickEvent<gc.io.File>;
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
