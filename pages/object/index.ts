import { mount } from '../common';
import { Foo } from './foo';

mount(async (app) => {
  app.appendChild(await Foo());
});