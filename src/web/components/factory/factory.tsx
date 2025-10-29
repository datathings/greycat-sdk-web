import { createElement } from '@greycat/web/jsx-runtime';
import {
  GuiInputElement,
  AnyValueElement,
  GuiElement,
  css,
  GuiInputEnum,
  GuiInputAbstract,
  GuiInputArray,
  GuiInputMap,
} from '../../exports.js';

type Props = {
  [key: string]: unknown;
  children?: HTMLElement | HTMLElement[];
} & GreyCat.ExtendedHTMLProperties;

export type FactoryMap = {
  [typeFqn: string]: keyof HTMLElementTagNameMap;
};

type PickElement<Target, Map> = {
  [K in keyof Map]: Map[K] extends Target ? K : never;
}[keyof Map];

export type InputElementTagNameMap = Pick<
  HTMLElementTagNameMap,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PickElement<GuiInputElement<any>, HTMLElementTagNameMap>
>;
export type InputFactoryMap = {
  [typeFqn: string]: keyof InputElementTagNameMap;
};
export interface GuiInputElementElementConstructor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...params: any[]): GuiInputElement<any>;
}

/**
 * This component is **not** reactive. Do not expect that modifying `mappings` will update already created children
 * elements. Only new elements created **after** the modification will leverage the new mappings.
 */
export class GuiFactory extends GuiElement {
  static override styles = [css(':host { display: contents; }')];

  /**
   * The global factory for everything not-input
   */
  static global: GuiFactory;

  constructor(
    /**
     * This is used when unable to find a specific mapping for a type.
     *
     * *Defaults to `'gui-object'`*
     */
    public objectTag: keyof HTMLElementTagNameMap = 'gui-object',
    /**
     * Some components prefer to display values as strings, therefore
     * they use the `valueFactory` rather than the `mappings` or `objectFactory`.
     *
     * *Defaults to `'gui-value'`*
     */
    public valueTag: keyof HTMLElementTagNameMap = 'gui-value',
    /**
     * Mapping of GreyCat fqn to HTMLElement tagName.
     *
     * *Note: `GuiFactory` comes with 2 helpers to easily register a custom element from either a class or a function,
     * see `GuiFactory.defineFromClass` and `GuiFactory.defineFromFn`*
     */
    public mappings: FactoryMap = {},
    /**
     * GreyCat instance name to use for sdk calls.
     * 
     * *By default the 'default' instance is used.*
     */
    public greycatName: string = 'default',
  ) {
    super();

    this.shadowRoot.appendChild(document.createElement('slot'));
  }

  set(name: string, tagName: keyof HTMLElementTagNameMap): void {
    this.mappings[name] = tagName;
  }

  setClass(name: string, klass: CustomElementConstructor): void {
    const tagName = GuiFactory.defineFromClass(klass);
    this.mappings[name] = tagName;
  }

  setFn(name: string, fn: CustomElementFn): void {
    const tagName = GuiFactory.defineFromFn(fn);
    this.mappings[name] = tagName;
  }

  createObject(props: Props = {}): Node {
    return createElement(this.objectTag, props) as Node;
  }

  createAttrObject(
    type: gc.sdk.AbiType,
    attrName: string,
    attrType: gc.sdk.AbiType,
    props: Props = {},
  ): Node {
    let tagName = this.get(`${type.name}::${attrName}`);
    if (tagName === undefined) {
      tagName = this.get(attrType.name);
    }
    if (tagName === undefined) {
      tagName = this.objectTag;
    }
    return createElement(tagName, props) as Node;
  }

  createValue(props: Props = {}): Node {
    return createElement(this.valueTag, props) as Node;
  }

  createAttrValue(type: gc.sdk.AbiType, attrName: string, props: Props = {}): Node {
    const tagName = this.getValue(`${type.name}::${attrName}`);
    return createElement(tagName, props) as Node;
  }

  create(type: string, props: Props = {}): Node {
    const tagName = this.get(type);
    if (tagName === undefined) {
      return createElement(this.objectTag, props);
    }
    return createElement(tagName, props) as Node;
  }

  /**
   * Looks for the given `type` in this factory's mappings.
   * If found, returns it.
   * If not found, asks the parent factory.
   * When the global factory is reached, it tries to look for the type in the global mappings,
   * if unable to find it, returns `undefined`.
   */
  get(type: string): keyof HTMLElementTagNameMap | undefined {
    const tagName = this.mappings[type];
    if (tagName) {
      return tagName;
    }
    if (this === GuiFactory.global) {
      return;
    }
    return GuiFactory.closest(this).get(type);
  }

  getValue(type: string): keyof HTMLElementTagNameMap {
    const tagName = this.mappings[type];
    if (tagName) {
      return tagName;
    }
    if (this === GuiFactory.global) {
      return this.valueTag;
    }
    const parentFactory = GuiFactory.closest(this);
    return parentFactory.getValue(type);
  }

  /**
   * Walks the DOM tree upwards starting from this node and returns the closest `GuiFactory`.
   *
   * *If this node is a `GuiFactory` it will not be returned, it will try to find the closest above this one.*
   *
   * If unable to find a factory in the tree, the global factory is returned (eg. `GuiFactory.global`).
   */
  static closest(node: Node): GuiFactory {
    let current = node;
    while (current !== null) {
      if (current instanceof GuiFactory) {
        return current;
      }
      // try DOM parent
      let parent = current.parentElement;
      if (parent !== null) {
        current = parent;
        continue;
      }
      // try light DOM
      const root = current.getRootNode();
      if (root instanceof ShadowRoot) {
        current = root.host;
        continue;
      }
      // reached DOM root
      break;
    }
    return GuiFactory.global;
  }

  static createObject(node: Node, props: Props = {}): Node {
    const factory = GuiFactory.closest(node);
    return factory.createObject(props);
  }

  static createValue(node: Node, props: Props = {}): Node {
    const factory = GuiFactory.closest(node);
    return factory.createValue(props);
  }

  static create(node: Node, type: string, props: Props = {}): Node {
    const factory = GuiFactory.closest(node);
    return factory.create(type, props);
  }

  static getMapping(node: Node, type: string): keyof HTMLElementTagNameMap | undefined {
    return GuiFactory.closest(node).get(type);
  }

  /**
   * Defines a new Web Component from the given update function.
   * This wraps the function into a class. The given `update` function will be
   * called each time the `value` is set on the wrapped component and will replace
   * its children with the returned node.
   *
   * Returns the auto-generated tag name.
   */
  static defineFromFn(update: CustomElementFn): keyof HTMLElementTagNameMap {
    return GuiFactory.defineFromClass(
      class extends GuiElement {
        static override styles = [css(':host { display: contents; }')];

        private _value: unknown;

        get value() {
          return this._value;
        }

        set value(value: unknown) {
          this._value = value;
          this.shadowRoot.replaceChildren(update(value, this));
        }
      },
    );
  }

  /**
   * Defines a new Web Component from the given class constructor.
   *
   * Returns the auto-generated tag name.
   */
  static defineFromClass(
    klass: CustomElementConstructor,
    prefix = 'gui-custom',
  ): keyof HTMLElementTagNameMap {
    prefix = prefix
      .toLowerCase()
      .replace(TAG_NAME_REGEX, (_, offset) =>
        offset === 0 || offset == prefix.length - 1 ? '' : '-',
      );
    const tagName = `${prefix}-${Date.now()}`;
    if (!customElements.get(tagName)) {
      customElements.define(tagName, klass);
    }
    return tagName as keyof HTMLElementTagNameMap;
  }
}

/**
 * This component is **not** reactive. Do not expect that modifying `mappings` will update already created children
 * elements. Only new elements created **after** the modification will leverage the new mappings.
 */
export class GuiInputFactory extends GuiElement {
  static override styles = [css(':host { display: contents; }')];

  /**
   * The global factory for inputs
   */
  static global: GuiInputFactory;

  constructor(
    /**
     * Long story short, make sure the components you register in this factory actually extend
     * `GuiInputElement`.
     *
     * TypeScript is getting a bit lost here, so the type-safety is not perfect
     * although most of the accepted tagName values are fine some might not actually extend
     * `GuiInputElement` as expected by this factory, which means you might be tempted to
     * register the tagName of a component that do not extend `GuiInputElement` though you **must not**.
     */
    public mappings: InputFactoryMap = {},
  ) {
    super();

    this.shadowRoot.appendChild(document.createElement('slot'));
  }

  get(type: string): keyof InputElementTagNameMap | undefined {
    const tagName = this.mappings[type];
    if (tagName) {
      return tagName;
    }
    if (this === GuiInputFactory.global) {
      return;
    }
    const parentFactory = GuiInputFactory.closest(this);
    return parentFactory.get(type);
  }

  set(name: string, tagName: keyof InputElementTagNameMap): void {
    this.mappings[name] = tagName;
  }

  setClass(name: string, klass: GuiInputElementElementConstructor): void {
    const tagName = name
      .toLowerCase()
      .replace(TAG_NAME_REGEX, (_, offset) =>
        offset === 0 || offset == name.length - 1 ? '' : '-',
      );
    customElements.define(tagName, klass);
    this.mappings[name] = tagName as keyof InputElementTagNameMap;
  }

  /**
   * Walks the DOM tree upwards starting from this node and returns the closest `GuiInputFactory`.
   *
   * *If this node is a `GuiInputFactory` it will not be returned, it will try to find the closest above this one.*
   *
   * If unable to find a factory in the tree, the global factory is returned (eg. `GuiInputFactory.global`).
   */
  static closest(node: Node): GuiInputFactory {
    let current = node;
    while (current !== null) {
      if (current instanceof GuiInputFactory) {
        return current;
      }
      // try DOM parent
      let parent = current.parentElement;
      if (parent !== null) {
        current = parent;
        continue;
      }
      // try light DOM
      const root = current.getRootNode();
      if (root instanceof ShadowRoot) {
        current = root.host;
        continue;
      }
      // reached DOM root
      break;
    }
    return GuiInputFactory.global;
  }

  createElement(value: unknown, type?: gc.sdk.AbiType): GuiInputElement<unknown> {
    if (type && type.offset === type.abi.core.any) {
      const tagName = this.get(type.name);
      if (tagName) {
        return document.createElement(tagName);
      }
      return document.createElement('gui-input-any');
    }
    if (value instanceof gc.sdk.GCEnum) {
      const tagName = this.get(value.$type.name);
      if (tagName) {
        return document.createElement(tagName);
      }
      return document.createElement('gui-input-enum');
    }

    if (value instanceof gc.core.function_) {
      const tagName = this.get(value.$type.name);
      if (tagName) {
        return document.createElement(tagName);
      }
      return document.createElement('gui-input-fnptr');
    }

    if (value instanceof gc.sdk.GCObject) {
      return this.createElementFromType(value.$type);
    }

    switch (typeof value) {
      case 'bigint':
      case 'number':
        return document.createElement('gui-input-number');
      case 'boolean':
        return document.createElement('gui-input-bool');
      case 'function':
        return document.createElement('gui-input-unsupported');
      case 'object': {
        if (value === null) {
          if (type) {
            return this.createElementFromType(type);
          }
          const input = document.createElement('gui-input-unsupported');
          input.message = `not nullable`;
          return input;
        }
        if (Array.isArray(value)) {
          const input = document.createElement('gui-input-array');
          if (type && type.generic_abi_type != 0) {
            input.genericParam = type.abi.types[type.g1()];
            input.genericParamNullable = type.g1Nullable();
          }
          return input;
        } else if (value instanceof Map) {
          const input = document.createElement('gui-input-map');
          if (type && type.generic_abi_type != 0) {
            input.keyType = type.abi.types[type.g1()];
            input.keyTypeNullable = type.g1Nullable();
            input.valueType = type.abi.types[type.g2()];
            input.valueTypeNullable = type.g2Nullable();
          }
          return input;
        }
        // TODO js object input
        const input = document.createElement('gui-input-unsupported');
        if (type) {
          input.message = type.name;
        }
        return input;
      }
      case 'symbol':
      case 'string':
        return document.createElement('gui-input-string');
      case 'undefined': {
        if (type) {
          return this.createElementFromType(type);
        }
        return document.createElement('gui-input-unsupported');
      }
    }
  }

  createElementFromType(type: gc.sdk.AbiType): GuiInputElement<unknown> {
    const abi = type.abi;
    const tagName = this.get(type.name);
    let input: GuiInputElement<unknown> | undefined;
    if (tagName) {
      input = document.createElement(tagName);
    }
    if (type.is_enum) {
      if (!input) {
        input = document.createElement('gui-input-enum');
      }
      if (input instanceof GuiInputEnum) {
        input.type = type;
      }
      return input;
    }
    if (type.is_abstract) {
      if (!input) {
        input = document.createElement('gui-input-abstract');
      }
      if (input instanceof GuiInputAbstract) {
        input.type = type;
      }
      return input;
    }
    if (type.offset === abi.core.array || type.generic_abi_type === abi.core.array) {
      if (!input) {
        input = document.createElement('gui-input-array');
      }
      if (input instanceof GuiInputArray && type.generic_abi_type === abi.core.array) {
        input.genericParam = abi.types[type.g1()];
        input.genericParamNullable = type.g1Nullable();
      }
      return input;
    }
    if (type.offset === abi.core.map && type.generic_abi_type === abi.core.map) {
      if (!input) {
        input = document.createElement('gui-input-map');
      }
      if (input instanceof GuiInputMap && type.generic_abi_type === abi.core.map) {
        input.keyType = abi.types[type.g1()];
        input.keyTypeNullable = type.g1Nullable();
        input.valueType = abi.types[type.g2()];
        input.valueTypeNullable = type.g2Nullable();
      }
      return input;
    }
    if (type.offset === abi.core.table || type.generic_abi_type === abi.core.table) {
      if (!input) {
        input = document.createElement('gui-input-unsupported');
      }
      return input;
    }
    if (type.offset === abi.core.node || type.generic_abi_type === abi.core.node) {
      if (!input) {
        input = document.createElement('gui-input-node');
      }
      return input;
    }
    if (type.offset === abi.core.node_time || type.generic_abi_type === abi.core.node_time) {
      if (!input) {
        input = document.createElement('gui-input-node-time');
      }
      return input;
    }
    if (type.offset === abi.core.node_list || type.generic_abi_type === abi.core.node_list) {
      if (!input) {
        input = document.createElement('gui-input-node-list');
      }
      return input;
    }
    if (type.offset === abi.core.node_index || type.generic_abi_type === abi.core.node_index) {
      if (!input) {
        input = document.createElement('gui-input-node-index');
      }
      return input;
    }
    if (type.offset === abi.core.node_geo || type.generic_abi_type === abi.core.node_geo) {
      if (!input) {
        input = document.createElement('gui-input-node-geo');
      }
      return input;
    }
    if (!input) {
      input = document.createElement('gui-input-object');
    }
    return input;
  }
}

const TAG_NAME_REGEX = /[^a-z0-9-]+|^[^a-z]+/g;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomElementFn<T = any> = (value: T, el: AnyValueElement, data?: any) => Node;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InputElementFn<T = any> = (value: T, el: GuiInputElement<T>, data?: any) => Node;

declare global {
  interface HTMLElementTagNameMap {
    'gui-factory': GuiFactory;
    'gui-input-factory': GuiInputFactory;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-factory': GreyCat.Element<GuiFactory>;
        'gui-input-factory': GreyCat.Element<GuiInputFactory>;
      }
    }
  }
}
