import './jsx.js';

export namespace JSX {
  export interface Element extends Node {}
  export interface IntrinsicElements extends GreyCat.JSX.IntrinsicElements {}
}

export const Fragment = '<></>';

export function createElement(
  tagName: typeof Fragment,
  props?: Partial<{
    children: HTMLElement | HTMLElement[];
  }>,
): DocumentFragment;
export function createElement<K extends keyof HTMLElementTagNameMap, E = HTMLElementTagNameMap[K]>(
  tagName: K,
  props?: Partial<E & { children: HTMLElement | HTMLElement[] }> & GreyCat.ExtendedHTMLProperties,
): HTMLElementTagNameMap[K];

export function createElement<K extends keyof HTMLElementTagNameMap, E = HTMLElementTagNameMap[K]>(
  tagName: K | typeof Fragment,
  props?: Partial<E & { children: HTMLElement | HTMLElement[] }> & GreyCat.ExtendedHTMLProperties,
): HTMLElementTagNameMap[K] | DocumentFragment {
  if (tagName === Fragment) {
    const fragment = document.createDocumentFragment();
    if (props?.children) {
      appendChild(fragment, props.children);
    }
    return fragment;
  }

  const element = document.createElement(tagName);
  if ('setAttrs' in element && typeof element.setAttrs === 'function') {
    // This is an optimisation for components that define a 'setAttrs' method.
    // Rather than calling every 'setter' sequentially
    //   ie. `element[prop1] = props[prop1]`
    // we only call `setAttrs(props)` once and the component can batch update itself.
    setElementAttrs(element as unknown as GuiElement, props);
  } else {
    for (const key in props) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      applyProp(element as unknown as GuiElement, key, (props as any)[key]);
    }
  }

  return element;
}

interface GuiElement extends HTMLElement {
  setAttrs(props: { [k: string]: unknown }): void;
  addEventListener(key: string, handler: EventListener): void;
  setAttribute(key: string, value: unknown): void;
}

function setElementAttrs(element: GuiElement, props?: { [k: string]: unknown }) {
  if (props === undefined) {
    return;
  }
  element.setAttrs(props);
  // deal with event handlers separatly
  for (const key in props) {
    applyProp(element, key, props[key], true);
  }
}

export function cx(element: HTMLElement, value: GreyCat.ExtendedHTMLProperties['className']): void {
  switch (typeof value) {
    case 'string': {
      element.classList.add(value);
      break;
    }
    case 'object': {
      if (Array.isArray(value)) {
        element.classList.add(...value);
      } else if (value !== null) {
        for (const className in value) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((value as any)[className]) {
            element.classList.add(className);
          } else {
            element.classList.remove(className);
          }
        }
      }
      break;
    }
    default:
      // unsupported
      break;
  }
}

function applyProp(element: GuiElement, key: string, value: unknown, eventsOnly = false) {
  if (value === undefined || value === null) {
    return;
  }

  switch (key) {
    case '$ref': {
      if (typeof value === 'function') {
        value(element);
      }
      break;
    }

    case 'className': {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cx(element, value as any);
      break;
    }

    case 'children': {
      appendChild(element, value);
      break;
    }

    case 'style': {
      if (typeof value === 'string') {
        element.style.cssText = value;
      } else {
        const styles = value as Partial<CSSStyleDeclaration>;
        for (const key in styles) {
          const value = styles[key];
          if (key.startsWith('--')) {
            element.style.setProperty(key, value ?? null);
          } else if (value !== undefined) {
            element.style[key] = value;
          }
        }
      }
      break;
    }

    case 'slot': {
      if (typeof value === 'string') {
        element.slot = value;
      }
      break;
    }

    case 'exportparts': {
      element.setAttribute('exportparts', value);
      break;
    }

    case 'part': {
      const parts = value.toString().split(' ');
      element.part.add(...parts);
      break;
    }

    default: {
      if (key.startsWith('on')) {
        if (typeof value === 'function') {
          element.addEventListener(key.substring(2), value as EventListener);
        }
      } else if (key.startsWith('attr:')) {
        element.setAttribute(key.substring(5), value);
      } else if (!eventsOnly) {
        if (key in element) {
          // safety: we just validated that 'key' was a property in 'element'
          // therefore we can, at least, set it
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (element as any)[key] = value;
        }
      }
      break;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function appendChild(parent: Node, child: any) {
  if (typeof child === 'undefined' || child === null) {
    return;
  }

  if (Array.isArray(child) || child instanceof NodeList || child instanceof HTMLCollection) {
    for (let i = 0; i < child.length; i++) {
      appendChild(parent, child[i]);
    }
  } else if (typeof child === 'string') {
    parent.appendChild(document.createTextNode(child));
  } else if (child instanceof Node) {
    parent.appendChild(child);
  } else {
    parent.appendChild(document.createTextNode(child.toString()));
  }
}

export { createElement as jsx };
export { createElement as jsxs };
export { createElement as jsxDEV };
