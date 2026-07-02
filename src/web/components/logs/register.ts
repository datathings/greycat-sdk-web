import { registerCustomElement } from '../common.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import { GuiLogs } from './index.js';

registerCustomElement('gui-logs', GuiLogs);

export * from './index.js';
