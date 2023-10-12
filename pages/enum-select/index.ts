import { mount } from '../common';

mount((app, greycat) => {
  const label = document.createElement('label');
  label.htmlFor = 'my-select';
  label.textContent = 'core::TimeZone';

  const select = document.createElement('gui-enum-select');
  select.selectId = 'my-select';
  select.greycat = greycat;
  select.fqn = 'core::TimeZone';
  select.addEventListener('change', (ev) => {
    window.alert(`key=${ev.detail?.key}, value=${ev.detail?.value?.toString()}`);
  });

  const moveElementBtn = document.createElement('button');
  let mount = true;
  moveElementBtn.textContent = `Unmount element`;
  moveElementBtn.onclick = () => {
    if (mount) {
      mount = false;
      moveElementBtn.textContent = 'Mount element';
      select.remove();
    } else {
      mount = true;
      moveElementBtn.textContent = 'Unmount element';
      label.after(select);
    }
  }

  const container = document.createElement('div');
  container.appendChild(label);
  container.appendChild(select);
  container.appendChild(moveElementBtn);

  app.appendChild(container);
});