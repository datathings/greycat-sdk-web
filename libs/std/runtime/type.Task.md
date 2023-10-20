# [std](/libs/std/)::[runtime](/libs/std/runtime/)::Task

## Attributes

### creation:&nbsp;[time](/libs/std/core/type.time.md)

### fun:&nbsp;[String](/libs/std/core/type.String.md)

### mod:&nbsp;[String](/libs/std/core/type.String.md)

### status:&nbsp;[TaskStatus](/libs/std/runtime/enum.TaskStatus.md)

### task_id:&nbsp;[int](/libs/std/core/type.int.md)

### type:&nbsp;[String](/libs/std/core/type.String.md)

### user_id:&nbsp;[int](/libs/std/core/type.int.md)

## Methods
### fn cancel(task_id:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[bool](/libs/std/core/type.bool.md)<Badge text="native" /><Badge text="static" />
### fn history(offset:&nbsp;[int](/libs/std/core/type.int.md), max:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[Array](/libs/std/core/type.Array.md)<Badge text="native" /><Badge text="static" />
### fn id():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" /><Badge text="static" />
### fn info(user_id:&nbsp;[int](/libs/std/core/type.int.md), task_id:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[TaskInfo](/libs/std/runtime/type.TaskInfo.md)<Badge text="native" /><Badge text="static" />
### fn parentId():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" /><Badge text="static" />
### fn progress(progress:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;any?<Badge text="native" /><Badge text="static" />

set globally the progress for parent task, accepted value are between 0 and 1.
### fn running():&nbsp;[Array](/libs/std/core/type.Array.md)<Badge text="native" /><Badge text="static" />
### fn spawn(f:&nbsp;[function](/libs/std/core/type.function.md), params:&nbsp;[Array](/libs/std/core/type.Array.md)):&nbsp;any?<Badge text="native" /><Badge text="static" />
### fn spawnFinally(f:&nbsp;[function](/libs/std/core/type.function.md), params:&nbsp;[Array](/libs/std/core/type.Array.md)):&nbsp;any?<Badge text="native" /><Badge text="static" />
