import { GreyCat, IndexedDbCache, type GuiTaskList, type GuiTaskSelect } from '@greycat/web';
import '@/common';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const select = (<gui-task-select />) as GuiTaskSelect;
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
        <div className="container-fluid">
          <label>Task fqn</label>
          <div className="grid">
            {select}
            <button
              onclick={async () => {
                if (select.value !== null) {
                  await greycat.default.call(select.value.fqn);
                }
                runningTasks.updateTasks();
                taskHistory.updateTasks();
              }}
            >
              Create
            </button>
          </div>
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
