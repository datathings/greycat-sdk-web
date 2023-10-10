import { mount } from '../common';

mount(async (app, greycat) => {
  const periodicTasksComponent = document.createElement('gui-periodic-tasks');
  periodicTasksComponent.greycat = greycat;
  
  app.appendChild(periodicTasksComponent);
});
