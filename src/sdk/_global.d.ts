import * as _sdk from './index.js';

declare global {
  namespace gc {
    export import sdk = _sdk;
    /**
     * A map of all known GreyCat instances allowing to communicate with different GreyCat instances from the same client.
     *
     * *The name `'default'` is reserved and is used when initializing without a specific name*.
     */
    const $: { [name: string]: _sdk.GreyCat };
  }
}

export {};
