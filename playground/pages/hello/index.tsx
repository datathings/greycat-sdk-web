import { GreyCat, GuiInput } from '@greycat/web';
import '@/common';

await GreyCat.init();

document.body.appendChild(
  <app-layout title="Hello">
    <div>
      <gui-value value="Hello, world!" />
      <gui-input
        type="project::ComplexForm"
        ongui-change={(ev) => console.log('[onchange]', structuredClone((ev.target as GuiInput).value))}
      />
    </div>
  </app-layout>,
);

// kopr.io/map-v2/
