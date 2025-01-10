import '@greycat/sdk/web';
import { LayoutHeader, LayoutMenu } from '@/common';

const g = await greycat.GreyCat.init();

const table = await g.call('project::persons');
console.log(table);

document.body.appendChild(
  <gui-layout>
    {LayoutHeader({
      homePath: '../..',
      items: ['Hello'],
    })}
    {LayoutMenu({ current: 'hello' })}
    <gui-value value="Hello, world!" />
  </gui-layout>,
);
