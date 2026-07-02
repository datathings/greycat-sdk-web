import { registerCustomElement, registerFactoryMapping } from '../common.js';
import '../chart/register.js';
import { GuiHistogram } from './index.js';

registerCustomElement('gui-histogram', GuiHistogram);

registerFactoryMapping('util::HistogramStats', 'gui-histogram');

export * from './index.js';
