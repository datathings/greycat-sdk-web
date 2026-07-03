import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

const person = new gc.project.Person('John', 42, true);

document.body.appendChild(appLayout('Inputs (object)', <gui-input-object value={person} />));
