import { createElement } from '@greycat/web';
import '~/common';
import actions from './actions';

await gc.sdk.init({ debug: true });

const selector = createElement('gui-fn-select', {
  'ongui-change': (ev) => {
    input.value = new ev.detail.args_type.ctor();
    spawnBtn.disabled = false;
  },
});
const tasks = createElement('gui-tasks');
const input = createElement('gui-input-fn');
const spawnBtn = Object.assign(createElement('sl-button'), {
  variant: 'text',
  size: 'small',
  disabled: true,
  onclick: async () => {
    await gc.$.default.spawn(selector.fqn!, input.args);
    tasks.reload();
  },
  textContent: 'Spawn',
});

document.body.appendChild(
  <app-layout title="Tasks" mainStyle={{ display: 'grid', rowGap: 'var(--spacing)', gridTemplateRows: 'auto 1fr' }}>
    {actions}
    <gui-card>
      <header slot="header">
        Create a task
        {spawnBtn}
      </header>
      <div role="list">
        {selector}
        <fieldset>
          <legend>Arguments:</legend>
          {input}
        </fieldset>
      </div>
    </gui-card>
    {tasks}
  </app-layout>,
);
