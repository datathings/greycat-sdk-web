// import { ChartConfig, core, effect, GreyCat, Signal } from '@greycat/sdk/web';
// import '@/common';

// const greycat = await GreyCat.init();

// const root = await greycat.root();
// const table = new Signal(core.Table.create());
// const config = new Signal<ChartConfig>({
//   xAxis: {
//     scale: 'time',
//   },
//   yAxes: {
//     y: {},
//   },
//   series: [],
// });
// const args = new Signal<
//   [
//     core.nodeTime[],
//     core.time | null,
//     core.time | null,
//     number | bigint,
//     core.SamplingMode,
//     core.duration | null,
//     core.TimeZone | null,
//   ]
// >([
//   [root['project::serie_float'] as core.nodeTime],
//   null,
//   null,
//   100,
//   core.SamplingMode.adaptative(),
//   null,
//   null,
// ]);

// effect(async () => {
//   table.set(await core.nodeTime.sample(...args.get()));
// });

// document.body.appendChild(
//   <app-layout
//     title="node-time"
//     mainStyle={{ display: 'grid', gridTemplateRows: '1fr', rowGap: 'var(--spacing)' }}
//   >
//     <gui-tabs>
//       <gui-tab>Sampling</gui-tab>
//       <gui-tab className="activeTab">Table</gui-tab>
//       <gui-tab>Chart</gui-tab>

//       <gui-panel data-tab="Sampling">
//         <gui-input-fn
//           className="p-1"
//           type="core::nodeTime::sample"
//           value={args.get()}
//           ongui-input={async function () {
//             args.set(this.value as any);
//           }}
//         />
//       </gui-panel>
//       <gui-panel data-tab="Table">
//         <gui-table value={table} />
//       </gui-panel>
//       <gui-panel data-tab="Chart">
//         <gui-chart value={table} config={config} />
//       </gui-panel>
//     </gui-tabs>
//   </app-layout>,
// );
