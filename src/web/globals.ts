// default number format
let numFmt = new Intl.NumberFormat(navigator.language, {
});

export function getGlobalNumberFormat(): Intl.NumberFormat {
  return numFmt;
}

export function setGlobalNumberFormat(fmt: Intl.NumberFormat) {
  numFmt = fmt;
}

export type Globals = {
  numFmt: ReturnType<typeof getGlobalNumberFormat>;
};

export function setGlobals(globals: Partial<Globals>) {
  if (globals.numFmt) {
    setGlobalNumberFormat(globals.numFmt);
  }
}

export function getGlobals(): Globals {
  return { numFmt };
}
