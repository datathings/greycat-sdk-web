import { registerCustomElement } from '../common.js';
import '../card/register.js';
import '../factory/register.js';
import '../value/register.js';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/details/details.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { GuiObject, GuiObjectFieldName, GuiObjectFieldValue } from './index.js';

registerCustomElement('gui-object-fieldname', GuiObjectFieldName);
registerCustomElement('gui-object-fieldvalue', GuiObjectFieldValue);
registerCustomElement('gui-object', GuiObject);

export * from './index.js';
