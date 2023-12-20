import { GreyCat, Value, AbiReader, runtime } from '@greycat/sdk';

export enum TaskStatusEnum {
  empty,
  waiting,
  running,
  cancelled,
  error,
  ended,
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
