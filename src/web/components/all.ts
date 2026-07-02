import './auth/register.js';
import './card/register.js';
import './chart/register.js';
import './chart2/register.js';
import './csv/register.js';
import './details/register.js';
import './dialog/register.js';
import './donut/register.js';
import './factory/register.js';
import './files/register.js';
import './fn-select/register.js';
import './gauge/register.js';
import './gaussian/register.js';
import './heatmap/register.js';
import './histogram/register.js';
import './identities/register.js';
import './inputs/register.js';
import './layout/register.js';
import './logs/register.js';
import './map/register.js';
import './multi-select-checkbox/register.js';
import './nav/register.js';
import './object/register.js';
import './roles/register.js';
import './runtime-usage/register.js';
import './search-input/register.js';
import './select/register.js';
import './table/register.js';
import './tabs/register.js';
import './tasks/register.js';
import './tensor/register.js';
import './time/register.js';
import './value/register.js';

import * as web from '../exports.js';

Object.assign(globalThis.gc, { web });
declare global {
  namespace gc {
    const web: typeof import('../exports.js');
  }
}
