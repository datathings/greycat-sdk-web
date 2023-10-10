import { GCObject, core } from '@greycat/sdk';
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

  set value(value: unknown) {
    this._value = value;
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
        if (this._value === null) {
          this.style.gridTemplateColumns = 'auto';
          this.replaceChildren(document.createTextNode('null'));
          return;
        }

        if (this._value === undefined) {
          this.style.gridTemplateColumns = 'auto';
          this.replaceChildren();
          return;
        }

        const fragment = document.createDocumentFragment();
        if (Array.isArray(this._value)) {
          for (let i = 0; i < this._value.length; i++) {
            fragment.appendChild(
              <>
                <div>{i}</div>
                <div>
                  <gui-object value={this._value[i]} {...this._props} />
                </div>
              </>,
            );
          }
        } else if (this._value instanceof Map) {
          for (const [key, val] of this._value) {
            fragment.appendChild(
              <>
                <div>{key}</div>
                <div>
                  <gui-object value={val} {...this._props} />
                </div>
              </>,
            );
          }
        } else if (isStd(this._value)) {
          this.style.gridTemplateColumns = 'auto';
          this.replaceChildren(<gui-value value={this._value} {...this._props} />);
          return;
        } else if (this._value instanceof GCObject && !this._value.$type.is_native) {
          if (this._value.$attrs === undefined) {
            this.replaceChildren(<em>empty object</em>);
          } else {
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
              fragment.appendChild(
                <>
                  <div>{attr.name}</div>
                  <div className="gui-object-value">
                    {typeof attrVal === 'object' && !isStd(attrVal) ? (
                      <details>
                        <summary>&lt;show&gt;</summary>
                        <gui-object value={attrVal} {...this._props} />
                      </details>
                    ) : (
                      <gui-object value={attrVal} {...this._props} />
                    )}
                  </div>
                </>,
              );
            }
          }
        } else if (this._value instanceof core.Table) {
          this.style.gridTemplateColumns = 'auto';
          this.replaceChildren(<gui-table table={this._value} />);
          return;
        } else {
          for (const [key, val] of Object.entries(this._value)) {
            fragment.appendChild(
              <>
                <div>{key}</div>
                <div className="gui-object-value">
                  {typeof val === 'object' && !isStd(val) && val !== null ? (
                    <details>
                      <summary>&lt;show&gt;</summary>
                      <gui-object value={val} {...this._props} />
                    </details>
                  ) : (
                    <gui-object value={val} {...this._props} />
                  )}
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
