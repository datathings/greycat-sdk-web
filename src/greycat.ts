import { Cache, CacheData, CacheKey } from './exports.js';

export class IndexedDbCache implements Cache {
  private static _STORE_NAME = 'cache';
  private _db: IDBDatabase | undefined;

  constructor(
    readonly dbName = 'greycat.$.default',
    readonly version = 2,
  ) {}

  db(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      if (this._db) {
        resolve(this._db);
        return;
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
    });
  }

  async write(key: CacheKey, data: CacheData): Promise<void> {
    return new Promise((resolve, reject) => {
      return this.db().then((db) => {
        const transaction = db.transaction(IndexedDbCache._STORE_NAME, 'readwrite');
        const store = transaction.objectStore(IndexedDbCache._STORE_NAME);
        const req = store.put(data, key);
        req.onsuccess = () => resolve();
        req.onerror = () =>
          reject(
            `Failed to write ${this.dbName}:${this.version} at '${IndexedDbCache._STORE_NAME}.${key[0]}'`,
          );
      }, reject);
    });
  }

  read(key: CacheKey): Promise<CacheData | null> {
    return new Promise((resolve, reject) => {
      return this.db().then((db) => {
        const transaction = db.transaction(IndexedDbCache._STORE_NAME, 'readonly');
        const store = transaction.objectStore(IndexedDbCache._STORE_NAME);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () =>
          reject(
            `Failed to read ${this.dbName}:${this.version} at '${IndexedDbCache._STORE_NAME}.${key[0]}'`,
          );
      });
    });
  }
}
