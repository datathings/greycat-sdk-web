import '@greycat/web';
import '@/common';

await await gc.sdk.init();

const value = new greycat.any.AnyInput('');

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
