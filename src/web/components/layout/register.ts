import { registerCustomElement } from '../common.js';
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js';
import { GuiLayout } from './index.js';

registerCustomElement('gui-layout', GuiLayout);

export * from './index.js';
