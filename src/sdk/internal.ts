// Keys of the members the modules of the SDK call on each other's objects. This module is
// not exported by the SDK, so its users cannot name them.

/** `TaskPoller[HOLD_EVENTS]()`: holds the frames of the task event stream until released. */
export const HOLD_EVENTS: unique symbol = Symbol('holdEvents');

/** `TaskPoller[FORGET_STREAM]()`: drops the stream to resume, for a login that is gone. */
export const FORGET_STREAM: unique symbol = Symbol('forgetStream');
