import '@/common';

import './index.css';

import './computed-signals';
import './2-way-binding';
import './strike-through';
import './todo-list';
import './find-user';
import './poke-finder';

document.body.appendChild(
  <app-layout title="Signals">
    <computed-signals />
    <hr />
    <two-way-databinding />
    <hr />
    <strike-through />
    <hr />
    <todo-list />
    <hr />
    <find-user />
    <hr />
    <poke-finder />
  </app-layout>,
);
