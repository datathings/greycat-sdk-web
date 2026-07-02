import { registerCustomElement } from '../common.js';
import '../chart2/register.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import { GuiRuntimeUsage } from './index.js';

registerCustomElement('gui-runtime-usage', GuiRuntimeUsage);

export * from './index.js';
