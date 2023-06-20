// Copied and pasted from the utils.ts at `internals/gui-webpack-react`
import { core } from '@greycat/lib-std';
import * as utils from '@greycat/utils';
import { msToTime, timeToMs } from '@greycat/utils';

export function avg(values: number[]): number {
  return values.reduce((p, n) => p + n, 0) / values.length;
}

export function std<T>(values: T[], avgFn: (values: T[]) => T, mapper: (v: T) => number): number {
  const avg = mapper(avgFn(values));
  const std =
    values
      .map(mapper)
      .map((v) => Math.pow(v - avg, 2))
      .reduce((p, n) => p + n) / values.length;
  return Math.sqrt(std);
}

export function min(values: number[]): number {
  let min = values[0];
  for (const v of values) {
    if (v < min) {
      min = v;
    }
  }
  return min;
}

export function max(values: number[]): number {
  let max = values[0];
  for (const v of values) {
    if (v > max) {
      max = v;
    }
  }
  return max;
}

export function avgTime(values: core.time[]): core.time {
  const avgMs = values.map(timeToMs).reduce((p, n) => p + n, 0) / values.length;
  return msToTime(parseInt(`${avgMs}`));
}

export function minTime(values: core.time[]): core.time {
  let min = values[0];
  for (const v of values) {
    min = utils.minTime(v, min);
  }
  return min;
}

export function maxTime(values: core.time[]): core.time {
  let max = values[0];
  for (const v of values) {
    max = utils.maxTime(v, max);
  }
  return max;
}

export function minDate(values: core.Date[]): core.Date {
  let min = Date.parse(values[0].iso);
  let minDate = values[0];
  for (const v of values) {
    const vmin = Date.parse(v.iso);
    if (vmin < min) {
      min = vmin;
      minDate = v;
    }
  }
  return minDate;
}

export function maxDate(values: core.Date[]): core.Date {
  let max = Date.parse(values[0].iso);
  let maxDate = values[0];
  for (const v of values) {
    const vmax = Date.parse(v.iso);
    if (vmax > max) {
      max = vmax;
      maxDate = v;
    }
  }
  return maxDate;
}

export function avgDate(values: core.Date[]): core.Date {
  let avgEpoch = 0;
  for (const d of values) {
    avgEpoch += Date.parse(d.iso);
  }
  avgEpoch = Math.round(avgEpoch / values.length);

  return new core.Date({ iso: new Date(avgEpoch).toISOString(), tz: values[0].tz });
}

export function metaNumber(
  values: number[],
  index = false,
  type: string = core.int._type,
): core.TableColumnMeta {
  return {
    index,
    type,
    size: values.length,
    avg: avg(values),
    max: max(values),
    min: min(values),
    std: std(values, avg, (v) => v),
  };
}

export function metaTime(values: core.time[], index = false): core.TableColumnMeta {
  return {
    index,
    type: core.time._type,
    size: values.length,
    avg: avgTime(values),
    max: maxTime(values),
    min: minTime(values),
    std: std(values, avgTime, timeToMs),
  };
}

export function metaDate(values: core.Date[], index = false): core.TableColumnMeta {
  return {
    index,
    type: core.Date._type,
    size: values.length,
    avg: avgDate(values),
    max: maxDate(values),
    min: minDate(values),
    std: std(values, avgDate, (d) => Date.parse(d.iso)),
  };
}

export function meta(data: Array<[unknown, ...number[]]>, index: number) {
  const values = data.map(([, ...columns]) => columns[index - 1]);

  const meta = {
    index: false,
    size: values.length,
    type: core.int._type,
    avg: avg(values),
    max: max(values),
    min: min(values),
    std: std(values, avg, (v) => v),
  };

  return meta;
}

export function metaString(values: Array<string>, index = false): core.TableColumnMeta {
  const meta = {
    index,
    size: values.length,
    type: core.int._type,
    min: null,
    max: null,
    avg: null,
    std: null,
  };
  return meta;
}

/**
 * Returns a random integer within the given range.
 *
 * @param min inclusive
 * @param max exclusive
 */
export function randomInt(min = 0, max = Number.MAX_SAFE_INTEGER) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function generateLinear(
  rows: number,
  cols: number,
  [min, max] = [0, 100],
): core.Table<string | number> {
  const data: Array<[string, ...number[]]> = [];
  for (let i = 0; i < rows; i++) {
    const row: [string, ...number[]] = [`sensor_${i}`];
    for (let j = 0; j < cols - 1; j++) {
      row.push(randomInt(min, max));
    }
    data.push(row);
  }

  const metas: core.TableColumnMeta[] = [
    { index: true, size: rows, type: 'core.String', avg: null, max: null, min: null, std: null },
  ];
  for (let j = 1; j < cols; j++) {
    metas.push(metaNumber(data.map(([, ...r]) => r[j - 1])));
  }
  return new core.Table({
    data,
    meta: metas,
  });
}

export function generateNumbers(seed: number, len: number, delta: number): number[] {
  const arr: number[] = new Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = randomInt(seed - delta, seed + delta) + 0.0;
  }
  return arr;
}

export function generateTimes(from: Date, step: number, len: number): core.time[] {
  let prev = from.getTime();
  const arr: core.time[] = new Array(len);
  for (let i = 0; i < len; i++) {
    const next = prev + step;
    arr[i] = msToTime(next);
    prev = next;
  }
  return arr;
}

/**
 *
 * @param rows number of rows in the table
 * @param from start timestamp in milliseconds
 * @param step in milliseconds
 * @param n number of timeserie (the table will have `n + 1` columns)
 * @param range the random int generator range (`range[0]` included, `range[1]` excluded)
 */
export function generateTimeseries(
  rows: number,
  from: number,
  step: number,
  n: number,
  [min, max] = [0, 100],
) {
  const data: Array<[core.time, ...number[]]> = [];

  let prevTime = from;
  const values = generateNumbers(min, max, n);

  for (let i = 0; i < rows; i++) {
    const row: [core.time, ...number[]] = [
      new core.time({ epoch: parseInt(`${prevTime / 1000}`), us: 0 }),
    ];
    for (let j = 0; j < n; j++) {
      values[j] = +(values[j] + Math.random() - 0.485).toFixed(2);
      row.push(values[j]);
    }
    data.push(row);
    prevTime += step;
  }

  const metas: core.TableColumnMeta[] = [
    metaTime(
      data.map(([t]) => t),
      true,
    ),
  ];
  for (let j = 1; j <= n; j++) {
    metas.push(meta(data, j));
  }
  return new core.Table({
    data,
    meta: metas,
  });
}

export function generateTimeseries2() {
  const data = Array.from(
    (function* () {
      let date = new Date('2007-04-24');
      let value = 98.84;
      for (let i = 0; i < 365 * 15; i++) {
        if (i % 7 > 5) continue; // ignore 2 days per week
        date = new Date(date.setDate(date.getDate() + 1));
        value = +(value + Math.random() - 0.485).toFixed(2);
        yield [msToTime(date), value] as const;
      }
    })(),
  );

  return new core.Table({
    data: data as unknown as unknown[][],
    meta: [
      metaTime(
        data.map((r) => r[0]),
        true,
      ),
      metaNumber(data.map((r) => r[1])),
    ],
  });
}

/**
 * This generates mock data for the predictive lines. For this to work, the data
 * provided in the table should have the first column as index === true (normally,
 * this would be the time reference).
 *
 * @param table: reference table to create predictive data from.
 * @param confidenceColsNr: number of prediction columns to be generated.
 * @param cols: original columns to construct mock predictive data.
 * @returns
 */
export function generateTimeseriesConfidence(
  table: core.Table<number | core.time | core.Tuple<number, number> | null>,
  confidenceColsNr: number,
  cols: number[],
  confidenceShift = 20,
): (number | undefined)[] {
  const CONFIDENCE_COLS: (number | undefined)[] = Array.from(new Array(confidenceColsNr)).map(
    (_, i) => cols[cols.length - 1] + 1 + i,
  );
  CONFIDENCE_COLS.push(undefined, 9); // Just for testing purposed

  type Row = (number | core.time | core.Tuple<number, number> | null)[];

  let dataConfidence: Row[] = [...table.data];
  // This is assuming that the table will be core.Table<core.Date | core.time, ...(number | core.Tuple<number, number>)>
  for (let i = 0; i < CONFIDENCE_COLS.length; i++) {
    const isColNull = !CONFIDENCE_COLS[i];
    // Generate confidence interval temporary
    // const confidenceShift = 20;
    const metaConfidence = { ...table.meta[i + 1] } as core.TableColumnMeta;
    metaConfidence.max = isColNull ? null : metaConfidence.max + confidenceShift;
    metaConfidence.min = isColNull ? null : metaConfidence.min - confidenceShift;
    if (isColNull) {
      metaConfidence.avg = null;
      metaConfidence.type = null;
      metaConfidence.std = null;
    }

    dataConfidence = dataConfidence.map((r) => {
      const newRow = [...r] as Row;
      const newValue = newRow[i + 1];
      if (isColNull) {
        newRow.push(null);
      } else if (typeof newValue === 'number') {
        newRow.push(
          new core.Tuple({ x: newValue + confidenceShift, y: newValue - confidenceShift }),
        );
      }
      return newRow;
    });

    table.meta.push(metaConfidence);
  }

  table.data = dataConfidence;

  return CONFIDENCE_COLS ?? [];
}
