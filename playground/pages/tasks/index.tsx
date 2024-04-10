import {
  GreyCat,
  IndexedDbCache,
  type GuiTaskList,
  GuiSearchableSelect,
  GuiInputFn,
} from '@greycat/web';
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
const info = document.createElement('gui-task-info');
info.addEventListener('gui-files-click', (ev) => {
  console.log('clicked on files', ev);
  // use preventDefault if you want to process the click differently that the default behavior
  // ev.preventDefault();
});
const runningTasks = (
  <gui-task-list
    kind="running"
    ontask-list-click={(ev) => {
      console.log('running clicked', ev.detail);
      info.value = ev.detail;
      dialog.showModal();
    }}
  />
) as GuiTaskList;
const taskHistory = (
  <gui-task-list
    kind="history"
    ontask-list-click={(ev) => {
      console.log('history clicked', ev.detail);
      info.value = ev.detail;
      dialog.showModal();
    }}
  />
) as GuiTaskList;

const dialog = (
  <dialog onclose={() => info.stopPolling()}>
    <article>
      <header>
        <a href="#close" aria-label="Close" onclick={() => dialog.close()} className="close"></a>
        Selected task
      </header>
      {info}
    </article>
  </dialog>
) as HTMLDialogElement;

document.body.appendChild(
  <app-layout title="Tasks">
    <div role="list" style={{ gridTemplateRows: 'auto 1fr auto' }}>
      <article>
        <header>Create task</header>
        <div role="list" style={{ padding: 'var(--spacing)' }}>
          {fnSelector}
          {fnInput}
          <button
            style={{ justifySelf: 'end' }}
            onclick={async () => {
              if (fnSelector.value) {
                await greycat.default.spawn(fnSelector.value.fqn, fnInput.value);
              }
              runningTasks.updateTasks();
              taskHistory.updateTasks();
            }}
          >
            Spawn
          </button>
        </div>
      </article>
      <article>
        <header style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Running</span>
          <a href="#" onclick={() => runningTasks.updateTasks()}>
            Reload
          </a>
        </header>
        {runningTasks}
      </article>
      <article>
        <header style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>History</span>
          <a href="#" onclick={() => taskHistory.updateTasks()}>
            Reload
          </a>
        </header>
        {taskHistory}
      </article>
      {dialog}
    </div>
  </app-layout>,
);
