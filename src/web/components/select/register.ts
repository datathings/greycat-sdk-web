import { registerCustomElement } from '../common.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/popup/popup.js';
import { GuiSelect } from './index.js';

registerCustomElement('gui-select', GuiSelect);

export * from './index.js';
