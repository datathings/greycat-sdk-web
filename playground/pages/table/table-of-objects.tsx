import '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

const { actions } = await import('./actions');

// const table = await gc.project.objects_table();
const persons = await gc.project.persons() as gc.project.Person2[];

document.body.appendChild(
  <app-layout
    title="Table (array of objects)"
    mainStyle={{ display: 'flex', gap: 'var(--spacing)' }}
  >
    {actions}
    <gui-table
      value={persons}
      useDefaultColumns
      columns={[
        { index: gc.project.Person2.$fields.id, width: 65 },
        { index: gc.project.Person2.$fields.age, cell: 'gui-input-number' },
        { index: gc.project.Person2.$fields.name, cell: 'gui-input-string' },
      ]}
    />
  </app-layout>,
);
