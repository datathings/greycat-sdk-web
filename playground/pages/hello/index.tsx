import { GreyCat } from '@greycat/web';
import { LayoutHeader, LayoutMenu } from '@/common';

const greycat = await GreyCat.init();

const table = await greycat.call('project::persons');
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
