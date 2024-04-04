import { Id, computed, foreach, signal } from '@greycat/web';

class Todo implements Id {
  text: Signal<string>;
  done: Signal<boolean>;
  id: string;

  constructor(text: string, done = false) {
    this.id = text;
    this.text = signal(text);
    this.done = signal(done);

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.done.update((b) => !b);
  }
}

class TodosCtrl {
  text: Signal<string>;
  todos: Signal<Todo[]>;
  isClean: Computed<boolean>;

  constructor(todos: Todo[]) {
    this.text = signal('');
    this.todos = signal(todos);
    this.isClean = computed(() => this.todos().find((t) => t.done()) === undefined);

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.clean = this.clean.bind(this);
  }

  addTodo() {
    const text = this.text();
    if (text.length === 0) {
      return;
    }

    this.text.set('');
    this.todos.update((todos) => {
      todos.push(new Todo(text));
      return todos;
    });
  }

  removeTodo(todo: Todo) {
    this.todos.update((todos) => {
      const index = todos.findIndex((t) => t === todo);
      todos.splice(index, 1);
      return todos;
    });
  }

  clean() {
    this.todos.update((todos) => {
      return todos.filter((t) => !t.done());
    });
  }
}

export class TodoList extends HTMLElement {
  ctrl: TodosCtrl;

  constructor() {
    super();

    const todos: Todo[] = [new Todo('do the dishes'), new Todo('walk the dog')];
    for (let i = 0; i < 30; i++) {
      todos.push(new Todo(`task ${i + 1}`));
    }
    this.ctrl = new TodosCtrl(todos);
  }

  connectedCallback() {
    console.log('[todo-list] connected');
    this.appendChild(
      <div style={{ width: '300px' }}>
        <h4>TODOs:</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing)' }}>
          <input
            type="text"
            $:value={this.ctrl.text}
            onkeyup={(ev) => {
              if (ev.key === 'Enter') {
                this.ctrl.addTodo();
              }
            }}
            placeholder="Add todo…"
            style={{ width: '200px', marginBottom: '0' }}
          />
          <button style={{ width: 'auto', marginBottom: '0' }} onclick={this.ctrl.addTodo}>
            Add
          </button>
          <button
            style={{ width: 'auto', marginBottom: '0' }}
            onclick={this.ctrl.clean}
            disabled={this.ctrl.isClean}
          >
            Clean
          </button>
        </div>
        {foreach(this.ctrl.todos, <ul />, (todo) => (
          <li className={{ done: todo.done, 'todo-item': true }} onclick={todo.toggle}>
            <span>{todo.text()}</span>
            <a href="#" onclick={() => this.ctrl.removeTodo(todo)}>
              Del
            </a>
          </li>
        ))}
      </div>,
    );
  }

  disconnectedCallback() {
    console.log('[todo-list] disconnected');
    this.replaceChildren();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-list': TodoList;
  }

  namespace JSX {
    interface IntrinsicElements {
      'todo-list': GreyCat.Element<TodoList>;
    }
  }
}

if (!customElements.get('todo-list')) {
  customElements.define('todo-list', TodoList);
}
