/**
 * Returns the parsed values from the `getCSSVars` and `getCSSVar` values.
 * The use case is the usage of CSS vars in class chart components in Greycat.
 * This means that we should provide the initialized value `defaultValue`, as it
 * will used to determine the return type and to default in case the `cssVarString`
 * is not valid.
 *
 * The type might need to be casted on the return value, where the function is used.
 *
 * @param cssVarString the CSS var in `string` format to be parsed.
 * @param defaultValue
 * @returns `unknown`
 */
export function parseCssVar<T>(cssVarString: string, defaultValue: T): T {
  /** If the string.length === 0 then it means that no value was returned, that's the first check. */
  if (cssVarString.length > 0) {
    /** Then we check for the type. */
    switch (typeof defaultValue) {
      case 'string':
        return String(cssVarString) as unknown as T; // We need to cast a generic type to work, but we make sure it's consistent
      case 'number':
        return Number(cssVarString) as unknown as T; // We need to cast a generic type to work, but we make sure it's consistent
      default: {
        // return JSON.parse(cssVarString) as T;
        // In case it is a dasharray [i, j]
        const dasharrayValues = cssVarString.split(' ').map((i) => Number(i));
        const arr = [...dasharrayValues];
        return arr as unknown as T;
      }
    }
  } else return defaultValue;
}

/**
 * It automatically processes the CSS vars within a component.
 *
 * You have to make sure that the order in `getCSSVars` method
 * matches the initialization order in the class component.
 *
 * Additionally, the component properties must be names with a `"Css"`
 * ending in order for this to properly identify and process them.
 *
 */
export const processCssVars = (component: HTMLElement, cssVars: (string | undefined)[]) => {
  /**
   * First check that both object CSS properties and in-function CSS vars arrays are of the same length.
   */
  const propNames = Object.getOwnPropertyNames(component).filter((propName) =>
    propName.endsWith('Css'),
  );
  if (propNames.length !== cssVars.length) {
    return;
  }
  // Process the styles for each prop name.
  propNames.forEach((propName, index) => {
    const value = component[propName as keyof typeof component];
    const cssVar = cssVars[index];
    if (cssVar) {
      const newValue = parseCssVar<typeof value>(cssVar, value);
      Object.assign(component, { [propName]: newValue });
    }
  });
};

export function getColors(el?: HTMLElement): string[] {
  const s = getComputedStyle(el ?? document.body);
  const defaultColor = s.getPropertyValue('--color') || 'inherit';
  const colors = [
    s.getPropertyValue('--color-0').trim() || defaultColor,
    s.getPropertyValue('--color-1').trim() || defaultColor,
    s.getPropertyValue('--color-2').trim() || defaultColor,
    s.getPropertyValue('--color-3').trim() || defaultColor,
    s.getPropertyValue('--color-4').trim() || defaultColor,
    s.getPropertyValue('--color-5').trim() || defaultColor,
    s.getPropertyValue('--color-6').trim() || defaultColor,
    s.getPropertyValue('--color-7').trim() || defaultColor,
    s.getPropertyValue('--color-8').trim() || defaultColor,
    s.getPropertyValue('--color-9').trim() || defaultColor,
    s.getPropertyValue('--color-10').trim() || defaultColor,
    s.getPropertyValue('--color-11').trim() || defaultColor,
    s.getPropertyValue('--color-12').trim() || defaultColor,
  ];
  return colors;
}

export function getHeatmapColors(el?: HTMLElement): string[] {
  const s = getComputedStyle(el ?? document.body);
  const defaultColor = s.getPropertyValue('--color') || 'inherit';
  const colors = [
    s.getPropertyValue('--color-8').trim() || defaultColor,
    s.getPropertyValue('--color-9').trim() || defaultColor,
    s.getPropertyValue('--color-0').trim() || defaultColor,
    s.getPropertyValue('--color-3').trim() || defaultColor,
    s.getPropertyValue('--color-2').trim() || defaultColor,
    s.getPropertyValue('--color-12').trim() || defaultColor,
  ];
  return colors;
}

/**
 * Similar to `gc.putFile()` but leveraging `XMLHttpRequest` to get progress in browser context.
 *
 * @param file the File to upload
 * @param filepath if defined, will upload the file at that path. Falls back to `file.name` otherwise.
 * @param progress a callback called on progress
 * @param greycat
 */
export function putFileProgress(
  file: File,
  filepath: string | null = file.name,
  progress: (ev: ProgressEvent<XMLHttpRequestEventTarget>) => void = () => void 0,
  g: gc.sdk.GreyCat = gc.$.default,
): Promise<void> & { abort: () => void } {
  const xhr = new XMLHttpRequest();

  const promise = new Promise<void>((resolve, reject) => {
    const route = `files/${filepath}`;
    xhr.open('PUT', `${g.api}/${route}`, true);

    // Track upload progress
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        progress(event);
      }
    });

    // Handle success and failure
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else if (xhr.status === 403) {
        // forbidden
        // unauthorized
        g.logger(g.name, xhr.status, route);
        reject(new Error('forbidden'));
      } else if (xhr.status === 401) {
        // unauthorized
        g.logger(g.name, xhr.status, route);
        g.token = undefined;
        g.unauthorizedHandler?.();
        reject(new Error(`you must be logged-in to upload files`));
      } else {
        reject(new Error(`File upload failed with status ${xhr.status}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during file upload'));
    };

    // Send the file
    xhr.send(file);
  });

  const cancellablePromise = promise as Promise<void> & { abort: () => void };
  cancellablePromise.abort = () => xhr.abort();

  return cancellablePromise;
}

export function getIndexInParent(element: Node): number {
  const parent = element.parentNode;

  if (!parent) {
    return -1;
  }

  let index = 0;
  let current = parent.firstElementChild;

  while (current) {
    if (current === element) {
      return index;
    }

    current = current.nextElementSibling;
    index++;
  }

  return index;
}

export function greycatTypeFromValueStr(value: unknown, g: gc.sdk.GreyCat = gc.$.default): string {
  switch (typeof value) {
    case 'bigint':
    case 'number':
      return gc.core.int._type;
    case 'boolean':
      return 'core::boolean';
    case 'string':
      return gc.core.String._type;
    case 'object': {
      if (Array.isArray(value)) {
        return value.$type?.name ?? gc.core.Array._type;
      } else if (value instanceof Map) {
        return value.$type?.name ?? gc.core.Map._type;
      } else if (value instanceof gc.sdk.GCObject) {
        return g.abi.types[value.$type.mapped_type_off].name;
      }
      return 'core::any';
    }
    default:
      return 'core::any';
  }
}

export type GreyCatValueTypeOptions = {
  g?: gc.sdk.GreyCat;
  stripCore?: boolean;
};

export const DEFAULT_GREYCAT_VALUE_TYPE_OPTIONS: GreyCatValueTypeOptions = {
  g: gc.$.default,
  stripCore: false,
};

const STRIP_CORE = /core::/g;

export function greycatValueType(value: unknown, options: GreyCatValueTypeOptions = {}): string {
  options = { ...DEFAULT_GREYCAT_VALUE_TYPE_OPTIONS, ...options };
  const type = greycatTypeFromValueStr(value, options.g);
  if (options.stripCore) {
    return type.replaceAll(STRIP_CORE, '');
  }
  return type;
}

/**
 * Returns either `'dark'` or `'light'` depending on the current document's theme.
 *
 * @returns the current theme of the document
 */
export function currentTheme(): 'dark' | 'light' {
  const is_dark = document.documentElement.classList.contains('sl-theme-dark');
  const is_light = document.documentElement.classList.contains('sl-theme-light');
  if (is_dark || (!is_dark && !is_light)) {
    return 'dark';
  }
  return 'light';
}

/**
 * Toggles the current `document`'s theme from/to dark to light
 */
export function toggleTheme() {
  switch (currentTheme()) {
    case 'dark': {
      document.documentElement.classList.remove('sl-theme-dark');
      document.documentElement.classList.add('sl-theme-light');
      break;
    }
    case 'light': {
      document.documentElement.classList.remove('sl-theme-light');
      document.documentElement.classList.add('sl-theme-dark');
      break;
    }
  }
}

export function svg(svg: string, className?: string): SVGSVGElement {
  const parser = new DOMParser();
  const d = parser.parseFromString(svg, 'image/svg+xml');
  const el = d.children[0] as SVGSVGElement;
  if (className) {
    el.classList.add(className);
  }
  return el;
}

export function querySelectorAllWithShadow<K extends keyof HTMLElementTagNameMap>(
  selectors: K,
  root?: Document | HTMLElement | ShadowRoot,
  elements?: Element[],
): Array<HTMLElementTagNameMap[K]>;
export function querySelectorAllWithShadow<K extends keyof SVGElementTagNameMap>(
  selectors: K,
  root?: Document | HTMLElement | ShadowRoot,
  elements?: Element[],
): Array<SVGElementTagNameMap[K]>;
export function querySelectorAllWithShadow<E extends Element = Element>(
  selectors: string,
  root?: Document | HTMLElement | ShadowRoot,
  elements?: Element[],
): Array<E>;
export function querySelectorAllWithShadow(
  selector: string,
  root: Document | HTMLElement | ShadowRoot = document,
  elements: Element[] = [],
) {
  // TODO this should not allocate, it should return an iterator over all the iterators to prevent heavy allocations
  root.querySelectorAll(selector).forEach((el) => elements.push(el));
  root.querySelectorAll('*').forEach((el) => {
    if (el.shadowRoot) {
      querySelectorAllWithShadow(selector, el.shadowRoot, elements);
    }
  });
  return elements;
}

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

function span(cls: string, text: string): HTMLSpanElement {
  const el = document.createElement('span');
  el.className = cls;
  el.textContent = text;
  return el;
}

export function highlightJSON(obj: unknown, depth: number, el: Node): void {
  const indent = '  '.repeat(depth);
  const indent1 = '  '.repeat(depth + 1);
  if (obj === null) {
    el.appendChild(span('tok-null', 'null'));
  } else if (typeof obj === 'boolean') {
    el.appendChild(span('tok-bool', String(obj)));
  } else if (typeof obj === 'number') {
    el.appendChild(span('tok-num', String(obj)));
  } else if (typeof obj === 'string') {
    el.appendChild(span('tok-str', `"${obj}"`));
  } else if (Array.isArray(obj)) {
    el.appendChild(span('tok-brace', '['));
    if (obj.length > 0) {
      el.appendChild(document.createTextNode('\n'));
      for (let i = 0; i < obj.length; i++) {
        el.appendChild(document.createTextNode(indent1));
        highlightJSON(obj[i], depth + 1, el);
        if (i < obj.length - 1) el.appendChild(span('tok-brace', ','));
        el.appendChild(document.createTextNode('\n'));
      }
      el.appendChild(document.createTextNode(indent));
    }
    el.appendChild(span('tok-brace', ']'));
  } else if (typeof obj === 'object') {
    const keys = Object.keys(obj as Record<string, unknown>);
    el.appendChild(span('tok-brace', '{'));
    if (keys.length > 0) {
      el.appendChild(document.createTextNode('\n'));
      for (let i = 0; i < keys.length; i++) {
        el.appendChild(document.createTextNode(indent1));
        el.appendChild(span('tok-key', `"${keys[i]}"`));
        el.appendChild(span('tok-brace', ': '));
        highlightJSON((obj as Record<string, unknown>)[keys[i]], depth + 1, el);
        if (i < keys.length - 1) el.appendChild(span('tok-brace', ','));
        el.appendChild(document.createTextNode('\n'));
      }
      el.appendChild(document.createTextNode(indent));
    }
    el.appendChild(span('tok-brace', '}'));
  }
}

export function highlightGCL(raw: string): Node {
  const frag = document.createDocumentFragment();
  let depth = 0;
  let i = 0;
  const len = raw.length;
  while (i < len) {
    const ch = raw[i];
    if (ch === '{' || ch === '[') {
      frag.appendChild(span('tok-brace', ch));
      depth++;
      frag.appendChild(document.createTextNode('\n' + '  '.repeat(depth)));
      i++;
    } else if (ch === '}' || ch === ']') {
      depth = Math.max(0, depth - 1);
      frag.appendChild(document.createTextNode('\n' + '  '.repeat(depth)));
      frag.appendChild(span('tok-brace', ch));
      i++;
    } else if (ch === ',') {
      frag.appendChild(span('tok-brace', ','));
      frag.appendChild(document.createTextNode('\n' + '  '.repeat(depth)));
      i++;
    } else if (ch === '"') {
      let end = i + 1;
      while (end < len && raw[end] !== '"') {
        if (raw[end] === '\\') end++;
        end++;
      }
      end++;
      frag.appendChild(span('tok-str', raw.substring(i, end)));
      i = end;
    } else if (ch === ':') {
      frag.appendChild(span('tok-brace', ':'));
      i++;
    } else if (ch === '-' || (ch >= '0' && ch <= '9')) {
      let end = i + 1;
      while (end < len && /[\d.eE+-]/.test(raw[end])) end++;
      frag.appendChild(span('tok-num', raw.substring(i, end)));
      i = end;
    } else if (raw.substring(i, i + 4) === 'null') {
      frag.appendChild(span('tok-null', 'null'));
      i += 4;
    } else if (raw.substring(i, i + 4) === 'true') {
      frag.appendChild(span('tok-bool', 'true'));
      i += 4;
    } else if (raw.substring(i, i + 5) === 'false') {
      frag.appendChild(span('tok-bool', 'false'));
      i += 5;
    } else if (/[A-Z]/.test(ch)) {
      let end = i + 1;
      while (
        end < len &&
        raw[end] !== '{' &&
        raw[end] !== ',' &&
        raw[end] !== '}' &&
        raw[end] !== ']'
      )
        end++;
      frag.appendChild(span('tok-type', raw.substring(i, end)));
      i = end;
    } else if (/[a-z_]/.test(ch)) {
      let end = i + 1;
      while (end < len && /[a-zA-Z0-9_]/.test(raw[end])) end++;
      frag.appendChild(span('tok-key', raw.substring(i, end)));
      i = end;
    } else {
      frag.appendChild(document.createTextNode(ch));
      i++;
    }
  }
  return frag;
}

export function highlight(raw: string): Node {
  const frag = document.createDocumentFragment();
  if (!raw) {
    return frag;
  }
  try {
    const parsed = JSON.parse(raw);
    highlightJSON(parsed, 0, frag);
    return frag;
  } catch {
    if (raw.includes('{') || raw.includes('[')) {
      return highlightGCL(raw);
    }
    frag.appendChild(document.createTextNode(raw));
    return frag;
  }
}
