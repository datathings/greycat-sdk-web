import { createElement } from '@greycat/web/jsx-runtime';
import {
  GuiElement,
  registerCustomElement,
  css,
  GuiFactory,
  sl,
} from '../../exports.js';
import style from './object2.css?inline';

export interface GuiObject2Attrs {
  value: unknown;
  [key: string]: unknown;
}

export class GuiObject2 extends GuiElement {
  static override styles = [css(style)];

  private _attrs: GuiObject2Attrs = { value: undefined };
  private _factory = GuiFactory.global;

  connectedCallback() {
    this._factory = GuiFactory.closest(this);
    this.update();
  }

  setAttrs(attrs: GuiObject2Attrs) {
    this._attrs = attrs;
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }

    const factory = this._factory;
    const value = this._attrs.value;
    if (value instanceof greycat.GCObject) {
      const tagName = factory.mappings[value.$type.name];
      if (tagName) {
        this.shadowRoot.replaceChildren(createElement(tagName, this._attrs) as Node);
        return;
      }

      if (value instanceof greycat.GCEnum) {
        this._renderEnum(value);
        return;
      }
      this._renderObject(value);
      return;
    }
    if (Array.isArray(value)) {
      // TODO array
      return;
    }
    if (value instanceof Map) {
      // TODO map
      return;
    }
    this.shadowRoot.replaceChildren(createElement('gui-value', this._attrs));
  }

  private _renderObject(value: greycat.GCObject): void {
    const abi = value.$type.abi;
    const fields = document.createDocumentFragment();
    for (const attr of value.$type.attrs) {
      const node = this._createObjField(
        value.$type,
        attr.name,
        abi.types[attr.abi_type],
        value[attr.name],
      );
      fields.appendChild(node);
    }
    this.shadowRoot.replaceChildren(
      <sl-card>
        <header slot="header">{value.$type.name}</header>
        <div className="fields">{fields}</div>
      </sl-card>,
    );
  }

  private _renderEnum(value: greycat.GCEnum): void {
    this.shadowRoot.replaceChildren(<>{value.toString()}</>);
  }

  private _createObjField(objType: greycat.AbiType, attrName: string, _attrType: greycat.AbiType, value: unknown) {
    const slottedField = this.querySelector(`[slot="${attrName}"]`);
    let field: Node;
    if (slottedField) {
      field = slottedField;
      if (field instanceof sl.SlButton) {
        field.textContent = value?.toString() ?? `${value}`;
      } else if (field instanceof sl.SlIconButton) {
        field.label = value?.toString() ?? `${value}`;
      } else if ('value' in field) {
        field.value = value;
      } else {
        field.textContent = value?.toString() ?? `${value}`;
      }
    } else {
      field = this._factory.createAttrObject(objType, attrName, { value });
    }
    return (
      <div className="field">
        <span className="field-name">{attrName}</span>
        <span className="field-value">
          <slot name={attrName}>{slottedField ? undefined : field}</slot>
        </span>
      </div>
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-object2': GuiObject2;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-object2': GreyCat.Element<GuiObject2 & GuiObject2Attrs>;
      }
    }
  }
}

registerCustomElement('gui-object2', GuiObject2);
