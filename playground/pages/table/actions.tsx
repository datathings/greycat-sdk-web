import { setGlobalDateTimeFormatTimezone } from '@greycat/sdk/web';

export const actions = (
  <>
    <sl-button slot="action" variant="text" onclick={() => location.assign('/pages/table/')}>
      Table
    </sl-button>
    <sl-button
      slot="action"
      variant="text"
      onclick={() => location.assign('/pages/table/ignore-cols.html')}
    >
      Ignore Cols
    </sl-button>
    <sl-button
      slot="action"
      variant="text"
      onclick={() => location.assign('/pages/table/many-cols.html')}
    >
      Many cols
    </sl-button>
    <sl-button
      slot="action"
      variant="text"
      onclick={() => location.assign('/pages/table/map.html')}
    >
      Map
    </sl-button>
    <sl-button
      slot="action"
      variant="text"
      onclick={() => location.assign('/pages/table/mappings.html')}
    >
      Mappings
    </sl-button>
    <sl-button
      slot="action"
      variant="text"
      onclick={() => location.assign('/pages/table/row-based.html')}
    >
      Row-based
    </sl-button>
    <sl-button
      slot="action"
      variant="text"
      onclick={() => location.assign('/pages/table/array-of-objects.html')}
    >
      Array-of-objects
    </sl-button>
    <sl-button
      slot="action"
      variant="text"
      onclick={() => location.assign('/pages/table/table-of-objects.html')}
    >
      Table-of-objects
    </sl-button>
    <sl-button
      slot="action"
      variant="text"
      onclick={() => location.assign('/pages/table/column-factories.html')}
    >
      Column Factories
    </sl-button>
    <gui-input-enum
      slot="action"
      type={greycat.core.TimeZone._type}
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
