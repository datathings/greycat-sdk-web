import { GreyCat, IndexedDbCache } from '@greycat/web';
import { projectlib } from '@/common';

const greycat = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
  libraries: [projectlib],
});

const root = greycat.findType('project::Root');
if (!root) {
  throw new Error('unable to find Root type');
}

document.body.appendChild(
  <app-layout title="node-time">
    {/* <gui-object value={root} /> */}
  </app-layout>,
);
