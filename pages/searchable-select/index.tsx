import { SearchableOption } from '../../src';
import { mount } from '../common';

mount((app, greycat) => {
  const options: SearchableOption[] = [];
  greycat.abi.types.forEach((ty, i) => {
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
          <div>You have selected: {greycat.abi.types[ev.detail as number].name}</div>,
        );
      }}
    />,
  );
  container.appendChild(<div>No selection</div>);

  app.appendChild(container);
});
