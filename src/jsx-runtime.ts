// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../jsx.d.ts" />

export const Fragment = '<></>';

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K | typeof Fragment,
  props: JSX.AttributeCollection,
): HTMLElementTagNameMap[K] | DocumentFragment {
  if (tagName === Fragment) {
    const fragment = document.createDocumentFragment();
    if (props?.children) {
      appendChild(fragment, props.children);
    }
    return fragment;
  }

  const element = document.createElement(tagName);
  // if (typeof props['$ref'] === 'function') {
  //   props['$ref'](element);
  //   delete props['$ref'];
  // }

  if ('setAttrs' in element && typeof element.setAttrs === 'function') {
    // this is an internal optimisation for component that do define a one-off
    // 'setAttrs' update method. Rather than calling each 'setter' ie. `element[name] = props[name]`
    // those component can batch update in one method call.
    element.setAttrs(props);
    // deal with event handlers separatly
    const keys = Object.keys(props);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = props[key];
      if (key.startsWith('on') && typeof value === 'function') {
        element.addEventListener(key.substring(2), value as EventListener);
      } else if (key === 'className') {
        const value = props[key];
        if (Array.isArray(value)) {
          element.classList.add(...value);
        } else {
          element.classList.add(value as string);
        }
      }
    }
    return element;
  }

  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = props[key] as any;

    if (value === undefined || value === null) {
      continue;
    }

    switch (key) {
      case 'className':
        if (Array.isArray(value)) {
          element.classList.add(...value);
        } else {
          element.classList.add(value as string);
        }
        break;

      case 'children':
        appendChild(element, value);
        break;

      case 'style':
        if (typeof value === 'string') {
          element.style.cssText = value;
        } else {
          Object.assign(element.style, value);
        }
        break;

      default:
        if (key.startsWith('on')) {
          element.addEventListener(key.substring(2), value);
        } else if (key in element) {
          // safety: we just validated that 'key' was a property in 'element'
          // therefore we can, at least, set it
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (element as any)[key] = value;
        } else {
          element.setAttribute(key, value);
        }
    }
  }

  return element;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function appendChild(parent: Node, child: any) {
  if (typeof child === 'undefined' || child === null) {
    return;
  }

  if (Array.isArray(child) || child instanceof NodeList) {
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
