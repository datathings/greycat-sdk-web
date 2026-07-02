import { registerCustomElement } from '../common.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import { GuiMultiSelectCheckbox } from './index.js';

registerCustomElement('gui-multi-select-checkbox', GuiMultiSelectCheckbox);

export * from './index.js';
