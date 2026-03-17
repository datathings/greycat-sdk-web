import type { Plugin } from 'vite';
import type { NormalizedOutputOptions, OutputBundle } from 'rollup';
import path from 'node:path';
import { createGzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { unlink } from 'node:fs/promises';

export interface GzipPluginOptions {
  /**
   * Will only compress the files that matches this regex.
   *
   * *Defaults to: `/\.(js|mjs|json|css|ttf|woff|woff2|svg)$/`*
   */
  filter?: RegExp;
  /**
   * Whether or not to keep the original file after compression.
   *
   * *Defaults to: `false`*
   */
  keepOriginal?: boolean;
}

export const DEFAULT_FILTER = /\.(js|mjs|json|css|ttf|woff|woff2|svg)$/;

export function gzip(options?: GzipPluginOptions): Plugin {
  return {
    name: 'gzip',
    writeBundle(outputOptions, bundle) {
      return gzipWriteBundle(options, outputOptions, bundle);
    },
  };
}

async function gzipFile(input_path: string, output_path: string, keep_original: boolean) {
  await pipeline(createReadStream(input_path), createGzip(), createWriteStream(output_path));
  if (!keep_original) {
    await unlink(input_path);
  }
}

export async function gzipWriteBundle(
  { filter = DEFAULT_FILTER, keepOriginal = false }: GzipPluginOptions = {},
  output_options: NormalizedOutputOptions,
  bundle: OutputBundle,
): Promise<void> {
  const output_dir = output_options.file ? path.dirname(output_options.file) : output_options.dir || '';
  const compress_file = async (bundle_entry: string) => {
    const dirname = path.dirname(bundle_entry);
    const filename = path.basename(bundle_entry);
    const output = path.join(dirname, `${filename}.gz`);
    const input_path = path.join(output_dir, bundle_entry);
    const output_path = path.join(output_dir, output);
    return gzipFile(input_path, output_path, keepOriginal);
  };
  const promises: Promise<void>[] = [];
  const entries = Object.keys(bundle);
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (entry.match(filter)) {
      promises.push(compress_file(entry));
    }
  }
  await Promise.all(promises);
}
