import '../layout';
import './index.css';

import './computed-signals';
import './2-way-binding';
import './strike-through';
import './todo-list';
import './find-user';
import './poke-finder';

const app = document.createElement('app-layout');
app.title = 'Signals';
await app.init();

document.body.append(app);

app.main.appendChild(
  <div>
    <computed-signals />
    <hr />
    <two-way-databinding />
    <hr />
    <strike-through />
    <hr />
    <todo-list />
    <hr />
    <find-user />
    <hr />
    <poke-finder />
  </div>,
);
