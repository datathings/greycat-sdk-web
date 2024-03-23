import {
  type AbiFunction,
  type Value,
  FnCallInput,
  GreyCat,
  IndexedDbCache,
  prettyError,
} from '@greycat/web';
import '@/common';
import './index.css';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const argumentsEl = document.createElement('gui-object');
const resultEl = document.createElement('gui-object');
resultEl.value = `Click on 'Call' to see the result`;

const input = new FnCallInput(
  'some-name',
  greycat.default.abi.fn_by_fqn.get('project::add')!,
  (args) => {
    console.log(args);
    argumentsEl.value = args;
  },
);

const handleFnCall = async () => {
  try {
    resultEl.value = await greycat.default.call(input.fn.fqn, argumentsEl.value as Value[]);
  } catch (err) {
    resultEl.value = prettyError(err, 'Something went wrong with the function call');
  }
};

document.body.appendChild(
  <app-layout title="Fn Call">
    <fieldset>
      <label>Pick a function:</label>
      <gui-searchable-select
        options={greycat.default.abi.functions.map((fn) => ({
          text: fn.fqn,
          value: fn,
          selected: input.fn === fn,
        }))}
        onsearchable-select-change={(ev) => {
          input.fn = ev.detail as AbiFunction;
          resultEl.value = undefined;
        }}
      />
    </fieldset>
    <fieldset>
      <label>Set the arguments of that function:</label>
      {input.element}
    </fieldset>
    <details>
      <summary>Show arguments</summary>
      {argumentsEl}
    </details>
    <article>
      <header>
        Call the function
        <a href="#" onclick={handleFnCall}>
          Call
        </a>
      </header>
      <div className="p-1">{resultEl}</div>
    </article>
  </app-layout>,
);
