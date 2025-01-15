import { TableLike } from '@greycat/web';
import '@/common';

await gc.sdk.init();

const { actions } = await import('./actions');

document.body.appendChild(
  <app-layout title="Table (map)">
    {actions}
    <gui-table
      value={(await gc.project.mapTest()) as TableLike}
      columnFactory={{ 1: 'gui-object' }}
      ongui-click={(ev) => {
        console.log(ev.detail);
      }}
    />
  </app-layout>,
);
