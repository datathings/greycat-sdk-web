import { GuiFactory, GuiInputFactory } from './exports';

const oldInit = greycat.sdk.init;
greycat.sdk.init = async function init(options = { url: greycat.sdk.DEFAULT_URL }) {
  const g = await oldInit(options);
  initWeb();
  return g;
};

const oldInit2 = greycat.sdk.initWithAbi;
greycat.sdk.initWithAbi = function initWithAbi(options: greycat.sdk.WithAbiOptions) {
  const g = oldInit2(options);
  initWeb();
  return g;
};

function initWeb() {
  // both factories needs to be created after they are registered
  GuiFactory.global = new GuiFactory('gui-object', 'gui-value', {
    [greycat.core.Table._type]: 'gui-table',
    [greycat.core.Map._type]: 'gui-table',
    [greycat.core.Array._type]: 'gui-table',
  });
  GuiInputFactory.global = new GuiInputFactory({
    ['core::any']: 'gui-input-any',
    [greycat.core.int._type]: 'gui-input-number',
    [greycat.core.float._type]: 'gui-input-number',
    [greycat.core.bool._type]: 'gui-input-bool',
    [greycat.core.String._type]: 'gui-input-string',
    [greycat.core.char._type]: 'gui-input-string',
    [greycat.core.str._type]: 'gui-input-str',
    [greycat.core.time._type]: 'gui-input-time',
    [greycat.core.null_._type]: 'gui-input-null',
    [greycat.core.type._type]: 'gui-input-type',
    [greycat.core.field._type]: 'gui-input-field',
    [greycat.core.duration._type]: 'gui-input-duration',
    [greycat.core.Array._type]: 'gui-input-array',
    [greycat.core.Map._type]: 'gui-input-map',
    [greycat.core.geo._type]: 'gui-input-geo',
    [greycat.core.node._type]: 'gui-input-node',
    [greycat.core.nodeIndex._type]: 'gui-input-node-index',
    [greycat.core.nodeTime._type]: 'gui-input-node-time',
    [greycat.core.nodeList._type]: 'gui-input-node-list',
    [greycat.core.nodeGeo._type]: 'gui-input-node-geo',
    [greycat.core.function_._type]: 'gui-input-fnptr',
  });
}
