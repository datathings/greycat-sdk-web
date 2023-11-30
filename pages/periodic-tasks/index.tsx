import { ObjectInput, runtime } from '../../src';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Periodic Tasks';

await app.init();

document.body.prepend(app);

const periodicTaskType = greycat.default.abi.type_by_fqn.get(runtime.PeriodicTask._type);
if (!periodicTaskType) {
  throw new Error('missing ABI type runtime::PeriodicTask');
}

let pTask: runtime.PeriodicTask | null = null;
const periodicTaskInput = new ObjectInput('periodic-task', periodicTaskType, (v) => {
  pTask = v;
});

const periodicTaskList = document.createElement('gui-periodic-task-list');
periodicTaskList.reloadTasks();

const createTask = async () => {
  try {
    if (pTask !== null) {
      await periodicTaskList.updateTasks([...periodicTaskList.tasks, pTask]);
    }
  } catch (err) {
    // TODO proper error handling
    console.error(err);
  }
};

app.main.replaceChildren(
  <>
    <div className="grid">
      <article>
        <header style={{ display: 'flex', justifyContent: 'space-between' }}>
          Create a periodic task
          <a href="#" onclick={createTask} style={{ fontWeight: 'normal' }}>
            Create
          </a>
        </header>
        <div className="container-fluid">{periodicTaskInput.element}</div>
      </article>
      <article>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Periodic Task List
          <a
            href="#"
            onclick={() => periodicTaskList.reloadTasks()}
            style={{ fontWeight: 'normal' }}
          >
            Reload
          </a>
        </header>
        {periodicTaskList}
      </article>
    </div>
  </>,
);
