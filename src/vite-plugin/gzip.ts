import { join } from 'node:path';
import { createGzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { unlink } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';

/**
 * Extensions GreyCat's static server serves pre-gzipped (it looks for a
 * `<file>.gz` sibling when the request carries `Accept-Encoding: gzip`).
 * Compressing anything outside this set produces `.gz` files the server never
 * sends. Fonts are intentionally absent: `.woff2` is already compressed and is
 * not in the server whitelist.
 */
export const GZIP_WHITELIST = /\.(js|mjs|cjs|css|svg|html|json|wasm)$/;

export interface GzipOptions {
  /** Only compress files matching this regex. Defaults to {@link GZIP_WHITELIST}. */
  filter?: RegExp;
  /** Keep the uncompressed original next to the `.gz`. Defaults to `true`. */
  keepOriginal?: boolean;
}

export async function gzipBundle(
  outDir: string,
  files: string[],
  { filter = GZIP_WHITELIST, keepOriginal = true }: GzipOptions = {},
): Promise<void> {
  const jobs: Promise<void>[] = [];
  for (const file of files) {
    if (filter.test(file)) {
      jobs.push(gzipFile(join(outDir, file), keepOriginal));
    }
  }
  await Promise.all(jobs);
}

async function gzipFile(path: string, keepOriginal: boolean): Promise<void> {
  await pipeline(createReadStream(path), createGzip(), createWriteStream(`${path}.gz`));
  if (!keepOriginal) {
    await unlink(path);
  }
}
