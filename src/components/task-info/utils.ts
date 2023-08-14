import * as sdk from '@greycat/sdk';

function destructuredTimeToMs(epoch: number, us: number): number {
  const ms_n = BigInt(epoch) * BigInt(1_000) + BigInt(us) / BigInt(1_000);
  return Number(ms_n);
}

function timeToMs(t: sdk.core.time): number {
  return destructuredTimeToMs(t.epoch, t.us);
}

function formatDateWithTimezone(date: Date): string {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const formattedDate = date.toLocaleString('en-US', options);
  const timezoneOffset = date.getTimezoneOffset();

  const sign = timezoneOffset > 0 ? '-' : '+';
  const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
  const offsetMinutes = Math.abs(timezoneOffset) % 60;

  const timezoneFormatted = `${sign}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;

  return formattedDate + ' ' + timezoneFormatted;
}

export default function timeToDate(time: sdk.core.time): string {
  if (time.iso) {
    return formatDateWithTimezone(new Date(time.iso));
  }
  return formatDateWithTimezone(new Date(timeToMs(time)));
}