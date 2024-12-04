// import '@/common';
// import { ComputedSignal, Signal, sl } from '@greycat/web';

// const value = new Signal(2);
// const double = new ComputedSignal(() => value.get() * 2);

// document.body.appendChild(
//   <app-layout title="Signal">
//     <sl-button variant="text" slot="action" disabled>
//       Index
//     </sl-button>
//     <sl-button variant="text" slot="action" href="todos.html">
//       Todos
//     </sl-button>
//     <div className="list">
//       <sl-card>
//         <header slot="header">Signal</header>
//         <div>
//           <p style={{ marginBlockStart: '0' }}>
//             The <code>@greycat/web</code> library includes its own Signal system.
//           </p>
//           <p>
//             When working with <code>Signal</code> alongside <code>@greycat/web/jsx-runtime</code>,
//             effects are automatically registered on signals to update the corresponding element.
//             This allows you to seamlessly "use" signals as if they were regular values. The JSX
//             runtime ensures that changes to signals dynamically update the element's properties,
//             text content, or child elements (in the case of lists).
//           </p>
//           <p>
//             Outside of a JSX environment, you are responsible for manually registering effects on
//             your elements.
//           </p>
//           <p style={{ marginBlockEnd: '0' }}>
//             We chose not to implement two-way data binding, as it often causes confusion about the
//             true owner of the initial data. Two-way binding can also make it harder to trace the
//             source of state changes, complicating debugging and introducing unintended side effects.
//             By requiring explicit updates, we maintain a predictable and clear unidirectional data
//             flow. To update signals within forms, you need to manually attach an event listener and
//             explicitly call either <code>mySignal.set(...)</code> or{' '}
//             <code>mySignal.update(...)</code>, ensuring clear ownership and control over state
//             changes.
//           </p>
//         </div>
//       </sl-card>
//       <sl-input
//         label="Input value"
//         type="number"
//         value={`${value.get()}`}
//         onsl-input={(ev) => value.set((ev.target as sl.SlInput).valueAsNumber)}
//       />
//       <div>Value: {value}</div>
//       <div>Double: {double}</div>
//     </div>
//   </app-layout>,
// );
