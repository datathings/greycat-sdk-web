import { AnyInput } from '../../src';
import '../layout';
import { core } from '@greycat/sdk';

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
);

const node = new core.node(
  greycat.default.abi.types[greycat.default.abi.core_node_offset],
  BigInt(`0xa2c4e6`)
);

const nodeInput = (
    <gui-input-node
      value={node}
      name={"Rocky"}
      disabled={false}
      invalid={false}
      oninput={(v) => console.log('updated node: ', v)}
    />
  );

app.main.appendChild(nodeInput);
