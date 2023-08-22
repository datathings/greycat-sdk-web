import * as sdk from '@greycat/sdk';
import { GreyCat, Value, AbiReader, runtime } from '@greycat/sdk';

function formatDateWithTimezone(date: Date, timeZone?: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  if (timeZone)
    options.timeZone = timeZone;

  const formattedDate = date.toLocaleString('en-US', options);
  const timezoneOffset = date.getTimezoneOffset();

  const sign = timezoneOffset > 0 ? '-' : '+';
  const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
  const offsetMinutes = Math.abs(timezoneOffset) % 60;

  const timezoneFormatted = `${sign}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;

  return formattedDate + ' ' + timezoneFormatted;
}

export enum TaskStatusEnum {
  empty,
  waiting,
  running,
  cancelled,
  error,
  ended,
}

// If timeZone variable is not passed, it uses current time zone of running environment.
export function timeToDate(time: sdk.core.time, timeZone?: string): string {
  if (!time)
    return "undefined";
  const timeInMs = Number(BigInt(time.value) / BigInt(1_000));
  return formatDateWithTimezone(new Date(timeInMs), timeZone);
}

export async function parseTaskParams(g: GreyCat, t: runtime.TaskInfo | runtime.Task): Promise<Value | undefined> {
  if (!g)
    return undefined;
  
  const params: Value[] = [];

  try {
    const response = await fetch(`${g.api}/files/${t.user_id}/tasks/${t.task_id}/params.gcb`);
    if (!response.ok) {
      throw new Error('Network response error');
    }

    const data = await response.arrayBuffer();
    const reader = new AbiReader(g.abi, data);
    reader.headers();
    while (!reader.is_empty) {
      params.push(reader.deserialize());
    }
  } catch (error) {
      console.error('Error fetching data:', error);
      return undefined;
  }

  return params;
}

export function createTimezoneSelect(defaultTimezone: string): HTMLSelectElement {
  const timezoneSelect = document.createElement('select');
  timezoneSelect.setAttribute('id', 'timezone-select');

  let timezones = [defaultTimezone];

  // TODO: Populate all the timezones from the backend
  if (Intl.supportedValuesOf) {
    timezones = Intl.supportedValuesOf('timeZone');
  } else {
    console.error('Your browser does not support Intl.supportedValuesOf().');
  }

  timezones.forEach(timezone => {
    const option = document.createElement('option');
    option.value = timezone;
    option.textContent = timezone;
    timezoneSelect.appendChild(option);
  });

  timezoneSelect.value = defaultTimezone;

  return timezoneSelect;
}