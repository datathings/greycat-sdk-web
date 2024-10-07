import {
  GreyCat,
  IndexedDbCache,
  GuiFnSelect,
  GuiInputFn,
  $,
  AbiFunction,
} from '@greycat/web';
import '@/common';
import './index.css';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const argumentsEl = document.createElement('gui-object');
const resultEl = document.createElement('gui-object');
resultEl.value = `Click on 'Call' to see the result`;

const input = (
  <gui-input-fn
    ongui-input={(ev) => {
      console.log('input-args-change', ev.detail);
      const args: Record<string, unknown> = {};
      const values = input.value;
      const fn = input.type as AbiFunction;
      fn.params.forEach((param, i) => {
        args[param.name] = values[i];
      });
      argumentsEl.value = args;
    }}
  />
) as GuiInputFn;

const handleFnCall = async () => {
  try {
    if (input.fqn) {
      resultEl.value = await $.default.call(input.fqn, input.value);
    }
  } catch (err) {
    resultEl.value = err;
  }
};

document.body.appendChild(
  <app-layout title="Fn Call">
    <div className="list">
      <div className="row">
        <fieldset>
          <legend>Pick a function:</legend>
          <gui-fn-select
            onsl-change={function (this: GuiFnSelect) {
              const fn = $.default.findFn(this.value as string);
              if (fn) {
                resultEl.value = undefined;
                input.type = fn;
              }
              argumentsEl.value = undefined;
            }}
          />
        </fieldset>
        <fieldset className="flex-1">
          <legend>Set the arguments of that function:</legend>
          {input}
        </fieldset>
      </div>
      {argumentsEl}
      <fieldset>
        <legend>
          <a href="#" onclick={handleFnCall}>
            Call
          </a>
        </legend>
        <div className="p-1">{resultEl}</div>
      </fieldset>
    </div>
  </app-layout>,
);
