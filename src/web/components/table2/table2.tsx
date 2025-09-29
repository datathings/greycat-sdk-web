// import {
//   Virtualizer,
//   elementScroll,
//   observeElementOffset,
//   observeElementRect,
// } from '@tanstack/virtual-core';
// import {
//   createTable,
//   // createColumnHelper,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getSortedRowModel,
//   type ColumnDef,
//   type Table as TableCore,
//   TableState,
//   // FilterFn,
// } from '@tanstack/table-core';

// import { css, GuiElement, GuiSearchInput, sl } from '../../exports.js';
// import style from './table2.css?inline';

// export interface GuiTable2Options {
//   /* Whether or not to display a footer */
//   footer?: boolean;
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export class GuiTable2<T extends gc.sdk.GCObject = gc.sdk.GCObject> extends GuiElement {
//   static override styles = [css(style)];

//   private _value: T[] | null | undefined;
//   private _options: GuiTable2Options;
//   private _table: TableCore<T>;
//   private _controls: HTMLElement;
//   private _globalFilter: GuiSearchInput;
//   private _container: HTMLElement;
//   private _header: HTMLElement;
//   private _body: HTMLElement;
//   private _footer: HTMLElement;
//   private _virtualList: HTMLElement;
//   private _rowVirt: Virtualizer<HTMLElement, Element>;
//   private _rowCleanup: (() => void) | undefined;
//   private _colVirt: Virtualizer<HTMLElement, Element>;
//   private _colCleanup: (() => void) | undefined;

//   constructor() {
//     super();

//     this._options = {
//       footer: false,
//     };

//     this._controls = document.createElement('div');
//     this._controls.className = 'controls';
//     this._globalFilter = document.createElement('gui-search-input');
//     this._globalFilter.className = 'global-filter';
//     this._globalFilter.addEventListener('input', () => {
//       this._table.setGlobalFilter(this._globalFilter.value);
//     });
//     this._container = document.createElement('div');
//     this._container.className = 'container';
//     this._header = document.createElement('div');
//     this._header.classList.add('bar', 'header');
//     this._body = document.createElement('div');
//     this._body.className = 'body';
//     this._virtualList = document.createElement('div');
//     this._virtualList.className = 'virtual-list';
//     this._footer = document.createElement('div');
//     this._footer.classList.add('bar', 'footer');

//     this._table = this._createTable<T>([]);

//     this._rowVirt = new Virtualizer({
//       count: 0,
//       overscan: 5,
//       observeElementRect,
//       observeElementOffset,
//       scrollToFn: elementScroll,
//       getScrollElement: () => this._body,
//       initialOffset: () => window.scrollY,
//       estimateSize: (_index) => 30,
//       onChange: (_instance, _sync) => this._update_list(),
//     });

//     this._colVirt = new Virtualizer({
//       count: 0,
//       overscan: 1,
//       horizontal: true,
//       observeElementRect,
//       observeElementOffset,
//       scrollToFn: elementScroll,
//       getScrollElement: () => this._body,
//       initialOffset: () => window.scrollX,
//       estimateSize: (index) => {
//         const columns = this._table.getAllFlatColumns();
//         const col = columns[index];
//         if (col) {
//           return col.getSize();
//         }
//         return 150;
//       },
//       onChange: (_instance, _sync) => this._update_list(),
//     });

//     // sync header/footer with list
//     this._body.addEventListener('scroll', () => {
//       this._header.scrollLeft = this._body.scrollLeft;
//       this._footer.scrollLeft = this._body.scrollLeft;
//     });

//     // add to the host
//     this._controls.appendChild(this._globalFilter);
//     this._controls.appendChild(
//       <sl-input
//         placeholder="Scroll to index"
//         onsl-change={(ev) => {
//           const value = parseInt((ev.target as sl.SlInput).value);
//           if (isNaN(value)) {
//             return;
//           }
//           this._rowVirt.scrollToIndex(value, { align: 'center' });
//         }}
//       />,
//     );
//     this._body.appendChild(this._virtualList);
//     this._container.appendChild(this._header);
//     this._container.appendChild(this._body);
//     this._container.appendChild(this._footer);
//     this.shadowRoot.appendChild(this._controls);
//     this.shadowRoot.appendChild(this._container);
//   }

//   set value(value: T[] | null | undefined) {
//     this._value = value;
//     if (value === null || value === undefined) {
//       value = [];
//     }

//     this._table = this._createTable(value);
//     this.update();
//   }

//   get value() {
//     return this._value;
//   }

//   connectedCallback(): void {
//     this._rowCleanup = this._rowVirt._didMount();
//     this._colCleanup = this._colVirt._didMount();
//     this.update();
//   }

//   disconnectedCallback(): void {
//     this._rowCleanup?.();
//     this._colCleanup?.();
//   }

//   private _createTable<T extends gc.sdk.GCObject>(data: T[]): TableCore<T> {
//     const table = createTable<T>({
//       data,
//       columns: createColumns(data),
//       state: {
//         columnSizing: {},
//         columnSizingInfo: {
//           startOffset: null,
//           startSize: null,
//           deltaOffset: null,
//           deltaPercentage: null,
//           isResizingColumn: false,
//           columnSizingStart: [],
//         },
//         rowSelection: {},
//         rowPinning: {
//           top: [],
//           bottom: [],
//         },
//         expanded: {},
//         grouping: [],
//         globalFilter: '',
//         sorting: [],
//         columnFilters: [],
//         columnPinning: {
//           left: [],
//           right: [],
//         },
//         columnOrder: [],
//         columnVisibility: {},
//         pagination: {
//           pageIndex: 0,
//           pageSize: 10,
//         },
//       },
//       renderFallbackValue: null,
//       globalFilterFn: 'includesString',
//       columnResizeMode: 'onChange',
//       enableRowSelection: true,
//       // filterFns: {
//       //   greycatValue: filterGreyCatValue,
//       // },
//       getCoreRowModel: getCoreRowModel(),
//       getFilteredRowModel: getFilteredRowModel(),
//       getSortedRowModel: getSortedRowModel(),
//       onStateChange: (updater) => {
//         console.log('onStateChange');
//         let newState: TableState;
//         if (typeof updater === 'function') {
//           newState = updater(table.getState());
//         } else {
//           newState = updater;
//         }
//         table.setOptions((prev) => ({ ...prev, state: newState }));
//         this.update();
//       },
//     });
//     return table;
//   }

//   update(): void {
//     if (!this.isConnected) {
//       this._header.replaceChildren();
//       this._virtualList.replaceChildren();
//       this._footer.replaceChildren();
//       return;
//     }

//     const state = this._table.getState();

//     if (this._update_properties(state)) {
//       return;
//     }

//     // Render table headers
//     const headers = document.createDocumentFragment();
//     for (const group of this._table.getHeaderGroups()) {
//       const rowEl = document.createElement('div');
//       rowEl.className = 'bar-group';

//       // selection toggle
//       const selectionCellEl = document.createElement('div');
//       selectionCellEl.className = 'bar-cell';
//       selectionCellEl.style.minWidth = '50px';
//       const selectionEl = document.createElement('sl-checkbox');
//       selectionCellEl.appendChild(selectionEl);
//       rowEl.appendChild(selectionCellEl);

//       for (const header of group.headers) {
//         const cellEl = document.createElement('div');
//         cellEl.className = 'bar-cell';
//         cellEl.style.minWidth = `calc(var(--cell-${header.id}-size) * 1px)`;
//         const title = document.createElement('div');
//         title.className = 'title';
//         title.innerHTML = header.isPlaceholder
//           ? ''
//           : flexRender(header.column.columnDef.header, header.getContext());
//         cellEl.appendChild(title);
//         cellEl.onclick = header.column.getToggleSortingHandler() as GlobalEventHandlers['onclick'];
//         // sorter
//         const sorter = document.createElement('div');
//         sorter.className = 'sorter';
//         const isSorted = header.column.getIsSorted();
//         if (isSorted !== false) {
//           sorter.classList.add(isSorted);
//         }
//         cellEl.appendChild(sorter);
//         // resizer
//         const resizer = document.createElement('div');
//         resizer.className = 'resizer';
//         if (header.column.getIsResizing()) {
//           resizer.classList.add('resizing');
//         }
//         resizer.onmousedown = header.getResizeHandler();
//         resizer.ontouchstart = header.getResizeHandler();

//         cellEl.appendChild(resizer);
//         rowEl.appendChild(cellEl);
//       }
//       headers.appendChild(rowEl);
//     }
//     this._header.replaceChildren(headers);

//     if (this._options.footer) {
//       // Render table footers
//       const footers = document.createDocumentFragment();
//       for (const group of this._table.getFooterGroups()) {
//         const rowEl = document.createElement('div');
//         rowEl.className = 'bar-group';
//         for (const header of group.headers) {
//           const cellEl = document.createElement('div');
//           cellEl.className = 'bar-cell';
//           cellEl.style.minWidth = `calc(var(--cell-${header.id}-size) * 1px)`;
//           cellEl.innerHTML = header.isPlaceholder
//             ? ''
//             : flexRender(header.column.columnDef.header, header.getContext());
//           rowEl.appendChild(cellEl);
//         }
//         footers.appendChild(rowEl);
//       }
//       this._footer.replaceChildren(footers);
//     } else {
//       this._footer.replaceChildren();
//     }

//     // update virtual list rendering
//     this._update_list();
//   }

//   private _update_properties(state: Readonly<TableState>): boolean {
//     // update row virtualizer options
//     this._rowVirt.setOptions({
//       ...this._rowVirt.options,
//       count: this._table.getRowModel().rows.length,
//     });
//     this._rowVirt._willUpdate();
//     // update col virtualizer options
//     this._colVirt.setOptions({
//       ...this._colVirt.options,
//       count: this._table.getAllFlatColumns().length,
//     });
//     this._colVirt._willUpdate();

//     // Store cell sizes as CSS variables to prevent calling column.getSize() in update_list()
//     for (const header of this._table.getFlatHeaders()) {
//       this._container.style.setProperty(`--cell-${header.id}-size`, `${header.column.getSize()}`);
//     }

//     if (state.columnSizingInfo.isResizingColumn !== false) {
//       // resizing
//       this._container.classList.add('resizing');
//       this._update_list();
//     } else {
//       // not resizing
//       this._container.classList.remove('resizing');
//     }

//     return state.columnSizingInfo.isResizingColumn !== false;
//   }

//   private _update_list(): void {
//     if (!this.isConnected) {
//       this._virtualList.replaceChildren();
//       return;
//     }

//     const rows = this._table.getRowModel().rows;
//     const virtualRows = this._rowVirt.getVirtualItems();
//     const virtualCols = this._colVirt.getVirtualItems();

//     this._virtualList.setAttribute('data-rows', `${virtualRows.length}`);
//     this._virtualList.setAttribute('data-cols', `${virtualCols.length}`);
//     this._virtualList.style.height = `${this._rowVirt.getTotalSize()}px`;
//     this._virtualList.style.width = `${this._colVirt.getTotalSize()}px`;

//     const list = document.createDocumentFragment();
//     for (const virtualRow of virtualRows) {
//       const row = rows[virtualRow.index];
//       if (!row) {
//         continue;
//       }
//       const rowEl = document.createElement('div');
//       rowEl.className = 'row';
//       if (row.getIsSelected()) {
//         rowEl.classList.add('selected');
//       }
//       rowEl.setAttribute('data-index', `${virtualRow.index}`);
//       rowEl.style.height = `${virtualRow.size}px`;
//       rowEl.style.transform = `translateY(${virtualRow.start}px)`;
//       if (virtualRow.index % 2 === 0) {
//         rowEl.classList.add('even');
//       }

//       // selection toggle
//       const selectionCellEl = document.createElement('div');
//       selectionCellEl.className = 'cell';
//       selectionCellEl.style.width = '50px';
//       const selectionEl = document.createElement('sl-checkbox');
//       selectionEl.checked = row.getIsSelected();
//       selectionEl.addEventListener('sl-change', () => row.toggleSelected());
//       selectionCellEl.appendChild(selectionEl);
//       rowEl.appendChild(selectionCellEl);

//       // Render cells
//       const visibleCells = row.getVisibleCells();
//       for (const virtualCol of virtualCols) {
//         const cell = visibleCells[virtualCol.index];
//         if (!cell) {
//           continue;
//         }

//         const cellEl = document.createElement('div');
//         cellEl.setAttribute('data-index', `${virtualCol.index}`);
//         cellEl.className = 'cell';
//         cellEl.style.width = `calc(var(--cell-${cell.column.id}-size) * 1px)`;
//         cellEl.style.transform = `translateX(${cell.column.getStart() + 50}px)`;
//         cellEl.innerHTML = flexRender(cell.column.columnDef.cell, cell.getContext());
//         rowEl.appendChild(cellEl);
//       }
//       list.appendChild(rowEl);
//     }
//     this._virtualList.replaceChildren(list);
//   }
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function flexRender<TProps extends object>(comp: any, props: TProps): any {
//   if (typeof comp === 'function') {
//     return comp(props);
//   }
//   return comp;
// }

// function createColumns<T extends gc.sdk.GCObject>(value: T[]): ColumnDef<T, unknown>[] {
//   // const helper = createColumnHelper<T>();
//   if (value.length === 0) {
//     return [];
//   }
//   const type = value[0].$type;
//   const attrs = type.attrs;
//   const columns: ColumnDef<T, unknown>[] = new Array(attrs.length);
//   for (let i = 0; i < attrs.length; i++) {
//     const attr = attrs[i];
//     columns[i] = {
//       id: `${i}`,
//       header: attr.name,
//       accessorKey: attr.name,
//       cell: (props) => props.getValue(),
//       footer: () => gc.sdk.PrimitiveTypeName[attr.sbi_type],
//     };
//   }
//   return columns;
// }

// // const filterGreyCatValue: FilterFn<gc.sdk.GCObject> = (row, columnId, filterValue) => {
// //   const value = row.original.$fields?.[+columnId];
// //   return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
// // };

// // declare module '@tanstack/table-core' {
// //   interface FilterFns {
// //     greycatValue: FilterFn<gc.sdk.GCObject>;
// //   }
// // }

// declare global {
//   interface HTMLElementTagNameMap {
//     'gui-table2': GuiTable2;
//   }

//   namespace GreyCat {
//     namespace JSX {
//       interface IntrinsicElements {
//         /**
//          * Please, don't use this in a React context. Use `WCWrapper`.
//          */
//         'gui-table2': GreyCat.Element<GuiTable2>;
//       }
//     }
//   }
// }
