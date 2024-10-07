import { GreyCat } from '@greycat/web';
import '@/common';

await GreyCat.init();

document.body.appendChild(
  <app-layout title="Xp">
    <gui-input-object
      type="project::Obj1"
      ongui-input={function () {
        console.log('oninput', this.value);
      }}
    />
  </app-layout>,
);
