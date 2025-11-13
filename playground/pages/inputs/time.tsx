import '@greycat/web';
import '~/common';

const greycat = await gc.sdk.init({ debug: true, timezone: 'Europe/Paris' });

const global_timezone_select = document.createElement('gui-input-enum');
global_timezone_select.value = greycat.timezone;
global_timezone_select.addEventListener('gui-change', () => {
  greycat.timezone = global_timezone_select.value as gc.core.TimeZone;
});

function Section1() {
  const local_tz = Intl.DateTimeFormat().resolvedOptions().timeZone as gc.core.TimeZone.Field;
  const initial_time = gc.core.time.now();
  const time_input = document.createElement('gui-input-time');
  time_input.value = initial_time;
  time_input.addEventListener('gui-input', update);
  const utc_display = document.createElement('gui-time');
  const local_display = document.createElement('gui-time');

  function update() {
    utc_display.setAttrs({ value: time_input.value, timezone: gc.core.TimeZone.UTC });
    local_display.setAttrs({ value: time_input.value, timezone: gc.core.TimeZone[local_tz] });
  }

  update();

  return (
    <>
      <strong>Input:</strong>
      {time_input}
      <strong>UTC:</strong>
      {utc_display}
      <strong>Local:</strong>
      {local_display}
    </>
  );
}

function Section2() {
  const initial_time = gc.core.time.now();

  const timezone_input = document.createElement('gui-input-enum');
  timezone_input.addEventListener('gui-change', update);
  timezone_input.value = gc.core.TimeZone['Australia/Adelaide'];
  const time_input = document.createElement('gui-input-time');
  time_input.value = initial_time;
  time_input.timezone = gc.core.TimeZone['Australia/Adelaide'];
  time_input.addEventListener('gui-input', update);
  const utc_display = document.createElement('gui-time');
  const local_display = document.createElement('gui-time');
  local_display.textualTimezone = true;
  const localized_display = document.createElement('gui-time');

  function update() {
    const tz = (timezone_input.value ?? greycat.timezone) as gc.core.TimeZone;
    time_input.timezone = tz;
    utc_display.setAttrs({ value: time_input.value, timezone: gc.core.TimeZone.UTC });
    local_display.setAttrs({
      value: time_input.value,
      timezone: gc.core.TimeZone['Europe/Paris'],
    });
    localized_display.setAttrs({ value: time_input.value, timezone: tz });
  }

  update();

  return (
    <>
      <strong>TimeZone:</strong>
      {timezone_input}
      <strong>Input:</strong>
      {time_input}
      <strong>UTC:</strong>
      {utc_display}
      <strong>Local:</strong>
      {local_display}
      <strong>Localized:</strong>
      {localized_display}
    </>
  );
}

document.body.appendChild(
  <app-layout title="Time • Inputs">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '150px 350px',
        gridAutoRows: '1fr',
        rowGap: 'var(--spacing)',
        columnGap: '16px',
        alignItems: 'center',
      }}
    >
      <strong>GreyCat TimeZone:</strong>
      {global_timezone_select}
      <sl-divider />
      <sl-divider />
      {Section1()}
      <sl-divider />
      <sl-divider />
      {Section2()}
    </div>
  </app-layout>,
);
