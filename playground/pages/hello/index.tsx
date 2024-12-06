import { GreyCat, GuiFactory } from '@greycat/web';
import '@/common';

const greycat = await GreyCat.init();

const o = greycat.create('project::Person', [false, 'John', 42]);

document.body.appendChild(
  <app-layout title="Hello">
    <div>
      {/* <gui-value value="Hello, world!" /> */}
      <gui-factory
        mappings={{
          'project::Person::age': GuiFactory.defineFromFn((value) => (
            <span style={{ color: 'orange' }}>{value}</span>
          )),
        }}
      >
        <gui-object value={o} header />
      </gui-factory>
    </div>
  </app-layout>,
);

// kopr.io/map-v2/
