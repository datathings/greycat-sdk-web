import { GuiTaskList, GuiTaskSelect } from '../../src';
import '../common';
import { mount } from '../common';

mount(async (app, greycat) => {
  const select = (<gui-task-select />) as GuiTaskSelect;
  const dialogContent = document.createElement('gui-task-info');
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

  app.appendChild(
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
                  await greycat.call(select.selected.fqn);
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

  // const task = await greycat.call<runtime.Task>('project::task_with_params', ['Beket', 24]);
  // console.log({ task });
  // taskInfo.taskInfo = task;

  // const info = await runtime.Task.info(task.user_id, task.task_id);
  // if (info !== null) {
  //   taskInfo.taskInfo = info;
  // }

  // await greycat.call<runtime.Task>('project::task_long_running');
});
