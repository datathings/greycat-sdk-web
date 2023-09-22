import { mount } from '../common';

mount(async (app, greycat) => {
  app.textContent = await greycat.call('project::hello', ['world!']);
});