import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

document.body.appendChild(
  appLayout('Inputs (slot)',
    <gui-input-object
      value={new gc.Filters(42, 'John')}
      inline
      ongui-change={function () {
        console.log(this.validate(), this.value?.toJSON());
      }}
    >
      <gui-select slot="b" options={[{ value: 'John', selected: true }, { value: 'Paul' }, { value: 'Maria' }]} />
    </gui-input-object>,
  ),
);
