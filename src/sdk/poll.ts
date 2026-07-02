type SyncRun = () => void;
type AsyncRun = () => Promise<void>;
type Run = SyncRun | AsyncRun;

export class Poll {
  private _id_generator = 0;
  private _delays: Map<number, number> = new Map();
  private _run: Run;
  private _running = false;
  private _timeout: ReturnType<typeof setTimeout> | undefined;
  private _sleep: number = 0;

  constructor(run: Run) {
    this._run = run;
  }

  /**
   * @param every running delay in milliseconds; if `every <= 0` it does nothing and returns `-1`
   * @returns the id of this registration
   */
  register(every: number): number {
    if (every <= 0) {
      return -1;
    }
    const id = this._id_generator;
    this._id_generator += 1;
    this._delays.set(id, every);
    this._computeSleep();
    if (!this._running) {
      this._running = true;
      this._loop();
    }
    return id;
  }

  unregister(id: number): void {
    this._delays.delete(id);
    this._computeSleep();
  }

  clear(): void {
    clearTimeout(this._timeout);
    this._timeout = undefined;
    this._running = false;
    this._sleep = 0;
    this._delays.clear();
  }

  isRunning(): boolean {
    return this._running;
  }

  private _loop = async () => {
    if (this._delays.size === 0) {
      this._timeout = undefined;
      this._sleep = 0;
      this._running = false;
      return;
    }
    const start = performance.now();
    try {
      await this._run();
    } catch (err) {
      console.warn(`[error] poller.run error catched`, err);
    }
    const elapsed = performance.now() - start;
    const delay = Math.max(0, this._sleep - elapsed);
    this._timeout = setTimeout(this._loop, delay);
  };

  private _computeSleep(): void {
    if (this._delays.size === 0) {
      this._sleep = 0;
      return;
    }
    let min = Infinity;
    for (const v of this._delays.values()) {
      if (v < min) {
        min = v;
      }
    }
    this._sleep = min;
  }
}
