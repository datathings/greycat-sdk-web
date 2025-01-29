import { setGlobalDateTimeFormatTimezone } from '@greycat/web';

function link(name: string, page: string) {
  return (
    <sl-button slot="action" variant="text" onclick={() => location.assign(`/pages/table/${page}`)}>
      {name}
    </sl-button>
  );
}

export const actions = (
  <>
    {link('Table', 'index.html')}
    {link('Ignore Cols', 'ignore-cols.html')}
    {link('Editable', 'editable.html')}
    {link('Map', 'map.html')}
    {link('Mappings', 'mappings.html')}
    {link('Row-based', 'row-based.html')}
    {link('Array-of-objects', 'array-of-objects.html')}
    {link('Table-of-objects', 'table-of-objects.html')}
    {link('Column Factories', 'column-factories.html')}
    <gui-input-enum
      slot="action"
      type={gc.core.TimeZone._type}
      ongui-change={(ev) => {
        if (ev.detail) {
          const dateFmt = setGlobalDateTimeFormatTimezone(ev.detail);
          document.querySelectorAll('gui-value').forEach((el) => {
            el.dateFmt = dateFmt;
          });
        } else {
          document.querySelectorAll('gui-value').forEach((el) => {
            el.dateFmt = undefined; // reset to default
          });
        }
      }}
    />
  </>
);
