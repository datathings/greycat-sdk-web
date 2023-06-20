import { core } from "@greycat/lib-std";

export type Disposable = () => void;

export function stripOffset(iso: string): string {
  for (let i = iso.length - 1; i >= 0; i--) {
    if (iso[i] === '+' || iso[i] === '-') {
      return iso.slice(0, i);
    }
  }
  return iso;
}

export enum ScaleType {
  linear,
  log,
}

type GuiHTMLElement<K extends keyof HTMLElementTagNameMap> = Omit<
  HTMLElementTagNameMap[K],
  'style'
> & {
  style: Partial<CSSStyleDeclaration>;
};

type ElementProps<K extends keyof HTMLElementTagNameMap> = GuiHTMLElement<K> & {
  content: string | HTMLElement | DocumentFragment | Array<HTMLElement | DocumentFragment>;
  classes: string[];
};

/**
 * A utility "React"-ish like factory function to allow inline declarative building
 * of DOM element.
 *
 * @param tagName
 * @param props
 * @returns
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  props: Partial<ElementProps<K>> = {},
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tagName);
  const { content, classes, style, ...rest } = props;
  if (classes) {
    el.classList.add(...classes);
  }
  if (style) {
    Object.assign(el.style, style);
  }
  if (content) {
    if (typeof content === 'string') {
      el.textContent = content;
    } else if (content instanceof Array) {
      el.append(...content);
    } else {
      el.appendChild(content);
    }
  }
  Object.assign(el, rest);
  return el;
}

export type TableClassColumnMeta = core.TableColumnMeta & { class?: string };