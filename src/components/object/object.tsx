import { GCObject, core } from '@greycat/sdk';

export class GuiObject extends HTMLElement {
  set value(value: unknown) {
    const type = typeof value;
    switch (type) {
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
      case 'function':
        this.replaceChildren(<gui-value value={value} />);
        break;
      case 'symbol':
        this.replaceChildren(<gui-value value={`${value}`} />);
        break;
      case 'object': {
        if (value === null) {
          this.style.gridTemplateColumns = 'auto';
          this.replaceChildren(document.createTextNode('null'));
          return;
        }

        const fragment = document.createDocumentFragment();
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            fragment.appendChild(
              <>
                <div>{i}</div>
                <div>
                  <gui-object value={value[i]} />
                </div>
              </>,
            );
          }
        } else if (value instanceof Map) {
          for (const [key, val] of value) {
            fragment.appendChild(
              <>
                <div>{key}</div>
                <div>
                  <gui-object value={val} />
                </div>
              </>,
            );
          }
        } else if (isStd(value)) {
          this.style.gridTemplateColumns = 'auto';
          this.replaceChildren(<gui-value value={value} />);
          return;
        } else if (value instanceof GCObject && !value.$type.is_native) {
          if (value.$attrs === undefined) {
            this.replaceChildren(<em>empty object</em>);
          } else {
            for (let i = 0; i < value.$type.attrs.length; i++) {
              const attr = value.$type.attrs[i];
              const attrVal = value.$attrs[i];
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
                        <gui-object value={attrVal} />
                      </details>
                    ) : (
                      <gui-object value={attrVal} />
                    )}
                  </div>
                </>,
              );
            }
          }
        } else if (value instanceof core.Table) {
          this.style.gridTemplateColumns = 'auto';
          this.replaceChildren(<gui-table table={value} />);
          return;
        } else {
          for (const [key, val] of Object.entries({ ...value })) {
            fragment.appendChild(
              <>
                <div>{key}</div>
                <div className="gui-object-value">
                  {typeof val === 'object' && !isStd(val) && val !== null ? (
                    <details>
                      <summary>&lt;show&gt;</summary>
                      <gui-object value={val} />
                    </details>
                  ) : (
                    <gui-object value={val} />
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
