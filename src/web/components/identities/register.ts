import { registerCustomElement } from '../common.js';
import '../dialog/register.js';
import '../inputs/register.js';
import '../select/register.js';
import '../table/register.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';
import { GuiIdentities, GuiIdentityTokens } from './index.js';

registerCustomElement('gui-identities', GuiIdentities);
registerCustomElement('gui-identity-tokens', GuiIdentityTokens);

export * from './index.js';
