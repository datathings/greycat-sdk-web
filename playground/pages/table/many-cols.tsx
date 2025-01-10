import '@/common';
import { core, GreyCat, IndexedDbCache } from '@greycat/sdk/web';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const { actions } = await import('./actions');

const table = core.Table.create([
  [3, 5, 7, 9, 8, 2, 1, 6, 4, 10],
  ['user3', 'user5', 'user7', 'user9', 'user8', 'user2', 'user1', 'user6', 'user4', 'user10'],
  [true, true, true, true, false, false, true, true, false, false],
  [
    'Alice Smith',
    'Bob Brown',
    'Charlie Davis',
    'Diana Evans',
    'Goerge Abitbol',
    'John Doe',
    'Jane Doe',
    'Michel Hazanavicius',
    'Philip Morris',
    'Santa Claus',
  ],
  [
    'alice.smith@example.com',
    'bob.brown@example.com',
    'charlie.davis@example.com',
    'diana.evans@example.com',
    'g.abitbol@la.class',
    'john.doe@example.com',
    'jane.doe@example.com',
    'm.haza@film.maker',
    'philip.morris@clope.org',
    'santa-claus@northpole.elf',
  ],
  [
    'user',
    'editor',
    'moderator',
    'user',
    'public',
    'public',
    'admin',
    'public',
    'public',
    'public',
  ],
  [6144, 7168, 5120, 6144, 4096, 4096, 8192, 4096, 4096, 4096],
  [
    ['devs'],
    ['editors'],
    ['moderators'],
    ['users'],
    null,
    null,
    ['admins', 'devs'],
    null,
    null,
    null,
  ],
  [true, false, true, false, false, false, false, false, false, false],
]);
table.headers = [
  'id',
  'username',
  'is_active',
  'fullname',
  'email',
  'role',
  'permission_flags',
  'groups',
  'is_admin',
];

document.body.appendChild(
  <app-layout title="Table (many cols)" mainStyle={{ display: 'flex', gap: 'var(--spacing)' }}>
    {actions}
    <gui-table
      value={table}
      globalFilter
      columnsWidths={[100, 100, 100]}
      columnFactory={{
        2: { tag: 'gui-input-string', props: { size: 'small' } },
        3: { tag: 'gui-input-bool', props: { size: 'small'} },
        4: { tag: 'gui-input-string', props: { size: 'small'} },
        5: { tag: 'gui-input-string', props: { size: 'small'} },
      }}
      ongui-change={function (ev) {
        console.log('ongui-change', {
          detail: ev.detail,
          value: this.table.cols[ev.detail.colIdx][ev.detail.rowIdx],
        });
      }}
    />
  </app-layout>,
);
