import { registerCustomElement } from '../common.js';
import '../dialog/register.js';
import '../inputs/register.js';
import '../select/register.js';
import '../table/register.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';
import { GuiIdentities } from './index.js';

registerCustomElement('gui-identities', GuiIdentities);

export * from './index.js';
