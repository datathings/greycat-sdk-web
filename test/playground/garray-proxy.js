class GArray {
  constructor(values) {
    this.values = values;

    // eslint-disable-next-line no-undef
    return new Proxy(this, {
      get(target, prop) {
        if (typeof prop === 'string' && !isNaN(prop)) {
          return target.values[Number(prop)];
        }
        return target[prop];
      },
      set(target, prop, value) {
        if (typeof prop === 'string' && !isNaN(prop)) {
          target.values[Number(prop)] = value;
          return true;
        }
        target[prop] = value;
        return true;
      },
    });
  }

  get length() {
    return this.values.length;
  }

  [Symbol.iterator]() {
    let index = 0;
    const values = this.values;

    return {
      next() {
        if (index < values.length) {
          return { value: values[index++], done: false };
        }
        return { done: true };
      },
    };
  }

  get [Symbol.toStringTag]() {
    return 'GArray';
  }
}

const arr = new GArray(['hello world', 42, { some: 'object' }]);

console.log('=== for of ===');
for (const elem of arr) {
  console.log(elem);
}

console.log('=== offset access ===');
arr[1] = 100;
console.log(`arr[1] = 100; => ${arr[1]}`);

console.log('=== Array.from(arr) ===');
console.log(Array.from(arr));

console.log('=== print ===');
console.log(arr);
