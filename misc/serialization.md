# (De)Serialization

@greycat/web provides two new classes for (de)serialization that extends @greycat/sdk's `AbiReader` and `AbiWriter`:
- `BinaryReader`
- `BinaryWriter`

In addition to supporting GreyCat types, they add support for the following Javascript types: `object` and `undefined`. This means that they can serialize and deserialize any Javascript value, even containing nested GreyCat values, which comes in handy to store state in storage (`localStorage`, `sessionStorage` or `IndexedDB`).

## Example
```ts
import { BinaryWriter, BinaryReader } from '@greycat/web';

const data = { some: 'value' };
const writer = new BinaryWriter();
const hex = writer.toHex(data);
const data2 = BinaryReader.fromHex(hex);

console.assert(data.some === data2.some, 'Assert failed');
```

> This notation allows for re-using the already allocated buffer for `BinaryWriter` on subsequent serializations. If this is not a concern, you can use the helper functions: `serializeToHex` and `deserializeFromHex`

## Helper functions
```ts
import { serializeToHex, deserializeFromHex } from '@greycat/web';

const data = deserializeFromHex(serializeToHex({ hello: 'world' }));
// data = { hello: 'world' }
```

## Example with localStorage
Here's one way of coupling an application state class with `load`/`save` methods:

```ts
import { serializeToHex, deserializeFromHex, core } from '@greycat/web';

export class AppState {
  private constructor(
    public field1: string,
    public field2: number,
    public field3: core.time,
  ) {}

  /**
   * Saves this instance into `storage` under the key `'app-state'`.
   *
   * By default, the storage is `localStorage`.
   * 
   * @throws serialization is not infaillible
   */
  save(storage = localStorage): void {
    storage.setItem('app-state', serializeToHex(this));
  }

  /**
   * Loads state from storage. If no state is found or a deserialization error
   * occurs it returns `AppState.default()`.
   *
   * By default, the storage is `localStorage`.
   */
  static load(storage = localStorage): AppState {
    const hex = storage.getItem('app-state');
    if (hex) {
      try {
        const s = deserializeFromHex<any>(hex);
        // 's' could be anything, therefore data validation should
        // be taken into consideration after reading from storage
        // for this example I'm assuming 's' is always valid
        return new AppState(s.field1, s.field2, s.field3);
      } catch {
        // on error, return the default
        return AppState.default();
      }
    }
    return AppState.default();
  }

  static default(): AppState {
    return new AppState('field1', 10, core.time.fromMs(Date.now()));
  }
}
```

::: warning
This example does not cover *upgrade logic*. If the fields of `AppState` are changed after a save has already happen,
the next load will retrieve the previous state forcing you to deal with upgrade.

This is a common concern when dealing with persistent state. When upgrading the application code, you have to account for already stored state
in your users storages.
:::