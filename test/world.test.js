import assert from 'node:assert/strict';
import { describe, before, after, afterEach, it } from 'node:test';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import '@greycat/web/sdk';
import { SERVER_URL } from './helpers.js';
import { answer, fakeServer, loadAbi } from './fake-server.js';

/**
 * The world calls run in. Against the test server, whose every request runs as root, and a
 * fake one for the refusals root never gets and for the default world of an identity, which
 * set on root would reach the instances of the other test files.
 */

const here = dirname(fileURLToPath(import.meta.url));

describe('worlds', () => {
  const url = new URL(SERVER_URL);
  // unique, since a world outlives the store of a test run that crashed
  const name = `sdk-${process.pid}-${Date.now()}`;
  /** @type {gc.sdk.GreyCat} */
  let main;
  /** @type {gc.sdk.GreyCat[]} */
  const instances = [];

  /** @param {gc.sdk.WithoutAbiOptions & { name: string }} options */
  async function client(options) {
    const g = await gc.sdk.init({ url, taskEvents: false, ...options });
    instances.push(g);
    return g;
  }

  before(async () => {
    main = await client({ name: 'world-main' });
    await gc.runtime.World.create(name, gc.runtime.WorldMode.overlay, null, main);
  });

  after(async () => {
    await gc.runtime.World.remove(name, main);
    for (const g of instances) {
      g.tasks.disconnect();
    }
  });

  it('runs the calls of an instance without a world in main', async () => {
    assert.equal(main.world, 'main');
    assert.equal(await main.call('tests::world'), 'main');
  });

  it('runs every call of an instance in the world it was initialized with', async () => {
    const g = await client({ name: 'world-init', world: name });
    assert.equal(g.world, name);
    assert.equal(await g.call('tests::world'), name);
  });

  it('starts a clone in the world of its original, which it then changes on its own', async () => {
    const g = await client({ name: 'world-original', world: name });
    const clone = g.clone('world-clone');
    assert.equal(await clone.call('tests::world'), name);
    clone.world = 'main';
    assert.equal(await clone.call('tests::world'), 'main');
    assert.equal(await g.call('tests::world'), name);
  });

  it('spawns in the world, and the task names it', async () => {
    const g = await client({ name: 'world-spawn', world: name });
    const task = await g.spawn('tests::world');
    assert.equal(task.world, name);
    assert.equal(await g.await(task), name);
  });

  // a poll refused in the world is retried for ever, so a regression hangs
  it('tracks the tasks of a world from main', { timeout: 10_000 }, async () => {
    const g = await client({ name: 'world-track', world: name });
    const task = await g.spawn('tests::slow', [2, 50]);
    // every call in that world is now refused, the polls of the task included unless in main
    g.world = 'no-such-world';
    assert.equal(await g.await(task), 2);
  });

  it('throws the error of the server for an unknown world, and still reads the permissions', async () => {
    const g = await client({ name: 'world-unknown', world: 'no-such-world' });
    assert.ok(g.permissions.includes('world'));
    await assert.rejects(g.call('tests::world'), (err) => {
      assert.ok(err instanceof gc.sdk.HttpError);
      assert.equal(err.status, 400);
      assert.ok(err.body instanceof gc.core.Error);
      assert.equal(err.body.message, 'no world has the name of the `world` header');
      return true;
    });
  });

  it('keys the cache of a call in a world by the world', async () => {
    /** @type {gc.sdk.CacheKey[]} */
    const keys = [];
    /** @type {gc.sdk.Cache} */
    const cache = {
      read: async (key) => {
        keys.push(key);
        return null;
      },
      write: async () => {},
    };
    const g = await client({ name: 'world-cache', cache });
    await g.call('tests::world');
    g.world = 'main';
    await g.call('tests::world');
    g.world = name;
    await g.call('tests::world');
    const calls = keys.filter((k) => k[0] === 'tests::world');
    assert.deepEqual(
      calls.map((k) => k.length),
      [2, 2, 3],
    );
    assert.equal(calls[2][2], name);
  });
});

describe('worlds refused', () => {
  /** @type {Awaited<ReturnType<typeof loadAbi>>} */
  let loaded;
  /** @type {Awaited<ReturnType<typeof fakeServer>> | undefined} */
  let server;

  before(async () => {
    loaded = await loadAbi();
  });

  afterEach(() => {
    server?.close();
    server = undefined;
  });

  /**
   * @param {string} url
   * @param {string} [world]
   */
  function client(url, world) {
    return gc.sdk.initWithAbi({
      name: 'world-fake',
      abi: loaded.abi,
      module: loaded.wasm.module,
      exports: loaded.wasm.instance.exports,
      url: new URL(url),
      world,
    });
  }

  /**
   * Answers every call `403`, with `body()` (none when it is `undefined`), and records the
   * `world` header of each request.
   * @param {() => Buffer | undefined} body
   */
  async function forbidding(body) {
    /** @type {(string | string[] | undefined)[]} */
    const worlds = [];
    server = await fakeServer((req, res) => {
      worlds.push(req.headers['world']);
      req.resume();
      req.on('end', () => {
        const data = body();
        res.writeHead(403, { 'content-type': 'application/octet-stream' });
        res.end(data);
      });
    });
    return { url: server.url, worlds };
  }

  it('throws the error a world refusal carries', async () => {
    const message = 'the caller may not use the world of the `world` header';
    const { url, worlds } = await forbidding(() =>
      Buffer.from(g.serializeWithHeaders(gc.core.Error.createFrom({ message, stack: [] }))),
    );
    const g = client(url, 'what-if');

    await assert.rejects(g.call('tests::add', [1, 2]), (err) => {
      assert.ok(err instanceof gc.sdk.HttpError);
      assert.equal(err.status, 403);
      assert.ok(err.body instanceof gc.core.Error);
      assert.equal(err.body.message, message);
      return true;
    });
    assert.deepEqual(worlds, ['what-if']);
  });

  it('throws a forbidden error for a missing permission, and sends no world without one', async () => {
    const { url, worlds } = await forbidding(() => undefined);
    const g = client(url);

    await assert.rejects(g.call('tests::add', [1, 2]), (err) => {
      assert.ok(err instanceof gc.sdk.HttpError);
      assert.equal(err.status, 403);
      assert.equal(err.message, "access to 'tests::add' is forbidden");
      assert.equal(err.body, undefined);
      return true;
    });
    assert.deepEqual(worlds, [undefined]);
  });
});

describe('the default world of the identity', () => {
  /** @type {ArrayBuffer} */
  let abiData;
  /** @type {gc.sdk.GreyCat} */
  let ser;
  /** @type {Awaited<ReturnType<typeof fakeServer>> | undefined} */
  let server;
  /** @type {gc.sdk.GreyCat[]} */
  const instances = [];

  before(async () => {
    const data = await readFile(join(here, 'abi.bin'));
    abiData = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
    const { abi, wasm } = await loadAbi();
    ser = gc.sdk.initWithAbi({ name: 'identity-ser', abi, module: wasm.module, exports: wasm.instance.exports });
  });

  afterEach(() => {
    server?.close();
    server = undefined;
    for (const g of instances.splice(0)) {
      g.tasks.disconnect();
    }
  });

  /**
   * Serves the ABI, an identity whose default world is `world`, and `3` to any other call.
   * Records the path and the `world` header of each request.
   * @param {string | null} world
   */
  async function identityServer(world) {
    /** @type {{ path: string, world: string | string[] | undefined }[]} */
    const requests = [];
    server = await fakeServer((req, res) => {
      const path = new URL(req.url ?? '/', 'http://fake').pathname.slice(1);
      requests.push({ path, world: req.headers['world'] });
      req.resume();
      req.on('end', () => {
        if (path === 'runtime::Runtime::abi') {
          res.writeHead(200, { 'content-type': 'application/octet-stream' });
          res.end(Buffer.from(abiData));
        } else if (path === 'runtime::Identity::permissions') {
          answer(ser, res, ['public', 'api']);
        } else if (path === 'runtime::Identity::current') {
          answer(ser, res, gc.runtime.Identity.createFrom({ id: 2, name: 'alice', role: 'user', grants: [], world }));
        } else if (path === 'runtime::Identity::logout') {
          res.writeHead(200);
          res.end();
        } else {
          answer(ser, res, 3);
        }
      });
    });
    /** @param {string} path */
    const worldsOf = (path) => requests.filter((r) => r.path === path).map((r) => r.world);
    return { url: server.url, worldsOf };
  }

  /** @param {gc.sdk.WithoutAbiOptions & { name: string }} options */
  async function client(options) {
    const g = await gc.sdk.init({ taskEvents: false, ...options });
    instances.push(g);
    return g;
  }

  it('is followed by default, and read in main', async () => {
    const { url, worldsOf } = await identityServer('what-if');
    const g = await client({ name: 'identity-default', url: new URL(url) });

    assert.equal(g.world, 'what-if');
    await g.call('tests::add', [1, 2]);
    // read in main, which sends no header
    assert.deepEqual(worldsOf('runtime::Identity::current'), [undefined]);
    assert.deepEqual(worldsOf('runtime::Identity::permissions'), [undefined]);
    assert.deepEqual(worldsOf('tests::add'), ['what-if']);
  });

  it('leaves the calls in main when the identity has none', async () => {
    const { url, worldsOf } = await identityServer(null);
    const g = await client({ name: 'identity-none', url: new URL(url) });

    assert.equal(g.world, 'main');
    await g.call('tests::add', [1, 2]);
    assert.deepEqual(worldsOf('tests::add'), [undefined]);
  });

  it('gives way to an explicit world, which is not even read', async () => {
    const { url, worldsOf } = await identityServer('what-if');
    const g = await client({ name: 'identity-explicit', url: new URL(url), world: 'main' });

    assert.equal(g.world, 'main');
    await g.call('tests::add', [1, 2]);
    assert.deepEqual(worldsOf('runtime::Identity::current'), []);
    assert.deepEqual(worldsOf('tests::add'), [undefined]);
  });

  it('is not followed with identityWorld: false', async () => {
    const { url, worldsOf } = await identityServer('what-if');
    const g = await client({ name: 'identity-off', url: new URL(url), identityWorld: false });

    assert.equal(g.world, 'main');
    assert.deepEqual(worldsOf('runtime::Identity::current'), []);
  });

  it('is read again on login, and dropped on logout', async () => {
    const { url, worldsOf } = await identityServer('what-if');
    const g = await client({ name: 'identity-login', url: new URL(url) });

    await g.login({ token: 'another' });
    assert.equal(worldsOf('runtime::Identity::current').length, 2);
    assert.equal(g.world, 'what-if');

    await g.logout();
    assert.equal(g.world, 'main');
  });

  it('stops being followed once the world is set', async () => {
    const { url, worldsOf } = await identityServer('what-if');
    const g = await client({ name: 'identity-set', url: new URL(url) });

    g.world = 'variant';
    await g.login({ token: 'another' });
    assert.equal(worldsOf('runtime::Identity::current').length, 1);
    assert.equal(g.world, 'variant');
  });
});

describe('the root of the world', () => {
  /** @type {ArrayBuffer} */
  let abiData;
  /** @type {gc.sdk.GreyCat} */
  let ser;
  /** @type {Awaited<ReturnType<typeof fakeServer>> | undefined} */
  let server;
  /** @type {gc.sdk.GreyCat[]} */
  const instances = [];

  before(async () => {
    const data = await readFile(join(here, 'abi.bin'));
    abiData = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
    const { abi, wasm } = await loadAbi();
    ser = gc.sdk.initWithAbi({ name: 'root-ser', abi, module: wasm.module, exports: wasm.instance.exports });
  });

  afterEach(() => {
    server?.close();
    server = undefined;
    for (const g of instances.splice(0)) {
      g.tasks.disconnect();
    }
  });

  /**
   * Serves the ABI, an identity whose default world is `world`, and as the root the number of
   * roots read so far, after `delayMs`. The first `failures` reads of the root answer 500.
   * @param {{ world?: string | null, delayMs?: number, failures?: number }} [options]
   */
  async function rootServer({ world = null, delayMs = 0, failures = 0 } = {}) {
    /** @type {(string | string[] | undefined)[]} */
    const roots = [];
    server = await fakeServer((req, res) => {
      const path = new URL(req.url ?? '/', 'http://fake').pathname.slice(1);
      req.resume();
      req.on('end', () => {
        if (path === 'runtime::Runtime::abi') {
          res.writeHead(200, { 'content-type': 'application/octet-stream' });
          res.end(Buffer.from(abiData));
        } else if (path === 'runtime::Identity::permissions') {
          answer(ser, res, ['public', 'api']);
        } else if (path === 'runtime::Identity::current') {
          answer(ser, res, gc.runtime.Identity.createFrom({ id: 2, name: 'alice', role: 'user', grants: [], world }));
        } else if (path === 'runtime::Runtime::root') {
          roots.push(req.headers['world']);
          const n = roots.length;
          setTimeout(() => {
            if (n <= failures) {
              res.writeHead(500);
              res.end();
            } else {
              answer(ser, res, n);
            }
          }, delayMs);
        } else {
          answer(ser, res, 3);
        }
      });
    });
    return { url: new URL(server.url), roots };
  }

  /** @param {gc.sdk.WithoutAbiOptions & { name: string }} options */
  async function client(options) {
    const g = await gc.sdk.init({ taskEvents: false, ...options });
    instances.push(g);
    return g;
  }

  it('is not read before it is asked for', async () => {
    const { url, roots } = await rootServer();
    await client({ name: 'root-lazy', url });
    assert.deepEqual(roots, []);
  });

  it('is read once, and shared by concurrent and later calls', async () => {
    const { url, roots } = await rootServer({ delayMs: 50 });
    const g = await client({ name: 'root-once', url });
    const [a, b] = await Promise.all([g.root(), g.root()]);
    assert.equal(await g.root(), 1);
    assert.equal(a, 1);
    assert.equal(b, 1);
    assert.equal(roots.length, 1);
  });

  it('is read again in the new world after a world change, which is emitted', async () => {
    const { url, roots } = await rootServer();
    const g = await client({ name: 'root-switch', url });
    /** @type {string[]} */
    const changes = [];
    g.on('world:changed', ({ world }) => changes.push(world));

    assert.equal(await g.root(), 1);
    g.world = 'variant';
    assert.equal(await g.root(), 2);
    assert.equal(await g.root(), 2);
    assert.deepEqual(roots, [undefined, 'variant']);
    assert.deepEqual(changes, ['variant']);
  });

  it('is kept when the world is set to the one the instance is in', async () => {
    const { url, roots } = await rootServer();
    const g = await client({ name: 'root-same', url });
    /** @type {string[]} */
    const changes = [];
    g.on('world:changed', ({ world }) => changes.push(world));

    await g.root();
    // `main` and no world are the same world
    g.world = 'main';
    g.world = undefined;
    await g.root();
    assert.equal(roots.length, 1);
    assert.deepEqual(changes, []);
  });

  it('is not kept from a world the instance left while it was read', async () => {
    const { url, roots } = await rootServer({ delayMs: 50 });
    const g = await client({ name: 'root-late', url });
    const before = g.root();
    g.world = 'variant';
    assert.equal(await before, 1);
    assert.equal(await g.root(), 2);
    assert.deepEqual(roots, [undefined, 'variant']);
  });

  it('follows the default world of the identity, and goes back to main on logout', async () => {
    const { url, roots } = await rootServer({ world: 'what-if' });
    const g = await client({ name: 'root-identity', url });
    /** @type {string[]} */
    const changes = [];
    g.on('world:changed', ({ world }) => changes.push(world));

    assert.equal(await g.root(), 1);
    // the same identity, so the same world, and the root is kept
    await g.login({ token: 'another' });
    assert.equal(await g.root(), 1);
    await g.logout();
    assert.equal(await g.root(), 2);
    assert.deepEqual(roots, ['what-if', undefined]);
    assert.deepEqual(changes, ['main']);
  });

  it('gives one instance per world with inWorld(), each keeping the root of its world', async () => {
    const { url, roots } = await rootServer();
    const g = await client({ name: 'root-in-world', url });
    const whatIf = g.inWorld('what-if');

    assert.equal(g.inWorld('what-if'), whatIf);
    assert.equal(whatIf.name, 'root-in-world@what-if');
    assert.equal(gc.$['root-in-world@what-if'], whatIf);
    assert.equal(whatIf.world, 'what-if');
    assert.equal(g.world, 'main');
    // `main` and no world are the same world
    assert.equal(g.inWorld(undefined), g.inWorld('main'));

    assert.equal(await whatIf.root(), 1);
    assert.equal(await g.root(), 2);
    assert.equal(await whatIf.root(), 1);
    assert.deepEqual(roots, ['what-if', undefined]);
  });

  it('starts empty on a clone, which reads the root of its own world', async () => {
    const { url, roots } = await rootServer();
    const g = await client({ name: 'root-original', url });
    await g.root();
    const clone = g.clone('root-clone');
    clone.world = 'variant';
    assert.equal(await clone.root(), 2);
    assert.equal(await g.root(), 1);
    assert.deepEqual(roots, [undefined, 'variant']);
  });

  it('is read again after invalidateRoot() or a debug session change', async () => {
    const { url, roots } = await rootServer();
    const g = await client({ name: 'root-invalidate', url });
    await g.root();
    g.invalidateRoot();
    assert.equal(await g.root(), 2);
    g.setDebugId(7);
    // a debug session answers a task, which this server does not, but the root is read again
    await assert.rejects(g.root());
    assert.equal(roots.length, 3);
  });

  it('aborts the wait of one call without failing the read the others share', async () => {
    const { url, roots } = await rootServer({ delayMs: 50 });
    const g = await client({ name: 'root-abort', url });
    const ctrl = new AbortController();
    const aborted = g.root(ctrl.signal);
    const other = g.root();
    ctrl.abort('gone');
    await assert.rejects(aborted, (err) => err === 'gone');
    assert.equal(await other, 1);
    assert.equal(roots.length, 1);
  });

  it('does not keep a failed read', async () => {
    const { url, roots } = await rootServer({ failures: 1 });
    const g = await client({ name: 'root-failure', url });
    await assert.rejects(g.root());
    assert.equal(await g.root(), 2);
    assert.equal(roots.length, 2);
  });
});

describe('the root of a standalone world', () => {
  const url = new URL(SERVER_URL);
  // unique, since a world outlives the store of a test run that crashed
  const name = `sdk-root-${process.pid}-${Date.now()}`;
  /** @type {gc.sdk.GreyCat} */
  let g;

  before(async () => {
    g = await gc.sdk.init({ name: 'root-standalone', url, taskEvents: false });
    await gc.runtime.World.create(name, gc.runtime.WorldMode.standalone, null, g);
  });

  after(async () => {
    g.world = undefined;
    await gc.runtime.World.remove(name, g);
    g.tasks.disconnect();
  });

  it('holds the nodes of that world, which differ from the ones of main', async () => {
    const main = /** @type {Record<string, gc.core.node>} */ (/** @type {unknown} */ (await g.root()));
    g.world = name;
    const world = /** @type {Record<string, gc.core.node>} */ (/** @type {unknown} */ (await g.root()));
    assert.notEqual(world['tests::w_idx'].value, main['tests::w_idx'].value);
  });
});
