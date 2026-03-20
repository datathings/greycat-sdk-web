import { GuiFnSelect, GuiInputFn } from '@greycat/web';
import { appLayout } from '~/common';
import './index.css';

const g = await gc.sdk.init({ debug: true });

const argumentsEl = document.createElement('gui-object');
const resultEl = document.createElement('gui-object');
resultEl.value = `Click on 'Call' to see the result`;

const input = (
  <gui-input-fn
    ongui-change={(ev) => {
      console.log('gui-input-fn change', ev.detail);
      argumentsEl.value = input.value;
    }}
  />
) as GuiInputFn;

let method: string = '';

const handleFnCall = async () => {
  try {
    resultEl.value = await g.call(method, input.args);
  } catch (err) {
    resultEl.value = err;
  }
};

document.body.appendChild(
  appLayout('Fn Call',
    <div className="list">
      <div className="row">
        <fieldset>
          <legend>Pick a function:</legend>
          <gui-fn-select
            onsl-change={function (this: GuiFnSelect) {
              const fn = g.findFn(this.value as string);
              if (fn) {
                method = fn.fqn;
                resultEl.value = undefined;
                input.value = new fn.args_type.ctor();
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
    </div>,
  ),
);
