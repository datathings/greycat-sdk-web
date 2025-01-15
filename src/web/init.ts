import { GuiFactory, GuiInputFactory } from './exports';

const oldInit = gc.sdk.init;
gc.sdk.init = async function init(options = { url: gc.sdk.DEFAULT_URL }) {
  const g = await oldInit(options);
  initWeb();
  return g;
};

const oldInit2 = gc.sdk.initWithAbi;
gc.sdk.initWithAbi = function initWithAbi(options: gc.sdk.WithAbiOptions) {
  const g = oldInit2(options);
  initWeb();
  return g;
};

function initWeb() {
  // both factories needs to be created after they are registered
  GuiFactory.global = new GuiFactory('gui-object', 'gui-value', {
    [gc.core.Table._type]: 'gui-table',
    [gc.core.Map._type]: 'gui-table',
    [gc.core.Array._type]: 'gui-table',
  });
  GuiInputFactory.global = new GuiInputFactory({
    ['core::any']: 'gui-input-any',
    [gc.core.int._type]: 'gui-input-number',
    [gc.core.float._type]: 'gui-input-number',
    [gc.core.bool._type]: 'gui-input-bool',
    [gc.core.String._type]: 'gui-input-string',
    [gc.core.char._type]: 'gui-input-string',
    [gc.core.str._type]: 'gui-input-str',
    [gc.core.time._type]: 'gui-input-time',
    [gc.core.null_._type]: 'gui-input-null',
    [gc.core.type._type]: 'gui-input-type',
    [gc.core.field._type]: 'gui-input-field',
    [gc.core.duration._type]: 'gui-input-duration',
    [gc.core.Array._type]: 'gui-input-array',
    [gc.core.Map._type]: 'gui-input-map',
    [gc.core.geo._type]: 'gui-input-geo',
    [gc.core.node._type]: 'gui-input-node',
    [gc.core.nodeIndex._type]: 'gui-input-node-index',
    [gc.core.nodeTime._type]: 'gui-input-node-time',
    [gc.core.nodeList._type]: 'gui-input-node-list',
    [gc.core.nodeGeo._type]: 'gui-input-node-geo',
    [gc.core.function_._type]: 'gui-input-fnptr',
  });
}
