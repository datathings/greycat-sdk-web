import { GreyCat, IndexedDbCache, GuiSearchableSelect, GuiInputFn } from '@greycat/web';
import '@/common';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const fnInput = (<gui-input-fn />) as GuiInputFn;
const fnSelector = (
  <gui-searchable-select
    placeholder="Select a function to run as a task"
    options={greycat.default.abi.functions.map((fn) => ({ text: fn.fqn, value: fn }))}
    ongui-change={(ev) => {
      fnInput.type = ev.detail;
    }}
  />
) as GuiSearchableSelect;

document.body.appendChild(
  <app-layout
    title="Tasks"
    mainStyle={{ display: 'grid', rowGap: 'var(--spacing)', gridTemplateRows: 'auto 1fr' }}
  >
    <fieldset>
      <legend>Create a task</legend>
      <div role="list">
        {fnSelector}
        {fnInput}
        <sl-button
          onclick={() => {
            greycat.default.spawn(fnSelector.value.fqn, fnInput.value);
          }}
        >
          Spawn
        </sl-button>
      </div>
    </fieldset>
    <gui-tasks />
  </app-layout>,
);
