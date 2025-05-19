import '@greycat/web';
import * as d3 from 'd3';
import '~/common';

await gc.sdk.init();

const data = [
  [
    -1000, -100, -50, -20, -10, -5, -2, -1, -0.5, -0.1, 0, 0.1, 0.5, 1, 2, 5, 10, 20, 50, 100, 200,
    2000,
  ],
];

document.body.appendChild(
  <app-layout title="Chart (in-mem)">
    <gui-chart
      value={gc.Table.fromCols(data)}
      config={{
        cursor: true,
        xAxis: { scale: 'linear' },
        yAxes: {
          y: {
            scale: 'custom',
            scaleCustom: scaleAsinh,
          },
        },
        series: [{ type: 'line', yCol: 0, yAxis: 'y' }],
        selection: { orientation: 'both' },
      }}
    />
  </app-layout>,
);

export function scaleAsinh(): d3.ScaleContinuousNumeric<number, number, never> {
  let domain = [1, 1000];
  let range = [0, 1];
  let clamp = false;

  const transform = (x: number) => Math.asinh(x);
  const untransform = (y: number) => Math.sinh(y);

  const getT = () => {
    const [d0, d1] = domain.map(transform);
    const [r0, r1] = range;
    const scaleFactor = (r1 - r0) / (d1 - d0);
    return { d0, r0, scaleFactor };
  };

  function scale(x: number): number {
    const { d0, r0, scaleFactor } = getT();
    return r0 + (transform(x) - d0) * scaleFactor;
  }

  scale.invert = function (y: number): number {
    const { d0, r0, scaleFactor } = getT();
    return untransform((y - r0) / scaleFactor + d0);
  };

  scale.domain = function (_?: Iterable<d3.NumberValue>) {
    if (!arguments.length) return domain.slice() as [number, number];
    domain = [..._];
    return scale;
  };

  scale.range = function (_?: Iterable<d3.NumberValue>) {
    if (!arguments.length) return range.slice() as [number, number];
    range = [..._];
    return scale;
  };
  scale.rangeRound = scale.range;

  scale.copy = function () {
    return scaleAsinh().domain(domain).range(range);
  };

  // Optional (not required for ScaleContinuousNumeric)
  scale.clamp = function (_?: boolean) {
    return arguments.length ? (clamp = _ ? true : false) : scale;
  };
  scale.ticks = function (count: number) {
    const d = domain;
    return d3.ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };
  scale.tickFormat = () => (d: number) => d.toString();
  scale.nice = () => scale;

  return scale;
}

// export function scaleAsinh(): d3.ScaleContinuousNumeric<number, number, never> {
//   const base = d3.scaleLinear();

//   const transform = (x: number) => Math.asinh(x);
//   const untransform = (y: number) => Math.sinh(y);

//   const getT = () => {
//     const [d0, d1] = base.domain().map(transform);
//     const [r0, r1] = base.range();
//     const scaleFactor = (r1 - r0) / (d1 - d0);
//     return { d0, r0, scaleFactor };
//   };

//   function scale(x: number): number {
//     const { d0, r0, scaleFactor } = getT();
//     return r0 + (transform(x) - d0) * scaleFactor;
//   }

//   scale.invert = function (y: number): number {
//     const { d0, r0, scaleFactor } = getT();
//     return untransform((y - r0) / scaleFactor + d0);
//   };

//   scale.domain = base.domain;
//   scale.range = base.range;
//   scale.rangeRound = base.rangeRound;

//   scale.copy = function () {
//     return scaleAsinh().domain(base.domain()).range(base.range());
//   };

//   scale.clamp = base.clamp;
//   scale.ticks = base.ticks;

//   scale.tickFormat = base.tickFormat;
//   scale.nice = base.nice;

//   return scale;
// }
