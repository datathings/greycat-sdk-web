import { GreyCat } from '@greycat/sdk';

// @greycat/ui
import '../../src/bundle';
import '../../src/css/full.css';

const app = document.getElementById('app') as HTMLDivElement;

try {
  const greycat = window.greycat.default = await GreyCat.init({ url: new URL('http://localhost:8080') });
  app.textContent = await greycat.call('project::hello', ['world!']);
} catch {
  app.textContent = `Is GreyCat started?`;
}