import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

const { actions } = await import('./actions');

const data = await gc.project.data_array();

document.body.appendChild(
  appLayout('Table (columnFactories)',
    actions,
    <gui-table
      value={data}
      columns={[
        {
          index: gc.project.MyData.$fields.value,
          header: 'Level(value)',
          value: ({ row }) => {
            const entry = data[row];
            return `${entry.level.key}(${entry.value})`;
          },
        },
      ]}
    />,
  ),
);
