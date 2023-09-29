import * as sdk from '@greycat/sdk';
import { GreyCat, Value, AbiReader, runtime, core } from '@greycat/sdk';

export enum TaskStatusEnum {
  empty,
  waiting,
  running,
  cancelled,
  error,
  ended,
}

export function timeToDate(time: sdk.core.time, timeZone: core.TimeZone): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return time.format(timeZone, options);
}

export async function parseTaskParams(g: GreyCat, t: runtime.TaskInfo | runtime.Task): Promise<Value[]> {
  const params: Value[] = [];

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

  return params;
}
