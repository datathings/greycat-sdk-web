# [std](/libs/std/)::[util](/libs/std/util/)::Queue

`Queues is a FIFO implementation. It can contain any kind of element.
If the capacity is specified, elements will be dropped when size (number of element in queue) reaches the capacity.
dropped <= [tail,...,head] <= add here
Iterations in for loops go from tail to head by default ([0..size]);

## Methods
### fn capacity():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the maximum capacity of the queue if set; -1 otherwise (infinite queue).
### fn clear():&nbsp;any?<Badge text="native" />

Clears the queue of all its content.
### fn dequeue():&nbsp;[T](/libs/std/util/type.T.md)<Badge text="native" />

Gets and removes the element at the head of the queue.
### fn enqueue(value:&nbsp;[T](/libs/std/util/type.T.md)):&nbsp;any?<Badge text="native" />

Adds an element at the tail of the queue. If size is over capacity, head is removed.
### fn head():&nbsp;[T](/libs/std/util/type.T.md)<Badge text="native" />

Retuns the element at the head of the queue. Does not remove the element from the queue.
### fn new():&nbsp;[Queue](/libs/std/util/type.Queue.md)<Badge text="native" /><Badge text="static" />

Creates a new Queue.
### fn setCapacity(nbElem:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?<Badge text="native" />

Fixes the maximum capacity of the queue to `nbElem`.
### fn size():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />

Returns the number of elements currently in queue.
### fn tail():&nbsp;[T](/libs/std/util/type.T.md)<Badge text="native" />

Retuns the element at the tail of the queue. Does not remove the element from the queue.
