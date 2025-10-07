// const helper = createColumnHelper<gc.complex_factory.CableView>();

// let state: TableState = {
//   columnSizing: {},
//   columnSizingInfo: {
//     startOffset: null,
//     startSize: null,
//     deltaOffset: null,
//     deltaPercentage: null,
//     isResizingColumn: false,
//     columnSizingStart: [],
//   },
//   rowSelection: {},
//   rowPinning: {
//     top: [],
//     bottom: [],
//   },
//   expanded: {},
//   grouping: [],
//   globalFilter: '',
//   sorting: [],
//   columnFilters: [],
//   columnPinning: {
//     left: [],
//     right: [],
//   },
//   columnOrder: [],
//   columnVisibility: {},
//   pagination: {
//     pageIndex: 0,
//     pageSize: 10,
//   },
// };

// const table = createTable({
//   data,
//   columns: [
//     helper.accessor('cableId', {
//       id: 'cableId',
//       cell: (info) => info.getValue(),
//     }),
//     helper.accessor('voltageLevel', {
//       id: 'voltageLevel',
//       cell: (info) => info.getValue(),
//     }),
//     helper.accessor('voltageValue_kV', {
//       id: 'voltageValue_kV',
//       cell: (info) => info.getValue(),
//     }),
//   ],
//   state,
//   getCoreRowModel: getCoreRowModel(),
//   renderFallbackValue: null,
//   onStateChange(updater) {
//     if (typeof updater === 'function') {
//       state = updater(state);
//     } else {
//       state = updater;
//     }
//   },
// });

// table.getRowModel().rows.forEach((row) => {
//   row.getVisibleCells().forEach((cell) => {
//     if (typeof cell.column.columnDef.cell === 'function') {
//       console.log(cell.column.columnDef.cell(cell.getContext()));
//     } else {
//       console.log(cell.column.columnDef.cell);
//     }
//   });
// });
