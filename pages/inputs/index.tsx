import { AnyInput } from '../../src';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Inputs';

await app.init();

document.body.prepend(app);

const objViewer = document.createElement('gui-object');

const input = new AnyInput('any-value', (v) => {
  objViewer.value = v;
  console.log('updated value', v);
});

app.main.replaceChildren(
  <div>
    <fieldset>
      <label>Input</label>
      {input.element}
    </fieldset>
    <article>
      <header>Input value</header>
      <div className="container-fluid">{objViewer}</div>
    </article>
  </div>,
);
