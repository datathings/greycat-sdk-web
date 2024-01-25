import { core, debugLogger } from '@greycat/sdk';

export function getScrollBarWidth() {
  const inner = document.createElement('p');
  inner.style.width = '100%';
  inner.style.height = '200px';

  const outer = document.createElement('div');
  outer.style.position = 'absolute';
  outer.style.top = '0px';
  outer.style.left = '0px';
  outer.style.visibility = 'hidden';
  outer.style.width = '200px';
  outer.style.height = '150px';
  outer.style.overflow = 'hidden';
  outer.appendChild(inner);

  document.body.appendChild(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  let w2 = inner.offsetWidth;
  if (w1 == w2) {
    w2 = outer.clientWidth;
  }

  document.body.removeChild(outer);

  return w1 - w2;
}

/**
 * *If you want to call this function multiple times in a row, prefer `getCSSVars()`, as it only calls `getComputedStyle()` once*
 *
 * @param name the variable name to read
 * @param el the element to get the computed styles from (defaults to `document.body`)
 * @returns
 */
export function getCSSVar(name: string, el: HTMLElement = document.body): string | undefined {
  const s = getComputedStyle(el);
  const value = s.getPropertyValue(name).trim();
  return value.length ? value : undefined;
}

/**
 * Returns multiple values from the given names.
 *
 * *You should use this instead of `getCSSVar` if you want more than one color, because it only calls `getComputedStyle()` once (which is the bottleneck)*
 *
 * @param el the element to get the computed styles from (defaults to `document.body`)
 * @param names the variable names to read
 */
export function getCSSVars(
  el: HTMLElement = document.body,
  ...names: string[]
): Array<string | undefined> {
  const s = getComputedStyle(el);
  const values: Array<string | undefined> = [];
  for (let i = 0; i < names.length; i++) {
    const value = s.getPropertyValue(names[i]).trim();
    values.push(value.length ? value : undefined);
  }
  return values;
}

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
  const colors = [
    s.getPropertyValue('--color-0').trim(),
    s.getPropertyValue('--color-1').trim(),
    s.getPropertyValue('--color-2').trim(),
    s.getPropertyValue('--color-3').trim(),
    s.getPropertyValue('--color-4').trim(),
    s.getPropertyValue('--color-5').trim(),
    s.getPropertyValue('--color-6').trim(),
    s.getPropertyValue('--color-7').trim(),
    s.getPropertyValue('--color-8').trim(),
    s.getPropertyValue('--color-9').trim(),
    s.getPropertyValue('--color-10').trim(),
    s.getPropertyValue('--color-11').trim(),
    s.getPropertyValue('--color-12').trim(),
  ];
  return colors;
}

export function getHeatmapColors(el?: HTMLElement): string[] {
  const s = getComputedStyle(el ?? document.body);
  const colors = [
    s.getPropertyValue('--color-8').trim(),
    s.getPropertyValue('--color-9').trim(),
    s.getPropertyValue('--color-0').trim(),
    s.getPropertyValue('--color-3').trim(),
    s.getPropertyValue('--color-2').trim(),
    s.getPropertyValue('--color-12').trim(),
  ];
  return colors;
}

export function isNumberColumn(meta: core.TableColumnMeta): boolean {
  return meta.$type.name === 'core::int' || meta.$type.name === 'core::float';
}

// source: https://stackoverflow.com/questions/9453421/how-to-round-float-numbers-in-javascript
export function round(value: number, precision: number) {
  if (Number.isInteger(precision)) {
    const shift = Math.pow(10, precision);
    // Limited preventing decimal issue
    return Math.round(value * shift + 0.00000000000001) / shift;
  } else {
    return Math.round(value);
  }
}

export function emptyDataElement(cssClass: string) {
  const incompleteTableEl = document.createElement('div');
  incompleteTableEl.classList.add(cssClass);
  incompleteTableEl.classList.add('gui-chart-incomplete');
  incompleteTableEl.style.position = 'absolute';
  incompleteTableEl.style.inset = '0';
  incompleteTableEl.style.width = '100%';
  incompleteTableEl.style.height = '100%';
  incompleteTableEl.style.display = 'flex';
  incompleteTableEl.style.alignItems = 'center';
  incompleteTableEl.style.justifyContent = 'center';
  incompleteTableEl.style.fontSize = '1em';
  incompleteTableEl.style.textAlign = 'center';
  incompleteTableEl.style.color = getCSSVar('--color-9') ?? 'inherit';
  incompleteTableEl.textContent = `Table is empty or is missing an index`;
  return incompleteTableEl;
}

/**
 * Similar to `greycat.putFile()` but leveraging `XMLHttpRequest` to get progress in browser context.
 *
 * @param file the File to upload
 * @param filepath if defined, will upload the file at that path. Falls back to `file.name` otherwise.
 * @param progress a callback called on progress
 * @param greycat
 *
 * @returns a `start` function that returns a `Promise` that resolves when the upload is complete, and a `stop` function that aborts the upload.
 *
 */
export function putFileProgress(
  file: File,
  filepath: string | null = file.name,
  progress: (ev: ProgressEvent<XMLHttpRequestEventTarget>) => void = () => void 0,
  g = greycat.default,
): { start: () => Promise<void>; stop: () => void } {
  const xhr = new XMLHttpRequest();

  const stop = () => {
    xhr.abort();
  };
  const start = () =>
    new Promise<void>((resolve, reject) => {
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
          debugLogger(xhr.status, route);
          reject(new Error('forbidden'));
        } else if (xhr.status === 401) {
          // unauthorized
          debugLogger(xhr.status, route);
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

  return { start, stop };
}

export function getIndexInParent(element: Element): number {
  const parent = element.parentElement;

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
