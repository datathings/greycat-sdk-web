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

export function stdin_read() {
  return new Promise(function(resolve, reject) {
    let data = '';

    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function(chunk) { data += chunk; });
    process.stdin.on('end', function() { resolve(data); });
    process.stdin.on('error', function(err) { reject(err); });

    process.stdin.resume();
  });
}
