import '@greycat/web';
import '@/common';

await gc.sdk.init();

document.body.appendChild(
  <app-layout title="Input (Any)">
    <gui-input-fn
      value={new gc.runtime.PeriodicTask$set$args([])}
      ongui-change={function () {
        console.log(structuredClone(this.value));
      }}
    />
  </app-layout>,
);
