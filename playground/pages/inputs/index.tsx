import { GreyCat, IndexedDbCache, core } from '@greycat/web';
import './project-sensor-form';
import { project, projectlib } from '@/common';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
  libraries: [projectlib],
});

// One can override any form by providing a tagName that
// matches a WebComponent that inherits GuiInputElement:
// eg.
//
// GuiInput.factory['project::Sensor'] = 'project-sensor-form';

document.body.appendChild(
  <app-layout title="Inputs">
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing)',
      }}
    >
      {InputViewer('string', 'Hello world!')}
      {InputViewer('number', 42)}
      {InputViewer('boolean', false)}
      {InputViewer('core::time', core.time.fromMs(Date.now()))}
      {InputViewer('Enum (type)', greycat.default.findType(core.TimeZone._type))}
      {InputViewer('Enum (value)', core.TimeZone.Europe_Paris())}
      {InputViewer('Object (type)', greycat.default.findType('project::Sensor'))}
      {InputViewer('Object (instance)', project.Sensor.create(42, project.SensorKind.Pressure()))}
    </div>
  </app-layout>,
);

function InputViewer(header: string, value: unknown) {
  const display = document.createElement('gui-value');
  display.value = value;
  const input = document.createElement('gui-input');
  input.value = value;
  input.addEventListener('gui-update', () => {
    console.log(`[gui-update][${header}]`, input.value);
    display.value = input.value;
  });
  input.addEventListener('gui-change', () => {
    console.log(`[gui-change][${header}]`, input.value);
    display.value = input.value;
  });

  return (
    <sl-card>
      <h6 slot="header" style={{ margin: '0' }}>
        {header}
      </h6>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing)' }}>
        {input}
        {display}
      </div>
    </sl-card>
  );
}
