import { registerCustomElement, registerFactoryMapping } from '../common.js';
import '../table/register.js';
import '../value/register.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import { GuiTensor } from './index.js';

registerCustomElement('gui-tensor', GuiTensor);

registerFactoryMapping('core::Tensor', 'gui-tensor');

export * from './index.js';
