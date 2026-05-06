import { css, GuiCard, GuiElement, GuiFactory, type GuiValueElement, type sl } from '../../exports.js';
import { createElement } from '@greycat/web/jsx-runtime';
import style from './object.css?inline';

export type ObjectProps = Record<string | number | symbol, unknown>;
export type GuiObjectProps<T = unknown> = {
  value: T;
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
export class GuiObject<T = unknown> extends GuiElement {
  static override styles = [css(style)];
  static get observedAttributes() {
    return ['header', 'resolve', 'expanded', 'nested'];
  }

  private _value: T | undefined;
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
  }: Partial<GuiObjectProps<T>>): void {
    Object.assign(this._props, props);
    this._value = value;
    this._header = header;
    this._nested = nested;
    this._expanded = expanded;
    this._resolve = resolve;
    this.update();
  }

  getAttrs(): Partial<GuiObjectProps<T>> {
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

  set value(value: T | undefined) {
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

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    let needsUpdate = false;
    switch (name) {
      case 'header': {
        if (oldValue !== newValue) {
          if (newValue === null) {
            this._header = false;
          } else if (newValue === '') {
            this._header = true;
          } else {
            this._header = newValue;
          }
          needsUpdate = true;
        }
        break;
      }
      case 'expanded': {
        if (oldValue !== newValue) {
          this._expanded = newValue === '';
          needsUpdate = true;
        }
        break;
      }
      case 'nested': {
        if (oldValue !== newValue) {
          this._nested = newValue === '';
          needsUpdate = true;
        }
        break;
      }
      case 'resolve': {
        if (oldValue !== newValue) {
          this._resolve = newValue === '';
          needsUpdate = true;
        }
        break;
      }
    }
    if (needsUpdate) {
      this.update();
    }
  }

  update() {
    if (!this.isConnected) {
      return;
    }
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
      const el = document.createElement('gui-value');
      el.setAttrs({ ...this._props, value });
      el.part.add('base');
      this.shadowRoot.replaceChildren(el);
    } else {
      const el = this._factory.createValue({ ...this._props, value }) as Element;
      el.part.add('base');
      this.shadowRoot.replaceChildren(el);
    }
  }

  private _renderAsObject(value: object): void {
    if (value instanceof HTMLElement) {
      this.shadowRoot.replaceChildren(value);
      return;
    }

    if (value instanceof Date) {
      this.shadowRoot.replaceChildren(this._factory.createValue({ ...this._props, value }));
      return;
    }

    if (value instanceof gc.sdk.GCEnum) {
      this.shadowRoot.replaceChildren(this._factory.createValue({ ...this._props, value }));
      return;
    }

    if (value instanceof gc.runtime.Task) {
      this.addDisposable(
        gc.$[this._factory.greycatName].subscribeToTaskPoll(500, (tasks) => {
          const task = tasks.find((t) => t.task_id === value.task_id);
          if (task) {
            this._renderAsGCObject(task);
            switch (task.status.key) {
              case 'await':
              case 'running':
              case 'waiting':
              case 'breakpoint':
                // TODO add a cancel button?
                break;
              default:
                this.dispose();
                break;
            }
          }
        }),
      );
      this._renderAsGCObject(value);
      return;
    }

    if (Array.isArray(value)) {
      const table = this._factory.create(gc.core.Table._type, {
        ...this._props,
        value,
        headers: ['Element'],
        style: { minHeight: 'var(--gui-object-table-min-height)' },
      }) as Element;
      table.part.add('base');
      this.shadowRoot.replaceChildren(table);
      return;
    }

    if (value instanceof Map) {
      const table = this._factory.create(gc.core.Table._type, {
        ...this._props,
        value,
        style: { minHeight: 'var(--gui-object-table-min-height)' },
      }) as Element;
      table.part.add('base');
      this.shadowRoot.replaceChildren(table);
      return;
    }

    if (value instanceof gc.core.node && this._resolve) {
      value.resolve().then((value) => {
        this._render(value);
      });
      return;
    }

    if (gc.sdk.isScalar(value)) {
      this.shadowRoot.replaceChildren(this._factory.createValue({ ...this._props, value }));
      return;
    }

    if (value instanceof Error) {
      this.shadowRoot.replaceChildren(
        <sl-alert variant="danger" open>
          <pre>{value.message}</pre>
        </sl-alert>,
      );
      return;
    }

    if (value instanceof gc.core.Error) {
      this.shadowRoot.replaceChildren(
        <sl-alert variant="danger" open>
          <pre>{value.toString()}</pre>
        </sl-alert>,
      );
      return;
    }

    if (value instanceof gc.core.Table) {
      const table = this._factory.create(gc.core.Table._type, {
        ...this._props,
        value,
        style: { minHeight: 'var(--gui-object-table-min-height)' },
      }) as Element;
      table.part.add('base');
      this.shadowRoot.replaceChildren(table);
      return;
    }

    if (value instanceof gc.sdk.GCObject) {
      const tagName = this._factory.get(value.$type.name);
      if (tagName) {
        this.shadowRoot.replaceChildren(createElement(tagName, { ...this._props, value }) as Node);
        return;
      }
      if (value.$type.is_native) {
        const node = document.createTextNode(`No component for native type '${value.$type.name}'`);
        this.shadowRoot.replaceChildren(node);
        return;
      }

      this._renderAsGCObject(value);
      return;
    }

    this._renderAsJsObject(value);
  }

  private _renderAsGCObject(obj: gc.sdk.GCObject): void {
    if (obj.$fields === undefined || obj.$fields?.length === 0) {
      this.shadowRoot.replaceChildren(<em>empty object</em>);
      return;
    }

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < obj.$type.attrs.length; i++) {
      const attr = obj.$type.attrs[i];
      const attrVal = obj.$fields![i];
      if (attrVal === null) {
        fragment.appendChild(
          <>
            <gui-object-fieldname value={attr.name} />
            <gui-object-fieldvalue>
              {this._factory.createAttrValue(obj.$type, attr.name, {
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
            this.shadowRoot.children?.[0]?.children?.[0]?.children?.[i * 2 + 1]?.children?.[0] as
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
          obj.$type.abi.types[attr.abi_type].name,
          Object.assign(this.getAttrs(), this._props, {
            header: false, // past level 0 this is no longer needed
            value: undefined,
            data: attr.name,
          }),
        ) as GuiValueElement<unknown>;
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
      } else if (attrVal instanceof gc.core.node && this._resolve) {
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
        ) as GuiValueElement<unknown>;
        details.appendChild(content);
        details.addEventListener(
          'sl-show',
          () => {
            attrVal.resolve().then((resolved) => {
              if (resolved instanceof gc.sdk.GCObject) {
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
        const child = this._factory.createAttrObject(obj.$type, attr.name, obj.$type.abi.types[attr.abi_type], props);
        fragment.appendChild(
          <>
            <gui-object-fieldname value={attr.name} />
            <gui-object-fieldvalue>{child}</gui-object-fieldvalue>
          </>,
        );
      }
    }

    if (this._nested) {
      this.part.add('grid');
      this.classList.add('gui-object-grid');
      this.shadowRoot.replaceChildren(fragment);
      return;
    }

    // Important note:
    // ---------------
    // if the structure changes here, remember to update the selector in components/table/table.css too:
    //  eg. gui-table gui-tbody gui-tbody-row gui-tbody-cell :has(gui-object.gui-object > article > .gui-object.gui-object-grid)
    //
    // the above selectors rely on the below structure to work properly
    let header: Node | undefined;
    if (typeof this._header === 'boolean') {
      if (this._header) {
        if (this._value === obj) {
          header = <header slot="header">{this._typeName(this._value)}</header>;
        } else {
          header = (
            <header slot="header">
              {this._typeName(this._value)}&lt;{obj.$type.name}&gt;
            </header>
          );
        }
      }
    } else {
      header = <header slot="header">{this._header}</header>;
    }
    this.shadowRoot.replaceChildren(
      <gui-card className="gui-object-card" part="base">
        {header}
        <div className={['gui-object', 'gui-object-grid']} part="grid">
          {fragment}
        </div>
      </gui-card>,
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
          (this.shadowRoot.children?.[index * 2 + 1]?.children?.[0] as sl.SlDetails | undefined)?.open ?? false;
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
        ) as sl.SlDetails;
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
      <gui-card className="gui-object-card" part="base">
        <div className={['gui-object', 'gui-object-grid']} part="grid">
          {fragment}
        </div>
      </gui-card>
    ) as GuiCard;
    if (typeof this._header === 'string') {
      card.prepend(<header slot="header">{this._header}</header>);
    } else if (this._header) {
      card.prepend(<header slot="header">{this._typeName(this._value)}</header>);
    }
    this.shadowRoot.replaceChildren(card);
  }

  /**
   * Returns `true` if the given `val` is a "complex" object
   */
  private _needsCollapsible(val: unknown): boolean {
    if (gc.sdk.isScalar(val) || gc.sdk.isNode(val) || val instanceof Node || val instanceof Date) {
      return false;
    }
    return true;
  }

  private _typeName(val: unknown): string | undefined {
    if (val instanceof gc.sdk.GCObject) {
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

export class GuiObjectFieldName extends HTMLElement {
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
    // this.shadowRoot.replaceChildren(this._tooltip);
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

export class GuiObjectFieldValue extends HTMLElement {}

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
