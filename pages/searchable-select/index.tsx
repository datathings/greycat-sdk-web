import { type SearchableOption } from '../../src';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Searchable Select';
await app.init();

document.body.prepend(app);

const options: SearchableOption[] = [];
greycat.default.abi.types.forEach((ty, i) => {
  if (!ty.name.startsWith('::')) {
    options.push({
      value: i,
      text: ty.name,
    });
  }
});

const container = document.createElement('div');
container.className = 'grid';

container.appendChild(
  <gui-searchable-select
    options={options}
    placeholder="Search for a type, eg. core::String, core::int..."
    onsearchable-select-change={(ev) => {
      container.children[1].remove();
      container.appendChild(
        <div>You have selected: {greycat.default.abi.types[ev.detail as number].name}</div>,
      );
    }}
  />,
);
container.appendChild(<div>No selection</div>);

app.main.appendChild(container);
