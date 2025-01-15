import { TaskInfoLike } from './task-info/common.js';

export enum TaskStatusEnum {
  empty,
  waiting,
  running,
  cancelled,
  error,
  ended,
}

export async function parseTaskArgs(g: gc.sdk.GreyCat, t: TaskInfoLike): Promise<gc.sdk.Value[]> {
  const params: gc.sdk.Value[] = [];

  const response = await fetch(`${g.api}/files/${t.user_id}/tasks/${t.task_id}/arguments.gcb`);
  if (!response.ok) {
    throw new Error('Network response error');
  }

  const data = await response.arrayBuffer();
  const reader = new gc.sdk.AbiReader(g.abi, data);
  reader.headers();
  while (!reader.is_empty) {
    params.push(reader.deserialize());
  }

  return params;
}
