export class IndexedDbCache implements gc.sdk.Cache {
  private static _STORE_NAME = 'cache';
  private _db: IDBDatabase | undefined;

  constructor(
    readonly dbName = 'gc.$.default',
    readonly version = 2,
  ) {}

  db(): Promise<IDBDatabase> {
    const { reject, resolve, promise } = Promise.withResolvers<IDBDatabase>();
    if (this._db) {
      resolve(this._db);
      return promise;
    }

    const req = window.indexedDB.open(this.dbName, this.version);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(IndexedDbCache._STORE_NAME);
    };
    req.onsuccess = () => {
      this._db = req.result;
      resolve(this._db);
    };
    req.onerror = () => reject(`Failed to open IndexedDB '${this.dbName}:${this.version}'`);
    return promise;
  }

  async write(key: gc.sdk.CacheKey, data: gc.sdk.CacheData): Promise<void> {
    const { reject, resolve, promise } = Promise.withResolvers<void>();
    const db = await this.db();
    const transaction = db.transaction(IndexedDbCache._STORE_NAME, 'readwrite');
    const store = transaction.objectStore(IndexedDbCache._STORE_NAME);
    const req = store.put(data, key);
    req.onsuccess = () => resolve();
    req.onerror = () =>
      reject(`Failed to write ${this.dbName}:${this.version} at '${IndexedDbCache._STORE_NAME}.${key[0]}'`);
    return promise;
  }

  async read(key: gc.sdk.CacheKey): Promise<gc.sdk.CacheData | null> {
    const { reject, resolve, promise } = Promise.withResolvers<gc.sdk.CacheData | null>();
    const db = await this.db();
    const transaction = db.transaction(IndexedDbCache._STORE_NAME, 'readonly');
    const store = transaction.objectStore(IndexedDbCache._STORE_NAME);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () =>
      reject(`Failed to read ${this.dbName}:${this.version} at '${IndexedDbCache._STORE_NAME}.${key[0]}'`);
    return promise;
  }
}
