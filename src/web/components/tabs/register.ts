import { registerCustomElement } from '../common.js';
import { GuiPanel, GuiTab, GuiTabs } from './index.js';

registerCustomElement('gui-panel', GuiPanel);
registerCustomElement('gui-tab', GuiTab);
registerCustomElement('gui-tabs', GuiTabs);

export * from './index.js';
