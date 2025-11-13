import '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

document.body.appendChild(
  <app-layout title="Input (Any)">
    <gui-input-fn
      value={new gc.any.array_any_map_any$args([], new Map())}
      ongui-change={function () {
        console.log(structuredClone(this.value));
      }}
    />
  </app-layout>,
);
