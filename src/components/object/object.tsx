import type { SlDetails } from '@shoelace-style/shoelace';
import { GCEnum, GCObject, std } from '../../exports.js';
import type { GuiValueProps } from '../../exports.js';
import { createElement } from '@greycat/web/jsx-runtime';

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
  /** Whether or not to display the nested field expanded or not. Defaults to `false`. */
  expanded: boolean;
  /** Whether or not to automatically resolve nodes. Defaults to `false`. */
  resolve: boolean;
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
    this.components.set(std.core.Table._type, 'gui-table');
    // this.components.set(util.BoxPlotFloat._type, 'gui-boxplot');
    // this.components.set(util.BoxPlotInt._type, 'gui-boxplot');
    // // primitives
    // this.components.set(std.core.geo._type, 'gui-value');
    // this.components.set(std.core.time._type, 'gui-value');
    // this.components.set(std.core.duration._type, 'gui-value');
    // this.components.set(std.core.Date._type, 'gui-value');
    // // nodes
    // this.components.set(std.core.node._type, 'gui-value');
    // this.components.set(std.core.nodeTime._type, 'gui-value');
    // this.components.set(std.core.nodeList._type, 'gui-value');
    // this.components.set(std.core.nodeGeo._type, 'gui-value');
    // this.components.set(std.core.nodeIndex._type, 'gui-value');
    // special
    this.components.set(std.runtime.Task._type, 'gui-task-info');
    this.components.set(std.runtime.TaskInfo._type, 'gui-task-info');

    this.fallback = 'gui-object';
  }
  private _value: unknown;
  private _withHeader = false;
  private _expanded = false;
  private _nested = false;
  private _resolve = false;
  private _props: ObjectProps = {};

  connectedCallback() {
    this.classList.add('gui-object');
    setTimeout(() => this.update(), 0);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  setAttrs({
    value = this._value,
    withHeader = this._withHeader,
    nested = this._nested,
    expanded = this._expanded,
    resolve = this._resolve,
    ...props
  }: Partial<GuiObjectProps>): void {
    for (const key in props) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this._props as any)[key] = (props as any)[key];
    }
    this._value = value;
    this._withHeader = withHeader;
    this._nested = nested;
    this._expanded = expanded;
    this._resolve = resolve;
    this.update();
  }

  getAttrs(): Partial<GuiObjectProps> {
    return {
      value: this._value,
      withHeader: this._withHeader,
      nested: this._nested,
      expanded: this._expanded,
      resolve: this._resolve,
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

  get expanded() {
    return this._expanded;
  }

  set expanded(expanded: boolean) {
    this._expanded = expanded;
    this.update();
  }

  get resolve() {
    return this._resolve;
  }

  set resolve(resolve: boolean) {
    this._resolve = resolve;
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

        // Array
        if (Array.isArray(this._value)) {
          const tableEl = document.createElement(
            GuiObject.components.get(std.core.Table._type) ?? 'gui-table',
          ) as GuiObject;
          tableEl.style.minHeight = 'var(--gui-object-table-min-height)';
          tableEl.columnFactories = { 0: 'gui-object' };
          tableEl.value = this._value;
          tableEl.columnsWidths = [135];
          tableEl.cellProps = (_: unknown, value: unknown) => ({ value, ...this._props });
          this.replaceChildren(tableEl);
          return;
        }

        // Map
        if (this._value instanceof Map) {
          const tableEl = document.createElement(
            GuiObject.components.get(std.core.Table._type) ?? 'gui-table',
          ) as GuiObject;
          tableEl.columnFactories = { 1: GuiObject.fallback };
          tableEl.style.minHeight = 'var(--gui-object-table-min-height)';
          tableEl.value = this._value;
          tableEl.style.minHeight = 'var(--gui-object-table-min-height)';
          tableEl.columnsWidths = [135];
          tableEl.cellProps = (_: unknown, value: unknown) => ({ value, ...this._props });
          this.replaceChildren(tableEl);
          return;
        }

        // if (this._value instanceof std.core.node && this._resolve) {
        //   this._value.resolve().then((resolved) => {
        //     this.value = resolved;
        //   });
        //   this.replaceChildren(<em>Resolving...</em>);
        //   return;
        // }

        // std.core.nodeXXX, std.core.geo, std.core.Duration, std.core.time, etc
        if (isStd(this._value)) {
          this.replaceChildren(<gui-value value={this._value} {...this._props} />);
          return;
        }

        // std.core.Table special handling
        if (this._value instanceof std.core.Table) {
          const tableEl = document.createElement(
            GuiObject.components.get(std.core.Table._type) ?? 'gui-table',
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
              details.updateComplete.then(() => {
                details.open = this._expanded;
              });
              const onshow = () => {
                const child = createElement(GuiObject.fallback, {
                  ...this.getAttrs(),
                  withHeader: false, // past level 0 this is no longer needed
                  value: attrVal,
                  data: attr.name,
                  ...this._props,
                });
                details.appendChild(child);
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
            } else if (attrVal instanceof std.core.node && this._resolve) {
              const details = document.createElement('sl-details');
              details.summary = `${attrVal}`;
              details.updateComplete.then(() => {
                details.open = this._expanded;
              });
              const onshow = () => {
                const child = createElement(GuiObject.fallback, {
                  ...this.getAttrs(),
                  withHeader: false, // past level 0 this is no longer needed
                  value: attrVal,
                  data: attr.name,
                  ...this._props,
                }) as GuiObject;
                attrVal.resolve().then((resolved) => {
                  if (resolved instanceof GCObject) {
                    details.summary = this._typeName(resolved) ?? details.summary;
                  }
                  child.value = resolved;
                });
                details.appendChild(child);
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
                    {createElement(GuiObject.fallback, {
                      ...this.getAttrs(),
                      nested: true,
                      value: attrVal,
                      ...this._props,
                      data: attr.name,
                    })}
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
            <sl-card className="gui-object-card">
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
            const details = (
              <sl-details summary={this._typeName(val)}>
                {createElement(GuiObject.fallback, {
                  ...this.getAttrs(),
                  value: val,
                  ...this._props,
                  data: key,
                })}
              </sl-details>
            ) as SlDetails;
            details.updateComplete.then(() => {
              details.open = this._expanded;
            });
            fragment.appendChild(
              <>
                <div>{key}</div>
                <div className="gui-object-value">{details}</div>
              </>,
            );
          } else {
            fragment.appendChild(
              <>
                <div>{key}</div>
                <div className="gui-object-value">
                  {createElement(GuiObject.fallback, {
                    ...this.getAttrs(),
                    value: val,
                    ...this._props,
                    data: key,
                  })}
                </div>
              </>,
            );
          }
        }

        if (this._withHeader) {
          this.replaceChildren(
            <sl-card className="gui-object-card">
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
    value instanceof std.core.node ||
    value instanceof std.core.nodeTime ||
    value instanceof std.core.nodeList ||
    value instanceof std.core.nodeIndex ||
    value instanceof std.core.nodeGeo ||
    value instanceof std.core.geo ||
    value instanceof std.core.Date ||
    value instanceof std.core.duration ||
    value instanceof std.core.time
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
      'gui-object': GreyCat.Element<
        GuiObject & {
          // gui-object accept any properties that the underlying component
          // would accept, therefore we have to loosen its type
          [key: string]: unknown;
        }
      >;
    }
  }
}

if (!globalThis.customElements.get('gui-object')) {
  globalThis.customElements.define('gui-object', GuiObject);
}
