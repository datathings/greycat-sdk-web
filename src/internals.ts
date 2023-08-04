import { core } from '@greycat/sdk';
import { TableLike } from './components';

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

// TODO we should most likely use 'lodash.throttle' here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => void>(callback: T, interval: number) {
  let enableCall = true;

  return function <U>(this: U, ...args: Parameters<typeof callback>) {
    if (!enableCall) {
      return;
    }

    enableCall = false;
    callback.apply(this, args);
    setTimeout(() => (enableCall = true), interval);
  };
}

// TODO we should most likely use 'lodash.debounce' here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
  immediate = false,
) {
  let debounceTimeoutId: ReturnType<typeof setTimeout> | undefined;

  return function <U>(this: U, ...args: Parameters<typeof callback>) {
    clearTimeout(debounceTimeoutId);
    debounceTimeoutId = setTimeout(() => callback.apply(this, args), delay);

    if (immediate) {
      callback.apply(this, args);
    }
  };
}

export function closest(
  table: TableLike,
  col: number | undefined,
  v: number,
): { xValue: number; rowIdx: number } {
  let rowIdx = 0;
  let res = 0;
  let distance: number | null = null;
  for (let i = 0; i < table.data.length; i++) {
    const x = col === undefined ? i : table.data[i][col];
    if (x === v) {
      return { xValue: x, rowIdx: i };
    }
    const d2 = Math.abs(x - v);
    if (distance == null || distance > d2) {
      rowIdx = i;
      res = x;
      distance = d2;
    } else if (distance != null && x > v && distance < d2) {
      return { xValue: res, rowIdx };
    }
  }
  return { xValue: res, rowIdx };
}

export type TableClassColumnMeta = core.TableColumnMeta & { class?: string };
