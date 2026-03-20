import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

const form = document.createElement('gui-input-object');
form.inline = true;
form.setAttribute('no-types', '');
form.value = new gc.Person('John', 42, true);

document.body.appendChild(appLayout('Vanilla', form));
