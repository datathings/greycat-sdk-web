import { GCEnum, GCObject, PrimitiveType, core, runtime, std_n } from '@greycat/sdk';
import type { GuiValueProps } from '../index.js';

/**
 * A subset of `GuiValueProps` used to type `GuiObject.props` field
 */
export type ObjectProps = Partial<Omit<GuiValueProps, 'value'>>;
export type GuiObjectProps = {
  value: unknown;
  /**
   * Whether or not to display a header with the type name for struct objects.
   *
   * *This property has no effect if the value is a scalar value.*
   */
  withHeader: boolean;
  /** Indicates whether or not this gui-object is within another gui-object */
  nested: boolean;
} & ObjectProps;

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface GuiObject {
  [key: string]: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class GuiObject extends HTMLElement {
  /**
   * A mapping of GreyCat type fqn to the WebComponent tag name used for its rendering.
   *
   * If nothing matches, the tag name set as `GuiObject.fallback` will be used.
   */
  static readonly components: Map<string, keyof HTMLElementTagNameMap> = new Map();
  /**
   * The fallback WebComponent tag name used when no component match a type.
   *
   * By default this falls back to `'gui-object'`.
   */
  static fallback: keyof HTMLElementTagNameMap;
  static {
    // natives
    this.components.set(core.Table._type, 'gui-table');
    // this.components.set(util.BoxPlotFloat._type, 'gui-boxplot');
    // this.components.set(util.BoxPlotInt._type, 'gui-boxplot');
    // // primitives
    // this.components.set(core.geo._type, 'gui-value');
    // this.components.set(core.time._type, 'gui-value');
    // this.components.set(core.duration._type, 'gui-value');
    // this.components.set(core.Date._type, 'gui-value');
    // // nodes
    // this.components.set(core.node._type, 'gui-value');
    // this.components.set(core.nodeTime._type, 'gui-value');
    // this.components.set(core.nodeList._type, 'gui-value');
    // this.components.set(core.nodeGeo._type, 'gui-value');
    // this.components.set(core.nodeIndex._type, 'gui-value');
    // special
    this.components.set(runtime.Task._type, 'gui-task-info');
    this.components.set(runtime.TaskInfo._type, 'gui-task-info');

    this.fallback = 'gui-object';
  }
  private _value: unknown;
  private _withHeader = false;
  private _nested = false;
  private _props: ObjectProps = {};

  connectedCallback() {
    this.className = 'gui-object';
    this.update();
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  setAttrs({
    value = this._value,
    withHeader = this._withHeader,
    nested = this._nested,
    ...props
  }: Partial<GuiObjectProps>): void {
    for (const key in props) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this._props as any)[key] = (props as any)[key];
    }
    this._value = value;
    this._withHeader = withHeader;
    this._nested = nested;
    this.update();
  }

  getAttrs() {
    return {
      value: this._value,
      withHeader: this._withHeader,
      nested: this._nested,
      ...this._props,
    };
  }

  set props(props: ObjectProps) {
    this._props = props;
    this.update();
  }

  get value() {
    return this._value;
  }

  set value(value: unknown) {
    this._value = value;
    this.update();
  }

  /**
   * Whether or not to display a header with the type name for struct objects.
   *
   * *This property has no effect if the value is a scalar value.*
   */
  get withHeader() {
    return this._withHeader;
  }

  set withHeader(withHeader: boolean) {
    this._withHeader = withHeader;
    this.update();
  }

  /**
   * Indicates whether or not this gui-object is within another gui-object
   */
  get nested() {
    return this._nested;
  }

  set nested(nested: boolean) {
    this._nested = nested;
    this.update();
  }

  update() {
    const type = typeof this._value;
    switch (type) {
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
      case 'function':
        this.replaceChildren(<gui-value value={this._value} {...this._props} />);
        break;
      case 'symbol':
        this.replaceChildren(<gui-value value={`${this._value}`} {...this._props} />);
        break;
      case 'object': {
        // null
        if (this._value === null) {
          this.replaceChildren(<code>null</code>);
          return;
        }

        // undefined
        if (this._value === undefined) {
          this.replaceChildren();
          return;
        }

        if (this._value instanceof HTMLElement) {
          this.replaceChildren(this._value);
          return;
        }

        if (this._value instanceof GCObject) {
          const customElement = GuiObject.components.get(this._value.$type.name);
          if (customElement) {
            const element = document.createElement(customElement) as GuiObject;
            element.value = this._value;
            Object.assign(element, this._props);
            this.replaceChildren(element);
            return;
          }
        }

        // Enum
        if (this._value instanceof GCEnum) {
          let text: string;
          if (this._value.$type.name.startsWith('core::')) {
            text = `${this._value.$type.name.slice(6)}::${this._value.key}`;
          } else {
            text = `${this._value.$type.name}::${this._value.key}`;
          }
          this.replaceChildren(document.createTextNode(text));
          return;
        }

        // Array
        if (Array.isArray(this._value)) {
          const indexes: number[] = [];
          const values: unknown[] = [];
          for (let i = 0; i < this._value.length; i++) {
            indexes.push(i);
            values.push(this._value[i]);
          }
          const tableEl = document.createElement(
            GuiObject.components.get(core.Table._type) ?? 'gui-table',
          ) as GuiObject;
          tableEl.style.minHeight = 'var(--gui-object-table-min-height)';
          tableEl.cellTagNames = { 1: 'gui-object' };
          tableEl.value = {
            cols: [indexes, values],
            meta: [
              new std_n.core.NativeTableColumnMeta(
                PrimitiveType.int,
                greycat.default.abi.type_by_fqn.get(core.int._type)?.mapped_type_off ?? 0,
                core.int._type,
                true,
                'Index',
              ),
              new std_n.core.NativeTableColumnMeta(
                PrimitiveType.undefined,
                0,
                undefined,
                false,
                'Value',
              ),
            ],
          } as core.Table;
          tableEl.columnsWidths = [135];
          tableEl.cellProps = (_: unknown, value: unknown) => ({ value, ...this._props });
          this.replaceChildren(tableEl);
          return;
        }

        // Map
        if (this._value instanceof Map) {
          const keys: number[] = [];
          const values: unknown[] = [];
          this._value.forEach((value, key) => {
            keys.push(key);
            values.push(value);
          });

          const tableEl = document.createElement(
            GuiObject.components.get(core.Table._type) ?? 'gui-table',
          ) as GuiObject;
          tableEl.cellTagNames = { 1: 'gui-object' };
          tableEl.style.minHeight = 'var(--gui-object-table-min-height)';
          tableEl.value = {
            cols: [keys, values],
            meta: [{ header: 'Key' }, { header: 'Value' }],
          };
          tableEl.style.minHeight = 'var(--gui-object-table-min-height)';
          tableEl.columnsWidths = [135];
          tableEl.cellProps = (_: unknown, value: unknown) => ({ value, ...this._props });
          this.replaceChildren(tableEl);
          return;
        }

        // core.nodeXXX, core.geo, core.Duration, core.time, etc
        if (isStd(this._value)) {
          this.replaceChildren(<gui-value value={this._value} {...this._props} />);
          return;
        }

        // core.Table special handling
        if (this._value instanceof core.Table) {
          const tableEl = document.createElement(
            GuiObject.components.get(core.Table._type) ?? 'gui-table',
          ) as GuiObject;
          tableEl.style.minHeight = 'var(--gui-object-table-min-height)';
          tableEl.value = this._value;
          tableEl.cellProps = (_: unknown, value: unknown) => ({ value, ...this._props });
          this.replaceChildren(tableEl);
          return;
        }

        // any non-native GreyCat object
        if (this._value instanceof GCObject && !this._value.$type.is_native) {
          if (this._value.$attrs === undefined || this._value.$attrs.length === 0) {
            this.replaceChildren(<em>empty object</em>);
            return;
          }

          const fragment = document.createDocumentFragment();

          for (let i = 0; i < this._value.$type.attrs.length; i++) {
            const attr = this._value.$type.attrs[i];
            const attrVal = this._value.$attrs[i];
            if (attrVal === null) {
              fragment.appendChild(
                <>
                  <div>{attr.name}</div>
                  <div className="gui-object-value">null</div>
                </>,
              );
              continue;
            }

            // nested object
            if (this._shouldNest(attrVal)) {
              const details = document.createElement('sl-details');
              details.summary = this._typeName(attrVal) ?? '';
              const onshow = () => {
                details.appendChild(
                  <gui-object
                    value={attrVal}
                    {...Object.assign({}, this._props, { data: attr.name })}
                  />,
                );
                // remove it once loaded
                details.removeEventListener('sl-show', onshow);
              };
              details.addEventListener('sl-show', onshow);

              fragment.appendChild(
                <>
                  <div>{attr.name}</div>
                  <div className="gui-object-value">{details}</div>
                </>,
              );
            } else {
              fragment.appendChild(
                <>
                  <div>{attr.name}</div>
                  <div className="gui-object-value">
                    <gui-object
                      nested
                      value={attrVal}
                      {...Object.assign({}, this._props, { data: attr.name })}
                    />
                  </div>
                </>,
              );
            }
          }

          if (this._nested) {
            this.classList.add('gui-object-grid');
            this.replaceChildren(fragment);
            return;
          }

          // Important note:
          // ---------------
          // if the structure changes here, remember to update the selector in components/table/table.css too:
          //  eg. gui-table gui-tbody gui-tbody-row gui-tbody-cell :has(gui-object.gui-object > article > .gui-object.gui-object-grid)
          //
          // the above selectors rely on the below structure to work properly
          this.replaceChildren(
            <sl-card>
              {this._withHeader ? (
                <header slot="header">{this._typeName(this._value)}</header>
              ) : undefined}
              <div className={['gui-object', 'gui-object-grid']}>{fragment}</div>
            </sl-card>,
          );
          return;
        }

        const fragment = document.createDocumentFragment();
        const entries = Object.entries(this._value);
        for (let i = 0; i < entries.length; i++) {
          const [key, val] = entries[i];
          if (this._shouldNest(val)) {
            fragment.appendChild(
              <>
                <div>{key}</div>
                <div className="gui-object-value">
                  <sl-details summary={this._typeName(val)}>
                    <gui-object value={val} {...Object.assign({}, this._props, { data: key })} />
                  </sl-details>
                </div>
              </>,
            );
          } else {
            fragment.appendChild(
              <>
                <div>{key}</div>
                <div className="gui-object-value">
                  <gui-object value={val} {...Object.assign({}, this._props, { data: key })} />
                </div>
              </>,
            );
          }
        }

        if (this._withHeader) {
          this.replaceChildren(
            <sl-card>
              <header slot="header">{this._typeName(this._value)}</header>
              <div className={['gui-object', 'gui-object-grid']}>{fragment}</div>
            </sl-card>,
          );
          return;
        }

        this.classList.add('gui-object-grid');
        this.replaceChildren(fragment);
        return;
      }
    }
  }

  private _shouldNest(val: unknown): boolean {
    return (
      val !== undefined &&
      val !== null &&
      typeof val === 'object' &&
      !isStd(val) &&
      !(val instanceof GCEnum) &&
      !(val instanceof Node)
    );
  }

  private _typeName(val: unknown): string | undefined {
    if (val instanceof GCObject) {
      if (val.$type.name.startsWith('::')) {
        return '<anonymous>';
      }
      return val.$type.name;
    }
    if (typeof val === 'object') {
      if (val !== null) {
        return val.constructor.name;
      }
    }
    return undefined;
  }
}

function isStd(value: unknown): boolean {
  return (
    value instanceof core.node ||
    value instanceof core.nodeTime ||
    value instanceof core.nodeList ||
    value instanceof core.nodeIndex ||
    value instanceof core.nodeGeo ||
    value instanceof core.geo ||
    value instanceof core.Date ||
    value instanceof core.duration ||
    value instanceof core.time
  );
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-object': GuiObject;
  }

  namespace JSX {
    interface IntrinsicElements {
      /**
       * Please, don't use this in a React context. Use `WCWrapper`.
       */
      'gui-object': GreyCat.Element<GuiObject & { [key: string]: unknown }>;
    }
  }
}

if (!globalThis.customElements.get('gui-object')) {
  globalThis.customElements.define('gui-object', GuiObject);
}
