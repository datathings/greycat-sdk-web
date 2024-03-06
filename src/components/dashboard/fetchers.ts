import { GuiDashboardFetcher } from './dashboard.js';

export interface GreycatFetcherState {
  /**
   * **F**ully **q**ualified **n**ame of an `@expose`d function to call.
   */
  fqn: string;
  /**
   * Optional arguments to pass along with the call.
   */
  args?: unknown[];
  /**
   * The property to assign the result of the call to.
   * 
   * *If this is `undefined` the result will be assigned to the property `'value'`.*
   */
  prop?: string;
}

/**
 * A fetcher that calls a remote Greycat function based on the properties `fqn` and `args` given in the `state`.
 */
export const greycatFetcher: GuiDashboardFetcher<GreycatFetcherState> = async (el, state) => {
  const prop = state.prop ?? 'value';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (el as any)[prop] = await greycat.default.call(state.fqn, state.args);
};