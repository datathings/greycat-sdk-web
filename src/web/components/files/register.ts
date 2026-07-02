import { registerCustomElement } from '../common.js';
import '../table/register.js';
import '../value/register.js';
import { GuiFiles } from './index.js';

registerCustomElement('gui-files', GuiFiles);

export * from './index.js';
