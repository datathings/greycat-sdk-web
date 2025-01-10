import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';

const INPUT_DIR = 'dist/types';
const OUTPUT_DIR = 'dist';
const NAMESPACE = 'greycat';

const globalDeclarations = [];
const exportedModulesContent = [];

const start = performance.now();
for (const filepath of walkDir(INPUT_DIR)) {
  collectExportedSymbols(filepath);
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
function collectExportedSymbols(filepath) {
  const code = readFileSync(filepath, 'utf8');

  // Parse the TypeScript file
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript'],
  });

  const exportedNodes = [];

  // Traverse the AST
  traverse.default(ast, {
    ExportNamedDeclaration(path) {
      if (path.node.declaration) {
        // Keep actual exported declarations
        exportedNodes.push(path.node.declaration);
      }
    },
    ExportAllDeclaration(path) {
      // Handle `export * as name from` but discard plain `export * from`
      if (path.node.exported) {
        const namespaceName = path.node.exported.name;
        const importPath = path.node.source.value;

        // Create a namespace with the symbols from the module
        const namespaceDeclaration = t.tsModuleDeclaration(
          t.identifier(namespaceName),
          t.tsModuleBlock([t.exportAllDeclaration(t.stringLiteral(importPath))]),
        );

        exportedNodes.push(namespaceDeclaration);
      }
    },
    TSModuleDeclaration(path) {
      // Handle global declarations
      if (
        t.isTSModuleDeclaration(path.node) &&
        t.isIdentifier(path.node.id, { name: 'global' }) &&
        path.node.declare === true
      ) {
        t.traverseFast(path.node, (node) => {
          if (t.isTSTypeReference(node)) {
            if (
              t.isIdentifier(node.typeName) &&
              node.typeName.name.startsWith('Gui') &&
              !node.typeName.name.endsWith('EventMap')
            ) {
              // Prefix type name with the namespace
              node.typeName = t.tsQualifiedName(t.identifier(NAMESPACE), node.typeName);
            }
          }
        });
        globalDeclarations.push(...path.node.body.body);
      }
    },
  });

  exportedModulesContent.push(...exportedNodes);
}

/**
 * @param {number} start
 */
function writeBundle(start) {
  const ast = t.program([
    // Wrap all exported modules in the namespace
    t.tsModuleDeclaration(t.identifier(NAMESPACE), t.tsModuleBlock(exportedModulesContent)),
    ...globalDeclarations,
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
