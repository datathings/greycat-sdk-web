import { Plugin } from 'vite';
import path from 'node:path';
import { createGzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { unlink } from 'node:fs/promises';

interface GzipPluginOptions {
  /**
   * Will only compress the files that matches this regex.
   *
   * *Defaults to: `/\.(js|mjs|json|css|ttf|woff|woff2|svg)$/`*
   */
  filter?: RegExp;
  /**
   * Whether or not to delete the original file after compression.
   *
   * *Defaults to: `false`*
   */
  removeOriginal?: boolean;
}

const DEFAULT_FILTER = /\.(js|mjs|json|css|ttf|woff|woff2|svg)$/;

export function gzip(
  { filter = DEFAULT_FILTER, removeOriginal = false }: GzipPluginOptions = {
    filter: DEFAULT_FILTER,
    removeOriginal: false,
  },
): Plugin {
  return {
    name: 'gzip',
    async writeBundle(outputOptions, bundle) {
      const output_dir = outputOptions.file
        ? path.dirname(outputOptions.file)
        : outputOptions.dir || '';
      console.log('output_dir=', output_dir);
      const compress_file = async (bundle_entry: string) => {
        const dirname = path.dirname(bundle_entry);
        const filename = path.basename(bundle_entry);
        const output = path.join(dirname, `${filename}.gz`);
        const input_path = path.join(output_dir, bundle_entry);
        const output_path = path.join(output_dir, output);
        return gzipFile(input_path, output_path, removeOriginal);
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
    },
  };
}

async function gzipFile(input_path: string, output_path: string, remove_original: boolean) {
  await pipeline(createReadStream(input_path), createGzip(), createWriteStream(output_path));
  if (remove_original) {
    await unlink(input_path);
  }
}
