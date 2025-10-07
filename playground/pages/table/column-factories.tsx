import '@greycat/web';
import '~/common';

await gc.sdk.init();

const { actions } = await import('./actions');

const data = await gc.project.data_array();

document.body.appendChild(
  <app-layout title="Table (columnFactories)">
    {actions}
    <gui-table
      value={data}
      columns={[
        {
          index: gc.project.MyData.$fields.value,
          header: 'Level(value)',
          value: (_value, _cell, _table, row) => {
            const entry = data[row];
            return `${entry.level.key}(${entry.value})`;
          },
        },
      ]}
    />
  </app-layout>,
);
