import { GreyCat } from '@greycat/web';
import '@/common';

const greycat = await GreyCat.init();

const table = await greycat.call('project::persons');
console.log(table);

document.body.appendChild(
  <app-layout title="Hello">
    <gui-input-object
      type="project::Type"
      ongui-change={function () {
        // validate data
        // send over rpc

        // this: GuiInputObject
        // this.setValues('value2', [...]);
      }}
    />
  </app-layout>,
);

// kopr.io/map-v2/
