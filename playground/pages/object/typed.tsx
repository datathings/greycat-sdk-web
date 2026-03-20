import { type GuiInputObject } from '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

const object = (
  <gui-input-object value={new gc.Person('John', 42, true)}>
    <div slot="activated" />
  </gui-input-object>
) as GuiInputObject<gc.Person>;

document.body.appendChild(appLayout('Object (typed)', object));
