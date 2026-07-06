import { factoryMappings, inputFactoryMappings, registerCustomElement } from '../common.js';
import '../inputs/register.js';
import '../object/register.js';
import '../value/register.js';
import { GuiFactory, GuiInputFactory, type InputFactoryMap } from './index.js';

registerCustomElement('gui-factory', GuiFactory, { eager: true });
GuiFactory.global = new GuiFactory('gui-object', 'gui-value', factoryMappings, 'default');

registerCustomElement('gui-input-factory', GuiInputFactory, { eager: true });
GuiInputFactory.global = new GuiInputFactory(inputFactoryMappings as InputFactoryMap);

export * from './index.js';
