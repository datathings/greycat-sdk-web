export type TaskInfoLike = {
  user_id: number | bigint;
  task_id: number | bigint;
} & greycat.runtime.Task;
