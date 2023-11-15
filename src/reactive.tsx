export type Signal<T> = readonly [SignalReader<T>, SignalUpdater<T>];
export type SignalReader<T> = () => T;
export type SignalUpdater<T> = (p: UpdateParam<T>) => void;
export type UpdateParam<T> = T | ((prev: T) => T);
export type Effect = () => void;

export class ReactiveContext {
  private _currentEffect: Effect | null;
  private _observers: Map<SignalReader<unknown>, Set<Effect>>;

  constructor() {
    this._currentEffect = null;
    this._observers = new Map<SignalReader<unknown>, Set<Effect>>();
  }

  createSignal<T>(value: T) {
    const read: SignalReader<T> = () => {
      if (this._currentEffect) {
        const effects = this._observers.get(read);
        if (effects) {
          effects.add(this._currentEffect);
        } else {
          // TODO profile this, might be possible that an array lookup might
          // be more interesting than a Set
          this._observers.set(read, new Set([this._currentEffect]));
        }
      }
      return value;
    };
    const updater: SignalUpdater<T> = (newData: UpdateParam<T>) => {
      // set value
      if (typeof newData === 'function') {
        value = (newData as (prev: T) => T)(value);
      } else {
        value = newData;
      }
      // run effects
      this._observers.get(read)?.forEach((effect) => effect());
    };
    return [read, updater] as const;
  }

  createEffect(effect: Effect): void {
    this._currentEffect = effect;
    effect();
    this._currentEffect = null;
  }
}

export class ObservableData<T> {
  private _data: T;
  private _currentEffect: Effect | null;
  private _observers: Map<SignalReader<unknown>, Set<Effect>>;

  constructor(data: T) {
    this._data = data;
    this._currentEffect = null;
    this._observers = new Map();
  }

  get(): T {
    if (this._currentEffect) {
      const effects = this._observers.get(this.get);
      if (effects) {
        effects.add(this._currentEffect);
      } else {
        // TODO profile this, might be possible that an array lookup might
        // be more interesting than a Set
        this._observers.set(this.get, new Set([this._currentEffect]));
      }
    }
    return this._data;
  }

  set(data: T) {
    this._data = data;
    this._observers.get(this.get)?.forEach((effect) => effect());
  }

  observe(effect: Effect): void {
    this._currentEffect = effect;
    effect();
    this._currentEffect = null;
  }
}
