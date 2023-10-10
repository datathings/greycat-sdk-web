import { GreyCat } from '@greycat/sdk';
import { mount } from '../common';

mount(async (app) => {
  const greycat = (window.greycat.default = await GreyCat.init({
    url: new URL('http://localhost:8080'),
  }));

  const periodicTasksComponent = document.createElement('gui-periodic-tasks');
  periodicTasksComponent.greycat = greycat;
  
  app.appendChild(periodicTasksComponent);
});
