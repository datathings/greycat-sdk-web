namespace gc {
  export namespace sdk {
    export namespace std_n {
      export namespace core {
        export class duration extends GCObject {
          static readonly _type = 'core::duration' as const;
          static readonly YEAR = 31_536_000_000_000n as const;
          static readonly MONTH = 2_630_016_000_000n as const;
          static readonly WEEK = 604_800_000_000n as const;
          static readonly DAY = 86_400_000_000n as const;
          static readonly HOUR = 3_600_000_000n as const;
          static readonly MINUTE = 60_000_000n as const;
          static readonly SECOND = 1_000_000n as const;
          static readonly MILLISECOND = 1_000n as const;

          constructor(public value: bigint | number = 0) {
            super();
          }

          static create(value: bigint | number, g: GreyCat = gc.$.default): gc.core.duration {
            const ty = g.abi.types[g.abi.core.duration];
            return new ty.ctor(value) as duration;
          }

          static from_ms(value: number, g: GreyCat = gc.$.default): gc.core.duration {
            const ty = g.abi.types[g.abi.core.duration];
            return new ty.ctor(value * Number(duration.MILLISECOND)) as gc.core.duration;
          }

          static from_secs(value: number, g: GreyCat = gc.$.default): gc.core.duration {
            const ty = g.abi.types[g.abi.core.duration];
            return new ty.ctor(value * Number(duration.SECOND)) as gc.core.duration;
          }

          static from_mins(value: number, g: GreyCat = gc.$.default): gc.core.duration {
            const ty = g.abi.types[g.abi.core.duration];
            return new ty.ctor(value * Number(duration.MINUTE)) as gc.core.duration;
          }

          static from_hours(value: number, g: GreyCat = gc.$.default): gc.core.duration {
            const ty = g.abi.types[g.abi.core.duration];
            return new ty.ctor(value * Number(duration.HOUR)) as gc.core.duration;
          }

          static from_days(value: number, g: GreyCat = gc.$.default): gc.core.duration {
            const ty = g.abi.types[g.abi.core.duration];
            return new ty.ctor(value * Number(duration.DAY)) as gc.core.duration;
          }

          static from_weeks(value: number, g: GreyCat = gc.$.default): gc.core.duration {
            const ty = g.abi.types[g.abi.core.duration];
            return new ty.ctor(value * Number(duration.WEEK)) as gc.core.duration;
          }

          static from_months(value: number, g: GreyCat = gc.$.default): gc.core.duration {
            const ty = g.abi.types[g.abi.core.duration];
            return new ty.ctor(value * Number(duration.MONTH)) as gc.core.duration;
          }

          static from_years(value: number, g: GreyCat = gc.$.default): gc.core.duration {
            const ty = g.abi.types[g.abi.core.duration];
            return new ty.ctor(value * Number(duration.YEAR)) as gc.core.duration;
          }

          /**
           * Creates a `core.duration` from a number `value` and a `core.DurationUnit`.
           *
           * eg. `core.duration.from_unit(42, core.DurationUnit.seconds())` => `42s`
           */
          static from_unit(
            value: number,
            unit: gc.core.DurationUnit,
            g: GreyCat = gc.$.default,
          ): gc.core.duration {
            switch (unit.key) {
              case 'microseconds':
                return duration.create(value, g);
              case 'milliseconds':
                return duration.from_ms(value, g);
              case 'seconds':
                return duration.from_secs(value, g);
              case 'minutes':
                return duration.from_mins(value, g);
              case 'hours':
                return duration.from_hours(value, g);
              case 'days':
                return duration.from_days(value, g);
            }
          }

          static override load(r: AbiReader, ty: AbiType): gc.core.duration {
            const value = r.read_vi64();
            return new ty.ctor(value) as gc.core.duration;
          }

          override saveHeader(w: AbiWriter): void {
            w.write_u8(PrimitiveType.duration);
          }

          override saveContent(w: AbiWriter) {
            w.write_vi64(BigInt(this.value));
          }

          /**
           * Returns the duration in microseconds
           */
          get us(): number | bigint {
            return this.value;
          }

          /**
           * Returns the duration in milliseconds
           */
          get ms(): number {
            return Number(this.value) / Number(duration.MILLISECOND);
          }

          /**
           * Returns the duration in seconds
           */
          get s(): number {
            return Number(this.value) / Number(duration.SECOND);
          }

          /**
           * Returns the duration in minutes
           */
          get min(): number {
            return Number(this.value) / Number(duration.MINUTE);
          }

          /**
           * Returns the duration in hours
           */
          get hour(): number {
            return Number(this.value) / Number(duration.HOUR);
          }

          /**
           * Returns the duration in days
           */
          get day(): number {
            return Number(this.value) / Number(duration.DAY);
          }

          /**
           * Returns the duration in weeks
           */
          get week(): number {
            return Number(this.value) / Number(duration.WEEK);
          }

          /**
           * Returns the duration in months
           */
          get month(): number {
            return Number(this.value) / Number(duration.MONTH);
          }

          /**
           * Returns the duration in years
           */
          get year(): number {
            return Number(this.value) / Number(duration.YEAR);
          }

          equals(other: duration): boolean {
            return BigInt(this.value) === BigInt(other.value);
          }

          override toString(separator = ' '): string {
            const us = typeof this.value === 'bigint' ? this.value : BigInt(this.value);

            if (us === 0n) {
              return `0us`;
            }

            const day = duration.DAY;
            const hour = duration.HOUR;
            const minute = duration.MINUTE;
            const second = duration.SECOND;
            const millisecond = duration.MILLISECOND;

            let result = '';
            let remainder = us;

            if (remainder >= day) {
              if (result.length) {
                result += separator;
              }
              result += `${remainder / day}day`;
              remainder %= day;
            }
            if (remainder >= hour) {
              if (result.length) {
                result += separator;
              }
              result += `${remainder / hour}hour`;
              remainder %= hour;
            }
            if (remainder >= minute) {
              if (result.length) {
                result += separator;
              }
              result += `${remainder / minute}min`;
              remainder %= minute;
            }
            if (remainder >= second) {
              if (result.length) {
                result += separator;
              }
              result += `${remainder / second}s`;
              remainder %= second;
            }
            if (remainder >= millisecond) {
              if (result.length) {
                result += separator;
              }
              result += `${remainder / millisecond}ms`;
              remainder %= millisecond;
            }
            if (remainder > 0) {
              if (result.length) {
                result += separator;
              }
              result += `${remainder}us`;
            }

            return result;
          }

          override toJSON() {
            if (this.value >= Number.MIN_SAFE_INTEGER && this.value <= Number.MAX_SAFE_INTEGER) {
              return Number(this.value);
            }
            return `${this.value}`;
          }

          override valueOf() {
            return this.value;
          }

          [Symbol.toPrimitive](_hint: string) {
            return this.value;
          }
        }
      }
    }
  }
}
