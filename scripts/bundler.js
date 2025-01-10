// @ts-check
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';

const visitedFiles = new Set();

/**
 * Traverse a `.d.ts` file and recursively collect all referenced files.
 * @param {string} filepath - The starting file path.
 * @param {Set<string>} result - A set to store the collected files.
 */
async function collectProjectFiles(filepath, result = new Set()) {
  if (visitedFiles.has(filepath)) {
    // Avoid cycles or duplicate visits
    return result;
  }

  visitedFiles.add(filepath);

  const content = await readFile(filepath, 'utf-8');
  const ast = parser.parse(content, {
    sourceType: 'module',
    plugins: ['typescript'],
  });

  result.add(filepath);

  const dir = dirname(filepath);
  const importsAndExports = [];

  // Traverse the AST to find import and export declarations
  traverse.default(ast, {
    ImportDeclaration(path) {
      if (t.isStringLiteral(path.node.source)) {
        importsAndExports.push(path.node.source.value);
      }
    },
    ExportAllDeclaration(path) {
      if (t.isStringLiteral(path.node.source)) {
        importsAndExports.push(path.node.source.value);
      }
    },
    ExportNamedDeclaration(path) {
      if (path.node.source && t.isStringLiteral(path.node.source)) {
        importsAndExports.push(path.node.source.value);
      }
    },
  });

  // Resolve file paths and recursively collect them
  for (const ref of importsAndExports) {
    const { relative: _, resolvedPath } = resolveModulePath(ref, dir);
    if (resolvedPath.endsWith('.d.ts')) {
      await collectProjectFiles(resolvedPath, result);
    }
  }

  return result;
}

/**
 * Resolve module paths (e.g., handle relative paths and add extensions if missing).
 * @param {string} modulePath - The module path from the source file.
 * @param {string} baseDir - The directory of the importing file.
 * @returns {{ relative: boolean, resolvedPath: string }} - The resolved file path.
 */
function resolveModulePath(modulePath, baseDir) {
  const relative = modulePath.startsWith('./') || modulePath.startsWith('../');
  const res = /** @type {RegExpMatchArray} */ (modulePath.match(/^(.*)(\.[cm]?js|\.d\.[cm]?ts)?$/));
  console.log([baseDir, res[1]]);
  // TODO fix
  return {
    relative,
    resolvedPath: join(baseDir, res[1])
  };
}

// Example usage:
try {
  const startingFile = 'dist/types/index.d.ts'; // Replace with your entry file
  const allFiles = await collectProjectFiles(startingFile);
  console.log('Project Files:', Array.from(allFiles));
} catch (error) {
  console.error('Error:', error.message);
}
