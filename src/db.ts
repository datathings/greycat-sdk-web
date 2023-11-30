export interface Db {
  writeBytes(key: string, value: Uint8Array): Promise<void>;
  readBytes(key: string): Promise<Uint8Array | undefined>;
}

export class IndexedDbWrapper implements Db {
  private dbName: string;
  private dbVersion: number;
  private db: IDBDatabase | null;
  private storeName: string;

  constructor(dbName: string, dbVersion: number, storeName = 'store') {
    this.dbName = dbName;
    this.dbVersion = dbVersion;
    this.db = null;
    this.storeName = storeName;
  }

  private async _ensureDB(): Promise<IDBDatabase> {
    if (this.db) {
      return this.db;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => {
        reject(`Failed to open database: ${request.error}`);
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  }

  async readBytes(key: string): Promise<Uint8Array | undefined> {
    const db = await this._ensureDB();
    return new Promise<Uint8Array | undefined>((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);

      request.onsuccess = () => {
        const result = request.result as Uint8Array | undefined;
        resolve(result);
      };

      request.onerror = () => {
        reject(`Failed to get item: ${request.error}`);
      };
    });
  }

  async writeBytes(key: string, value: Uint8Array): Promise<void> {
    const db = await this._ensureDB();
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(value, key);

      request.onsuccess = () => resolve();
      request.onerror = () => {
        reject(`Failed to set item: ${request.error}`);
      };
    });
  }
}
