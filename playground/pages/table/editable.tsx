import { createElement, GuiChangeEvent, sl } from '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

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
  action: null;
}

const groups = ['devs', 'editors', 'moderators', 'users', 'admin'];
const users: User[] = [
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
    action: null,
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
    action: null,
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
    action: null,
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
    action: null,
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
    action: null,
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
    action: null,
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
    action: null,
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
    action: null,
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
    action: null,
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
    action: null,
  },
];

function deleteRow(rowIdx: number) {
  return () => {
    // TODO
    console.log('delete row', rowIdx);
    users.splice(rowIdx, 1);
    tableEl.value = users;
  };
}

const tableEl = createElement('gui-table', {
  value: users,
  globalFilter: true,
  sortBy: [0, 'asc'],
  rowHeight: 30,
  useDefaultColumns: true,
  columns: [
    { index: 2, cell: { tag: 'gui-input-bool', props: { size: 'small' } } },
    { index: 3, cell: { tag: 'gui-input-bool', props: { size: 'small' } } },
    { index: 4, cell: { tag: 'gui-input-string', props: { size: 'small' } } },
    { index: 5, cell: { tag: 'gui-input-string', props: { size: 'small' } } },
    {
      index: 7,
      cell: ({ value, container }) => {
        return (
          <sl-select
            size="small"
            value={(value ?? []).join(' ')}
            maxOptionsVisible={1}
            multiple
            clearable
            hoist
            onsl-change={(ev) => {
              ev.stopPropagation();
              container.dispatchEvent(new GuiChangeEvent((ev.target as sl.SlSelect).value));
            }}
          >
            {groups.map((group) => (
              <sl-option value={group}>{group}</sl-option>
            ))}
          </sl-select>
        );
      },
    },
    {
      index: 9,
      width: 100,
      cell: ({ row }) => {
        return (
          <sl-button variant="text" size="small" onclick={deleteRow(row)}>
            Delete
          </sl-button>
        );
      },
    },
  ],
  'ongui-table-change': (ev) => {
    console.log('event.detail', ev.detail);
    console.log('users', users);
  },
});

document.body.appendChild(
  <app-layout title="Table (editable)">
    {actions}
    {tableEl}
  </app-layout>,
);
