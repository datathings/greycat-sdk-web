import { runtime } from '@greycat/sdk';

import { mount } from '../common';

mount(async (app) => {
  // TODO: we need to fix this type casting in the sdk
  const users = (await runtime.User.all()).filter(
    (el): el is runtime.User => el instanceof runtime.User,
  );
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
});
