import type { GreyCatWasm, GreyCatWasmExports } from './registry.js';

/**
 * URL of the packaged `greycat.wasm`, resolved relative to this module.
 *
 * In the published package the module lives in `dist/sdk/lib/` and the binary in `dist/greycat.wasm`.
 */
export const WASM_URL = new URL('../../greycat.wasm', import.meta.url);

export type WasmSource = URL | Response | BufferSource | WebAssembly.Module;

/**
 * Instantiates GreyCat's wasm module.
 *
 * `gc.sdk.init()` handles this automatically (see `WithoutAbiOptions.wasm`); call this directly
 * only to precompile for `initWithAbi()`.
 *
 * @param source defaults to {@link WASM_URL}. Pass a `BufferSource` to skip fetching (e.g. bytes
 *               read from disk or an inlined binary).
 */
export async function compileWasm(source: WasmSource = WASM_URL): Promise<{
  module: WebAssembly.Module;
  instance: WebAssembly.Instance & { exports: GreyCatWasmExports };
}> {
  const importObject = {
    env: {
      js__on_memory_growth: () => {},
    },
  };

  let result: WebAssembly.WebAssemblyInstantiatedSource;
  if (source instanceof WebAssembly.Module) {
    const instance = await WebAssembly.instantiate(source, importObject);
    result = { module: source, instance };
  } else if (source instanceof URL || source instanceof Response) {
    if (source instanceof URL && source.protocol === 'file:') {
      // fetch() rejects file URLs in Node.js; the computed specifier keeps bundlers
      // from resolving 'node:fs/promises' in browser builds
      const fsPromises = 'node:fs' + '/promises';
      const { readFile } = (await import(/* @vite-ignore */ fsPromises)) as {
        readFile(path: URL): Promise<Uint8Array<ArrayBuffer>>;
      };
      const bytes = await readFile(source);
      result = await WebAssembly.instantiate(bytes, importObject);
    } else {
      const res = source instanceof Response ? source : await fetch(source);
      try {
        result = await WebAssembly.instantiateStreaming(res.clone(), importObject);
      } catch {
        // wrong 'Content-Type' or no streaming support
        result = await WebAssembly.instantiate(await res.arrayBuffer(), importObject);
      }
    }
  } else {
    result = await WebAssembly.instantiate(source, importObject);
  }

  return result as unknown as {
    module: WebAssembly.Module;
    instance: WebAssembly.Instance & { exports: GreyCatWasmExports };
  };
}

let packagedWasm: Promise<GreyCatWasm> | undefined;

/** Compiles the packaged `greycat.wasm` ({@link WASM_URL}) once; subsequent calls share the result. */
export function loadPackagedWasm(): Promise<GreyCatWasm> {
  packagedWasm ??= compileWasm().then((wasm) => ({ module: wasm.module, exports: wasm.instance.exports }));
  return packagedWasm;
}
