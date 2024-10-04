import { GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';
import actions from './actions';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

document.body.appendChild(
  <app-layout title="Tasks - Info">
    {actions}
    <gui-task-info value={{ user_id: 1, task_id: 1 }} />
  </app-layout>,
);
