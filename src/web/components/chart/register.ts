import { registerCustomElement } from '../common.js';
import '../details/register.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import '@shoelace-style/shoelace/dist/components/color-picker/color-picker.js';
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import {
  GuiChart,
  GuiChartAxisInput,
  GuiChartConfig,
  GuiChartOrdinateInput,
  GuiChartSelectionInput,
  GuiChartSerieInput,
  GuiChartSeriesInput,
  GuiChartYAxesInput,
} from './index.js';

registerCustomElement('gui-chart-axis-input', GuiChartAxisInput);
registerCustomElement('gui-chart-ordinate-input', GuiChartOrdinateInput);
registerCustomElement('gui-chart-yaxes-input', GuiChartYAxesInput);
registerCustomElement('gui-chart-selection-input', GuiChartSelectionInput);
registerCustomElement('gui-chart-serie-input', GuiChartSerieInput);
registerCustomElement('gui-chart-series-input', GuiChartSeriesInput);
registerCustomElement('gui-chart-config', GuiChartConfig);
registerCustomElement('gui-chart', GuiChart);

export * from './index.js';
