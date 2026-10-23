import { registerCustomElement } from '../common.js';
import '../card/register.js';
import '../dialog/register.js';
import '../inputs/register.js';
import '../select/register.js';
import '../table/register.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import { GuiWorldSelect, GuiWorlds } from './index.js';

registerCustomElement('gui-world-select', GuiWorldSelect);
registerCustomElement('gui-worlds', GuiWorlds);

export * from './index.js';
