import { GreyCat } from '@greycat/sdk';

// @greycat/ui
import '../../src/bundle';

try {
  const greycat = await GreyCat.init({ url: new URL('http://localhost:8080') });

  const el = document.querySelector('gui-enum-select')!;
  el.greycat = greycat;
  el.fqn = 'core::TimeZone';

  el.addEventListener('change', (ev) => {
    window.alert(`key=${ev.detail?.key}, value=${ev.detail?.value?.toString()}`);
  });
} catch {
  document.documentElement.textContent = `Is GreyCat started?`;
}