import type { SerieTableColumn } from '../chart/types.js';
import { smartTimeFormatSpecifier, tableGetCell } from '../chart/utils.js';
import { vMap } from '../chart/internals.js';
import type { Chart2Axis, Chart2Config, Chart2Serie } from './types.js';

export const DEFAULT_GRID = { top: 30, right: 15, bottom: 0, left: 15, containLabel: true };

/**
 * Computes the effective grid, accounting for slider dataZoom needing extra bottom space.
 */
export function getEffectiveGrid(config: Chart2Config): Record<string, number | string | boolean> {
  const hasSlider = config.dataZoom?.enabled && (config.dataZoom.type === 'slider' || config.dataZoom.type === 'both');
  const defaults = hasSlider && config.grid?.bottom === undefined ? { ...DEFAULT_GRID, bottom: 50 } : DEFAULT_GRID;
  return { ...defaults, ...config.grid };
}

export interface Chart2ThemeColors {
  textColor: string;
  bgColor: string;
  borderColor: string;
}

/**
 * Reads the current theme colors from CSS custom properties.
 */
export function getThemeColors(el?: HTMLElement): Chart2ThemeColors {
  const s = getComputedStyle(el ?? document.body);
  return {
    textColor: s.getPropertyValue('--color').trim() || '#eaeaea',
    bgColor: s.getPropertyValue('--bg-1').trim() || '#181818',
    borderColor: `rgba(${s.getPropertyValue('--text-0').trim() || '255, 255, 255'}, 0.15)`,
  };
}

/**
 * Builds a full ECharts option from a `gc.core.Table`, a `Chart2Config`, and a color palette.
 */
export function buildEChartsOption(
  table: gc.core.Table,
  config: Chart2Config,
  colors: string[],
  theme: Chart2ThemeColors,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> {
  const xAxes = normalizeAxes(config.xAxis);
  const yAxes = normalizeAxes(config.yAxis);

  const rows = table.cols.length > 0 ? table.cols[0].length : 0;

  // determine if x-axis is category type
  const xAxisIsCategory = xAxes.length > 0 && xAxes[0].type === 'category';
  const xCol: SerieTableColumn = config.xCol ?? 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const series: Record<string, any>[] = [];
  for (let i = 0; i < config.series.length; i++) {
    const s = config.series[i];
    if (s.hide) {
      continue;
    }
    series.push(buildSerie(table, config, s, i, rows, colors, xAxisIsCategory));
  }

  // compute x-axis time span for smart formatting
  let xTimeSpan = 0;
  if (rows > 1 && !xAxisIsCategory) {
    const first = vMap(tableGetCell(table, xCol, 0));
    const last = vMap(tableGetCell(table, xCol, rows - 1));
    xTimeSpan = Math.abs(last - first);
  }

  const { textColor, bgColor, borderColor } = theme;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const builtXAxes = xAxes.map((a) => buildAxis(a, textColor, borderColor, xTimeSpan));

  // for category axes, populate xAxis.data from the table column
  if (xAxisIsCategory && builtXAxes.length > 0) {
    const catData: string[] = [];
    for (let r = 0; r < rows; r++) {
      catData.push(String(tableGetCell(table, xCol, r) ?? ''));
    }
    builtXAxes[0].data = catData;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const option: Record<string, any> = {
    color: colors,
    animation: false,
    backgroundColor: 'transparent',
    textStyle: { color: textColor },
    xAxis: builtXAxes,
    yAxis: yAxes.map((a) => buildAxis(a, textColor, borderColor, 0)),
    series,
  };

  // tooltip
  if (config.tooltip?.enabled !== false) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tooltip: Record<string, any> = {
      show: true,
      trigger: config.tooltip?.trigger ?? 'axis',
      backgroundColor: bgColor,
      borderColor,
      textStyle: { color: textColor },
      confine: true,
    };
    if (config.tooltip?.formatter) {
      tooltip.formatter = config.tooltip.formatter;
    } else {
      // default formatter for time axes: use printTime instead of native JS Date
      const xAxisIsTime = xAxes.length > 0 && xAxes[0].type === 'time';
      if (xAxisIsTime) {
        const tz = xAxes[0].timezone;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tooltip.formatter = (params: any) => {
          const arr = Array.isArray(params) ? params : [params];
          if (arr.length === 0) {
            return '';
          }
          const axisVal = arr[0].axisValue ?? (Array.isArray(arr[0].value) ? arr[0].value[0] : undefined);
          const header =
            typeof axisVal === 'number'
              ? gc.$.default.printTime(gc.core.time.fromMs(Math.round(axisVal)), tz)
              : String(axisVal ?? '');
          let html = header;
          for (const p of arr) {
            const y = Array.isArray(p.value) ? p.value[1] : p.value;
            html += `<br/>${p.marker} ${p.seriesName}: <strong>${y}</strong>`;
          }
          return html;
        };
      }
    }
    option.tooltip = tooltip;
  }

  // legend
  if (config.legend?.enabled !== false) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const legend: Record<string, any> = {
      show: true,
      textStyle: { color: textColor },
    };
    switch (config.legend?.position) {
      case 'bottom':
        legend.bottom = 0;
        break;
      case 'left':
        legend.left = 0;
        legend.orient = 'vertical';
        break;
      case 'right':
        legend.right = 0;
        legend.orient = 'vertical';
        break;
      default:
        legend.top = 0;
        break;
    }
    option.legend = legend;
  }

  // dataZoom
  if (config.dataZoom?.enabled) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const zooms: Record<string, any>[] = [];
    const zoomType = config.dataZoom.type ?? 'inside';
    if (zoomType === 'inside' || zoomType === 'both') {
      zooms.push({ type: 'inside' });
    }
    if (zoomType === 'slider' || zoomType === 'both') {
      zooms.push({
        type: 'slider',
        textStyle: { color: textColor },
        borderColor,
        dataBackground: {
          lineStyle: { color: borderColor },
          areaStyle: { color: borderColor },
        },
      });
    }
    option.dataZoom = zooms;
  }

  // grid
  option.grid = getEffectiveGrid(config);

  // deep merge echarts overrides
  if (config.echarts) {
    deepMerge(option, config.echarts);
  }

  return option;
}

function buildSerie(
  table: gc.core.Table,
  config: Chart2Config,
  s: Chart2Serie,
  idx: number,
  rows: number,
  colors: string[],
  xAxisIsCategory: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> {
  const type = s.type ?? 'line';
  const xCol: SerieTableColumn = s.xCol ?? config.xCol ?? 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const serie: Record<string, any> = {
    type,
    name: s.title ?? `Serie ${idx}`,
    yAxisIndex: s.yAxisIndex ?? 0,
  };

  const serieColor = s.color ?? colors[idx % colors.length];
  if (type === 'boxplot') {
    // boxplot: semi-transparent fill so borders and median line are clearly visible
    serie.itemStyle = { color: withAlpha(serieColor, 0.3), borderColor: serieColor };
  } else {
    serie.itemStyle = { color: serieColor };
    serie.lineStyle = { color: serieColor };
  }

  if (s.lineWidth !== undefined) {
    serie.lineStyle = { ...serie.lineStyle, width: s.lineWidth };
  }

  if (s.symbolSize !== undefined) {
    serie.symbolSize = s.symbolSize;
  } else if (type === 'line') {
    serie.showSymbol = false;
  }

  if (s.smooth) {
    serie.smooth = true;
  }

  if (s.step) {
    serie.step = s.step;
  }

  if (s.stack) {
    serie.stack = s.stack;
  }

  if (s.areaStyle) {
    if (typeof s.areaStyle === 'boolean') {
      serie.areaStyle = {};
    } else {
      serie.areaStyle = s.areaStyle;
    }
  }

  // build data
  if (type === 'candlestick' && s.candleCols) {
    const data: number[][] = [];
    for (let r = 0; r < rows; r++) {
      const ohlc = [
        vMap(tableGetCell(table, s.candleCols[0], r)),
        vMap(tableGetCell(table, s.candleCols[1], r)),
        vMap(tableGetCell(table, s.candleCols[2], r)),
        vMap(tableGetCell(table, s.candleCols[3], r)),
      ];
      if (xAxisIsCategory) {
        data.push(ohlc);
      } else {
        // time/value axis: prepend x value
        data.push([vMap(tableGetCell(table, xCol, r)), ...ohlc]);
      }
    }
    serie.data = data;
  } else if (type === 'heatmap' && s.valueCol !== undefined) {
    // heatmap: [x, y, value] triples
    const data: [number, number, number][] = [];
    for (let r = 0; r < rows; r++) {
      const x = vMap(tableGetCell(table, xCol, r));
      const y = vMap(tableGetCell(table, s.yCol, r));
      const v = vMap(tableGetCell(table, s.valueCol, r));
      data.push([x, y, v]);
    }
    serie.data = data;
  } else if (type === 'pie') {
    const data: { value: number; name: string }[] = [];
    for (let r = 0; r < rows; r++) {
      const v = vMap(tableGetCell(table, s.yCol, r));
      const name = String(tableGetCell(table, xCol, r) ?? r);
      data.push({ value: v, name });
    }
    serie.data = data;
  } else if (xAxisIsCategory) {
    // category axis: just y values (x is provided via xAxis.data)
    const data: number[] = [];
    for (let r = 0; r < rows; r++) {
      data.push(vMap(tableGetCell(table, s.yCol, r)));
    }
    serie.data = data;
  } else {
    const data: [number, number][] = [];
    for (let r = 0; r < rows; r++) {
      const x = vMap(tableGetCell(table, xCol, r));
      const y = vMap(tableGetCell(table, s.yCol, r));
      data.push([x, y]);
    }
    serie.data = data;
  }

  // merge user echarts overrides
  if (s.echarts) {
    deepMerge(serie, s.echarts);
  }

  return serie;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildAxis(axis: Chart2Axis, textColor: string, borderColor: string, timeSpan: number): Record<string, any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: Record<string, any> = {
    type: axis.type ?? 'value',
    axisLine: { lineStyle: { color: borderColor } },
    axisTick: { lineStyle: { color: borderColor } },
    splitLine: { lineStyle: { color: borderColor } },
    axisLabel: { color: textColor },
    nameTextStyle: { color: textColor },
  };

  if (axis.name) {
    result.name = axis.name;
  }
  if (axis.min !== undefined) {
    result.min = axis.min;
  }
  if (axis.max !== undefined) {
    result.max = axis.max;
  }
  if (axis.position) {
    result.position = axis.position;
  }
  if (axis.axisLabel) {
    if (axis.axisLabel.formatter) {
      result.axisLabel.formatter = axis.axisLabel.formatter;
    }
    if (axis.axisLabel.rotate !== undefined) {
      result.axisLabel.rotate = axis.axisLabel.rotate;
    }
  }

  // time axis: better default formatting (only if user didn't set a custom formatter)
  if (axis.type === 'time' && !axis.axisLabel?.formatter) {
    if (axis.timezone) {
      const tz = axis.timezone;
      result.axisLabel = {
        ...result.axisLabel,
        formatter: (value: number) => gc.$.default.printTime(gc.core.time.fromMs(Math.round(value)), tz),
      };
    } else {
      const fmt = smartTimeFormatSpecifier(timeSpan);
      result.axisLabel = {
        ...result.axisLabel,
        formatter: (value: number) => gc.$.default.printTime(gc.core.time.fromMs(Math.round(value)), undefined, fmt),
      };
    }
  }

  // merge raw echarts overrides
  if (axis.echarts) {
    deepMerge(result, axis.echarts);
  }

  return result;
}

function normalizeAxes(axes: Chart2Axis | Chart2Axis[] | undefined): Chart2Axis[] {
  if (!axes) {
    return [{}];
  }
  if (Array.isArray(axes)) {
    return axes.length === 0 ? [{}] : axes;
  }
  return [axes];
}

/**
 * Auto-infer a Chart2Config from a table structure.
 */
export function inferConfig2(table: gc.core.Table): Chart2Config {
  const config: Chart2Config = {
    series: [],
    tooltip: { enabled: true, trigger: 'axis' },
    legend: { enabled: true },
    dataZoom: { enabled: true, type: 'inside' },
  };

  if (table.cols.length === 0 || table.cols[0].length === 0) {
    return config;
  }

  // typed table: use ABI metadata for FQN-based column mapping
  if (table.initialValue?.$type) {
    const arrTy = table.initialValue.$type;
    if (arrTy.generic_abi_type !== 0) {
      const elemTy = arrTy.abi.types[arrTy.g1()];
      let timeCol: gc.sdk.AbiAttribute | undefined;
      for (let i = 0; i < elemTy.attrs.length; i++) {
        const attr = elemTy.attrs[i];
        if (attr.sbi_type === gc.sdk.PrimitiveType.time) {
          timeCol = attr;
          config.xAxis = { type: 'time' };
          break;
        }
      }

      if (timeCol !== undefined) {
        config.xCol = `${elemTy.name}::${timeCol.name}`;
        config.yAxis = [{}];
        for (let i = 0; i < elemTy.attrs.length; i++) {
          const attr = elemTy.attrs[i];
          switch (attr.sbi_type) {
            case gc.sdk.PrimitiveType.duration:
            case gc.sdk.PrimitiveType.int:
            case gc.sdk.PrimitiveType.float:
              config.series.push({
                type: 'line',
                title: attr.name,
                xCol: `${elemTy.name}::${timeCol.name}`,
                yCol: `${elemTy.name}::${attr.name}`,
              });
              break;
            default:
              break;
          }
        }
      }

      return config;
    }
  }

  // untyped table: fall back to column index heuristics
  const firstVal = findFirstNonNull(table.cols[0]);
  const isTime = firstVal instanceof gc.core.time;

  config.xCol = 0;
  config.xAxis = { type: isTime ? 'time' : 'value' };
  config.yAxis = [{}];

  for (let c = 1; c < table.cols.length; c++) {
    const val = findFirstNonNull(table.cols[c]);
    if (val === null || val === undefined) {
      continue;
    }
    if (!isChartable(val)) {
      continue;
    }
    const title = table.headers?.[c] ?? `Col ${c}`;
    config.series.push({
      type: 'line',
      yCol: c,
      title,
    });
  }

  return config;
}

function findFirstNonNull(col: unknown[]): unknown {
  for (let i = 0; i < col.length; i++) {
    if (col[i] !== null && col[i] !== undefined) {
      return col[i];
    }
  }
  return null;
}

function isChartable(value: unknown): boolean {
  const type = typeof value;
  return (
    type === 'number' ||
    type === 'bigint' ||
    value instanceof gc.core.duration ||
    value instanceof gc.core.int ||
    value instanceof gc.core.float
  );
}

/**
 * Converts a CSS color string to one with the given alpha.
 * Handles hex (#rgb, #rrggbb), rgb(), and rgba() formats.
 */
function withAlpha(color: string, alpha: number): string {
  // hex
  const hex = /^#([0-9a-f]{3,8})$/i.exec(color);
  if (hex) {
    let r: number, g: number, b: number;
    const h = hex[1];
    if (h.length === 3) {
      r = parseInt(h[0] + h[0], 16);
      g = parseInt(h[1] + h[1], 16);
      b = parseInt(h[2] + h[2], 16);
    } else {
      r = parseInt(h.slice(0, 2), 16);
      g = parseInt(h.slice(2, 4), 16);
      b = parseInt(h.slice(4, 6), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  // rgb(r, g, b) or rgba(r, g, b, a)
  const rgb = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(color);
  if (rgb) {
    return `rgba(${rgb[1]}, ${rgb[2]}, ${rgb[3]}, ${alpha})`;
  }
  return color;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepMerge(target: Record<string, any>, source: Record<string, any>): void {
  for (const key of Object.keys(source)) {
    const sv = source[key];
    const tv = target[key];
    if (sv && typeof sv === 'object' && !Array.isArray(sv) && tv && typeof tv === 'object' && !Array.isArray(tv)) {
      deepMerge(tv, sv);
    } else {
      target[key] = sv;
    }
  }
}
