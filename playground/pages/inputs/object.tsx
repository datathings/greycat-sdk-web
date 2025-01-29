import { GuiInputElement, GuiInputFn } from '@greycat/web';
import '@/common';

await gc.sdk.init();

function printValue(this: GuiInputElement<unknown>) {
  console.log('update', this.value);
  validate();
}

function validate() {
  is_valid.textContent = `${input.validate()}`;
}

const is_valid = document.createTextNode('true');

const value = await gc.runtime.Runtime.info();
// const start = core.time.now();
// const value = core.nodeTime_sample_args.create(
//   [],
//   start,
//   start.add(core.duration.from_months(1)),
//   1000,
//   core.SamplingMode.adaptative(),
//   null,
//   null,
// );
// console.log(value);

const input = (
  <gui-input-fn value={value} ongui-change={printValue}>
    <gui-value slot="from" />
    <gui-value slot="to" />
  </gui-input-fn>
) as GuiInputFn;

document.body.appendChild(
  <app-layout title="Inputs (object)">
    {/* <div className="list">
      {input}
      <sl-button onclick={validate}>Validate</sl-button>
      {is_valid}
    </div> */}
    <gui-input-object value={value} ongui-change={printValue}>
      <gui-value slot="version" />
      <gui-value slot="io_threads" />
      <gui-value slot="bg_threads" />
      <gui-value slot="fg_threads" />
    </gui-input-object>
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
