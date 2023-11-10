import { AnyInput } from '../../src';
import '../layout';
import { GCObject, core } from '@greycat/sdk';

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
  <div className="grid">
    <div style={{ overflow: 'auto' }}>{input.element}</div>
    <article>
      <header>Object Viewer</header>
      <div className="container-fluid">{objViewer}</div>
    </article>
  </div>,
);


console.log(greycat.default.abi.fn_by_fqn.get('project::boxplot_float')!);
const nodeInput = (
    <gui-input-fncall
      fn={greycat.default.abi.fn_by_fqn.get('project::hello')!}
      disabled={false}
      invalid={false}
      oninput={(v) => console.log('updated val: ', v)}
    />
  );

app.main.appendChild(nodeInput);
