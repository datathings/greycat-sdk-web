import '@greycat/web';
import '~/common';

await gc.sdk.init();

document.body.appendChild(
  <app-layout title="Inputs (slot)">
    <gui-input-object
      value={new gc.Filters(42, 'John')}
      inline
      ongui-change={function () {
        console.log(this.validate(), this.value?.toJSON());
      }}
    >
      <gui-select
        slot="b"
        options={[{ value: 'John', selected: true }, { value: 'Paul' }, { value: 'Maria' }]}
      />
    </gui-input-object>
  </app-layout>,
);
