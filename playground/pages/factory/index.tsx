import { GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

document.body.appendChild(
  <app-layout title="Factory">
    {/* <gui-factory
      name="global"
      mappings={{
        // 'project::Person': 'app-person',
        // 'project::Person': () => <div />,
        // 'project::Person': class extends GuiElement {
          
        // },
      }}
    >
    </gui-factory> */}
  </app-layout>,
);

