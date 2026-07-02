import { registerCustomElement } from '../common.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import { GuiFnSelect } from './index.js';

registerCustomElement('gui-fn-select', GuiFnSelect);

export * from './index.js';
