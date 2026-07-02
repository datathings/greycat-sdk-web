import './polyfill.js';
import * as sdk from './index.js';
import { gcreg } from './registry.js';

// a plain mutable object so runtime registrations may extend it
gcreg.sdk = { ...sdk };

Object.assign(globalThis, { gc: gcreg });

export * from './index.js';
