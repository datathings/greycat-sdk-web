export enum TaskStatusEnum {
  empty,
  waiting,
  running,
  cancelled,
  error,
  ended,
}

export async function parseTaskArgs(
  g: gc.sdk.GreyCat,
  t: gc.runtime.Task,
): Promise<gc.sdk.Value[]> {
  const params: gc.sdk.Value[] = [];

  const filepath = `files/${t.user_id}/tasks/${t.task_id}/arguments.gcb`;
  const response = await fetch(`${g.api}/${filepath}`);
  if (!response.ok) {
    throw new Error(`Unable to fetch ${filepath}`);
  }

  const data = await response.arrayBuffer();
  const reader = new gc.sdk.AbiReader(g.abi, data);
  reader.headers();
  while (!reader.is_empty) {
    params.push(reader.deserialize());
  }

  return params;
}
