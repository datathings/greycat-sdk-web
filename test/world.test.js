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
    assert.equal(main.world, undefined);
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
    assert.deepEqual(worldsOf('runtime::Identity::current'), ['main']);
    assert.deepEqual(worldsOf('runtime::Identity::permissions'), [undefined]);
    assert.deepEqual(worldsOf('tests::add'), ['what-if']);
  });

  it('leaves the calls in main when the identity has none', async () => {
    const { url, worldsOf } = await identityServer(null);
    const g = await client({ name: 'identity-none', url: new URL(url) });

    assert.equal(g.world, undefined);
    await g.call('tests::add', [1, 2]);
    assert.deepEqual(worldsOf('tests::add'), [undefined]);
  });

  it('gives way to an explicit world, which is not even read', async () => {
    const { url, worldsOf } = await identityServer('what-if');
    const g = await client({ name: 'identity-explicit', url: new URL(url), world: 'main' });

    assert.equal(g.world, 'main');
    await g.call('tests::add', [1, 2]);
    assert.deepEqual(worldsOf('runtime::Identity::current'), []);
    assert.deepEqual(worldsOf('tests::add'), ['main']);
  });

  it('is not followed with identityWorld: false', async () => {
    const { url, worldsOf } = await identityServer('what-if');
    const g = await client({ name: 'identity-off', url: new URL(url), identityWorld: false });

    assert.equal(g.world, undefined);
    assert.deepEqual(worldsOf('runtime::Identity::current'), []);
  });

  it('is read again on login, and dropped on logout', async () => {
    const { url, worldsOf } = await identityServer('what-if');
    const g = await client({ name: 'identity-login', url: new URL(url) });

    await g.login({ token: 'another' });
    assert.equal(worldsOf('runtime::Identity::current').length, 2);
    assert.equal(g.world, 'what-if');

    await g.logout();
    assert.equal(g.world, undefined);
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
