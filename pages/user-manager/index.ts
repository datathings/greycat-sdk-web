import { GreyCat, runtime } from '@greycat/sdk';

// @greycat/ui
import '../../src/css/full.css';
import './index.css';
import '../../src/bundle';

try {
  const toggleTheme = document.querySelector('#toggle-theme') as HTMLButtonElement;

  window.greycat.default = await GreyCat.init({ url: new URL('http://localhost:8080') });

  const roles = await runtime.UserRole.all();
  const permissions = await runtime.SecurityPolicy.permissions();

  const userRoles = document.createElement('gui-user-roles')!;
  userRoles.roles = roles;
  userRoles.permissions = permissions;
  document.body.appendChild(userRoles);

  toggleTheme.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') ?? 'black';
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
  });
} catch (err) {
  console.error(err);
  document.body.textContent = `Is GreyCat started?`;
}
