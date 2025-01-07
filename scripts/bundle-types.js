import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';

const INPUT_DIR = 'dist/types';
const OUTPUT_DIR = 'dist';
const NAMESPACE = 'greycat';

const allModulesContent = [];
const globalDeclarations = [];

for await (const filepath of walkDir(INPUT_DIR)) {
  await removeImportsFromDTS(filepath);
}
await writeBundle();

/**
 * @param {string} directory
 */
async function* walkDir(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const filepath = join(directory, entry.name);

    if (entry.isDirectory()) {
      yield* walkDir(filepath);
    } else {
      yield filepath;
    }
  }
}

/**
 * @param {string} filepath
 */
async function removeImportsFromDTS(filepath) {
  const code = await readFile(filepath, 'utf8');

  // Parse the TypeScript file
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript'],
  });

  let isOnlyReExports = true; // Assume the file only contains exports initially
  const bodyWithoutImports = [];

  // Traverse the AST
  traverse.default(ast, {
    ImportDeclaration(path) {
      path.remove(); // Remove import statements
    },
    ExportAllDeclaration(_path) {
      // Do nothing, we'll handle re-exports later
    },
    ExportNamedDeclaration(path) {
      // Remove `export {};` statements
      if (
        t.isExportNamedDeclaration(path.node) &&
        path.node.specifiers.length === 0 &&
        !path.node.declaration
      ) {
        path.remove(); // Remove the empty export statement
      } else if (path.node.declaration) {
        // Check if it contains actual declarations
        isOnlyReExports = false;
      }
    },
    Program: {
      exit(path) {
        // Check if all remaining nodes are only export declarations
        isOnlyReExports = path.node.body.every((node) => {
          // Export all without an alias (e.g., `export * from './whatever.js';`)
          if (t.isExportAllDeclaration(node) && !node.exported) {
            return true; // These can be discarded
          }

          // Export all with an alias (e.g., `export * as some_name from './another.js';`)
          if (t.isExportAllDeclaration(node) && node.exported) {
            return false; // Keep these, as they should be part of the namespace
          }

          // Named export declarations without a declaration (e.g., `export { a } from './module';`)
          return t.isExportNamedDeclaration(node) && !node.declaration;
        });

        if (!isOnlyReExports) {
          // Collect non-export content
          path.node.body.forEach((node) => {
            // Handle global declarations
            if (
              t.isTSModuleDeclaration(node) &&
              t.isIdentifier(node.id, { name: 'global' }) &&
              node.declare === true
            ) {
              globalDeclarations.push(node);
            } else {
              bodyWithoutImports.push(node);
            }
          });
        }
      },
    },
  });

  if (isOnlyReExports) {
    return;
  }

  allModulesContent.push(...bodyWithoutImports);
}

async function writeBundle() {
  const globalAugments = [];

  for (const node of globalDeclarations) {
    // prefix every type 'XXX' with 'greycat.XXX'
    globalAugments.push(...node.body.body);
  }

  const ast = t.program([
    // Wrap all modules in the namespace
    t.tsModuleDeclaration(t.identifier(NAMESPACE), t.tsModuleBlock(allModulesContent)),
    // Add global declarations at the end
    ...globalAugments,
  ]);

  // Generate the final code
  const { code: finalCode } = generate.default(ast);

  // Write the final output to the file
  await mkdir(OUTPUT_DIR, { recursive: true });
  const outpath = join(OUTPUT_DIR, `${NAMESPACE}.d.ts`);
  await writeFile(outpath, finalCode, 'utf8');

  console.log(`Bundle: ${outpath} (${(finalCode.length / 1024).toFixed(2)}KB)`);
}
