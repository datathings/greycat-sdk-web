import { core } from '@greycat/sdk';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Tabs';
await app.init();

document.body.prepend(app);

const table = await greycat.default.call<core.Table>('project::table');

app.main.appendChild(
  <gui-tabs>
    <gui-tab className="activeTab">Tab A</gui-tab>
    <gui-tab>Tab B</gui-tab>

    <gui-panel data-tab="Tab A">Hello from Tab A</gui-panel>
    <gui-panel data-tab="Tab B">
      <gui-table table={table} />
    </gui-panel>
  </gui-tabs>,
);
