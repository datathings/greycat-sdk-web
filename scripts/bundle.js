import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';
import { traverseFast } from '@babel/types';

const INPUT_DIR = 'dist/types';
const OUTPUT_DIR = 'dist';
const NAMESPACE = 'greycat';

const allModulesContent = [];
const globalDeclarations = [];

const start = performance.now();
for (const filepath of walkDir(INPUT_DIR)) {
  removeImportsFromDTS(filepath);
}
writeBundle(start);

/**
 * @param {string} directory
 * @returns {Generator<string>}
 */
function* walkDir(directory) {
  const entries = readdirSync(directory, { withFileTypes: true });

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
function removeImportsFromDTS(filepath) {
  const code = readFileSync(filepath, 'utf8');

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

/**
 * @param {number} start
 */
function writeBundle(start) {
  const globalAugments = [];

  for (const node of globalDeclarations) {
    // Manually traverse and modify the body of "declare global"
    for (const bodyNode of node.body.body) {
      if (t.isTSInterfaceDeclaration(bodyNode)) {
        // Prefix type references inside interfaces
        updateTypeReferences(bodyNode);
      } else if (t.isTSModuleDeclaration(bodyNode)) {
        for (const subNode of bodyNode.body.body) {
          if (t.isTSInterfaceDeclaration(subNode)) {
            // Prefix type references inside interfaces
            updateTypeReferences(subNode);
          }
        }
      }
    }

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
  mkdirSync(OUTPUT_DIR, { recursive: true });
  const outpath = join(OUTPUT_DIR, `${NAMESPACE}.d.ts`);
  writeFileSync(outpath, finalCode, 'utf8');

  const elapsed = (performance.now() - start).toFixed(0);
  console.log(`Bundle: ${outpath} (${(finalCode.length / 1024).toFixed(2)}KB in ${elapsed}ms)`);
}

/**
 * Manually updates type references in a node to prefix with the namespace.
 * @param {t.TSInterfaceDeclaration} node - The AST node to update.
 */
function updateTypeReferences(node) {
  // dump(`${node.id.name}.json`, node);
  traverseFast(node, (node) => {
    if (t.isTSTypeReference(node)) {
      if (t.isIdentifier(node.typeName) && !node.typeName.name.startsWith(`${NAMESPACE}.`)) {
        // Prefix type name with the namespace
        node.typeName = t.tsQualifiedName(t.identifier(NAMESPACE), node.typeName);
      }
  
      // Recursively process type parameters (generics)
      if (node.typeParameters) {
        updateTypeReferences(node.typeParameters.params[0]);
      }
    } else if (t.isTSUnionType(node) || t.isTSIntersectionType(node)) {
      node.types.forEach((type) => updateTypeReferences(type));
    }
  });
}
