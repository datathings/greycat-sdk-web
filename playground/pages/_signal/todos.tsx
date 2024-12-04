// import { ComputedSignal, customElement, Signal, type sl } from '@greycat/web';
// import '@/common';

// interface Todo {
//   title: string;
//   done: boolean;
// }

// type Filter = 'all' | 'completed' | 'active';

// @customElement('app-todo')
// class AppTodo extends HTMLElement {
//   private _todos = new Signal<Todo[]>([
//     { title: 'Walk the dog', done: true },
//     { title: 'Do the dishes', done: false },
//     { title: 'Get a haircut', done: false },
//   ]);
//   private _filter = new Signal<Filter>('all');
//   private _filteredTodos = new ComputedSignal(() => {
//     const todos = this._todos.get();
//     switch (this._filter.get()) {
//       case 'all':
//         return todos;
//       case 'active':
//         return todos.filter((todo) => !todo.done);
//       case 'completed':
//         return todos.filter((todo) => todo.done);
//     }
//   });
//   private _todo = new Signal('');
//   private _addTodo = () => {
//     const title = this._todo.get();
//     if (title.length > 0) {
//       this._todos.update((todos) => {
//         todos.push({ title, done: false });
//         return todos;
//       });
//       this._todo.set('');
//     }
//   };
//   private _toggleTodo = (todo: Todo) => {
//     this._todos.update((todos) => {
//       const index = todos.indexOf(todo);
//       todos[index].done = !todos[index].done;
//       return todos;
//     });
//   };

//   connectedCallback() {
//     this.replaceChildren(
//       <sl-card style={{ width: '400px' }}>
//         <header slot="header">
//           TODOs
//           <sl-radio-group
//             value={this._filter as Signal<string>}
//             size="small"
//             onsl-change={(ev) => this._filter.set((ev.target as sl.SlRadioGroup).value as Filter)}
//           >
//             <sl-radio-button value="all">All</sl-radio-button>
//             <sl-radio-button value="completed">Completed</sl-radio-button>
//             <sl-radio-button value="active">Active</sl-radio-button>
//           </sl-radio-group>
//         </header>
//         <div className={['list', 'py-1']}>
//           {this._filteredTodos.map((todo, i) => (
//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//               <sl-checkbox checked={todo.done} onsl-change={() => this._toggleTodo(todo)}>
//                 {todo.title}
//               </sl-checkbox>
//               <sl-button
//                 variant="text"
//                 size="small"
//                 onclick={() => {
//                   this._todos.update((todos) => {
//                     todos.splice(i, 1);
//                     return todos;
//                   });
//                 }}
//               >
//                 Del
//               </sl-button>
//             </div>
//           ))}
//         </div>
//         <footer slot="footer">
//           <sl-input
//             size="small"
//             value={this._todo}
//             onsl-input={(ev) => this._todo.set((ev.target as sl.SlInput).value)}
//             placeholder="Task to do..."
//             style={{ flex: '1' }}
//           />
//           <sl-button variant="text" size="small" onclick={this._addTodo}>
//             Add
//           </sl-button>
//         </footer>
//       </sl-card>,
//     );
//   }
// }

// declare global {
//   interface HTMLElementTagNameMap {
//     'app-todo': AppTodo;
//   }

//   namespace GreyCat {
//     namespace JSX {
//       interface IntrinsicElements {
//         'app-todo': GreyCat.Element<AppTodo>;
//       }
//     }
//   }
// }

// document.body.appendChild(
//   <app-layout title="Abi">
//     <sl-button variant="text" slot="action" href="../signal/">
//       Index
//     </sl-button>
//     <sl-button variant="text" slot="action" disabled>
//       Todos
//     </sl-button>
//     <app-todo />
//   </app-layout>,
// );
