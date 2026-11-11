import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { inflateRawSync } from 'node:zlib';

/** The registry `script/publish.sh` publishes to. `std` is public, so reading it takes no token. */
const REGISTRY = process.env.REGISTRY_URL ?? 'https://registry.greycat.io';
const LIBRARY = 'std';
const TARGET = 'wasm32';
/** Path of the wasm inside the package, exposed by the runtime at `/std/greycat.wasm`. */
const ENTRY = 'lib/std/webroot/std/greycat.wasm';
const OUTPUT_PATH = 'dist/greycat.wasm';
const CACHE_DIR = join(tmpdir(), 'greycat-wasm');

const version = process.env.GREYCAT_STD_VERSION ?? readVersionPin('project.gcl');
const artifact = await resolveArtifact(version);
const zip = await download(artifact);
mkdirSync('dist', { recursive: true });
writeFileSync(OUTPUT_PATH, unzipEntry(zip, ENTRY));

/** Reads the `@library("std", "<version>")` pin out of a project file. */
function readVersionPin(project) {
  const src = readFileSync(project, 'utf8');
  const match = /@library\(\s*"std"\s*,\s*"([^"]+)"\s*\)/.exec(src);
  if (!match) {
    throw new Error(`No @library("std", ...) pragma found in ${project}`);
  }
  return match[1];
}

/** The `wasm32` artifact of `std` at `version`, as `registry::resolve` describes it: `{ url, sha256 }`. */
async function resolveArtifact(version) {
  const res = await fetch(`${REGISTRY}/registry::resolve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([LIBRARY, version, TARGET]),
  });
  if (!res.ok) {
    throw new Error(`Failed to resolve ${LIBRARY} ${version} on ${REGISTRY}: ${res.status} ${res.statusText}`);
  }
  const result = await res.json();
  if (result.status !== 'ok') {
    throw new Error(`Cannot resolve ${LIBRARY} ${version} on ${REGISTRY}: ${result.status}`);
  }
  const found = result.artifacts.find((a) => a.target === TARGET);
  if (!found) {
    throw new Error(`${LIBRARY} ${version} has no ${TARGET} artifact on ${REGISTRY}`);
  }
  return found;
}

/**
 * Fetches the archive of `artifact` and checks it against its sha256. A published version never
 * changes, so the archive is cached by its sha256 and repeated builds stay offline.
 */
async function download(artifact) {
  const cached = join(CACHE_DIR, `${artifact.sha256}.zip`);
  try {
    return readFileSync(cached);
  } catch {
    // not cached yet
  }
  const url = `${REGISTRY}${artifact.url}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
  }
  const body = Buffer.from(await res.arrayBuffer());
  const sha256 = createHash('sha256').update(body).digest('hex');
  if (sha256 !== artifact.sha256) {
    throw new Error(`${url} has sha256 ${sha256}, the registry announced ${artifact.sha256}`);
  }
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(cached, body);
  return body;
}

/**
 * Extracts a single file from a ZIP archive held in memory.
 *
 * Walks the central directory backwards from the end-of-central-directory
 * record rather than scanning local headers, whose sizes may be zeroed out in
 * favor of a trailing data descriptor.
 */
function unzipEntry(zip, name) {
  const eocd = findEocd(zip);
  const count = zip.readUInt16LE(eocd + 10);
  let offset = zip.readUInt32LE(eocd + 16);
  for (let i = 0; i < count; i++) {
    if (zip.readUInt32LE(offset) !== 0x02014b50) {
      throw new Error('Corrupted ZIP: bad central directory signature');
    }
    const method = zip.readUInt16LE(offset + 10);
    const compressedSize = zip.readUInt32LE(offset + 20);
    const nameLen = zip.readUInt16LE(offset + 28);
    const extraLen = zip.readUInt16LE(offset + 30);
    const commentLen = zip.readUInt16LE(offset + 32);
    const localOffset = zip.readUInt32LE(offset + 42);
    const entry = zip.toString('utf8', offset + 46, offset + 46 + nameLen);
    if (entry === name) {
      // The local header carries its own name/extra lengths, which may differ
      // from the central directory ones.
      const dataStart = localOffset + 30 + zip.readUInt16LE(localOffset + 26) + zip.readUInt16LE(localOffset + 28);
      const data = zip.subarray(dataStart, dataStart + compressedSize);
      if (method === 0) {
        return data;
      }
      if (method === 8) {
        return inflateRawSync(data);
      }
      throw new Error(`Unsupported ZIP compression method ${method} for '${name}'`);
    }
    offset += 46 + nameLen + extraLen + commentLen;
  }
  throw new Error(`Entry '${name}' not found in archive`);
}

function findEocd(zip) {
  for (let i = zip.length - 22; i >= 0; i--) {
    if (zip.readUInt32LE(i) === 0x06054b50) {
      return i;
    }
  }
  throw new Error('Corrupted ZIP: no end-of-central-directory record');
}
