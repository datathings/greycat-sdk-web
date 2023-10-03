import { mount } from '../common';

mount((app, greycat) => {
  const el = document.createElement('gui-enum-select');
  el.greycat = greycat;
  el.fqn = 'core::TimeZone';
  app.appendChild(el);

  el.addEventListener('change', (ev) => {
    window.alert(`key=${ev.detail?.key}, value=${ev.detail?.value?.toString()}`);
  });

  const moveElementBtn = document.createElement('button');
  let mount = true;
  moveElementBtn.textContent = `Unmount element`;
  moveElementBtn.onclick = () => {
    if (mount) {
      mount = false;
      moveElementBtn.textContent = 'Mount element';
      el.remove();
    } else {
      mount = true;
      moveElementBtn.textContent = 'Unmount element';
      app.prepend(el);
    }
  }
  app.appendChild(moveElementBtn);
});