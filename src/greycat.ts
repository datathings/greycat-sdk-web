import {
  Abi,
  GreyCat,
  downloadAbi,
  downloadAbiHeaders,
  DownloadAbiOption,
  Library,
} from '@greycat/sdk';

let DEFAULT_URL: URL;
try {
  DEFAULT_URL = new URL(globalThis.location?.origin ?? 'http://127.0.0.1:8080');
} catch {
  DEFAULT_URL = new URL('http://127.0.0.1:8080');
}

export type GreyCatInitOptions = DownloadAbiOption & { libraries?: Library[] };
type AbiData = {
  headers: [number, number, number];
  data: ArrayBuffer;
};

export async function init(opts: GreyCatInitOptions = { url: DEFAULT_URL }): Promise<GreyCat> {
  let abi: Abi;
  const db = new Db('greycat.default', 'abi', 1);
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

async function update(db: Db, opts: GreyCatInitOptions) {
  const [abiBuf] = await downloadAbi(opts);
  const abi = new Abi(abiBuf, opts.libraries ?? []);
  await db.writeAbi({
    headers: [Abi.protocol_version, abi.magic, abi.version],
    data: abiBuf,
  });
  return abi;
}

class Db {
  private _db: IDBDatabase | undefined;

  constructor(readonly dbName = 'greycat.default', readonly storeName = 'abi', readonly version = 1) { }

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

  readAbi(): Promise<AbiData | null> {
    const db = this._db;
    if (!db) {
      return Promise.reject('You must open the database first');
    }

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const req = store.get('data');
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(`Failed to read ${this.dbName}:${this.version} at '${this.storeName}.data'`);
    });
  }

  writeAbi(data: AbiData): Promise<void> {
    const db = this._db;
    if (!db) {
      return Promise.reject('You must open the database first');
    }

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const req = store.put(data, 'data');
      req.onsuccess = () => resolve();
      req.onerror = () => reject(`Failed to write ${this.dbName}:${this.version} at '${this.storeName}.data'`);
    });
  }
}