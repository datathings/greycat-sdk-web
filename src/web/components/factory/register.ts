import { factoryMappings, inputFactoryMappings, onComponentsReady, registerCustomElement } from '../common.js';
import '../inputs/register.js';
import '../object/register.js';
import '../value/register.js';
import { GuiFactory, GuiInputFactory, type InputFactoryMap } from './index.js';

registerCustomElement('gui-factory', GuiFactory);
registerCustomElement('gui-input-factory', GuiInputFactory);

onComponentsReady(() => {
  GuiFactory.global = new GuiFactory('gui-object', 'gui-value', factoryMappings, 'default');
  GuiInputFactory.global = new GuiInputFactory(inputFactoryMappings as InputFactoryMap);
});

export * from './index.js';
