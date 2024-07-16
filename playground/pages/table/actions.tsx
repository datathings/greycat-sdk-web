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
      onclick={() => location.assign('/pages/table/map.html')}
    >
      Map
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
      onclick={() => location.assign('/pages/table/column-factories.html')}
    >
      Column Factories
    </sl-button>
  </>
);
