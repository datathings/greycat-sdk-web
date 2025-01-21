import { type GuiInputObject } from '@greycat/web';
import '@/common';

await gc.sdk.init();

const object = (
  <gui-input-object value={new gc.Person('John', 42, true)}>
    <div slot="activated" />
  </gui-input-object>
) as GuiInputObject<gc.Person>;

document.body.appendChild(<app-layout title="Object (typed)">{object}</app-layout>);
