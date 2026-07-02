import { registerCustomElement } from '../common.js';
import '../dialog/register.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import { GuiAuthGate, GuiSignIn, GuiSignInButton } from './index.js';

registerCustomElement('gui-sign-in', GuiSignIn, { eager: true });
registerCustomElement('gui-auth-gate', GuiAuthGate, { eager: true });
registerCustomElement('gui-sign-in-button', GuiSignInButton, { eager: true });

export * from './index.js';
