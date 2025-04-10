import { GuiInputTime, setGlobalDateTimeFormatTimezone } from '@greycat/web';
import '~/common';

await gc.sdk.init();

setGlobalDateTimeFormatTimezone(gc.core.TimeZone['Europe/Paris']);

const initial_time = gc.core.time.now();
const utc_input = (
  <gui-input-time
    value={initial_time}
    ongui-input={() => {
      if (utc_input.value) {
        result_utc_time.textContent = utc_input.value.toString();
        result_local_time.value = utc_input.value;
      }
    }}
  />
) as GuiInputTime;
const result_utc_time = document.createTextNode(initial_time.toString());
const result_local_time = document.createElement('gui-value');
result_local_time.value = initial_time;
result_local_time.style.display = 'contents';

document.body.appendChild(
  <app-layout title="Time • Inputs">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 250px',
        gridAutoRows: '1fr',
        alignItems: 'center',
      }}
    >
      <strong>Input:</strong>
      {utc_input}
      <strong>UTC:</strong>
      {result_utc_time}
      <strong>Local:</strong>
      {result_local_time}
    </div>
  </app-layout>,
);
