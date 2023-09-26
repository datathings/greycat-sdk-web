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
  } else if (typeof tagName === 'function') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (tagName as any)(props);
  }

  const element = document.createElement(tagName);
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

      default:
        if (key.startsWith('on')) {
          element.addEventListener(key.substring(2), value);
        } else if (key.includes('-')) {
          element.setAttribute(key, value);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (element as any)[key] = value;
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

  if (Array.isArray(child)) {
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
