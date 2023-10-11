import { mount } from '../common';

mount(async (app, greycat) => {
  const periodicTasksComponent = document.createElement('gui-periodic-tasks');
  periodicTasksComponent.greycat = greycat;

  const taskHistoryListComponent = document.createElement('gui-task-list')!;
  taskHistoryListComponent.greycat = greycat; 
  
  app.appendChild(periodicTasksComponent);
  app.appendChild(document.createElement('p'));
  app.appendChild(taskHistoryListComponent);
});
