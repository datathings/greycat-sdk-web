import { core } from '@greycat/sdk';

export const inputs = {
  [core.String._type]: () => document.createElement('gui-input-text'),
  [core.duration._type]: () => document.createElement('gui-input-duration'),
};
