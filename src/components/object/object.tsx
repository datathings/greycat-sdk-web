import { GCEnum, GCObject, core } from '@greycat/sdk';
import { GuiValueProps } from '../index.js';

/**
 * A subset of `GuiValueProps` used to type `GuiObject.props` field
 */
export type ObjectProps = Partial<Omit<GuiValueProps, 'value'>>;
export type GuiObjectProps = { value: unknown; nested: boolean } & ObjectProps;

export class GuiObject extends HTMLElement {
  private _value: unknown;
  private _nested = false;
  private _props: ObjectProps = {};

  connectedCallback() {
    this.className = 'gui-object';
  }

  setAttrs({
    value = this._value,
    nested = this._nested,
    ...props
  }: Partial<GuiObjectProps>): void {
    for (const key in props) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this._props as any)[key] = (props as any)[key];
    }
    this._value = value;
    this._nested = nested;
    this.update();
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

  get nested() {
    return this._nested;
  }

  set nested(nested: boolean) {
    this._nested = nested;
  }

  update() {
    this.style.gridTemplateColumns = '';
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
          this.style.gridTemplateColumns = 'auto';
          this.replaceChildren(<code>null</code>);
          return;
        }

        // undefined
        if (this._value === undefined) {
          this.style.gridTemplateColumns = 'auto';
          this.replaceChildren();
          return;
        }

        if (this._value instanceof HTMLElement) {
          this.style.gridTemplateColumns = 'auto';
          this.replaceChildren(this._value);
          return;
        }

        // Enum
        if (this._value instanceof GCEnum) {
          this.style.gridTemplateColumns = 'auto';
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
          this.style.gridTemplateColumns = 'auto';
          const indexes: number[] = [];
          const values: unknown[] = [];
          for (let i = 0; i < this._value.length; i++) {
            indexes.push(i);
            values.push(this._value[i]);
          }
          this.replaceChildren(
            <gui-table
              table={{ cols: [indexes, values], meta: [{ header: 'Index' }, { header: 'Value' }] }}
              columnsWidths={[135]}
            />,
          );
          return;
        }

        // Map
        if (this._value instanceof Map) {
          const fragment = document.createDocumentFragment();
          for (const [key, val] of this._value) {
            fragment.appendChild(
              <>
                <div>{key}</div>
                <div>
                  <gui-object value={val} {...Object.assign({}, this._props, { data: key })} />
                </div>
              </>,
            );
          }
          this.replaceChildren(fragment);
          return;
        }

        // core.nodeXXX, core.geo, core.Duration, core.time, etc
        if (isStd(this._value)) {
          this.style.gridTemplateColumns = 'auto';
          this.replaceChildren(<gui-value value={this._value} {...this._props} />);
          return;
        }

        // core.Table special handling
        if (this._value instanceof core.Table) {
          this.style.gridTemplateColumns = 'auto';
          this.replaceChildren(<gui-table table={this._value} />);
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
              const content = document.createElement('details');
              const summary = document.createElement('summary');
              summary.textContent = this._typeName(attrVal);
              content.appendChild(summary);
              summary.onclick = () => {
                content.appendChild(
                  <gui-object
                    nested
                    value={attrVal}
                    {...Object.assign({}, this._props, { data: attr.name })}
                  />,
                );
                summary.onclick = null;
              };

              fragment.appendChild(
                <>
                  <div>{attr.name}</div>
                  <div className="gui-object-value">{content}</div>
                </>,
              );
            } else {
              fragment.appendChild(
                <>
                  <div>{attr.name}</div>
                  <div className="gui-object-value">
                    <gui-object
                      value={attrVal}
                      {...Object.assign({}, this._props, { data: attr.name })}
                    />
                  </div>
                </>,
              );
            }
          }

          if (this._nested) {
            this.replaceChildren(fragment);
            return;
          }

          this.style.gridTemplateColumns = 'auto';
          this.replaceChildren(
            <article>
              <header>{this._typeName(this._value)}</header>
              <div className="gui-object">{fragment}</div>
            </article>,
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
                  <details>
                    <summary>{val.$type.name}</summary>
                    <gui-object value={val} {...Object.assign({}, this._props, { data: key })} />
                  </details>
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
        this.replaceChildren(fragment);
        break;
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

  private _typeName(val: unknown): string | null {
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
    return null;
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
      'gui-object': GreyCat.Element<GuiObject>;
    }
  }
}

if (!globalThis.customElements.get('gui-object')) {
  globalThis.customElements.define('gui-object', GuiObject);
}
