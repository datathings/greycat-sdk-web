import { GreyCat, IndexedDbCache, prettyError, GuiFnSelect, GuiInputFn } from '@greycat/web';
import '@/common';
import './index.css';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const argumentsEl = document.createElement('gui-table');
argumentsEl.value = { cols: [[]], meta: [{ header: 'Arguments' }] };
// argumentsEl.cellTagNames = { 0: 'gui-object' };
argumentsEl.style.height = '200px';
const resultEl = document.createElement('gui-object');
resultEl.value = `Click on 'Call' to see the result`;

const input = (
  <gui-input-fn
    ongui-input={(ev) => {
      console.log('input-args-change', ev.detail);
      argumentsEl.value = { cols: [input.value], meta: [{ header: 'Arguments' }] };
    }}
  />
) as GuiInputFn;

const handleFnCall = async () => {
  try {
    if (input.fqn) {
      resultEl.value = await greycat.default.call(input.fqn, input.value);
    }
  } catch (err) {
    resultEl.value = prettyError(err, 'Something went wrong with the function call');
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
              const fn = greycat.default.abi.fn_by_fqn.get(this.value as string);
              if (fn) {
                resultEl.value = undefined;
                input.type = fn;
              }
              console.log('fn-select', fn);
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
