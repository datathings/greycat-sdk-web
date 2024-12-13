import { core, GreyCat, GuiInputFn } from '@greycat/web';
import '@/common';

await GreyCat.init();

function printValue(this: GuiInputFn) {
  console.log('update', this.args);
}

const start = core.time.now();
const value = core.nodeTime_sample_args.create(
  [],
  start,
  start.add(core.duration.from_months(1)),
  1000,
  core.SamplingMode.adaptative(),
  null,
  null,
);
console.log(value);

document.body.appendChild(
  <app-layout title="Inputs (object)">
    <gui-input-fn value={value} ongui-change={printValue}>
      <gui-value slot="from" />
      <gui-value slot="to" />
    </gui-input-fn>
  </app-layout>,
);

{
  /* <gui-input-object value={value} ongui-change={printValue}>
      <gui-input-object slot="license">
        <gui-input-string slot="name" />
        <gui-value slot="max_memory" />
      </gui-input-object>
    </gui-input-object> */
}
