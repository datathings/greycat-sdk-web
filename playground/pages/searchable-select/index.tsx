import { GreyCat, IndexedDbCache, type SearchableOption } from '@greycat/web';
import '@/common';

const greycat = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const options: SearchableOption[] = [];
greycat.abi.types.forEach((ty, i) => {
  if (!ty.name.startsWith('::')) {
    options.push({
      value: i,
      text: ty.name,
    });
  }
});

const container = (<div className="grid" />) as HTMLElement;
container.appendChild(
  <>
    <gui-searchable-select
      options={options}
      placeholder="Search for a type, eg. core::String, core::int..."
      ongui-change={(ev) => {
        container.children[1].remove();
        container.appendChild(
          <div>You have selected: {greycat.abi.types[ev.detail as number]?.name}</div>,
        );
      }}
    />
    <div>No selection</div>
  </>,
);

document.body.appendChild(<app-layout title="Searchable Select">{container}</app-layout>);
