import fs from 'node:fs';

/**
 * @param {string} filepath
 * @returns {ArrayBuffer}
 */
export function readBytes(filepath) {
  const buffer = fs.readFileSync(filepath);
  return /** @type {ArrayBuffer} */ (
    buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
  );
}

/**
 *
 * @param {string} filepath
 * @param {ArrayBuffer} bytes
 */
export function writeBytes(filepath, bytes) {
  fs.writeFileSync(filepath, new Uint8Array(bytes));
}

/**
 * @param {unknown} value
 * @param {boolean=} json
 */
export function displayValue(value, json = false) {
  if (json) {
    console.dir(JSON.parse(JSON.stringify(value)), { depth: Infinity });
  } else if (Array.isArray(value)) {
    // cloning for pretty display
    console.dir(structuredClone(value), { depth: Infinity });
  } else if (value instanceof Map) {
    const o = {};
    value.forEach((value, key) => {
      // cloning for pretty display
      o[key] = structuredClone(value);
    });
    console.dir(o, { depth: Infinity });
  } else if (value instanceof gc.sdk.GCObject) {
    process.stdout.write(`${value.$type.name} `);
    // cloning for pretty display
    console.dir(structuredClone(value), { depth: Infinity });
  } else {
    // cloning for pretty display
    console.dir(structuredClone(value), { depth: Infinity });
  }
}

export async function stdin_read() {
  return new Promise((resolve, reject) => {
    if (process.stdin.isTTY) {
      resolve('');
      return;
    }

    const timeout_id = setTimeout(() => {
      process.stdin.pause();
      resolve(chunks.join(''));
    });

    process.stdin.setEncoding('utf8');
    const chunks = [];

    process.stdin.on('data', (chunk) => {
      chunks.push(chunk);
    });

    process.stdin.on('end', () => {
      clearTimeout(timeout_id);
      resolve(chunks.join(''));
    });

    process.stdin.on('error', (err) => {
      clearTimeout(timeout_id);
      reject(new Error(`failed to read stdin (${err})`));
    });
  });
}
