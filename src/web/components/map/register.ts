import { registerCustomElement } from '../common.js';
import '../factory/register.js';
import '../object/register.js';
import { GuiMap, GuiMapLayer, GuiMapMarkers, GuiMapSource } from './index.js';

registerCustomElement('gui-map-source', GuiMapSource);
registerCustomElement('gui-map-layer', GuiMapLayer);
registerCustomElement('gui-map-markers', GuiMapMarkers);
registerCustomElement('gui-map', GuiMap);

export * from './index.js';
