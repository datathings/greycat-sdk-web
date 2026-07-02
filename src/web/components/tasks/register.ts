import { registerCustomElement } from '../common.js';
import '../object/register.js';
import '../table/register.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import { GuiTasks } from './tasks/index.js';

registerCustomElement('gui-tasks', GuiTasks);

export * from './tasks/index.js';
