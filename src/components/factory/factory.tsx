import { createElement } from '@greycat/web/jsx-runtime';
import { registerCustomElement } from '../common.js';
import { GuiValueElement, std } from '../../exports.js';

type Props = {
  [key: string]: unknown;
  children?: HTMLElement | HTMLElement[];
} & GreyCat.ExtendedHTMLProperties;

export class GuiFactory extends HTMLElement {
  static global: GuiGlobalFactory;

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
    /** mapping of GreyCat fqn to HTMLElement tagName */
    public mappings?: Map<string, keyof HTMLElementTagNameMap>,
  ) {
    super();
  }

  createObject(props: Props = {}): Node {
    return createElement(this.objectTag, props);
  }

  createValue(props: Props = {}): Node {
    return createElement(this.valueTag, props);
  }

  create(type: string, props: Props = {}): Node {
    const tagName = this.get(type);
    return createElement(tagName, props);
  }

  getMapping(type: string): keyof HTMLElementTagNameMap | undefined {
    return this.mappings?.get(type);
  }

  /**
   * Looks for the given `type` in this factory's mappings.
   * If found, returns it.
   * If not found, asks the parent factory.
   * When the global factory is reached, it tries to look for the type in the global mappings,
   * if unable to find it, fallbacks to `global.objectTag`
   */
  get(type: string): keyof HTMLElementTagNameMap {
    if (this.mappings) {
      const tagName = this.mappings.get(type);
      if (tagName) {
        return tagName;
      }
    }
    if (this === GuiFactory.global) {
      return this.objectTag;
    }
    const parentFactory = GuiFactory.closest(this);
    return parentFactory.get(type);
  }

  /**
   * Walks the DOM tree upwards starting from this node and returns the closest `GuiFactory`.
   *
   * *If this node is a `GuiFactory` it will not be returned, it will try to find the closest above this one.*
   *
   * If unable to find a factory in the tree, the global factory is returned (eg. `GuiFactory.global`).
   */
  static closest(node: Node): GuiFactory {
    let parent = node.parentNode;
    while (parent !== null) {
      if (parent instanceof GuiFactory) {
        return parent;
      }
      parent = parent.parentNode;
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
  static defineFromFn(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    update: (value: any, el: GuiValueElement, data?: any) => Node,
  ): keyof HTMLElementTagNameMap {
    return GuiFactory.defineFromClass(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      class extends HTMLElement implements GuiValueElement<any> {
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
  static defineFromClass(klass: CustomElementConstructor): keyof HTMLElementTagNameMap {
    const tagName = `gui-custom-${Date.now()}`;
    customElements.define(tagName, klass);
    return tagName as keyof HTMLElementTagNameMap;
  }
}

export class GuiGlobalFactory extends GuiFactory {
  constructor(
    public override objectTag: keyof HTMLElementTagNameMap = 'gui-object',
    public override valueTag: keyof HTMLElementTagNameMap = 'gui-value',
    public override readonly mappings: Map<string, keyof HTMLElementTagNameMap> = new Map(),
  ) {
    super(objectTag, valueTag, mappings);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-factory': GuiFactory;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'gui-factory': GreyCat.Element<GuiFactory>;
      }
    }
  }
}

registerCustomElement('gui-factory', GuiFactory);

// needs to be created after registered
GuiFactory.global = new GuiGlobalFactory(
  'gui-object',
  'gui-value',
  new Map([
    [std.core.Table._type, 'gui-table'],
    [std.core.Map._type, 'gui-table'],
    [std.core.Array._type, 'gui-table'],
    [std.runtime.Task._type, 'gui-task-info'],
    [std.runtime.TaskInfo._type, 'gui-task-info'],
  ]),
);
