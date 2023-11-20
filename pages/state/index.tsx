import {
  IntInput,
  StringInput,
  TimeInput,
  core,
  loadStateFromStorage,
  saveStateToStorage,
} from '../../src';
import '../layout';
import type { AppLayout } from '../layout';

const app = (<app-layout title="State" />) as AppLayout;
await app.init();

document.body.prepend(app);

class AppState {
  private constructor(
    public time: core.time | null,
    public name: string,
    public age: number,
    public auth: AuthState,
  ) {
    return makeReactive(this, (s) => saveStateToStorage(s, 'app-state'));
  }

  static load() {
    const s = loadStateFromStorage(
      {
        time: null,
        name: 'default',
        age: -1,
        auth: AuthState.load(),
      },
      'app-state',
    );
    return new AppState(s.time, s.name, s.age, s.auth);
  }
}

class AuthState {
  private constructor(
    public username: string | null,
    public password: string | null,
  ) {
    return makeReactive(this, (s) => saveStateToStorage(s, 'auth-state'));
  }

  static load() {
    const s = loadStateFromStorage({ username: null, password: null }, 'auth-state');
    return new AuthState(s.username, s.password);
  }
}

function makeReactive<T extends object>(state: T, update: (state: T) => void): T {
  return new Proxy(state, {
    get(target, p) {
      console.log('get', target, p);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (target as any)[p];
    },
    set(target, p, newValue) {
      console.log('set', target, p, newValue);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (target as any)[p] = newValue;
      update(target);
      return true;
    },
  });
}

const state = AppState.load();
const timeInput = new TimeInput('time', (v) => (state.time = v));
const nameInput = new StringInput('name', (v) => (state.name = v));
const ageInput = new IntInput('age', (v) => (state.age = v));
const usernameInput = new StringInput('auth.username', (v) => (state.auth.username = v));
const passwordInput = new StringInput('auth.password', (v) => (state.auth.password = v));

console.log(state);

app.main.appendChild(
  <article>
    <header>Current state:</header>
    <div className="container-fluid">
      {timeInput.element}
      {nameInput.element}
      {ageInput.element}
      {usernameInput.element}
      {passwordInput.element}
    </div>
  </article>,
);
