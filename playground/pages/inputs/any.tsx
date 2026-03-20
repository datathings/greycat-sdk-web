import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

document.body.appendChild(
  appLayout('Input (Any)',
    <gui-input-fn
      value={new gc.any.array_any_map_any$args([], new Map())}
      ongui-change={function () {
        console.log(structuredClone(this.value));
      }}
    />,
  ),
);
