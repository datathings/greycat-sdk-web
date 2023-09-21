import { GreyCat, runtime } from '@greycat/sdk';

// @greycat/ui
import '../../src/css/full.css';
import './index.css';
import '../../src';

const app = document.getElementById('app')!;

try {
  const toggleTheme = document.querySelector('#toggle-theme') as HTMLButtonElement;

  window.greycat.default = await GreyCat.init({ url: new URL('http://localhost:8080') });
  // TODO: we need to fix this type casting in the sdk
  const users = (await runtime.User.all()) as runtime.User[];
  const roles = await runtime.UserRole.all();
  const permissions = await runtime.SecurityPolicy.permissions();

  const userRoles = document.createElement('gui-user-roles')!;
  userRoles.caption = 'Roles';
  userRoles.roles = roles;
  userRoles.permissions = permissions;
  app.appendChild(userRoles);

  const groups = [
    runtime.UserGroup.create(0, 'first group', true),
    runtime.UserGroup.create(1, 'second group', true),
  ];

  const userTable = document.createElement('gui-user-table');
  userTable.caption = 'Users';
  userTable.users = users;
  userTable.roles = roles;
  userTable.groups = groups;
  app.appendChild(userTable);

  toggleTheme.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') ?? 'black';
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
  });
} catch (err) {
  console.error(err);
  app.textContent = `Is GreyCat started?`;
}
