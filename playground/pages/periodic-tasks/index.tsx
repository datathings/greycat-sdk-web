import { GreyCat, IndexedDbCache, runtime, ObjectInput } from '@greycat/web';
import '@/common';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

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

document.body.appendChild(
  <app-layout title="Periodic Tasks">
    <div role="list">
      <article>
        <header style={{ display: 'flex', justifyContent: 'space-between' }}>
          Create a periodic task
          <a href="#" onclick={createTask} style={{ fontWeight: 'normal' }}>
            Create
          </a>
        </header>
        <div style={{ padding: 'var(--spacing)' }}>{periodicTaskInput.element}</div>
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
  </app-layout>,
);
