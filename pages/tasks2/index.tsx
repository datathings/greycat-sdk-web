import { type GuiTasks, type GuiTaskSelect } from '../../src';
import modal from '../../src/modal';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Tasks2';
await app.init();

document.body.prepend(app);

const taskList = (
  <gui-tasks
    style={{ height: '500px' }}
    ongui-click={(ev) => {
      // display the clicked task id
      modal.info(
        <gui-task-info
          value={ev.detail}
          ongui-update={() => {
            console.log('task info update');
            taskList.reload();
          }}
        />,
        {
          title: 'Task info',
          confirm: 'Close',
        },
      );
    }}
  />
) as GuiTasks;

app.main.appendChild(
  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
    {CreateTask()}
    {taskList}
  </div>,
);

function CreateTask() {
  const select = (<gui-task-select />) as GuiTaskSelect;

  return (
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
              // trigger a reload when a new task is created manually
              taskList.reload();
            }}
          >
            Create
          </button>
        </div>
      </div>
    </article>
  );
}
