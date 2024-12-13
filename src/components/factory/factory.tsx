import { createElement } from '@greycat/web/jsx-runtime';
import { registerCustomElement } from '../common.js';
import {
  AbiType,
  GCEnum,
  GCFunction,
  GCObject,
  GuiInputElement,
  GuiInputElementElementConstructor,
  GuiValueElement,
  std,
} from '../../exports.js';

type Props = {
  [key: string]: unknown;
  children?: HTMLElement | HTMLElement[];
} & GreyCat.ExtendedHTMLProperties;

export type FactoryMap = {
  [typeFqn: string]: keyof HTMLElementTagNameMap;
};

type PickGuiInputElement<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: T[K] extends GuiInputElement<any> ? K : never;
}[keyof T];

export type InputElementTagNameMap = Pick<
  HTMLElementTagNameMap,
  PickGuiInputElement<HTMLElementTagNameMap>
>;
export type InputFactoryMap = {
  [typeFqn: string]: keyof InputElementTagNameMap;
};

/**
 * This component is **not** reactive. Do not expect that modifying `mappings` will update already created children
 * elements. Only new elements created **after** the modification will leverage the new mappings.
 */
export class GuiFactory extends HTMLElement {
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
  ) {
    super();
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
    return createElement(this.objectTag, props);
  }

  createAttrObject(type: AbiType, attrName: string, props: Props = {}): Node {
    const tagName = this.get(`${type.name}::${attrName}`);
    return createElement(tagName, props);
  }

  createValue(props: Props = {}): Node {
    return createElement(this.valueTag, props);
  }

  createAttrValue(type: AbiType, attrName: string, props: Props = {}): Node {
    const tagName = this.getValue(`${type.name}::${attrName}`);
    return createElement(tagName, props);
  }

  create(type: string, props: Props = {}): Node {
    const tagName = this.get(type);
    return createElement(tagName, props);
  }

  getMapping(type: string): keyof HTMLElementTagNameMap | undefined {
    return this.mappings[type];
  }

  /**
   * Looks for the given `type` in this factory's mappings.
   * If found, returns it.
   * If not found, asks the parent factory.
   * When the global factory is reached, it tries to look for the type in the global mappings,
   * if unable to find it, fallbacks to `global.objectTag`
   */
  get(type: string): keyof HTMLElementTagNameMap {
    const tagName = this.mappings[type];
    if (tagName) {
      return tagName;
    }
    if (this === GuiFactory.global) {
      return this.objectTag;
    }
    const parentFactory = GuiFactory.closest(this);
    return parentFactory.get(type);
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
    let parent = node.parentElement;
    while (parent !== null) {
      if (parent instanceof GuiFactory) {
        return parent;
      }
      parent = parent.parentElement;
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
    const factory = GuiFactory.closest(node);
    return factory.getMapping(type);
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
      class extends HTMLElement implements GuiValueElement<unknown> {
        private _value: unknown;

        get value() {
          return this._value;
        }

        set value(value: unknown) {
          this._value = value;
          this.replaceChildren(update(value, this));
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
export class GuiInputFactory extends HTMLElement {
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
    let parent = node.parentElement;
    while (parent !== null) {
      if (parent instanceof GuiInputFactory) {
        return parent;
      }
      parent = parent.parentElement;
    }
    return GuiInputFactory.global;
  }

  createElement(value: unknown, type?: AbiType): GuiInputElement<unknown> {
    if (value instanceof GCEnum) {
      const tagName = this.get(value.$type.name);
      if (tagName) {
        return document.createElement(tagName);
      }
      return document.createElement('gui-input-enum');
    }

    if (value instanceof GCFunction) {
      const tagName = this.get(value.$type.name);
      if (tagName) {
        return document.createElement(tagName);
      }
      return document.createElement('gui-input-fnptr');
    }

    if (value instanceof GCObject) {
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
          // TODO null input should be a 'Set a value' button
          return document.createElement('gui-input-unsupported');
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

  createElementFromType(type: AbiType): GuiInputElement<unknown> {
    const abi = type.abi;
    const tagName = this.get(type.name);
    if (tagName) {
      return document.createElement(tagName);
    }
    if (type.is_enum) {
      const input = document.createElement('gui-input-enum');
      input.type = type;
      return input;
    }
    if (type.is_abstract) {
      const input = document.createElement('gui-input-abstract');
      input.type = type;
      return input;
    }

    if (type.offset === abi.core.array || type.generic_abi_type === abi.core.array) {
      const input = document.createElement('gui-input-array');
      input.genericParam = abi.types[type.g1()];
      input.genericParamNullable = type.g1Nullable();
      return input;
    }
    if (type.offset === abi.core.map || type.generic_abi_type === abi.core.map) {
      const input = document.createElement('gui-input-map');
      input.keyType = abi.types[type.g1()];
      input.keyTypeNullable = type.g1Nullable();
      input.valueType = abi.types[type.g2()];
      input.valueTypeNullable = type.g2Nullable();
      return input;
    }
    if (type.offset === abi.core.table || type.generic_abi_type === abi.core.table) {
      return document.createElement('gui-input-unsupported');
    }
    if (type.offset === abi.core.node || type.generic_abi_type === abi.core.node) {
      return document.createElement('gui-input-node');
    }
    if (type.offset === abi.core.node_time || type.generic_abi_type === abi.core.node_time) {
      return document.createElement('gui-input-node-time');
    }
    if (type.offset === abi.core.node_list || type.generic_abi_type === abi.core.node_list) {
      return document.createElement('gui-input-node-list');
    }
    if (type.offset === abi.core.node_index || type.generic_abi_type === abi.core.node_index) {
      return document.createElement('gui-input-node-index');
    }
    if (type.offset === abi.core.node_geo || type.generic_abi_type === abi.core.node_geo) {
      return document.createElement('gui-input-node-geo');
    }

    return document.createElement('gui-input-object');
  }
}

const TAG_NAME_REGEX = /[^a-z0-9-]+|^[^a-z]+/g;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomElementFn<T = any> = (value: T, el: GuiValueElement, data?: any) => Node;
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

registerCustomElement('gui-factory', GuiFactory);
registerCustomElement('gui-input-factory', GuiInputFactory);

// both factories needs to be created after they are registered
GuiFactory.global = new GuiFactory('gui-object', 'gui-value', {
  [std.core.Table._type]: 'gui-table',
  [std.core.Map._type]: 'gui-table',
  [std.core.Array._type]: 'gui-table',
});
GuiInputFactory.global = new GuiInputFactory({
  [std.core.int._type]: 'gui-input-number',
  [std.core.float._type]: 'gui-input-number',
  [std.core.bool._type]: 'gui-input-bool',
  [std.core.String._type]: 'gui-input-string',
  [std.core.char._type]: 'gui-input-string',
  [std.core.time._type]: 'gui-input-time',
  [std.core.duration._type]: 'gui-input-duration',
  [std.core.Array._type]: 'gui-input-array',
  [std.core.Map._type]: 'gui-input-map',
  ['core::any']: 'gui-input-any',
  [std.core.geo._type]: 'gui-input-geo',
  [std.core.node._type]: 'gui-input-node',
  [std.core.nodeIndex._type]: 'gui-input-node-index',
  [std.core.nodeTime._type]: 'gui-input-node-time',
  [std.core.nodeList._type]: 'gui-input-node-list',
  [std.core.nodeGeo._type]: 'gui-input-node-geo',
  [std.core.function_._type]: 'gui-input-fnptr',
});
