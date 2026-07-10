import { registerCustomElement } from '../common.js';
import { GuiHeatmap } from './index.js';
import { GuiHeatmapTooltip } from './tooltip.js';

registerCustomElement('gui-heatmap-tooltip', GuiHeatmapTooltip);
registerCustomElement('gui-heatmap', GuiHeatmap);

export * from './index.js';
