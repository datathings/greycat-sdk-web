import { GreyCat, IndexedDbCache, GuiSearchableSelect, GuiInputFn, $ } from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const fnInput = (<gui-input-fn />) as GuiInputFn;
const fnSelector = (
  <gui-searchable-select
    placeholder="Select a function to run as a task"
    options={$.default.abi.functions.map((fn) => ({ text: fn.fqn, value: fn }))}
    ongui-change={(ev) => {
      fnInput.type = ev.detail;
    }}
  />
) as GuiSearchableSelect;

const tasks = document.createElement('gui-tasks');

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
          onclick={async () => {
            await $.default.spawn(fnSelector.value.fqn, fnInput.value);
            tasks.reload();
          }}
        >
          Spawn
        </sl-button>
      </div>
    </fieldset>
    {tasks}
  </app-layout>,
);
