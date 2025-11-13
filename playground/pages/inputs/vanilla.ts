import '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

const form = document.querySelector('gui-input-object');
if (form) {
  form.value = new gc.Person('John', 42, true);
}
