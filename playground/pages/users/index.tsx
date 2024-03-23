import { GreyCat, IndexedDbCache, runtime } from '@greycat/web';
import '@/common';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

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

document.body.appendChild(
  <app-layout title="Users">
    <div role="list">
      <article>
        <header>Users</header>
        <gui-user-table value={users} groups={groups} roles={roles} />
      </article>
      <article>
        <header>Roles</header>
        <gui-user-roles value={roles} permissions={permissions} />
      </article>
    </div>
  </app-layout>,
);
