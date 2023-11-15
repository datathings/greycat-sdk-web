import { GCEnum, GCObject, core } from '@greycat/sdk';
import { GuiValueProps } from '../index.js';

export type GuiObjectProps = Partial<GuiValueProps>;

export class GuiObject extends HTMLElement {
  private _value: unknown;
  private _props: Omit<GuiObjectProps, 'value'> | undefined;

  setAttrs({ value, ...props }: Partial<GuiValueProps>): void {
    this._props = props;
    this._value = value;
    this.update();
  }

  set props(props: GuiObjectProps) {
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
          this.replaceChildren(document.createTextNode('null'));
          return;
        }

        // undefined
        if (this._value === undefined) {
          this.style.gridTemplateColumns = 'auto';
          this.replaceChildren();
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
          const arr = this._value;
          if (arr.length === 0) {
            this.style.gridTemplateColumns = 'auto';
            this.replaceChildren(<em>empty array</em>);
            return;
          }

          if (arr.length > 15) {
            this.style.gridTemplateColumns = 'auto';
            this.replaceChildren(<em>Array({arr.length})</em>);
            return;
          }

          const fragment = document.createDocumentFragment();
          for (let i = 0; i < arr.length; i++) {
            fragment.appendChild(
              <>
                <div>
                  <em>{i}</em>
                </div>
                <div>
                  <gui-object value={arr[i]} {...{ ...this._props, data: i }} />
                </div>
              </>,
            );
          }
          this.replaceChildren(fragment);
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
                  <gui-object value={val} {...{ ...this._props, data: key }} />
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
              summary.textContent = '<show>';
              content.appendChild(summary);
              summary.onclick = () => {
                content.appendChild(
                  <gui-object value={attrVal} {...{ ...this._props, data: attr.name }} />,
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
                    <gui-object value={attrVal} {...{ ...this._props, data: attr.name }} />
                  </div>
                </>,
              );
            }
          }
          this.replaceChildren(fragment);
          return;
        }

        const fragment = document.createDocumentFragment();
        for (const [key, val] of Object.entries(this._value)) {
          let valEl: JSX.Element;
          if (typeof val === 'object' && val !== null && !(val instanceof GCEnum)) {
            valEl = (
              <details>
                <summary>&lt;show&gt;</summary>
                <gui-object value={val} {...{ ...this._props, data: key }} />
              </details>
            );
          } else {
            valEl = <gui-object value={val} {...{ ...this._props, data: key }} />;
          }

          fragment.appendChild(
            <>
              <div>{key}</div>
              <div className="gui-object-value">{valEl}</div>
            </>,
          );
        }
        this.replaceChildren(fragment);
        break;
      }
    }
  }

  private _shouldNest(val: unknown): boolean {
    return typeof val === 'object' && !isStd(val) && !(val instanceof GCEnum);
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
      'gui-object': Partial<Omit<GuiObject, 'children'>>;
    }
  }
}

if (!globalThis.customElements.get('gui-object')) {
  globalThis.customElements.define('gui-object', GuiObject);
}
