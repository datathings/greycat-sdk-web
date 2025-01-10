import fs from 'node:fs';

/**
 * @param {string} filepath
 * @returns {ArrayBuffer}
 */
export function readBytes(filepath) {
  const buffer = fs.readFileSync(filepath);
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
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
 */
export function displayValue(value) {
  if (Array.isArray(value)) {
    // cloning for pretty display
    console.dir(structuredClone(value), { depth: Infinity });
  } else if (value instanceof Map) {
    const o = {};
    value.forEach((value, key) => {
      // cloning for pretty display
      o[key] = structuredClone(value);
    });
    console.dir(o, { depth: Infinity });
  } else if (value instanceof greycat.GCObject) {
    process.stdout.write(`${value.$type.name} `);
    // cloning for pretty display
    console.dir(structuredClone(value), { depth: Infinity });
  } else {
    // cloning for pretty display
    console.dir(structuredClone(value), { depth: Infinity });
  }
}
