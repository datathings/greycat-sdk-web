import { mount } from '../common';

mount((app, greycat) => {
  const el = document.createElement('gui-enum-select');
  el.greycat = greycat;
  el.fqn = 'core::TimeZone';
  app.appendChild(el);

  el.addEventListener('change', (ev) => {
    window.alert(`key=${ev.detail?.key}, value=${ev.detail?.value?.toString()}`);
  });
});