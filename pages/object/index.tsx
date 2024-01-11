import { core, GuiObject, isNode, type ObjectProps } from '../../src';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Object';
await app.init();

document.body.prepend(app);

const anonymousObj = await greycat.default.call('project::complex_object');
const table = await greycat.default.call<core.Table>('project::table');

const sharedProps: Omit<ObjectProps, 'value'> = {
  linkify: isNode,
  onClick: (...args) => {
    console.log(args);
  },
};

class PotatoComponent extends GuiObject {
  static count = 0;

  constructor() {
    super();

    ++PotatoComponent.count;
  }

  override set value(_value: unknown) {
    // noop
  }

  override connectedCallback(): void {
    this.textContent = `Potato ${PotatoComponent.count}`;
  }
}

customElements.define('my-potato', PotatoComponent);

declare global {
  interface HTMLElementTagNameMap {
    'my-potato': PotatoComponent;
  }
}

GuiObject.components.set(core.TimeZone._type, 'my-potato');

const obj1 = await greycat.default.call('project::obj1');
const obj2 = await greycat.default.call('project::obj2');

app.main.appendChild(
  <div className="grid">
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing)',
      }}
    >
      <gui-object value={anonymousObj} withHeader {...sharedProps} />
      <gui-object value={obj1} withHeader {...sharedProps} />
      <gui-object value={obj2} {...sharedProps} />
      <gui-object value={core.DurationUnit.years()} withHeader {...sharedProps} />
    </div>
    <article style={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <header>Tables are displayed using &lt;gui-table /&gt;</header>
      <gui-object value={table} {...sharedProps} />
    </article>
  </div>,
);
