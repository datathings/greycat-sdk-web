import { runtime } from '../../src';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Hello';
await app.init();

document.body.prepend(app);

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

app.main.appendChild(
  <div role="list">
    <article>
      <header>Users</header>
      <gui-user-table users={users} groups={groups} roles={roles} />
    </article>
    <article>
      <header>Roles</header>
      <gui-user-roles roles={roles} permissions={permissions} />
    </article>
  </div>,
);
