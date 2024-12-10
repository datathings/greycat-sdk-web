import type { SlDetails } from '@shoelace-style/shoelace';
import { GCEnum, GCObject, GuiFactory, registerCustomElement, std } from '../../exports.js';
import type { GuiValueElement, sl } from '../../exports.js';
import { createElement } from '@greycat/web/jsx-runtime';

export type ObjectProps = Record<string | number | symbol, unknown>;
export type GuiObjectProps = {
  value: unknown;
  /**
   * Whether or not to display a header with the type name for struct objects.
   *
   * *This property has no effect if the value is a scalar value.*
   */
  header: boolean | string;
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
  private _value: unknown;
  private _header: string | boolean = false;
  private _expanded = false;
  private _nested = false;
  private _resolve = false;
  private _props: ObjectProps = {};
  private _factory: GuiFactory = GuiFactory.global;

  connectedCallback() {
    this.classList.add('gui-object');
    this._factory = GuiFactory.closest(this);
    this.update();
  }

  setAttrs({
    value = this._value,
    header = this._header,
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
    this._header = header;
    this._nested = nested;
    this._expanded = expanded;
    this._resolve = resolve;
    this.update();
  }

  getAttrs(): Partial<GuiObjectProps> {
    return {
      value: this._value,
      header: this._header,
      nested: this._nested,
      expanded: this._expanded,
      resolve: this._resolve,
      ...this._props,
    };
  }

  get props() {
    return this._props;
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
  get header() {
    return this._header;
  }

  set header(header: boolean | string) {
    this._header = header;
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
    this._render(this._value);
  }

  private _render(value: unknown): void {
    if (typeof value === 'object' && value !== null) {
      this._renderAsObject(value);
    } else {
      this._renderAsValue(value);
    }
  }

  private _renderAsValue(value: unknown): void {
    if (this._factory.valueTag.toUpperCase() === this.tagName) {
      // debugger;
      const el = document.createElement('gui-value');
      el.setAttrs({ ...this._props, value });
      this.replaceChildren(el);
    } else {
      this.replaceChildren(this._factory.createValue({ ...this._props, value }));
    }
  }

  private _renderAsObject(value: object): void {
    if (value instanceof HTMLElement) {
      this.replaceChildren(value);
      return;
    }

    if (value instanceof Date) {
      this.replaceChildren(this._factory.createValue({ ...this._props, value }));
      return;
    }

    if (value instanceof GCEnum) {
      this.replaceChildren(this._factory.createValue({ ...this._props, value }));
      return;
    }

    if (Array.isArray(value)) {
      const table = this._factory.create(std.core.Table._type, {
        ...this._props,
        value,
        style: { minHeight: 'var(--gui-object-table-min-height)' },
      });
      this.replaceChildren(table);
      return;
    }

    if (value instanceof Map) {
      const table = this._factory.create(std.core.Table._type, {
        ...this._props,
        value,
        style: { minHeight: 'var(--gui-object-table-min-height)' },
      });
      this.replaceChildren(table);
      return;
    }

    if (value instanceof std.core.node && this._resolve) {
      value.resolve().then((value) => {
        this._render(value);
      });
      return;
    }

    if (isStd(value)) {
      this.replaceChildren(this._factory.createValue({ ...this._props, value }));
      return;
    }

    if (value instanceof Error) {
      this.replaceChildren(
        <sl-alert variant="danger" open>
          <pre>{value.message}</pre>
        </sl-alert>,
      );
      return;
    }

    if (value instanceof std.core.Error) {
      this.replaceChildren(
        <sl-alert variant="danger" open>
          <pre>{value.toString()}</pre>
        </sl-alert>,
      );
      return;
    }

    if (value instanceof std.core.Table) {
      const table = this._factory.create(std.core.Table._type, {
        ...this._props,
        value,
        style: { minHeight: 'var(--gui-object-table-min-height)' },
      });
      this.replaceChildren(table);
      return;
    }

    if (value instanceof GCObject) {
      const tagName = this._factory.getMapping(value.$type.name);
      if (tagName) {
        this.replaceChildren(createElement(tagName, { ...this._props, value }));
        return;
      }
      if (value.$type.is_native) {
        const node = document.createTextNode(`No component for native type '${value.$type.name}'`);
        this.replaceChildren(node);
        return;
      }

      this._renderAsGcObject(value);
      return;
    }

    this._renderAsJsObject(value);
  }

  private _renderAsGcObject(value: GCObject): void {
    if (value.$attrs === undefined || value.$attrs.length === 0) {
      this.replaceChildren(<em>empty object</em>);
      return;
    }

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < value.$type.attrs.length; i++) {
      const attr = value.$type.attrs[i];
      const attrVal = value.$attrs[i];
      if (attrVal === null) {
        fragment.appendChild(
          <>
            <gui-object-fieldname value={attr.name} />
            <gui-object-fieldvalue>
              {this._factory.createAttrValue(value.$type, attr.name, {
                ...this._props,
                value: attrVal,
              })}
            </gui-object-fieldvalue>
          </>,
        );
        continue;
      }

      // nested object
      if (this._needsCollapsible(attrVal)) {
        const open =
          (
            this.children?.[0]?.children?.[0]?.children?.[i * 2 + 1]?.children?.[0] as
              | sl.SlDetails
              | undefined
          )?.open ?? false;
        const details = document.createElement('sl-details');
        details.open = this._expanded || open;
        details.summary = this._typeName(attrVal) ?? '';
        details.updateComplete.then(() => {
          details.open = this._expanded || open;
        });
        const child = this._factory.create(
          value.$type.abi.types[attr.abi_type].name,
          Object.assign(this.getAttrs(), this._props, {
            header: false, // past level 0 this is no longer needed
            value: undefined,
            data: attr.name,
          }),
        ) as GuiValueElement;
        details.appendChild(child);
        const onshow = () => {
          child.value = attrVal;
        };
        if (details.open) {
          onshow();
        } else {
          details.addEventListener('sl-show', onshow, { once: true });
        }

        fragment.appendChild(
          <>
            <gui-object-fieldname value={attr.name} />
            <gui-object-fieldvalue>{details}</gui-object-fieldvalue>
          </>,
        );
      } else if (attrVal instanceof std.core.node && this._resolve) {
        const details = document.createElement('sl-details');
        details.summary = `${attrVal}`;
        details.updateComplete.then(() => {
          details.open = this._expanded;
        });
        const content = this._factory.createObject(
          Object.assign(this.getAttrs(), this._props, {
            header: false, // past level 0 this is no longer needed
            value: 'loading...',
            data: attr.name,
          }),
        ) as GuiValueElement;
        details.appendChild(content);
        details.addEventListener(
          'sl-show',
          () => {
            attrVal.resolve().then((resolved) => {
              if (resolved instanceof GCObject) {
                details.summary = `${resolved.$type.name} (${attrVal})`;
              }
              content.value = resolved;
            });
          },
          { once: true },
        );

        fragment.appendChild(
          <>
            <gui-object-fieldname value={attr.name} />
            <gui-object-fieldvalue>{details}</gui-object-fieldvalue>
          </>,
        );
      } else {
        const props = Object.assign(this.getAttrs(), this._props, {
          nested: true,
          value: attrVal,
          data: attr.name,
        });
        const child = this._factory.createAttrObject(value.$type, attr.name, props);
        fragment.appendChild(
          <>
            <gui-object-fieldname value={attr.name} />
            <gui-object-fieldvalue>{child}</gui-object-fieldvalue>
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
    let header: Node | undefined;
    if (this._header) {
      if (this._value === value) {
        header = <header slot="header">{this._typeName(this._value)}</header>;
      } else {
        header = (
          <header slot="header">
            {this._typeName(this._value)}&lt;{value.$type.name}&gt;
          </header>
        );
      }
    }
    this.replaceChildren(
      <sl-card className="gui-object-card">
        {header}
        <div className={['gui-object', 'gui-object-grid']}>{fragment}</div>
      </sl-card>,
    );
    return;
  }

  private _renderAsJsObject(value: object): void {
    const fragment = document.createDocumentFragment();
    let index = 0;
    for (const key in value) {
      const val = (value as Record<string, unknown>)[key];
      if (this._needsCollapsible(val)) {
        const open =
          (this.children?.[index * 2 + 1]?.children?.[0] as sl.SlDetails | undefined)?.open ??
          false;
        const details = (
          <sl-details summary={this._typeName(val)} open={this._expanded || open}>
            {this._factory.createObject(
              Object.assign(this.getAttrs(), this._props, {
                header: false, // past level 0 this is no longer needed
                value: val,
                data: key,
              }),
            )}
          </sl-details>
        ) as SlDetails;
        details.updateComplete.then(() => {
          details.open = this._expanded || open;
        });
        fragment.appendChild(
          <>
            <gui-object-fieldname value={key} />
            <gui-object-fieldvalue>{details}</gui-object-fieldvalue>
          </>,
        );
      } else {
        const child = this._factory.createObject(
          Object.assign(this.getAttrs(), this._props, {
            value: val,
            data: key,
          }),
        );
        fragment.appendChild(
          <>
            <gui-object-fieldname value={key} />
            <gui-object-fieldvalue>{child}</gui-object-fieldvalue>
          </>,
        );
      }
      index += 1;
    }

    const card = (
      <sl-card className="gui-object-card">
        <div className={['gui-object', 'gui-object-grid']}>{fragment}</div>
      </sl-card>
    ) as sl.SlCard;
    if (typeof this._header === 'string') {
      card.prepend(<header slot="header">{this._header}</header>);
    } else if (this._header) {
      card.prepend(<header slot="header">{this._typeName(this._value)}</header>);
    }
    this.replaceChildren(card);
  }

  /**
   * Returns `true` if the given `val` is a "complex" object
   */
  private _needsCollapsible(val: unknown): boolean {
    return (
      val !== undefined &&
      val !== null &&
      typeof val === 'object' &&
      !isStd(val) &&
      !(val instanceof GCEnum) &&
      !(val instanceof Node) &&
      !(val instanceof Date)
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

class GuiObjectFieldName extends HTMLElement {
  private _value: string;
  // private _tooltip: sl.SlTooltip;
  private _span: HTMLSpanElement;

  constructor() {
    super();

    this._value = '';
    // this._tooltip = document.createElement('sl-tooltip');
    // this._tooltip.hoist = true;
    // this._tooltip.placement = 'bottom';
    this._span = document.createElement('span');
    // this._tooltip.appendChild(this._span);
  }

  connectedCallback() {
    // this.replaceChildren(this._tooltip);
    this.replaceChildren(this._span);
    this.update();
  }

  get value() {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }
    this._span.textContent = this._value;
    queueMicrotask(() => {
      if (this.scrollWidth > this.clientWidth) {
        this.title = this._value;
      }
    });
  }
}

class GuiObjectFieldValue extends HTMLElement {}

declare global {
  interface HTMLElementTagNameMap {
    'gui-object': GuiObject;
    'gui-object-fieldname': GuiObjectFieldName;
    'gui-object-fieldvalue': GuiObjectFieldValue;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /**
         * Please, don't use this in a React context. Use `WCWrapper`.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        'gui-object': GreyCat.Element<GuiObject>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'gui-object-fieldname': GreyCat.Element<GuiObjectFieldName>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'gui-object-fieldvalue': GreyCat.Element<GuiObjectFieldValue>;
      }
    }
  }
}

registerCustomElement('gui-object', GuiObject);
registerCustomElement('gui-object-fieldname', GuiObjectFieldName);
registerCustomElement('gui-object-fieldvalue', GuiObjectFieldValue);
