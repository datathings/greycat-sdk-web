// declare global {
//   namespace GreyCat {
//     type Signal<T> = SignalReader<T> & SignalWriter<T>;
//     type SignalMapper<U, T> =
//       T extends Array<infer R> ? (item: R, i: number, arr: R[]) => U : never;
//     type SignalReader<T> = {
//       get(): T;
//       map<U>(mapper: SignalMapper<U, T>): SignalReader<U[]>;
//     };
//     type SignalWriter<T> = {
//       set: (newValue: T) => void;
//       update: (updater: (currValue: T) => T) => void;
//     };
//   }
// }

// export function isSignal(value: unknown): value is SignalReader<unknown> {
//   return value instanceof SignalReader;
// }

// let observed: (() => void) | undefined;

// export class SignalReader<T> {
//   protected _observers = new Set<() => void>();
//   protected _value: T;

//   constructor(initialValue: T) {
//     this._value = initialValue;
//   }

//   get() {
//     if (observed) {
//       this._observers.add(observed);
//     }
//     return this._value;
//   }

//   /**
//    * Creates a new `ComputedSignal` that maps this signal value using the given `mapper`.
//    *
//    * This implies that the returned signal will re-apply the mapping everytime this signal updates.
//    * 
//    * @param mapper
//    * @returns
//    * @throws if the signal's value is not an array
//    */
//   map<U>(mapper: GreyCat.SignalMapper<U, T>): ComputedSignal<U[]> {
//     if (Array.isArray(this._value)) {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       return new ComputedSignal(() => (this.get() as any).map(mapper));
//     }
//     throw new Error(`Signal 'map' is only supported for arrays`);
//   }

//   /**
//    * Actively triggers every registered observer
//    */
//   signal(): void {
//     this._observers.forEach((obs) => obs());
//   }
// }

// export class Signal<T> extends SignalReader<T> {
//   set(newValue: T) {
//     this._value = newValue;
//     if (observed === undefined) {
//       this.signal();
//     }
//   }

//   update(updater: (currValue: T) => T) {
//     this._value = updater(this._value);
//     if (observed === undefined) {
//       this.signal();
//     }
//   }
// }

// export class ComputedSignal<T> extends SignalReader<T> {
//   private _computeFn: () => T;
//   private _isStale = true;

//   constructor(computeFn: () => T) {
//     super(undefined as unknown as T); // Initial value is undefined
//     this._computeFn = computeFn;

//     effect(() => {
//       observed = () => this.markStale(); // Register the computed's stale marker
//       computeFn(); // Access dependencies
//       observed = undefined;
//     });
//   }

//   override get(): T {
//     // Lazily recompute if stale
//     if (this._isStale) {
//       this._value = this._computeFn();
//       this._isStale = false;
//     }

//     if (observed) {
//       this._observers.add(observed);
//     }

//     return this._value;
//   }

//   override map<U>(mapper: GreyCat.SignalMapper<U, T>): ComputedSignal<U[]> {
//     if (Array.isArray(this.get())) {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       return new ComputedSignal(() => (this.get() as any).map(mapper));
//     }
//     throw new Error(`Signal 'map' is only supported for arrays`);
//   }

//   markStale() {
//     // Mark as stale and notify observers
//     this._isStale = true;
//     this._observers.forEach((obs) => obs());
//   }
// }

// export function effect<T>(fn: () => T): T {
//   observed = fn;
//   const res = fn();
//   observed = undefined;
//   return res;
// }

// export function computed<T>(computeFn: () => T): ComputedSignal<T> {
//   return new ComputedSignal(computeFn);
// }
