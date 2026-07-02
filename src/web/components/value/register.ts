import { registerCustomElement, registerFactoryMapping } from '../common.js';
import { GuiValue } from './index.js';

registerCustomElement('gui-value', GuiValue);

registerFactoryMapping('core::String', 'gui-value');
registerFactoryMapping('core::int', 'gui-value');
registerFactoryMapping('core::float', 'gui-value');
registerFactoryMapping('core::bool', 'gui-value');
registerFactoryMapping('core::geo', 'gui-value');
registerFactoryMapping('core::time', 'gui-value');
registerFactoryMapping('core::Date', 'gui-value');
registerFactoryMapping('core::node', 'gui-value');
registerFactoryMapping('core::nodeTime', 'gui-value');
registerFactoryMapping('core::nodeIndex', 'gui-value');
registerFactoryMapping('core::nodeGeo', 'gui-value');
registerFactoryMapping('core::nodeList', 'gui-value');

export * from './index.js';
