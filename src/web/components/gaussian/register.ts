import { registerCustomElement } from '../common.js';
import '../chart/register.js';
import { GuiGaussian } from './index.js';

registerCustomElement('gui-gaussian', GuiGaussian);

export * from './index.js';
