import { CellData, css, GuiClickEvent, GuiElement, type GuiTable } from '../../exports.js';
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

    this._table = document.createElement('gui-table');
    this._table.setAttrs({
      globalFilter: true,
      sortBy: [0, 'asc'],
      columns: [
        {
          index: 0,
          header: 'Filepath',
          cell: ({ value }: CellData<string | undefined>) => {
            if (value === undefined) {
              return document.createTextNode('');
            }
            if (value.endsWith('/')) {
              return <>📁 {this._filename(value)}</>;
            }
            if (value === '..') {
              return <>↩️ ..</>;
            }
            return (
              <>
                📄 <a href={`${gc.$.default.api}/files/${value}`}>{this._filename(value)}</a>
              </>
            );
          },
        },
        {
          index: 1,
          header: 'Size',
          cell: ({ value }: CellData<number | bigint | null>) => {
            if (typeof value === 'number' || typeof value === 'bigint') {
              return document.createTextNode(gc.sdk.humanSize(Number(value)));
            }
            return document.createTextNode('');
          },
        },
        {
          index: 2,
          header: 'Last Modification',
          cell: ({ value }: CellData<gc.core.time | null>) => {
            if (value instanceof gc.core.time) {
              return <gui-value value={value} />;
            }
            return document.createTextNode('');
          },
        },
      ],
    });
    this._table.addEventListener('gui-table-click', async (ev) => {
      ev.stopPropagation();
      const path = this._table.table.cols[0][ev.detail.rowIdx] as string;
      this.dispatchEvent(
        new GuiClickEvent(
          new gc.io.File(
            path,
            this._table.table.cols[1][ev.detail.rowIdx] as number | bigint | null,
            this._table.table.cols[2][ev.detail.rowIdx] as gc.core.time | null,
          ),
        ),
      );
      if (path !== '..' && !path.endsWith('/')) {
        return;
      }
      this.change_dir(path);
    });

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

  change_dir(path: string): Promise<void> {
    if (path === this._current_dir) {
      return Promise.resolve();
    }

    if (path === '..') {
      if (this._current_dir === '/') {
        // noop: already at root
        return Promise.resolve();
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
        return this.update();
      }
    } else if (path === '/') {
      this._current_dir = path;
      return this.update();
    } else if (path.endsWith('/')) {
      this._current_dir = `/${path}`;
      return this.update();
    } else {
      // noop: file
      return Promise.resolve();
    }
  }

  async update() {
    if (!this.isConnected) {
      return;
    }

    const files = (await new gc.io.File(this._current_dir).list()) ?? [];
    if (this._current_dir !== '/') {
      files.unshift(new gc.io.File('..', null, null));
    }
    this._table.value = files;
  }

  private _filename(filepath: string): string {
    if (filepath.endsWith('/')) {
      filepath = filepath.slice(0, -1);
    }
    const lastSlash = filepath.lastIndexOf('/');
    if (lastSlash === -1) {
      return filepath;
    }
    return filepath.slice(lastSlash + 1);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiFiles} */
    'gui-files': GuiFiles;
  }

  interface GuiFilesEventMap {
    'gui-click': GuiClickEvent<gc.io.File>;
  }

  interface HTMLElementEventMap extends GuiFilesEventMap {}

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiFiles} */
        'gui-files': GreyCat.Element<GuiFiles, GuiFilesEventMap>;
      }
    }
  }
}
