import { GreyCat } from '@greycat/web';
import '@/common';

const greycat = await GreyCat.init();

const type = greycat.findType('any::AnyInput');
if (!type) {
  throw 'missing any::AnyInput type';
}
const value = new type.factory(type);

document.body.appendChild(
  <app-layout title="Input (Any)">
    <gui-input-object
      value={value}
      ongui-change={function () {
        console.log(structuredClone(this.value));
      }}
    />
  </app-layout>,
);
