import type { GreyCat } from './greycat.js';

/**
 * A map of all known GreyCat instances allowing to communicate with different GreyCat instances from the same client.
 *
 * *The name `'default'` is reserved and is used when initializing without a specific name*.
 */
export const $: { [name: string]: GreyCat } = {};

/**
 * The mutable runtime registry published as `globalThis.gc` by the `@greycat/web/sdk` entry.
 *
 * ABI loading registers every type constructor at `gc.<module>.<type>` and `init()` registers
 * every exposed function at `gc.<module>.<fn>` (plus top-level shortcuts). The `core`, `runtime`
 * and `io` members are therefore only populated once an `Abi` has been constructed.
 */
export interface GcRegistry {
  $: { [name: string]: GreyCat };
  core: typeof gc.core;
  runtime: typeof gc.runtime;
  io: typeof gc.io;
  [key: string]: unknown;
}

export const gcreg = { $ } as GcRegistry;

export interface GreyCatWasmExports {
  memory: WebAssembly.Memory;
  /**
   * @param {number} str_ptr Pointer to `const char *str`
   * @param {number} len `str_ptr` length
   * @param {number} tz `core::TimeZone` field offset
   * @param {number} out_epoch_us_ptr address of the result epoch `i64_t *out_epoch_us`
   * @result `1`=success, `0`=error
   */
  gc_dtz_time__parse(str_ptr: number, len: number, tz: number, out_epoch_us_ptr: number): number;

  /**
   * i64_t epoch_us, u32_t tz, const char *format_c_str, char *out, u32_t out_cap
   * @param {bigint} epoch_us timestamp in microseconds
   * @param {number} tz `core::TimeZone` field offset
   * @param {number} format_ptr pointer to a c-string format specifier
   * @param {number} out_ptr pointer to the print buffer to write to
   * @param {number} out_cap maximum capacity of the print buffer
   * @return {number} the number of bytes written to print buffer
   */
  gc_dtz_time__print(epoch_us: bigint, tz: number, format_ptr: number, out_ptr: number, out_cap: number): number;
}

export interface GreyCatWasm {
  module: WebAssembly.Module;
  exports: GreyCatWasmExports;
}

export type WasmLoader = () => Promise<GreyCatWasm>;

let wasmLoader: WasmLoader | undefined;

/**
 * Registers the loader `init()` uses to compile GreyCat's wasm module.
 *
 * Importing `@greycat/web/wasm` calls this with a loader for the packaged `greycat.wasm`.
 * Without a registered loader, `GreyCat.parseTime`/`printTime` throw.
 */
export function registerWasmLoader(loader: WasmLoader): void {
  wasmLoader = loader;
}

export function getWasmLoader(): WasmLoader | undefined {
  return wasmLoader;
}
