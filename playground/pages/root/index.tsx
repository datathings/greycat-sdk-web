import { GreyCat } from '@greycat/web';
import '@/common';

const greycat = await GreyCat.init();

document.body.appendChild(
  <app-layout title="Root">
    <gui-object header value={await greycat.root()} style={{ display: 'inline-block' }} />
  </app-layout>,
);
