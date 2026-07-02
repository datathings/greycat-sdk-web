import { registerCustomElement } from '../common.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import { GuiSearchInput } from './index.js';

registerCustomElement('gui-search-input', GuiSearchInput);

export * from './index.js';
