import { AnyInput } from '../../src';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Any input';

await app.init();

document.body.prepend(app);

const objViewer = document.createElement('gui-object');

const anyInput = new AnyInput('any-value', (v) => {
  objViewer.value = v;
  console.log('updated value', v);
});

app.main.replaceChildren(
  <div className="grid">
    {anyInput.element}
    <article>
      <header>Object Viewer</header>
      <div className="container-fluid">{objViewer}</div>
    </article>
  </div>,
  // Example
  <gui-input-string
    disabled={false}
    invalid={false}
    oninput={(v) => console.log('update string', v)}
  />,
  <gui-input-char
    disabled={false}
    invalid={false}
    oninput={(v) => console.log('update char', v)}
  />
);
