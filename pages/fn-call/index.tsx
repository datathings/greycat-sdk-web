import { AbiFunction, FnCallInput, Value } from '../../src';
import '../layout';
import s from './index.module.css';

const app = document.createElement('app-layout');
app.title = 'Fn Call';

await app.init();

document.body.prepend(app);

const argumentsEl = document.createElement('gui-object');
const resultEl = document.createElement('gui-object');

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
    // TODO proper error handling
    console.error(err);
  }
};

app.main.replaceChildren(
  <div role="list">
    <div className="grid">
      <article>
        <header>Pick a function</header>
        <div className="container-fluid">
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
        </div>
      </article>
      <article>
        <header>Function arguments</header>
        <div className="container-fluid">{input.element}</div>
      </article>
    </div>
    <div className="grid">
      <article>
        <header className={s.callFnHeader}>
          Input Data
          <a href="#" onclick={handleFnCall}>
            Call
          </a>
        </header>
        {argumentsEl}
      </article>
      <article>
        <header>Function result</header>
        <div className={['container-fluid', s.resultContainer]}>{resultEl}</div>
      </article>
    </div>
  </div>,
);
