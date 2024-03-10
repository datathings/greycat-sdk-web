import { computed, mapSignal, signal } from '../../src';

type Todo = { done: boolean; text: string };

export class TodoList extends HTMLElement {
  todos = signal([
    signal<Todo>({ text: 'do the dishes', done: false }),
    signal<Todo>({ text: 'walk the dog', done: true }),
  ]);
  text = signal('');

  addTodo = () => {
    const text = this.text();
    if (text.length > 0) {
      this.todos.update((todos) => {
        todos.push(signal<Todo>({ text, done: false }));
        return todos;
      });
      this.text.set('');
    }
  };

  toggleTodo = (todo: Signal<Todo>) => () => {
    todo.update((todo) => {
      todo.done = !todo.done;
      return todo;
    });
  };

  connectedCallback() {
    this.appendChild(
      <div style={{ width: '300px' }}>
        <h4>TODOs:</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing)' }}>
          <input
            type="text"
            $:value={this.text}
            onkeyup={(ev) => {
              if (ev.key === 'Enter') {
                this.addTodo();
              }
            }}
            placeholder="Add todo…"
            style={{ width: '200px', marginBottom: '0' }}
          />
          <button style={{ width: 'auto', marginBottom: '0' }} onclick={this.addTodo}>
            Add
          </button>
        </div>
        {mapSignal('ul', this.todos, (todo) => (
          <li className={{ done: computed(() => todo().done) }} onclick={this.toggleTodo(todo)}>
            {todo().text}
          </li>
        ))}
      </div>,
    );
  }

  disconnectedCallback() {
    this.replaceChildren();
  }
}

class TodoItem extends HTMLElement {
  connectedCallback() {
    this.appendChild(<>Hello</>);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-list': TodoList;
    'todo-item': TodoItem;
  }

  namespace JSX {
    interface IntrinsicElements {
      'todo-list': GreyCat.Element<TodoList>;
      'todo-item': GreyCat.Element<TodoItem>;
    }
  }
}

if (!customElements.get('todo-list')) {
  customElements.define('todo-list', TodoList);
}

if (!customElements.get('todo-item')) {
  customElements.define('todo-item', TodoItem);
}
