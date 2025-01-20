import '@/common';
import '@greycat/web';

await gc.sdk.init();

const { actions } = await import('./actions');

interface User {
  id: number;
  username: string;
  is_active: boolean;
  fullname: string;
  email: string;
  role: string;
  permission_flags: number;
  groups: string[] | null;
  is_admin: boolean;
}

const table = gc.core.Table.fromObjects<User>([
  {
    id: 3,
    username: 'user3',
    is_active: true,
    fullname: 'Alice Smith',
    email: 'alice.smith@example.com',
    role: 'user',
    permission_flags: 6144,
    groups: ['devs'],
    is_admin: true,
  },
  {
    id: 5,
    username: 'user5',
    is_active: true,
    fullname: 'Bob Brown',
    email: 'bob.brown@example.com',
    role: 'editor',
    permission_flags: 7168,
    groups: ['editors'],
    is_admin: false,
  },
  {
    id: 7,
    username: 'user7',
    is_active: true,
    fullname: 'Charlie Davis',
    email: 'charlie.davis@example.com',
    role: 'moderator',
    permission_flags: 5120,
    groups: ['moderators'],
    is_admin: true,
  },
  {
    id: 9,
    username: 'user9',
    is_active: true,
    fullname: 'Diana Evans',
    email: 'diana.evans@example.com',
    role: 'user',
    permission_flags: 6144,
    groups: ['users'],
    is_admin: false,
  },
  {
    id: 8,
    username: 'user8',
    is_active: false,
    fullname: 'Goerge Abitbol',
    email: 'g.abitbol@la.class',
    role: 'public',
    permission_flags: 4096,
    groups: null,
    is_admin: false,
  },
  {
    id: 2,
    username: 'user2',
    is_active: false,
    fullname: 'John Doe',
    email: 'john.doe@example.com',
    role: 'public',
    permission_flags: 4096,
    groups: null,
    is_admin: false,
  },
  {
    id: 1,
    username: 'user1',
    is_active: true,
    fullname: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'admin',
    permission_flags: 8192,
    groups: ['admins', 'devs'],
    is_admin: false,
  },
  {
    id: 6,
    username: 'user6',
    is_active: true,
    fullname: 'Michel Hazanavicius',
    email: 'm.haza@film.maker',
    role: 'public',
    permission_flags: 4096,
    groups: null,
    is_admin: false,
  },
  {
    id: 4,
    username: 'user4',
    is_active: false,
    fullname: 'Philip Morris',
    email: 'philip.morris@clope.org',
    role: 'public',
    permission_flags: 4096,
    groups: null,
    is_admin: false,
  },
  {
    id: 10,
    username: 'user10',
    is_active: false,
    fullname: 'Santa Claus',
    email: 'santa-claus@northpole.elf',
    role: 'public',
    permission_flags: 4096,
    groups: null,
    is_admin: false,
  },
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
        3: { tag: 'gui-input-bool', props: { size: 'small' } },
        4: { tag: 'gui-input-string', props: { size: 'small' } },
        5: { tag: 'gui-input-string', props: { size: 'small' } },
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
