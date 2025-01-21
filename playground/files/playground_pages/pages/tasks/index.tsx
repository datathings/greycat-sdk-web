import { GuiSearchableSelect, GuiInputFn, sl } from '@greycat/web';
import '@/common';
import actions from './actions';

await gc.sdk.init();

const fnInput = (<gui-input-fn />) as GuiInputFn;
const fnSelector = (
  <gui-searchable-select
    placeholder="Select a function to run as a task"
    options={gc.$.default.abi.functions.map((fn) => ({ text: fn.fqn, value: fn }))}
    ongui-change={(ev) => {
      fnInput.value = new ev.detail.attr_type.factory(ev.detail.attr_type);
      spawnBtn.disabled = ev.detail === null;
    }}
  />
) as GuiSearchableSelect;
const spawnBtn = (
  <sl-button
    variant="text"
    size="small"
    disabled
    onclick={async () => {
      await gc.$.default.spawn(fnSelector.value.fqn, fnInput.args);
      tasks.reload();
    }}
  >
    Spawn
  </sl-button>
) as sl.SlButton;

const tasks = document.createElement('gui-tasks');

document.body.appendChild(
  <app-layout
    title="Tasks"
    mainStyle={{ display: 'grid', rowGap: 'var(--spacing)', gridTemplateRows: 'auto 1fr' }}
  >
    {actions}
    <sl-card>
      <header slot="header">
        Create a task
        {spawnBtn}
      </header>
      <div role="list">
        {fnSelector}
        <fieldset>
          <legend>Arguments:</legend>
          {fnInput}
        </fieldset>
      </div>
    </sl-card>
    {tasks}
  </app-layout>,
);
