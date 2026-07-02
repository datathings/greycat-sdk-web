import { registerCustomElement } from '../common.js';
import '../card/register.js';
import '../table/register.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { GuiRolePermissions, GuiRoles } from './index.js';

registerCustomElement('gui-roles', GuiRoles);
registerCustomElement('gui-role-permissions', GuiRolePermissions);

export * from './index.js';
