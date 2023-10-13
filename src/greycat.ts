import { Abi, GreyCat, downloadAbi, downloadAbiHeaders, WithoutAbiOptions } from '@greycat/sdk';

let DEFAULT_URL: URL;
try {
  DEFAULT_URL = new URL(globalThis.location?.origin ?? 'http://127.0.0.1:8080');
} catch {
  DEFAULT_URL = new URL('http://127.0.0.1:8080');
}

const DB_NAME = 'greycat.default';
const DB_VERSION = 1;
const STORE_NAME = 'abi';

type AbiData = {
  headers: [number, number, number];
  data: ArrayBuffer;
};

export async function init(
  {
    url = DEFAULT_URL,
    auth,
    capacity,
    libraries,
    signal,
    unauthorizedHandler,
  }: WithoutAbiOptions = { url: DEFAULT_URL },
): Promise<GreyCat> {
  const opts = {
    url,
    auth,
    capacity,
    libraries,
    signal,
    unauthorizedHandler,
  };

  let abi: Abi;
  const db = new Db(DB_NAME, STORE_NAME, DB_VERSION);
  await db.open();
  const res = await db.readAbi();
  if (res == null) {
    // we don't have any cached ABI
    abi = await update(db, opts);
  } else {
    // check if we need to update
    const [[proto, magic, version]] = await downloadAbiHeaders(opts);
    if (proto === res.headers[0] && magic === res.headers[1] && version === res.headers[2]) {
      // everything matches
      abi = new Abi(res.data, opts.libraries ?? []);
    } else {
      // we have a discrepency, update cached abi
      abi = await update(db, opts);
    }
  }
  return GreyCat.initWithAbi({ ...opts, abi });
}

async function update(db: Db, opts: WithoutAbiOptions) {
  const [abiBuf] = await downloadAbi(opts);
  const abi = new Abi(abiBuf, opts.libraries ?? []);
  await db.writeAbi({
    headers: [Abi.protocol_version, abi.magic, abi.version],
    data: abiBuf,
  });
  return abi;
}

/**
 * Deletes the internal ABI cache. You need to reload the page after calling this
 * to actually reload the cache again.
 */
export async function deleteAbiCache(): Promise<void> {
  try {
    const db = new Db(DB_NAME, STORE_NAME, DB_VERSION);
    await db.delete();
  } catch {
    // ignore
  }
}

class Db {
  private _db: IDBDatabase | undefined;

  constructor(
    readonly dbName = 'greycat.default',
    readonly storeName = 'abi',
    readonly version = 1,
  ) { }

  open(): Promise<void> {
    return new Promise((resolve, reject) => {
      const req = window.indexedDB.open(this.dbName, this.version);
      req.onupgradeneeded = () => {
        req.result.createObjectStore(this.storeName);
      };
      req.onsuccess = () => {
        this._db = req.result;
        resolve();
      };
      req.onerror = () => reject(`Failed to open IndexedDB '${this.dbName}:${this.version}'`);
    });
  }

  close(): void {
    this._db?.close();
    this._db = undefined;
  }

  delete(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.close();

      const deleteReq = indexedDB.deleteDatabase(this.dbName);

      deleteReq.onsuccess = () => resolve();
      deleteReq.onerror = () => {
        reject(`Failed to reset ${this.dbName}`);
      };
    });
  }

  readAbi(): Promise<AbiData | null> {
    return new Promise((resolve, reject) => {
      if (!this._db) {
        return reject('You must open the database first');
      }

      const transaction = this._db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const req = store.get('data');
      req.onsuccess = () => resolve(req.result);
      req.onerror = () =>
        reject(`Failed to read ${this.dbName}:${this.version} at '${this.storeName}.data'`);
    });
  }

  writeAbi(data: AbiData): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this._db) {
        return reject('You must open the database first');
      }

      const transaction = this._db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const req = store.put(data, 'data');
      req.onsuccess = () => resolve();
      req.onerror = () =>
        reject(`Failed to write ${this.dbName}:${this.version} at '${this.storeName}.data'`);
    });
  }
}
