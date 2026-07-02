import { registerCustomElement } from '../common.js';
import '@shoelace-style/shoelace/dist/components/tree/tree.js';
import '@shoelace-style/shoelace/dist/components/tree-item/tree-item.js';
import { GuiNav } from './index.js';

registerCustomElement('gui-nav', GuiNav);

export * from './index.js';
