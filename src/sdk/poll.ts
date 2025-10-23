namespace gc {
  export namespace sdk {
    type SyncRun = () => void;
    type AsyncRun = () => Promise<void>;
    type Run = SyncRun | AsyncRun;
    export type PollId = string | number | bigint;

    export class Poll {
      private _delays: Map<PollId, number> = new Map();
      private _run: Run;
      private _running = false;
      private _timeout: ReturnType<typeof setTimeout> | undefined;
      private _sleep: number = 0;

      constructor(run: Run) {
        this._run = run;
      }

      /**
       * @param id 
       * @param every running delay in milliseconds; if `every <= 0` unregisters the id
       * @returns 
       */
      register(id: PollId, every: number): void {
        if (every <= 0) {
          this.unregister(id);
          return;
        }
        this._delays.set(id, every);
        this._computeSleep();
        if (!this._running) {
          this._running = true;
          this._loop();
        }
      }

      unregister(id: PollId): void {
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
  }
}
