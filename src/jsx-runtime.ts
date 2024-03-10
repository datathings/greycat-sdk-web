// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../jsx.d.ts" />

import { effect, isSignal } from './signal.js';

export const Fragment = '<></>';

export function createElement<K extends keyof HTMLElementTagNameMap, E = HTMLElementTagNameMap[K]>(
  tagName: K | typeof Fragment,
  props: Partial<{ [A in keyof E]: E[A] } & { children?: HTMLElement | HTMLElement[] }>,
): HTMLElementTagNameMap[K] | DocumentFragment {
  if (tagName === Fragment) {
    const fragment = document.createDocumentFragment();
    if (props?.children) {
      appendChild(fragment, props.children);
    }
    return fragment;
  }

  const element = document.createElement(tagName);

  let batchUpdate = false;
  if ('setAttrs' in element && typeof element.setAttrs === 'function') {
    // this is an internal optimisation for component that do define a one-off
    // 'setAttrs' update method. Rather than calling each 'setter' ie. `element[name] = props[name]`
    // those component can batch update in one method call.
    const cleanProps = {};
    let hasAttrs = false;
    const signals: string[] = [];
    for (const name in props) {
      const value = props[name];
      if (isSignal(value)) {
        // cleanProps[name] = value();
        signals.push(name);
      } else {
        cleanProps[name] = value;
        hasAttrs = true;
      }
    }
    if (hasAttrs) {
      element.setAttrs(cleanProps);
    }
    for (const name of signals) {
      effect(() => {
        element[name] = props[name]();
      });
    }
    batchUpdate = true;
  }

  for (const name in props) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (props as any)[name];
    if (value === undefined || value === null) {
      continue;
    }

    switch (name) {
      case 'className': {
        if (Array.isArray(value)) {
          element.classList.add(...value);
        } else if (typeof value === 'string') {
          element.classList.add(value);
        } else {
          for (const className in value) {
            const cValue = value[className];
            if (isSignal(cValue)) {
              effect(() => {
                if (cValue()) {
                  element.classList.add(className);
                } else {
                  element.classList.remove(className);
                }
              });
            } else {
              if (cValue) {
                element.classList.add(className);
              } else {
                element.classList.remove(className);
              }
            }
          }
        }
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
          Object.assign(element.style, value);
        }
        break;
      }

      default: {
        if (name.startsWith('$:')) {
          const prop = name.substring(2);
          if (prop in element) {
            effect(() => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (element as any)[prop] = value();
            });
            element.addEventListener('input', () => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              value.set((element as any)[prop]);
            });
          }
        } else if (name.startsWith('on')) {
          element.addEventListener(name.substring(2), value);
        } else if (!batchUpdate) {
          if (name in element) {
            if (isSignal(value)) {
              effect(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (element as any)[name] = value();
              });
            } else {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (element as any)[name] = value;
            }
          } else {
            if (isSignal(value)) {
              effect(() => {
                const v = value();
                element.setAttribute(name, typeof v === 'string' ? v : JSON.stringify(v));
              });
            } else {
              element.setAttribute(name, typeof value === 'string' ? value : JSON.stringify(value));
            }
          }
        }
        break;
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

  if (Array.isArray(child) || child instanceof NodeList || child instanceof HTMLCollection) {
    for (let i = 0; i < child.length; i++) {
      appendChild(parent, child[i]);
    }
  } else if (typeof child === 'string') {
    parent.appendChild(document.createTextNode(child));
  } else if (child instanceof Node) {
    parent.appendChild(child);
  } else if (isSignal(child)) {
    const value = child();
    let node: Node | undefined;
    if (value instanceof Node) {
      node = value;
      parent.appendChild(node);
    } else if (value === null || value === undefined) {
      node = undefined;
    } else {
      node = document.createTextNode(`${value}`);
      parent.appendChild(node);
    }

    effect(() => {
      const value = child();
      if (value instanceof Node) {
        if (node) {
          parent.replaceChild(value, node);
        } else {
          parent.appendChild(value);
        }
        node = value;
      } else if (node) {
        node.textContent = `${value}`;
      }
    });
  } else {
    parent.appendChild(document.createTextNode(child.toString()));
  }
}

// function toNode(value: unknown): Node | undefined {
//   switch (typeof value) {
//     case 'string':
//       return document.createTextNode(value);
//     case 'undefined':
//       return;
//     case 'object': {
//       if (value === null) {
//         return;
//       } else if (Array.isArray(value) || value instanceof NodeList || value instanceof HTMLCollection) {
//         const elements = document.createDocumentFragment();
//         for (let i = 0; i < value.length; i++) {
//           appendChild(elements, value[i]);
//         }
//         return elements;
//       } else if (value instanceof Node) {
//         return value;
//       }
//       break;
//     }
//     case 'function': {
//       if (isSignal(value)) {
//         const node = toNode(value());
//         effect(() => {
//           if (node instanceof Text) {
//             node.textContent = value() as string;
//           } else if (node instanceof Node) {

//           }
//         });
//       }
//       break;
//     }
//     default:
//       break;
//   }

//   return document.createTextNode(`${value}`);
// }

export { createElement as jsx };
export { createElement as jsxs };
export { createElement as jsxDEV };
