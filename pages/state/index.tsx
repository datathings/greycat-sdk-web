import { core, loadStateFromStorage, saveStateToStorage } from '../../src';
import '../layout';
import type { AppLayout } from '../layout';

const app = (<app-layout title="State" />) as AppLayout;
await app.init();

document.body.prepend(app);

class AppState {
  constructor(
    public auth: AuthState,
    public functions: FunctionsState,
    public graph: GraphState,
  ) {}

  static async fromDb(): Promise<AppState> {
    // loads the raw state from IndexedDb or use the provided default
    const state = await loadStateFromStorage(
      {
        auth: {
          username: 'User',
          count: 42,
          time: core.time.fromMs(Date.now()),
        },
        functions: {
          indexOfStuff: new Map<unknown, unknown>([
            ['Something', 42],
            ['Another', 'Thing'],
            [1337, false],
            [{ foo: 'bar' }, { baz: 42 }],
          ]),
          selectedFn: 'project::foo',
          fn: {
            paramA: 1337,
            paramB: ['hello', 'world!'],
          },
        },
        graph: {
          selectedTab: 'moduleA::varC',
        },
      },
    );

    return new AppState(
      new AuthState(state.auth.username, state.auth.count, state.auth.time),
      new FunctionsState(
        state.functions.indexOfStuff,
        state.functions.selectedFn,
        new FnState(state.functions.fn.paramA, state.functions.fn.paramB),
      ),
      new GraphState(state.graph.selectedTab),
    );
  }
}

class AuthState {
  constructor(
    public name: string,
    public count: number,
    public time: core.time,
  ) {}
}

class FunctionsState {
  constructor(
    public indexOfStuff: Map<unknown, unknown>,
    public selectedFn: string,
    public fn: FnState,
  ) {}
}

class FnState {
  constructor(
    public paramA: number,
    public paramB: string[],
  ) {}
}

class GraphState {
  constructor(public selectedModVar: string) {}
}

console.time('load state');
const state = await AppState.fromDb();
console.timeEnd('load state');
console.log(state);

// serializes the state to IndexedDb
console.time('save state');
await saveStateToStorage(state);
console.timeEnd('save state');

app.main.appendChild(
  <article>
    <header>Open the console to see the loaded state</header>
    <div className="container-fluid">
      <gui-object value={state} />
    </div>
  </article>,
);
