// @ts-check
import { GreyCat, AbiTypeEvol } from '@greycat/web/sdk';

const greycat = await GreyCat.init();

const RelayApp = greycat.findType('project::RelayApp');
if (!RelayApp) {
  throw 'unable to find RelayApp';
}

const evol = new AbiTypeEvol(RelayApp);
console.log(evol.size, `updates for ${RelayApp.name}`);
console.log('backward', Array.from(evol.backward()).map((ty) => ty.data.offset));
console.log('forward', Array.from(evol.forward()).map((ty) => ty.data.offset));


