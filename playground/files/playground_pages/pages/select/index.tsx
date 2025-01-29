import '@greycat/web';
import '@/common';
import { GuiSelect } from '@greycat/web';

await gc.sdk.init();

const selected = document.querySelector('gui-object')!;
const select = document.querySelector('gui-select')! as GuiSelect<gc.Person>;
select.options = [
  { text: 'John', value: new gc.Person('John', 42, true) },
  { text: 'Maria', value: new gc.Person('Maria', 45, true), selected: true },
  { text: 'Paul', value: new gc.Person('Paul', 27, false) },
];
select.addEventListener('gui-change', () => {
  selected.value = select.value;
});
