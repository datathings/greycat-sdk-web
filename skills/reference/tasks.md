# Tasks: tracking, the event stream, polling

## Contents

- Tracking a task: wait, subscribe, await, spawnAwait
- Errors and events
- How updates arrive: the event stream and the polling fallback
- Credentials and the stream
- Node and browsers
- Controlling the stream

## Tracking a task

```ts
const task = await gc.shop.rebuild_index.spawn();
const off = greycat.tasks.subscribe(task.task_id, (t) => render(t.progress)); // every update
const done = await greycat.tasks.wait(task.task_id);                          // terminal task
const result = await greycat.await(task, { onprogress });                     // its result
const same = await greycat.spawnAwait('shop::rebuild_index', [], { onprogress });
```

- `wait(id)` resolves with the terminal `runtime::Task`, rejects on failure.
- `subscribe(id, listener)` calls the listener on every update, the terminal
  one included, and returns an unsubscribe. `greycat.watchTask` is a
  shorthand.
- `await(task, opts)` waits for the end, then fetches the result from the
  task's `result.gcb` file. `opts.onprogress` receives `task.progress`
  (`0..1` or `null`) on each update and `1` at the end.
- `spawnAwait(fqn, args, opts)` is `await(await spawn(...))`, in the worker
  class `opts.taskClass` names. For a function the server never spawns, it
  returns the value the server answered with (see [calls.md](calls.md)).

A task is watched only while one of these holds it. A task spawned and never
waited on reaches the instance only through `task:event`, and only while the
stream is open: a page listing every running task listens to it and refreshes
from `runtime::Task::running` while `tasks.transport` is `'poll'`.

## Errors and events

`wait` and `await` reject with `TaskError`: `reason` is `'cancelled'`,
`'error'` (the task threw; `task.status` is `error` or `ended_with_errors`) or
`'inaccessible'` (unknown id, or another user's task); `task` holds the
terminal task when there is one.

The instance mirrors the tracker:

| Event | Payload | When |
| --- | --- | --- |
| `task:spawn` | `runtime::Task` | this instance spawned a task |
| `task:update` | `runtime::Task` | a tracked task has a fresh snapshot, terminal included |
| `task:settle` | `{ task, error }` | a tracked task left the tracker; `error` is `null` or a `TaskError` |
| `task:event` | `runtime::Task` | every frame of the event stream, tracked or not: each progress report and the end of every task the login may see; silent while the stream is not open |

## How updates arrive

`init` opens `GET /runtime::Task::events`, a Server-Sent Events stream on
which the server pushes every task the caller may see: a `task-progress`
frame whenever the whole percentage of `Task::add_steps` over
`Task::expected_steps` changes, a `task-complete` frame when the task ends,
whatever its final status. Frames carry the task as GCB, decoded like a call
result. While the stream is open, an update reaches the listener as the server
reports it and no request is made.

Whenever the stream is not open (still connecting, dropped and reconnecting,
refused, disabled), the tracker polls `runtime::Task::tasks(ids)` in one
batched request per tick, at the fastest cadence a consumer asked for:
`pollEvery` in the task options, else `pollFrequency` from `init` (100 ms).
A task registered while the stream is open gets one snapshot, so a task that
already ended still settles. Consumers see the same behaviour either way.

A dropped stream reconnects after 1 s, then 5, 10, 20, and every 30 s; polling
covers the gap, and one poll resyncs the tracked tasks when it reopens.
Silence longer than 45 s counts as a drop (the server pings every 15 s). A
server with no stream to offer (older core, Windows, an anonymous session on a
server that requires a login) is not retried: polling serves the session. A
server past its `max_sse` or `max_sse_per_user` cap answers 429 and is retried.

`greycat.tasks.transport` is `'stream'` or `'poll'`; `streamState` is `idle`,
`connecting`, `open` or `closed`; `greycat.isPollingTasks()` says whether the
fallback has something to poll right now.

## Credentials and the stream

The stream is bound to the credentials it was opened with. `greycat.login`,
`greycat.logout`, a 401 on any request, and a direct assignment of
`greycat.token` all restart or close it, so events never outlive a login. A
cookie session established outside the instance is invisible to it: call
`greycat.tasks.reconnect()` afterwards. See [auth.md](auth.md).

## Node and browsers

An open stream keeps a Node process alive. A script or a test that called
`init` must end with `greycat.tasks.disconnect()`, or init with
`taskEvents: false` and let polling do the work.

A browser allows six connections per origin over HTTP/1.1, and each instance
holds one for its stream. Do not create instances per component; share
`gc.$.default`.

## Controlling the stream

| Call | Effect |
| --- | --- |
| `init({ taskEvents: false })` | never open a stream; polling only |
| `greycat.tasks.connect()` | open it (an `initWithAbi` instance, or after `disconnect`) |
| `greycat.tasks.disconnect()` | close it and stop reconnecting; tracked tasks fall back to polling |
| `greycat.tasks.reconnect()` | close and reopen with the current credentials, if it was asked for |
