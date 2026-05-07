import { css, GuiElement, sl } from '../../exports.js';
import styles from './tensor.css?inline';

const COL = 'col';
const ROW = 'row';
const TID = 'table-id';

type Column = unknown[];
type Table = Column[];

export class GuiTensor extends GuiElement {
  static override styles = [css(styles)];

  private _tensor: gc.core.Tensor;
  private _descEl: HTMLElement;
  private _selectorsEl: HTMLElement;
  private _tablesEl: HTMLElement;

  constructor() {
    super();

    this._tensor = new gc.core.Tensor([], gc.core.TensorType.f32, []);
    this._descEl = document.createElement('div');
    this._descEl.className = 'desc';
    this._selectorsEl = document.createElement('div');
    this._selectorsEl.className = 'selectors';
    this._tablesEl = document.createElement('div');
    this._tablesEl.className = 'tables';

    this.shadowRoot.appendChild(
      <div className="base">
        {this._descEl}
        <sl-divider />
        {this._selectorsEl}
        <sl-divider />
        {this._tablesEl}
      </div>,
    );
  }

  connectedCallback(): void {
    this.update();
  }

  get value(): gc.core.Tensor {
    return this._tensor;
  }

  set value(tensor: gc.core.Tensor) {
    this._tensor = tensor;
    this.update();
  }

  update() {
    if (!this.isConnected) {
      return;
    }

    console.log('tensor', this._tensor);
    const nb_dims = this._tensor.shape.length;

    // update description
    {
      this._descEl.replaceChildren(
        <>
          <div className="item">
            <div className="label">Type:</div>
            <gui-value value={this._tensor.type.key} />
          </div>
          <div className="item">
            <div className="label">Shape:</div>
            <span>
              [
              {this._tensor.shape.map((v, i, items) => {
                if (i < items.length - 1) {
                  return `${v}, `;
                }
                return `${v}`;
              })}
              ]
            </span>
          </div>
          <div className="item">
            <div className="label">Size:</div>
            <div>{this.total_elements}</div>
          </div>
        </>,
      );
    }

    // update dimension selectors
    const dim_values: string[] = new Array(nb_dims);
    {
      const selectors: sl.SlSelect[] = new Array(nb_dims);

      const handle_dimension_change = (dim_index: number, new_value: string) => {
        const old_value = dim_values[dim_index];

        // Check if trying to set row, col, or table-id
        if (new_value === ROW || new_value === COL || new_value === TID) {
          // Check if another dimension already has this value
          for (let i = 0; i < dim_values.length; i++) {
            if (i !== dim_index && dim_values[i] === new_value) {
              // Swap: set the other dimension to the old value of current dimension
              dim_values[i] = old_value;
              selectors[i].value = old_value;
              break;
            }
          }
        }
        // Update state
        dim_values[dim_index] = new_value;
        // Update table display
        this._update_table(dim_values);
      };

      for (let i = 0; i < nb_dims; i++) {
        const selector = document.createElement('sl-select');
        selector.size = 'small';
        selector.className = 'selector';
        selector.label = `Dimension ${i}`;
        if (i === nb_dims - 1) {
          dim_values[i] = COL;
        } else if (i === nb_dims - 2) {
          dim_values[i] = ROW;
        } else if (i === nb_dims - 3) {
          dim_values[i] = TID;
        } else {
          dim_values[i] = `${i}`;
        }
        selector.value = dim_values[i];
        selector.appendChild(<sl-option value={COL}>col</sl-option>);
        selector.appendChild(<sl-option value={ROW}>row</sl-option>);
        selector.appendChild(<sl-option value={TID}>Table ID</sl-option>);
        for (let option = 0n; option < this._tensor.shape[i]; option++) {
          selector.appendChild(<sl-option value={`${option}`}>{option}</sl-option>);
        }
        selector.addEventListener('sl-change', () => {
          handle_dimension_change(i, selector.value as string);
        });
        selectors[i] = selector;
      }
      this._selectorsEl.replaceChildren(...selectors);
    }

    this._update_table(dim_values);
  }

  private _update_table(dim_values: string[]) {
    const tables = this._create_tables(dim_values);
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < tables.length; i++) {
      const table = document.createElement('gui-table');
      table.value = tables[i];
      fragment.appendChild(
        <div className="item">
          <div className="label">Table ID = {i}</div>
          {table}
        </div>,
      );
    }
    this._tablesEl.replaceChildren(fragment);
  }

  private _create_tables(dim_values: string[]): Table[] {
    // Get tensor shape
    const shape = this._tensor.shape;

    // Resolve dimension indices
    const row_dim = dim_values.indexOf(ROW);
    const col_dim = dim_values.indexOf(COL);
    const tid_dim = dim_values.indexOf(TID);

    // Helper to read a value
    const read_value = (indices: string[]): unknown => {
      return getTensorValue(this._tensor, indices);
    };

    // Helper to build a single table
    const build_table = (base_indices: string[]): Table => {
      // If both row and col are present → 2D
      if (row_dim !== -1 && col_dim !== -1) {
        const nb_rows = shape[row_dim];
        const nb_cols = shape[col_dim];

        // Allocate columns
        const cols: Table = Array.from({ length: Number(nb_cols) }, () => []);

        for (let col = 0; col < nb_cols; col++) {
          for (let row = 0; row < nb_rows; row++) {
            // Clone base indices
            const indices = [...base_indices];
            indices[row_dim] = `${row}`;
            indices[col_dim] = `${col}`;

            // Read value
            const value = read_value(indices);
            // Push into column
            cols[col].push(value);
          }
        }

        return cols;
      }

      // Only row dimension → single column
      if (row_dim !== -1) {
        const nb_rows = shape[row_dim];
        const col: Column = [];

        for (let row = 0; row < nb_rows; row++) {
          const indices = [...base_indices];
          indices[row_dim] = `${row}`;
          col.push(read_value(indices));
        }

        return [col];
      }

      // Only column dimension → single row spread across columns
      if (col_dim !== -1) {
        const nb_cols = shape[col_dim];
        const cols: Table = [];

        for (let col = 0; col < nb_cols; col++) {
          const indices = [...base_indices];
          indices[col_dim] = `${col}`;
          cols.push([read_value(indices)]);
        }

        return cols;
      }

      // Scalar → 1x1 table
      return [[read_value(base_indices)]];
    };

    // If tableId dimension exists → multiple tables
    if (tid_dim !== -1) {
      const nb_tables = shape[tid_dim];
      const tables: Table[] = [];

      for (let tid = 0; tid < nb_tables; tid++) {
        // Clone base indices
        const base_indices = [...dim_values];
        base_indices[tid_dim] = `${tid}`;
        tables.push(build_table(base_indices));
      }

      return tables;
    }

    return [build_table(dim_values)];
  }

  get total_elements(): bigint {
    if (this._tensor.shape.length === 0) {
      return 0n;
    }
    let total = 1n;
    for (const v of this._tensor.shape) {
      total *= v;
    }
    return total;
  }
}

function getTensorValue(tensor: gc.core.Tensor, indices: string[]) {
  // Convert multi-dimensional indices to 1D array index
  const numericIndices = indices.map((idx) => {
    return idx === 'row' || idx === 'col' || idx === 'tableId' ? 0 : parseInt(idx);
  });

  const flatIndex = getIndexFromCoordinates(tensor, numericIndices);
  const value = tensor.data[flatIndex];
  if (value instanceof Uint8Array) {
    return gc.sdk.toHex(value.buffer);
  }
  return value;
}

function getIndexFromCoordinates(tensor: gc.core.Tensor, coordinates: number[]) {
  // Convert multi-dimensional coordinates to 1D index (row-major order)
  let index = 0;
  let multiplier = 1;

  // Calculate from right to left
  for (let i = tensor.shape.length - 1; i >= 0; i--) {
    index += coordinates[i] * multiplier;
    multiplier *= Number(tensor.shape[i]);
  }

  return index;
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiTensor} */
    'gui-tensor': GuiTensor;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiTensor} */
        'gui-tensor': GreyCat.Element<GuiTensor>;
      }
    }
  }
}
