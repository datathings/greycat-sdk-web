import type { GuiTaskList, GuiTaskSelect, GuiTaskInfo } from '../../src';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Tasks';
await app.init();

document.body.prepend(app);

const select = (<gui-task-select />) as GuiTaskSelect;
const dialogContent = (
  <gui-task-info
    ongui-files-click={(ev) => {
      console.log('clicked on files', ev);
      // use preventDefault if you want to process the click differently that the default behavior
      // ev.preventDefault();
    }}
  />
) as GuiTaskInfo;

const runningTasks = (
  <gui-task-list
    kind="running"
    ontask-list-click={(ev) => {
      console.log('running clicked', ev.detail);
      dialogContent.task = ev.detail;
      dialog.showModal();
    }}
  />
) as GuiTaskList;
const taskHistory = (
  <gui-task-list
    kind="history"
    ontask-list-click={(ev) => {
      dialogContent.task = ev.detail;
      dialog.showModal();
    }}
  />
) as GuiTaskList;

const dialog = (
  <dialog>
    <article>
      <header>
        <a href="#close" aria-label="Close" onclick={() => dialog.close()} className="close"></a>
        Selected task
      </header>
      {dialogContent}
    </article>
  </dialog>
) as HTMLDialogElement;

app.main.appendChild(
  <div role="list" style={{ gridTemplateRows: 'auto 1fr auto' }}>
    <article>
      <header>Create task</header>
      <div className="container-fluid">
        <label>Task fqn</label>
        <div className="grid">
          {select}
          <button
            onclick={async () => {
              if (select.selected !== null) {
                await greycat.default.call(select.selected.fqn);
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
  </div>,
);
