import { core } from '@greycat/sdk';

// default number format
let numFmt = new Intl.NumberFormat(navigator.language);
// default datetime format, we force 2-digit to improve readability
let dateFmt = new Intl.DateTimeFormat(navigator.language, {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZoneName: 'longOffset',
  timeZone: 'UTC',
});

export function getGlobalDateTimeFormat(): Intl.DateTimeFormat {
  return dateFmt;
}

export function setGlobalDateTimeFormat(fmt: Intl.DateTimeFormat) {
  dateFmt = fmt;
}

export function setGlobalDateTimeFormatTimezone(tz: core.TimeZone) {
  const opts = dateFmt.resolvedOptions();
  dateFmt = new Intl.DateTimeFormat(opts.locale, {
    ...(opts as Intl.DateTimeFormatOptions),
    timeZone: tz.key.replace('_', '/'),
  });
}

export function getGlobalDateTimeFormatTimezone($g = greycat.default): core.TimeZone | undefined {
  const opts = dateFmt.resolvedOptions();
  if (opts.timeZone.length > 0) {
    const tz = core.TimeZone[opts.timeZone.replace('/', '_') as core.TimeZone.Field];
    if (tz) {
      return tz($g);
    }
  }
  return;
}

export function getGlobalNumberFormat(): Intl.NumberFormat {
  return numFmt;
}

export function setGlobalNumberFormat(fmt: Intl.NumberFormat) {
  numFmt = fmt;
}

export type Globals = {
  dateFmt: ReturnType<typeof getGlobalDateTimeFormat>;
  numFmt: ReturnType<typeof getGlobalNumberFormat>;
};

export function setGlobals(globals: Partial<Globals>) {
  if (globals.numFmt) {
    setGlobalNumberFormat(globals.numFmt);
  }
  if (globals.dateFmt) {
    setGlobalDateTimeFormat(globals.dateFmt);
  }
}

export function getGlobals(): Globals {
  return { dateFmt, numFmt };
}
