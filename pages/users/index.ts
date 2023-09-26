import { runtime } from '@greycat/sdk';

import { mount } from '../common';

mount(async (app) => {
  const users: runtime.User[] = [];
  const groups: runtime.UserGroup[] = [];
  const entities = await runtime.User.all();
  for (const entity of entities) {
    if (entity instanceof runtime.User) {
      users.push(entity);
    } else if (entity instanceof runtime.UserGroup) {
      groups.push(entity);
    }
  }
  const roles = await runtime.UserRole.all();
  const permissions = await runtime.SecurityPolicy.permissions();

  const userTable = document.createElement('gui-user-table');
  userTable.caption = 'Users';
  userTable.users = users;
  userTable.groups = groups;
  userTable.roles = roles;
  app.appendChild(userTable);

  const userRoles = document.createElement('gui-user-roles')!;
  userRoles.caption = 'Roles';
  userRoles.roles = roles;
  userRoles.permissions = permissions;
  app.appendChild(userRoles);
});
