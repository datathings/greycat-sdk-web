# Tasks: tracking, the event stream, polling

## Contents

- Tracking a task: wait, subscribe, await, spawnAwait
- Errors and events
- How updates arrive: the event stream and the polling fallback
- Listening to the stream: `task:event`
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
- `task.isTerminal()` says whether the status a `runtime::Task` holds is
  final (`ended`, `ended_with_errors`, `error`, `cancelled`). It reads the
  object only, unlike `task.isRunning()`, which asks the server.
- `spawnAwait(fqn, args, opts)` is `await(await spawn(...))`, in the worker
  class `opts.taskClass` names. For a function the server never spawns, it
  returns the value the server answered with (see [calls.md](calls.md)).

A task is watched only while one of these holds it. A task the instance
spawned and never waits on reaches it only through `task:event`, and only if
the stream was open when it was spawned.

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
| `task:event` | `{ kind, task }` | every frame of the event stream, tracked or not (see below), and nothing while the stream is not open |

## How updates arrive

`init` opens `GET /runtime::Task::events`, a Server-Sent Events stream, and
waits up to 2 s for it before it returns. The server opens the stream with its
id, and only reports on it the tasks of the calls that name that id in their
`sse` request header. The instance names its open stream in every call it
spawns (`spawn`, `spawnAwait`, `rawCall` as a task), so the stream reports
those tasks from start to end. Frames carry the task as GCB, decoded like a
call result. While the stream is open, an update of such a task reaches the
listener as the server reports it and no request is made.

The tracker polls every other task: one spawned by another instance, tab,
page load or script, one of another user, one spawned while the stream was not
open, or one spawned on a stream that has since closed. It polls
`runtime::Task::tasks(ids)` in one batched request per tick, at the fastest
cadence a consumer asked for: `pollEvery` in the task options, else
`pollFrequency` from `init` (100 ms). A task the stream reports gets one
snapshot when it starts being tracked, so a task that already ended still
settles. Consumers see the same behaviour either way.

A dropped stream reconnects after 1 s, then 5, 10, 20, and every 30 s. The new
stream has a new id and reports none of the tasks spawned on the old one, so
those are polled until they end. Silence longer than 45 s counts as a drop
(the server pings every 15 s). A
server with no stream to offer (older core, Windows, an anonymous session on a
server that requires a login) is not retried: polling serves the session. A
server past its `max_sse` or `max_sse_per_user` cap answers 429 and is retried.

| Property | What it tells |
| --- | --- |
| `greycat.tasks.transport` | `'stream'` or `'poll'` |
| `greycat.tasks.streamState` | `idle`, `connecting` (until the server sent the id), `open` or `closed` |
| `greycat.tasks.streamId` | the id of the open stream, a decimal string since it may not fit a `number` |
| `greycat.isPollingTasks()` | whether the fallback has something to poll right now |

## Listening to the stream: `task:event`

`task:event` carries `{ kind, task }` for every frame, so for every task the
instance spawned while the stream was open, tracked or not:

| `kind` | When |
| --- | --- |
| `started` | the task leaves the queue and its code starts running, once (not again after an `await`, never for a task cancelled while queued) |
| `progress` | the whole percentage of `Task::add_steps` over `Task::expected_steps` changes |
| `breakpoint` | the task paused on a `breakpoint`, its status is `breakpoint` |
| `resumed` | the task goes on after a breakpoint, its status is back to `running` |
| `complete` | the task ended, whatever its final status |

Plain calls do not show up, since the instance names the stream only in the
calls it spawns. Neither do the calls of other instances, tabs or scripts,
even logged in as the same user.

The stream is the back-channel of the instance's own calls, not a monitor. A
view of every task the login may see (an admin console) reads
`runtime::Task::running` and `runtime::Task::history` instead.

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
