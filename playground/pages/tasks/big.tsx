import '@greycat/web';
import { appLayout } from '~/common';
import actions from './actions';

await gc.sdk.init({ debug: true });

const task = await gc.big.get_huge_object.spawn();
const res_el = document.createElement('gui-object');
res_el.value = 'Awaiting task completion';

async function update_res_when_done() {
  res_el.value = await task.result();
}
update_res_when_done();

document.body.appendChild(
  appLayout('Tasks - Info', actions, <gui-object value={task} />, res_el),
);
