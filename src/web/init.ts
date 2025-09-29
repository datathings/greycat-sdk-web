import {
  GuiFactory,
  GuiInputFactory,
  GuiTable,
  GuiTableBody,
  GuiTableBodyCell,
  GuiTableBodyRow,
  GuiTableConfig,
  GuiTableHead,
  GuiTableHeadCell,
  GuiTableMapping,
  GuiTableMappings,
  GuiValue,
  GuiCard,
  registerCustomElement,
  GuiObject,
  GuiObjectFieldName,
  GuiObjectFieldValue,
  GuiChart,
  GuiChart2,
  GuiChartConfig,
  GuiChartYAxesInput,
  GuiChartAxisInput,
  GuiChartOrdinateInput,
  GuiChartSelectionInput,
  GuiChartSerieInput,
  GuiChartSeriesInput,
  GuiCsvStatistics,
  GuiCsvStatistics2,
  GuiDashboard,
  GuiDetails,
  GuiDialog,
  GuiDonut,
  GuiFiles,
  GuiFnSelect,
  GuiGauge,
  GuiHeatmap,
  GuiHistogram,
  GuiInput,
  GuiInputString,
  GuiInputStr,
  GuiInputNumber,
  GuiInputBool,
  GuiInputTime,
  GuiInputEnum,
  GuiInputObject,
  GuiInputAbstract,
  GuiInputFn,
  GuiInputDuration,
  GuiInputAny,
  GuiInputArray,
  GuiInputMap,
  GuiInputNode,
  GuiInputNodeTime,
  GuiInputNodeIndex,
  GuiInputNodeList,
  GuiInputNodeGeo,
  GuiInputGeo,
  GuiInputFnPtr,
  GuiInputUnsupported,
  GuiInputNull,
  GuiInputType,
  GuiInputField,
  GuiLayout,
  GuiMultiSelectCheckbox,
  GuiObject2,
  GuiPeriodicTaskList,
  GuiRoles,
  GuiRolePermissions,
  GuiSearchInput,
  GuiUsers,
  GuiUserGroupPolicy,
  GuiUserForm,
  GuiTasks,
  GuiTabs,
  GuiTab,
  GuiTime,
  GuiPanel,
  GuiSelect,
  GuiMap,
  GuiMapLayer,
  GuiMapSource,
  GuiMapMarkers,
  GuiNav,
  // GuiTable2,
} from './exports.js';

export interface WebOptions {
  maplibregl?: typeof import('maplibre-gl');
}

export interface WebWithoutAbiOptions extends WebOptions, gc.sdk.WithoutAbiOptions {}
export interface WebWithAbiOptions extends WebOptions, gc.sdk.WithAbiOptions {}

declare global {
  namespace gc {
    namespace sdk {
      function init(options: WebWithoutAbiOptions): Promise<gc.sdk.GreyCat>;
      function initWithAbi(options: WebWithAbiOptions): gc.sdk.GreyCat;
    }
  }
}

const sdkInit = gc.sdk.init;
gc.sdk.init = async function webInit(options: WebWithoutAbiOptions = { url: gc.sdk.DEFAULT_URL }) {
  const g = await sdkInit(options);
  initWeb(options);
  return g;
};

const sdkInitWithAbi = gc.sdk.initWithAbi;
gc.sdk.initWithAbi = function webInitWithAbi(options: WebWithAbiOptions) {
  const g = sdkInitWithAbi(options);
  initWeb(options);
  return g;
};

function initWeb(options: WebOptions) {
  registerCustomElement('gui-factory', GuiFactory);
  // create the global object factory after it is registered
  GuiFactory.global = new GuiFactory('gui-object', 'gui-value', {
    [gc.core.Table._type]: 'gui-table',
    [gc.core.Map._type]: 'gui-table',
    [gc.core.Array._type]: 'gui-table',
    [gc.core.String._type]: 'gui-value',
    [gc.core.int._type]: 'gui-value',
    [gc.core.float._type]: 'gui-value',
    [gc.core.bool._type]: 'gui-value',
    [gc.core.geo._type]: 'gui-value',
    [gc.core.time._type]: 'gui-value',
    [gc.core.str._type]: 'gui-value',
    [gc.core.Date._type]: 'gui-value',
    [gc.core.node._type]: 'gui-value',
    [gc.core.nodeTime._type]: 'gui-value',
    [gc.core.nodeIndex._type]: 'gui-value',
    [gc.core.nodeGeo._type]: 'gui-value',
    [gc.core.nodeList._type]: 'gui-value',
    [gc.io.CsvStatistics._type]: 'gui-csv-statistics2',
    [gc.util.HistogramStats._type]: 'gui-histogram',
  });
  registerCustomElement('gui-input-factory', GuiInputFactory);
  // create the global input factory after it is registered
  GuiInputFactory.global = new GuiInputFactory({
    ['core::any']: 'gui-input-any',
    [gc.core.int._type]: 'gui-input-number',
    [gc.core.float._type]: 'gui-input-number',
    [gc.core.bool._type]: 'gui-input-bool',
    [gc.core.String._type]: 'gui-input-string',
    [gc.core.char._type]: 'gui-input-string',
    [gc.core.str._type]: 'gui-input-str',
    [gc.core.time._type]: 'gui-input-time',
    [gc.core.null_._type]: 'gui-input-null',
    [gc.core.type._type]: 'gui-input-type',
    [gc.core.field._type]: 'gui-input-field',
    [gc.core.duration._type]: 'gui-input-duration',
    [gc.core.Array._type]: 'gui-input-array',
    [gc.core.Map._type]: 'gui-input-map',
    [gc.core.geo._type]: 'gui-input-geo',
    [gc.core.node._type]: 'gui-input-node',
    [gc.core.nodeIndex._type]: 'gui-input-node-index',
    [gc.core.nodeTime._type]: 'gui-input-node-time',
    [gc.core.nodeList._type]: 'gui-input-node-list',
    [gc.core.nodeGeo._type]: 'gui-input-node-geo',
    [gc.core.function_._type]: 'gui-input-fnptr',
  });

  registerCustomElement('gui-time', GuiTime);
  registerCustomElement('gui-thead-cell', GuiTableHeadCell);
  registerCustomElement('gui-tbody-cell', GuiTableBodyCell);
  registerCustomElement('gui-tbody-row', GuiTableBodyRow);
  registerCustomElement('gui-thead', GuiTableHead);
  registerCustomElement('gui-tbody', GuiTableBody);
  registerCustomElement('gui-table', GuiTable);
  registerCustomElement('gui-value', GuiValue);
  registerCustomElement('gui-table-mapping', GuiTableMapping);
  registerCustomElement('gui-table-mappings', GuiTableMappings);
  registerCustomElement('gui-table-config', GuiTableConfig);
  registerCustomElement('gui-card', GuiCard);
  registerCustomElement('gui-object-fieldname', GuiObjectFieldName);
  registerCustomElement('gui-object-fieldvalue', GuiObjectFieldValue);
  registerCustomElement('gui-object', GuiObject);
  registerCustomElement('gui-chart-axis-input', GuiChartAxisInput);
  registerCustomElement('gui-chart-ordinate-input', GuiChartOrdinateInput);
  registerCustomElement('gui-chart-yaxes-input', GuiChartYAxesInput);
  registerCustomElement('gui-chart-selection-input', GuiChartSelectionInput);
  registerCustomElement('gui-chart-serie-input', GuiChartSerieInput);
  registerCustomElement('gui-chart-series-input', GuiChartSeriesInput);
  registerCustomElement('gui-chart-config', GuiChartConfig);
  registerCustomElement('gui-chart', GuiChart);
  registerCustomElement('gui-chart2', GuiChart2);
  registerCustomElement('gui-csv-statistics', GuiCsvStatistics);
  registerCustomElement('gui-csv-statistics2', GuiCsvStatistics2);
  registerCustomElement('gui-dashboard', GuiDashboard);
  registerCustomElement('gui-details', GuiDetails);
  registerCustomElement('gui-dialog', GuiDialog);
  registerCustomElement('gui-donut', GuiDonut);
  registerCustomElement('gui-files', GuiFiles);
  registerCustomElement('gui-fn-select', GuiFnSelect);
  registerCustomElement('gui-gauge', GuiGauge);
  registerCustomElement('gui-heatmap', GuiHeatmap);
  registerCustomElement('gui-histogram', GuiHistogram);
  registerCustomElement('gui-input-string', GuiInputString);
  registerCustomElement('gui-input-str', GuiInputStr);
  registerCustomElement('gui-input-number', GuiInputNumber);
  registerCustomElement('gui-input-bool', GuiInputBool);
  registerCustomElement('gui-input-time', GuiInputTime);
  registerCustomElement('gui-input-enum', GuiInputEnum);
  registerCustomElement('gui-input-object', GuiInputObject);
  registerCustomElement('gui-input-abstract', GuiInputAbstract);
  registerCustomElement('gui-input-fn', GuiInputFn);
  registerCustomElement('gui-input-duration', GuiInputDuration);
  registerCustomElement('gui-input-any', GuiInputAny);
  registerCustomElement('gui-input-array', GuiInputArray);
  registerCustomElement('gui-input-map', GuiInputMap);
  registerCustomElement('gui-input-node', GuiInputNode);
  registerCustomElement('gui-input-node-time', GuiInputNodeTime);
  registerCustomElement('gui-input-node-index', GuiInputNodeIndex);
  registerCustomElement('gui-input-node-list', GuiInputNodeList);
  registerCustomElement('gui-input-node-geo', GuiInputNodeGeo);
  registerCustomElement('gui-input-geo', GuiInputGeo);
  registerCustomElement('gui-input-fnptr', GuiInputFnPtr);
  registerCustomElement('gui-input-unsupported', GuiInputUnsupported);
  registerCustomElement('gui-input-null', GuiInputNull);
  registerCustomElement('gui-input-type', GuiInputType);
  registerCustomElement('gui-input-field', GuiInputField);
  registerCustomElement('gui-input', GuiInput);
  registerCustomElement('gui-layout', GuiLayout);
  registerCustomElement('gui-multi-select-checkbox', GuiMultiSelectCheckbox);
  registerCustomElement('gui-object2', GuiObject2);
  registerCustomElement('gui-periodic-task-list', GuiPeriodicTaskList);
  registerCustomElement('gui-roles', GuiRoles);
  registerCustomElement('gui-role-permissions', GuiRolePermissions);
  registerCustomElement('gui-search-input', GuiSearchInput);
  registerCustomElement('gui-users', GuiUsers);
  registerCustomElement('gui-user-group-policy', GuiUserGroupPolicy);
  registerCustomElement('gui-user-form', GuiUserForm);
  registerCustomElement('gui-tasks', GuiTasks);
  registerCustomElement('gui-panel', GuiPanel);
  registerCustomElement('gui-tab', GuiTab);
  registerCustomElement('gui-tabs', GuiTabs);
  registerCustomElement('gui-select', GuiSelect);
  registerCustomElement('gui-nav', GuiNav);
  // registerCustomElement('gui-table2', GuiTable2);

  if (options.maplibregl || 'maplibregl' in globalThis) {
    globalThis['maplibregl'] = options.maplibregl ?? globalThis['maplibregl'];
    registerCustomElement('gui-map-source', GuiMapSource);
    registerCustomElement('gui-map-layer', GuiMapLayer);
    registerCustomElement('gui-map-markers', GuiMapMarkers);
    registerCustomElement('gui-map', GuiMap);
  }
}

declare global {
  namespace gc {
    export type {
      GuiFactory,
      GuiInputFactory,
      GuiTable,
      GuiTableBody,
      GuiTableBodyCell,
      GuiTableBodyRow,
      GuiTableConfig,
      GuiTableHead,
      GuiTableHeadCell,
      GuiTableMapping,
      GuiTableMappings,
      GuiValue,
      GuiCard,
      registerCustomElement,
      GuiObject,
      GuiObjectFieldName,
      GuiObjectFieldValue,
      GuiChart,
      GuiChart2,
      GuiChartConfig,
      GuiChartYAxesInput,
      GuiChartAxisInput,
      GuiChartOrdinateInput,
      GuiChartSelectionInput,
      GuiChartSerieInput,
      GuiChartSeriesInput,
      GuiCsvStatistics,
      GuiCsvStatistics2,
      GuiDashboard,
      GuiDetails,
      GuiDialog,
      GuiDonut,
      GuiFiles,
      GuiFnSelect,
      GuiGauge,
      GuiHeatmap,
      GuiHistogram,
      GuiInput,
      GuiInputString,
      GuiInputStr,
      GuiInputNumber,
      GuiInputBool,
      GuiInputTime,
      GuiInputEnum,
      GuiInputObject,
      GuiInputAbstract,
      GuiInputFn,
      GuiInputDuration,
      GuiInputAny,
      GuiInputArray,
      GuiInputMap,
      GuiInputNode,
      GuiInputNodeTime,
      GuiInputNodeIndex,
      GuiInputNodeList,
      GuiInputNodeGeo,
      GuiInputGeo,
      GuiInputFnPtr,
      GuiInputUnsupported,
      GuiInputNull,
      GuiInputType,
      GuiInputField,
      GuiLayout,
      GuiMultiSelectCheckbox,
      GuiObject2,
      GuiPeriodicTaskList,
      GuiRoles,
      GuiRolePermissions,
      GuiSearchInput,
      GuiUsers,
      GuiUserGroupPolicy,
      GuiUserForm,
      GuiTasks,
      GuiTabs,
      GuiTab,
      GuiTime,
      GuiPanel,
      GuiSelect,
      GuiMap,
      GuiMapLayer,
      GuiMapSource,
      GuiMapMarkers,
      GuiNav,
      // GuiTable2,
    };
  }
}
