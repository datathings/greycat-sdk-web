import { GreyCat, IndexedDbCache, runtime } from '@greycat/web';
import '@/common';

const greycat = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const periodicTaskType = greycat.abi.type_by_fqn.get(runtime.PeriodicTask._type);
if (!periodicTaskType) {
  throw new Error('missing ABI type runtime::PeriodicTask');
}

let pTask: runtime.PeriodicTask | null = null;
const periodicTaskInput = (
  <gui-input-object
    type="runtime::PeriodicTask"
    ongui-change={(ev) => {
      pTask = ev.detail;
      console.log('onchange', ev.detail);
    }}
  />
);

const periodicTaskList = document.createElement('gui-periodic-task-list');
periodicTaskList.reloadTasks();

const createTask = async () => {
  try {
    if (pTask !== null) {
      await periodicTaskList.updateTasks([...periodicTaskList.value, pTask]);
    }
  } catch (err) {
    // TODO proper error handling
    console.error(err);
  }
};

document.body.appendChild(
  <app-layout title="Periodic Tasks">
    <div role="list">
      <sl-card>
        <header slot="header">
          Create a periodic task
          <sl-button variant="text" onclick={createTask}>
            Create
          </sl-button>
        </header>
        <div style={{ padding: 'var(--spacing)' }}>{periodicTaskInput}</div>
      </sl-card>
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
