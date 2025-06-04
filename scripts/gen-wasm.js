import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const WASM_PATH = 'webroot/std/greycat.wasm';
const OUTPUT_PATH = 'src/sdk/wasm.ts';

// Prepend greycat.wasm binary
if (!existsSync(WASM_PATH)) {
  throw new Error(`Missing wasm file: ${WASM_PATH}`)
}
const wasm_buffer = readFileSync(WASM_PATH);
const wasm_base64 = wasm_buffer.toString('base64');
const file_content = `namespace gc {
  export namespace sdk {
    export const WASM_BYTES = new ArrayBuffer(${wasm_buffer.byteLength});
    {
      const binary = atob("${wasm_base64}");
      const w_buf = new Uint8Array(WASM_BYTES);
      for (let i = 0; i < binary.length; i++) {
        w_buf[i] = binary.charCodeAt(i);
      }
    }
  }
}
`;
writeFileSync(OUTPUT_PATH, file_content);

