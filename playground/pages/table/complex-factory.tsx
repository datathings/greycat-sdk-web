import '@greycat/web';
import '~/common';

await gc.sdk.init();

const { actions } = await import('./actions');

const data = await gc.complex_factory.cable_views();

document.body.appendChild(
  <app-layout title="Table (complex-factory)">
    {actions}
    <gui-table
      globalFilter
      drawerEnabled
      value={data}
      columns={[
        {
          index: gc.complex_factory.CableView.$fields.cableId,
          header: 'Id',
          width: 100,
        },
        {
          index: gc.complex_factory.CableView.$fields.regionalCenter,
          header: 'Regional Center',
          width: 200,
        },
        {
          index: gc.complex_factory.CableView.$fields.voltageLevel,
          header: 'Level',
          width: 100,
          value: (value) => value.key,
        },
        {
          index: gc.complex_factory.CableView.$fields.voltageValue_kV,
          header: 'Voltage',
          value: (value) => `${value} kV`,
        },
      ]}
    />
  </app-layout>,
);
